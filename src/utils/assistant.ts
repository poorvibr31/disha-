import { CAREERS, EXAMS, SCHOLARS, getExamById } from '../data/portalData';

export type AssistantMessage = {
  role: 'bot' | 'me';
  text?: string;
  boldTitle?: string;
  subtitle?: string;
  bullets?: { label?: string; text: string }[];
  afterText?: string;
  link?: { href: string; label: string };
};

export function generateAssistantReply(msg: string): AssistantMessage {
  const m = msg.toLowerCase();
  const tokens: string[] = m.match(/[a-z]+/g) || [];

  const hit = (kw: string) =>
    kw.includes(' ')
      ? m.includes(kw)
      : tokens.some(
          (t) => t === kw || (kw.length >= 4 && t.startsWith(kw))
        );

  const matchedExams = EXAMS.filter(
    (e) =>
      tokens.includes(e.id.replace('-main', '')) ||
      tokens.includes(e.id) ||
      (e.id === 'upsc' && tokens.includes('ias'))
  );

  if (matchedExams.length > 0) {
    const e = matchedExams[0];
    return {
      role: 'bot',
      boldTitle: e.name,
      subtitle: ` (${e.full})`,
      bullets: [
        { label: 'For:', text: e.for },
        { label: 'Eligibility:', text: e.elig },
        { label: 'Conducted by:', text: e.body },
        { label: 'Usual window:', text: e.win },
      ],
      afterText: 'Confirm current dates on the official website. See ',
      link: { href: '#exams', label: 'all exams' },
    };
  }

  if (hit('scholarship') || hit('fees') || hit('funding')) {
    const filtered = SCHOLARS.filter((x) =>
      hit('girl') || hit('women') ? /Pragati|National|State/.test(x.name) : true
    ).slice(0, 4);

    return {
      role: 'bot',
      text: 'Here are schemes worth checking:',
      bullets: filtered.map((x) => ({
        label: `${x.name}:`,
        text: x.who,
      })),
      afterText: 'Open ',
      link: { href: '#scholarships', label: 'Scholarships' },
    };
  }

  const scored = CAREERS.map((c) => ({
    c,
    s:
      c.kw.filter(hit).length +
      c.interests.filter((i) => m.includes(i.toLowerCase().split(' ')[0])).length,
  }))
    .filter((x) => x.s > 0)
    .sort((a, b) => b.s - a.s)
    .slice(0, 3);

  if (scored.length > 0) {
    return {
      role: 'bot',
      text: 'From what you described, these are worth exploring:',
      bullets: scored.map(({ c }) => {
        const examNames = c.exams
          .map((id) => getExamById(id)?.name)
          .filter(Boolean)
          .join(', ');
        return {
          label: `${c.name}:`,
          text: c.path + (examNames ? ` (exams: ${examNames})` : ''),
        };
      }),
      afterText: 'See more on ',
      link: { href: '#careers', label: 'Explore Careers' },
    };
  }

  if (
    hit('12th') ||
    hit('class 12') ||
    hit('after 10') ||
    hit('stream')
  ) {
    return {
      role: 'bot',
      text: "A simple way to choose: Science (PCM) leads to engineering and technology, Science (PCB) to medicine and life sciences, Commerce to finance and management, and Arts/Humanities to law, civil services, design and teaching. Tell me which subjects you enjoy most and I'll narrow it down.",
    };
  }

  return {
    role: 'bot',
    text: "I couldn't match that to a career yet. Try mentioning a subject (maths, biology, art), an activity (coding, debating, drawing) or a goal (doctor, lawyer, army), or ask about an exam like NEET, JEE Main or CLAT.",
  };
}
