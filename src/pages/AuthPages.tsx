import React, { useState } from 'react';
import { CAREERS, INTERESTS, QUALS } from '../data/portalData';
import { CareerCard, PageHead } from '../components/Cards';
import {
  EMAIL_REGEX,
  UserAccount,
  findUserByEmail,
  initials,
  loginUser,
  registerUser,
  resetUserPassword,
  updateUserProfile,
} from '../utils/auth';

const InterestCheckboxes: React.FC<{
  selected: string[];
  onChange: (next: string[]) => void;
}> = ({ selected, onChange }) => {
  const toggle = (item: string) => {
    if (selected.includes(item)) {
      onChange(selected.filter((x) => x !== item));
    } else {
      onChange([...selected, item]);
    }
  };

  return (
    <div
      role="group"
      aria-label="Academic interests"
      className="flex gap-1.5 flex-wrap"
    >
      {INTERESTS.map((interest) => {
        const checked = selected.includes(interest);
        return (
          <label
            key={interest}
            className={`inline-flex gap-1.5 items-center cursor-pointer border rounded-full px-3.5 py-1.5 text-[13.5px] transition-colors ${
              checked
                ? 'bg-[var(--blue-soft)] border-[var(--blue)] text-[var(--blue)] font-semibold'
                : 'bg-[var(--surface)] border-[var(--line)] text-[var(--fg)]'
            }`}
          >
            <input
              type="checkbox"
              checked={checked}
              onChange={() => toggle(interest)}
              className="accent-[var(--blue)]"
            />
            {interest}
          </label>
        );
      })}
    </div>
  );
};

