export interface SavedQuizRecommendation {
  name: string;
  field: string;
  matchPercent: number;
  reason: string;
  courseFilterCat: string;
}

export interface SavedQuizResult {
  takenAt: number;
  stageLabel: string;
  recommendations: SavedQuizRecommendation[];
}

export interface UserProfile {
  age: string;
  qual: string;
  cur: string;
  interests: string[];
}

export interface UserAccount {
  name: string;
  email: string;
  salt: string;
  hash: string;
  created: number;
  profile: UserProfile;
  quizResult?: SavedQuizResult;
}

export interface ContactMessage {
  n: string;
  e: string;
  t: string;
  at: number;
}

const mem: Record<string, unknown> = {};

function storeGet<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (raw !== null) return JSON.parse(raw) as T;
  } catch {
    // fallback to in-memory store
  }
  return key in mem ? (mem[key] as T) : fallback;
}

function storeSet(key: string, val: unknown): void {
  mem[key] = val;
  try {
    localStorage.setItem(key, JSON.stringify(val));
  } catch {
    // ignore storage quota errors
  }
}

export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function initials(name: string): string {
  return String(name || '?')
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0] || '')
    .join('')
    .toUpperCase();
}

function newSalt(): string {
  const bytes = new Uint8Array(8);
  try {
    crypto.getRandomValues(bytes);
  } catch {
    for (let i = 0; i < 8; i++) bytes[i] = Math.floor(Math.random() * 256);
  }
  return Array.from(bytes, (b) => ('0' + b.toString(16)).slice(-2)).join('');
}

async function hashPw(password: string, salt: string): Promise<string> {
  try {
    const buf = await crypto.subtle.digest(
      'SHA-256',
      new TextEncoder().encode(`${salt}:${password}`)
    );
    return Array.from(new Uint8Array(buf), (b) =>
      ('0' + b.toString(16)).slice(-2)
    ).join('');
  } catch {
    let h = 5381;
    const s = salt + password;
    for (let i = 0; i < s.length; i++) {
      h = ((h << 5) + h + s.charCodeAt(i)) | 0;
    }
    return 'x' + h;
  }
}

export function getUsers(): Record<string, UserAccount> {
  return storeGet<Record<string, UserAccount>>('cgp_users', {});
}

export function getCurrentUser(): UserAccount | null {
  const email = storeGet<string | null>('cgp_session', null);
  if (!email) return null;
  return getUsers()[email] || null;
}

export async function registerUser(input: {
  name: string;
  email: string;
  password: string;
  age: string;
  qual: string;
  cur: string;
  interests: string[];
}): Promise<{ ok: true; user: UserAccount } | { ok: false; error: string }> {
  const all = getUsers();
  const email = input.email.trim().toLowerCase();
  if (all[email]) {
    return {
      ok: false,
      error: 'An account with this email already exists. Try logging in.',
    };
  }
  const salt = newSalt();
  const hash = await hashPw(input.password, salt);
  const user: UserAccount = {
    name: input.name.trim(),
    email,
    salt,
    hash,
    created: Date.now(),
    profile: {
      age: input.age,
      qual: input.qual,
      cur: input.cur.trim(),
      interests: input.interests,
    },
  };
  all[email] = user;
  storeSet('cgp_users', all);
  storeSet('cgp_session', email);
  return { ok: true, user };
}

export async function loginUser(
  emailRaw: string,
  password: string
): Promise<{ ok: true; user: UserAccount } | { ok: false; error: string }> {
  const email = emailRaw.trim().toLowerCase();
  const user = getUsers()[email];
  if (!user) {
    return { ok: false, error: 'Email or password is incorrect.' };
  }
  const hash = await hashPw(password, user.salt);
  if (hash !== user.hash) {
    return { ok: false, error: 'Email or password is incorrect.' };
  }
  storeSet('cgp_session', email);
  return { ok: true, user };
}

export function logoutUser(): void {
  storeSet('cgp_session', null);
}

export function findUserByEmail(emailRaw: string): UserAccount | null {
  const email = emailRaw.trim().toLowerCase();
  return getUsers()[email] || null;
}

export async function resetUserPassword(
  emailRaw: string,
  newPassword: string
): Promise<boolean> {
  const email = emailRaw.trim().toLowerCase();
  const all = getUsers();
  if (!all[email]) return false;
  const salt = newSalt();
  const hash = await hashPw(newPassword, salt);
  all[email].salt = salt;
  all[email].hash = hash;
  storeSet('cgp_users', all);
  return true;
}

export function updateUserProfile(input: {
  name: string;
  age: string;
  qual: string;
  cur: string;
  interests: string[];
}): UserAccount | null {
  const email = storeGet<string | null>('cgp_session', null);
  if (!email) return null;
  const all = getUsers();
  if (!all[email]) return null;
  all[email] = {
    ...all[email],
    name: input.name.trim(),
    profile: {
      age: input.age,
      qual: input.qual,
      cur: input.cur.trim(),
      interests: input.interests,
    },
  };
  storeSet('cgp_users', all);
  return all[email];
}

export function saveQuizResultToProfile(
  quizResult: SavedQuizResult
): UserAccount | null {
  const email = storeGet<string | null>('cgp_session', null);
  if (!email) return null;
  const all = getUsers();
  if (!all[email]) return null;
  all[email] = {
    ...all[email],
    quizResult,
  };
  storeSet('cgp_users', all);
  return all[email];
}

export function saveContactMessage(msg: ContactMessage): void {
  const all = storeGet<ContactMessage[]>('cgp_messages', []);
  all.push(msg);
  storeSet('cgp_messages', all);
}