export const RegisterPage: React.FC<{
  onAuthSuccess: (user: UserAccount, message: string) => void;
}> = ({ onAuthSuccess }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [p1, setP1] = useState('');
  const [p2, setP2] = useState('');
  const [age, setAge] = useState('');
  const [qual, setQual] = useState('');
  const [cur, setCur] = useState('');
  const [interests, setInterests] = useState<string[]>([]);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (name.trim().length < 2) return setError('Enter your full name.');
    if (!EMAIL_REGEX.test(email.trim().toLowerCase())) {
      return setError('Enter a valid email address.');
    }
    if (p1.length < 8) {
      return setError('Use a password with at least 8 characters.');
    }
    if (p1 !== p2) return setError('The two passwords do not match.');
    const ageNum = Number(age);
    if (!age || ageNum < 10 || ageNum > 60) {
      return setError('Enter an age between 10 and 60.');
    }
    if (!qual) return setError('Choose your education qualification.');
    if (!cur.trim()) return setError('Enter your current class or degree.');

    const res = await registerUser({
      name,
      email,
      password: p1,
      age,
      qual,
      cur,
      interests,
    });
    if (!res.ok) return setError(res.error);
    onAuthSuccess(
      res.user,
      `Account created. Welcome, ${res.user.name.split(' ')[0]}!`
    );
  };

  return (
    <section className="py-10">
      <div className="max-w-[1180px] mx-auto px-4 sm:px-6">
        <form
          onSubmit={handleSubmit}
          noValidate
          className="bg-[var(--surface)] border border-[var(--line)] rounded-[18px] p-6.5 shadow-[var(--shadow)] max-w-[560px] mx-auto"
        >
          <h1 className="text-[26px] font-bold mb-1.5 text-[var(--fg)]">
            Create your student account
          </h1>
          <p className="text-[12.5px] text-[var(--muted)]">
            Your profile helps the portal suggest careers that fit you.
          </p>

          <div className="grid gap-1.5 mt-3.5">
            <label htmlFor="rn" className="font-semibold text-[14px]">
              Full name
            </label>
            <input
              id="rn"
              type="text"
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full [font:inherit] text-[var(--fg)] bg-[var(--bg)] border-[1.5px] border-[var(--line)] rounded-[10px] px-3 py-2.5 min-h-[44px] focus:border-[var(--blue)] outline-none"
            />
          </div>

          <div className="grid gap-1.5 mt-3.5">
            <label htmlFor="re" className="font-semibold text-[14px]">
              Email
            </label>
            <input
              id="re"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full [font:inherit] text-[var(--fg)] bg-[var(--bg)] border-[1.5px] border-[var(--line)] rounded-[10px] px-3 py-2.5 min-h-[44px] focus:border-[var(--blue)] outline-none"
            />
          </div>

          <div className="grid gap-3.5 grid-cols-1 sm:grid-cols-2">
            <div className="grid gap-1.5 mt-3.5">
              <label htmlFor="rp" className="font-semibold text-[14px]">
                Password
              </label>
              <input
                id="rp"
                type="password"
                autoComplete="new-password"
                placeholder="At least 8 characters"
                value={p1}
                onChange={(e) => setP1(e.target.value)}
                className="w-full [font:inherit] text-[var(--fg)] bg-[var(--bg)] border-[1.5px] border-[var(--line)] rounded-[10px] px-3 py-2.5 min-h-[44px] focus:border-[var(--blue)] outline-none"
              />
            </div>
            <div className="grid gap-1.5 mt-3.5">
              <label htmlFor="rc" className="font-semibold text-[14px]">
                Confirm password
              </label>
              <input
                id="rc"
                type="password"
                autoComplete="new-password"
                value={p2}
                onChange={(e) => setP2(e.target.value)}
                className="w-full [font:inherit] text-[var(--fg)] bg-[var(--bg)] border-[1.5px] border-[var(--line)] rounded-[10px] px-3 py-2.5 min-h-[44px] focus:border-[var(--blue)] outline-none"
              />
            </div>
          </div>

          <div className="grid gap-3.5 grid-cols-1 sm:grid-cols-2">
            <div className="grid gap-1.5 mt-3.5">
              <label htmlFor="ra" className="font-semibold text-[14px]">
                Age
              </label>
              <input
                id="ra"
                type="number"
                min={10}
                max={60}
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="w-full [font:inherit] text-[var(--fg)] bg-[var(--bg)] border-[1.5px] border-[var(--line)] rounded-[10px] px-3 py-2.5 min-h-[44px] focus:border-[var(--blue)] outline-none"
              />
            </div>
            <div className="grid gap-1.5 mt-3.5">
              <label htmlFor="rq" className="font-semibold text-[14px]">
                Education qualification
              </label>
              <select
                id="rq"
                value={qual}
                onChange={(e) => setQual(e.target.value)}
                className="w-full [font:inherit] text-[var(--fg)] bg-[var(--bg)] border-[1.5px] border-[var(--line)] rounded-[10px] px-3 py-2.5 min-h-[44px] focus:border-[var(--blue)] outline-none"
              >
                <option value="">Choose one</option>
                {QUALS.map((q) => (
                  <option key={q} value={q}>
                    {q}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid gap-1.5 mt-3.5">
            <label htmlFor="rcur" className="font-semibold text-[14px]">
              Current class or degree
            </label>
            <input
              id="rcur"
              type="text"
              placeholder="e.g. Class 11 Science, or 2nd year B.Com"
              value={cur}
              onChange={(e) => setCur(e.target.value)}
              className="w-full [font:inherit] text-[var(--fg)] bg-[var(--bg)] border-[1.5px] border-[var(--line)] rounded-[10px] px-3 py-2.5 min-h-[44px] focus:border-[var(--blue)] outline-none"
            />
          </div>

          <div className="grid gap-1.5 mt-3.5">
            <span className="font-semibold text-[14px]">
              Academic interests
            </span>
            <InterestCheckboxes selected={interests} onChange={setInterests} />
          </div>

          {error && (
            <div
              role="alert"
              className="mt-3.5 px-3 py-2.5 rounded-[10px] text-[14px] bg-[color-mix(in_srgb,var(--err)_12%,transparent)] text-[var(--err)]"
            >
              {error}
            </div>
          )}

          <button
            type="submit"
            className="mt-4.5 w-full inline-flex items-center justify-center rounded-[10px] px-4.5 py-2.5 min-h-[44px] font-semibold bg-[var(--blue)] text-[var(--blue-ink)] cursor-pointer hover:-translate-y-px transition-transform"
          >
            Create account
          </button>

          <p className="mt-4 text-[14px] text-[var(--muted)]">
            Already registered?{' '}
            <a href="#login" className="text-[var(--blue)] font-medium">
              Log in
            </a>
          </p>
          <p className="text-[12.5px] text-[var(--muted)] mt-2.5">
            Demo note: accounts are stored only in this browser. Use a practice
            password.
          </p>
        </form>
      </div>
    </section>
  );
};

export const LoginPage: React.FC<{
  flashMessage?: string;
  onAuthSuccess: (user: UserAccount, message: string) => void;
}> = ({ flashMessage, onAuthSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const res = await loginUser(email, password);
    if (!res.ok) return setError(res.error);
    onAuthSuccess(res.user, 'Logged in');
  };

  return (
    <section className="py-10">
      <div className="max-w-[1180px] mx-auto px-4 sm:px-6">
        <form
          onSubmit={handleSubmit}
          noValidate
          className="bg-[var(--surface)] border border-[var(--line)] rounded-[18px] p-6.5 shadow-[var(--shadow)] max-w-[560px] mx-auto"
        >
          <h1 className="text-[26px] font-bold mb-1.5 text-[var(--fg)]">
            Welcome back
          </h1>
          <p className="text-[12.5px] text-[var(--muted)]">
            Log in to see your profile and personalised suggestions.
          </p>

          {flashMessage && (
            <div
              role="status"
              className="mt-3.5 px-3 py-2.5 rounded-[10px] text-[14px] bg-[color-mix(in_srgb,var(--ok)_12%,transparent)] text-[var(--ok)]"
            >
              {flashMessage}
            </div>
          )}

          <div className="grid gap-1.5 mt-3.5">
            <label htmlFor="le" className="font-semibold text-[14px]">
              Email
            </label>
            <input
              id="le"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full [font:inherit] text-[var(--fg)] bg-[var(--bg)] border-[1.5px] border-[var(--line)] rounded-[10px] px-3 py-2.5 min-h-[44px] focus:border-[var(--blue)] outline-none"
            />
          </div>

          <div className="grid gap-1.5 mt-3.5">
            <label htmlFor="lp" className="font-semibold text-[14px]">
              Password
            </label>
            <input
              id="lp"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full [font:inherit] text-[var(--fg)] bg-[var(--bg)] border-[1.5px] border-[var(--line)] rounded-[10px] px-3 py-2.5 min-h-[44px] focus:border-[var(--blue)] outline-none"
            />
          </div>

          {error && (
            <div
              role="alert"
              className="mt-3.5 px-3 py-2.5 rounded-[10px] text-[14px] bg-[color-mix(in_srgb,var(--err)_12%,transparent)] text-[var(--err)]"
            >
              {error}
            </div>
          )}

          <button
            type="submit"
            className="mt-4.5 w-full inline-flex items-center justify-center rounded-[10px] px-4.5 py-2.5 min-h-[44px] font-semibold bg-[var(--blue)] text-[var(--blue-ink)] cursor-pointer hover:-translate-y-px transition-transform"
          >
            Log in
          </button>

          <p className="mt-4 text-[14px] text-[var(--muted)]">
            <a
              href="#forgot-password"
              className="text-[var(--blue)] font-medium"
            >
              Forgot password?
            </a>
          </p>
          <p className="mt-1.5 text-[14px] text-[var(--muted)]">
            New here?{' '}
            <a href="#register" className="text-[var(--blue)] font-medium">
              Create an account
            </a>
          </p>
        </form>
      </div>
    </section>
  );
};

export const ForgotPasswordPage: React.FC<{
  onPasswordUpdated: (message: string) => void;
}> = ({ onPasswordUpdated }) => {
  const [step, setStep] = useState<1 | 2>(1);
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [feedback, setFeedback] = useState<{
    type: 'ok' | 'err';
    text: string;
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      const found = findUserByEmail(email);
      if (!found) {
        setFeedback({
          type: 'err',
          text: 'No account found for that email.',
        });
        return;
      }
      setStep(2);
      setFeedback({
        type: 'ok',
        text: 'Account found. Choose a new password.',
      });
    } else {
      if (newPassword.length < 8) {
        setFeedback({
          type: 'err',
          text: 'Use a password with at least 8 characters.',
        });
        return;
      }
      await resetUserPassword(email, newPassword);
      onPasswordUpdated('Password updated. Please log in.');
    }
  };

  return (
    <section className="py-10">
      <div className="max-w-[1180px] mx-auto px-4 sm:px-6">
        <form
          onSubmit={handleSubmit}
          noValidate
          className="bg-[var(--surface)] border border-[var(--line)] rounded-[18px] p-6.5 shadow-[var(--shadow)] max-w-[560px] mx-auto"
        >
          <h1 className="text-[26px] font-bold mb-1.5 text-[var(--fg)]">
            Reset your password
          </h1>
          <p className="text-[12.5px] text-[var(--muted)]">
            This demo has no email service, so you can set a new password
            directly after confirming the account email.
          </p>

          <div className="grid gap-1.5 mt-3.5">
            <label htmlFor="fe" className="font-semibold text-[14px]">
              Account email
            </label>
            <input
              id="fe"
              type="email"
              autoComplete="email"
              disabled={step === 2}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full [font:inherit] text-[var(--fg)] bg-[var(--bg)] border-[1.5px] border-[var(--line)] rounded-[10px] px-3 py-2.5 min-h-[44px] focus:border-[var(--blue)] outline-none disabled:opacity-60"
            />
          </div>

          {step === 2 && (
            <div className="grid gap-1.5 mt-3.5">
              <label htmlFor="fp" className="font-semibold text-[14px]">
                New password
              </label>
              <input
                id="fp"
                type="password"
                autoComplete="new-password"
                placeholder="At least 8 characters"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                autoFocus
                className="w-full [font:inherit] text-[var(--fg)] bg-[var(--bg)] border-[1.5px] border-[var(--line)] rounded-[10px] px-3 py-2.5 min-h-[44px] focus:border-[var(--blue)] outline-none"
              />
            </div>
          )}

          {feedback && (
            <div
              role="alert"
              className={`mt-3.5 px-3 py-2.5 rounded-[10px] text-[14px] ${
                feedback.type === 'err'
                  ? 'bg-[color-mix(in_srgb,var(--err)_12%,transparent)] text-[var(--err)]'
                  : 'bg-[color-mix(in_srgb,var(--ok)_12%,transparent)] text-[var(--ok)]'
              }`}
            >
              {feedback.text}
            </div>
          )}

          <button
            type="submit"
            className="mt-4.5 w-full inline-flex items-center justify-center rounded-[10px] px-4.5 py-2.5 min-h-[44px] font-semibold bg-[var(--blue)] text-[var(--blue-ink)] cursor-pointer hover:-translate-y-px transition-transform"
          >
            {step === 1 ? 'Find account' : 'Set new password'}
          </button>

          <p className="mt-4 text-[14px] text-[var(--muted)]">
            <a href="#login" className="text-[var(--blue)] font-medium">
              Back to log in
            </a>
          </p>
        </form>
      </div>
    </section>
  );
};

export const ProfilePage: React.FC<{
  user: UserAccount;
  onSaveProfile: (updated: UserAccount) => void;
  onLogout: () => void;
  onNavigateCourses: (category: string) => void;
}> = ({ user, onSaveProfile, onLogout, onNavigateCourses }) => {
  const [name, setName] = useState(user.name);
  const [age, setAge] = useState(user.profile.age);
  const [qual, setQual] = useState(user.profile.qual);
  const [cur, setCur] = useState(user.profile.cur);
  const [interests, setInterests] = useState<string[]>(user.profile.interests);
  const [error, setError] = useState('');

  const recs = CAREERS.filter((c) =>
    c.interests.some((i) => user.profile.interests.includes(i))
  ).slice(0, 4);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const ageNum = Number(age);
    if (
      name.trim().length < 2 ||
      !age ||
      ageNum < 10 ||
      ageNum > 60 ||
      !qual ||
      !cur.trim()
    ) {
      setError(
        'Please complete name, a valid age, qualification and current class or degree.'
      );
      return;
    }
    const updated = updateUserProfile({ name, age, qual, cur, interests });
    if (updated) onSaveProfile(updated);
  };

  return (
    <>
      <PageHead
        title="Your profile"
        subtitle="Keep your details current so suggestions stay relevant."
      />
      <section className="py-13">
        <div className="max-w-[1180px] mx-auto px-4 sm:px-6 grid gap-5 grid-cols-1 lg:grid-cols-[300px_1fr]">
          <aside className="bg-[var(--surface)] border border-[var(--line)] rounded-2xl p-5 flex flex-col gap-2.5 self-start">
            <div className="w-18 h-18 rounded-full bg-[var(--purple)] text-white grid place-items-center font-[family-name:var(--f-head)] font-extrabold text-[28px]">
              {initials(user.name)}
            </div>
            <h3 className="text-[18px] font-bold text-[var(--fg)] mt-1.5">
              {user.name}
            </h3>
            <p className="text-[var(--muted)] text-[14px]">{user.email}</p>
            <div className="grid gap-1 text-[13.5px] text-[var(--muted)]">
              <div>
                <b className="text-[var(--fg)] font-semibold">Qualification:</b>{' '}
                {user.profile.qual || 'Not set'}
              </div>
              <div>
                <b className="text-[var(--fg)] font-semibold">Currently:</b>{' '}
                {user.profile.cur || 'Not set'}
              </div>
              <div>
                <b className="text-[var(--fg)] font-semibold">Age:</b>{' '}
                {user.profile.age || 'Not set'}
              </div>
              <div>
                <b className="text-[var(--fg)] font-semibold">Joined:</b>{' '}
                {new Date(user.created).toLocaleDateString('en-IN', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                })}
              </div>
            </div>
            <button
              type="button"
              onClick={onLogout}
              className="mt-2 inline-flex items-center justify-center rounded-[10px] px-4.5 py-2.5 min-h-[44px] font-semibold bg-[var(--surface2)] text-[var(--fg)] cursor-pointer hover:-translate-y-px transition-transform"
            >
              Log out
            </button>
          </aside>

          <div className="grid gap-4 min-w-0">
            <form
              onSubmit={handleSubmit}
              noValidate
              className="bg-[var(--surface)] border border-[var(--line)] rounded-[18px] p-6.5 shadow-[var(--shadow)]"
            >
              <h2 className="text-[26px] font-bold mb-1.5 text-[var(--fg)]">
                Edit profile
              </h2>
              <div className="grid gap-3.5 grid-cols-1 sm:grid-cols-2">
                <div className="grid gap-1.5 mt-3.5">
                  <label htmlFor="pn" className="font-semibold text-[14px]">
                    Full name
                  </label>
                  <input
                    id="pn"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full [font:inherit] text-[var(--fg)] bg-[var(--bg)] border-[1.5px] border-[var(--line)] rounded-[10px] px-3 py-2.5 min-h-[44px] focus:border-[var(--blue)] outline-none"
                  />
                </div>
                <div className="grid gap-1.5 mt-3.5">
                  <label htmlFor="pe" className="font-semibold text-[14px]">
                    Email
                  </label>
                  <input
                    id="pe"
                    type="email"
                    value={user.email}
                    disabled
                    className="w-full [font:inherit] text-[var(--fg)] bg-[var(--bg)] border-[1.5px] border-[var(--line)] rounded-[10px] px-3 py-2.5 min-h-[44px] opacity-60"
                  />
                </div>
              </div>

              <div className="grid gap-3.5 grid-cols-1 sm:grid-cols-2">
                <div className="grid gap-1.5 mt-3.5">
                  <label htmlFor="pa" className="font-semibold text-[14px]">
                    Age
                  </label>
                  <input
                    id="pa"
                    type="number"
                    min={10}
                    max={60}
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    className="w-full [font:inherit] text-[var(--fg)] bg-[var(--bg)] border-[1.5px] border-[var(--line)] rounded-[10px] px-3 py-2.5 min-h-[44px] focus:border-[var(--blue)] outline-none"
                  />
                </div>
                <div className="grid gap-1.5 mt-3.5">
                  <label htmlFor="pq" className="font-semibold text-[14px]">
                    Education qualification
                  </label>
                  <select
                    id="pq"
                    value={qual}
                    onChange={(e) => setQual(e.target.value)}
                    className="w-full [font:inherit] text-[var(--fg)] bg-[var(--bg)] border-[1.5px] border-[var(--line)] rounded-[10px] px-3 py-2.5 min-h-[44px] focus:border-[var(--blue)] outline-none"
                  >
                    <option value="">Choose one</option>
                    {QUALS.map((q) => (
                      <option key={q} value={q}>
                        {q}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid gap-1.5 mt-3.5">
                <label htmlFor="pcur" className="font-semibold text-[14px]">
                  Current class or degree
                </label>
                <input
                  id="pcur"
                  type="text"
                  value={cur}
                  onChange={(e) => setCur(e.target.value)}
                  className="w-full [font:inherit] text-[var(--fg)] bg-[var(--bg)] border-[1.5px] border-[var(--line)] rounded-[10px] px-3 py-2.5 min-h-[44px] focus:border-[var(--blue)] outline-none"
                />
              </div>

              <div className="grid gap-1.5 mt-3.5">
                <span className="font-semibold text-[14px]">
                  Academic interests
                </span>
                <InterestCheckboxes
                  selected={interests}
                  onChange={setInterests}
                />
              </div>

              {error && (
                <div
                  role="alert"
                  className="mt-3.5 px-3 py-2.5 rounded-[10px] text-[14px] bg-[color-mix(in_srgb,var(--err)_12%,transparent)] text-[var(--err)]"
                >
                  {error}
                </div>
              )}

              <button
                type="submit"
                className="mt-4.5 inline-flex items-center justify-center rounded-[10px] px-4.5 py-2.5 min-h-[44px] font-semibold bg-[var(--blue)] text-[var(--blue-ink)] cursor-pointer hover:-translate-y-px transition-transform"
              >
                Save changes
              </button>
            </form>

            <div className="bg-[var(--surface)] border border-[var(--line)] rounded-[18px] p-6.5 shadow-[var(--shadow)]">
              <div className="flex items-center justify-between gap-3 flex-wrap">
                <h2 className="text-[26px] font-bold text-[var(--fg)]">
                  Saved Career Quiz Results
                </h2>
                <a
                  href="#quiz"
                  className="inline-flex items-center justify-center min-h-[38px] px-3.5 py-1.5 rounded-[10px] text-[13.5px] font-semibold border-[1.5px] border-[var(--blue)] text-[var(--blue)] no-underline hover:bg-[var(--blue-soft)] transition-colors"
                >
                  {user.quizResult ? 'Retake Quiz' : 'Take Career Quiz'}
                </a>
              </div>
              {user.quizResult ? (
                <div className="mt-3.5 grid gap-3">
                  <p className="text-[13px] text-[var(--muted)]">
                    Saved on{' '}
                    {new Date(user.quizResult.takenAt).toLocaleDateString(
                      'en-IN',
                      { day: 'numeric', month: 'short', year: 'numeric' }
                    )}{' '}
                    · Stage: {user.quizResult.stageLabel}
                  </p>
                  <div className="grid gap-3 grid-cols-1 md:grid-cols-3">
                    {user.quizResult.recommendations.map((rec, idx) => (
                      <div
                        key={rec.name}
                        className="bg-[var(--bg)] border border-[var(--line)] rounded-xl p-4 flex flex-col gap-2"
                      >
                        <div className="flex items-center justify-between gap-2 text-[12.5px] font-bold">
                          <span className="text-[var(--purple)]">
                            #{idx + 1} · {rec.field}
                          </span>
                          <span className="text-[var(--blue)] tabular-nums">
                            {rec.matchPercent}%
                          </span>
                        </div>
                        <h3 className="text-[17px] font-bold text-[var(--fg)]">
                          {rec.name}
                        </h3>
                        <p className="text-[13px] text-[var(--muted)] leading-snug">
                          {rec.reason}
                        </p>
                        <button
                          type="button"
                          onClick={() => onNavigateCourses(rec.courseFilterCat)}
                          className="mt-auto text-left text-[13px] font-semibold text-[var(--blue)] hover:underline cursor-pointer bg-transparent border-0 p-0"
                        >
                          View matching courses →
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <p className="text-[13.5px] text-[var(--muted)] mt-2">
                  You haven&apos;t saved a Career Quiz result yet. Complete the
                  7-question quiz to save your Top 3 recommended career paths
                  here.
                </p>
              )}
            </div>

            <div className="bg-[var(--surface)] border border-[var(--line)] rounded-[18px] p-6.5 shadow-[var(--shadow)]">
              <h2 className="text-[26px] font-bold mb-1.5 text-[var(--fg)]">
                Suggested for you
              </h2>
              {recs.length > 0 ? (
                <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 mt-3.5">
                  {recs.map((c) => (
                    <CareerCard key={c.name} career={c} />
                  ))}
                </div>
              ) : (
                <p className="text-[12.5px] text-[var(--muted)] mt-2">
                  Pick a few interests above and save to see matching careers
                  here.
                </p>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
