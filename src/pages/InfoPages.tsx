import React, { useState } from 'react';
import { PageHead } from '../components/Cards';
import { EMAIL_REGEX, saveContactMessage } from '../utils/auth';

export const AboutPage: React.FC = () => (
  <>
    <PageHead
      title="About Us"
      subtitle="Our goal is simple: every student should be able to see the whole map before choosing a road."
    />
    <section className="py-13">
      <div className="max-w-[1180px] mx-auto px-4 sm:px-6 grid gap-5 grid-cols-1 md:grid-cols-2">
        <div>
          <h2 className="text-[26px] font-bold text-[var(--fg)]">What we do</h2>
          <p className="mt-2.5 text-[var(--muted)]">
            Career choices are often made with half the facts: a relative&apos;s
            advice, a friend&apos;s plan, a coaching brochure. Disha gathers the
            essentials in one place. You can see what a career involves, which
            courses lead to it, which colleges teach it, which exam opens the
            door and which scholarship may help pay for it.
          </p>
          <p className="mt-3 text-[var(--muted)]">
            We keep the language plain, name the official bodies behind every
            exam, and remind you to confirm dates and fees at the source.
          </p>
        </div>
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
          {[
            ['Clear', 'No jargon, no hype'],
            ['Current', 'Check-the-source reminders'],
            ['Inclusive', 'Scholarships for every background'],
            ['Practical', 'Routes with real exams'],
          ].map(([title, sub]) => (
            <div
              key={title}
              className="bg-[var(--surface)] border border-[var(--line)] rounded-2xl p-5 flex flex-col gap-2"
            >
              <h3 className="text-[18px] font-bold text-[var(--fg)]">
                {title}
              </h3>
              <p className="text-[var(--muted)] text-[14px]">{sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  </>
);

export const ContactPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [feedback, setFeedback] = useState<{
    type: 'ok' | 'err';
    text: string;
  } | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const n = name.trim();
    const em = email.trim();
    const t = message.trim();
    if (!n || !EMAIL_REGEX.test(em) || t.length < 5) {
      setFeedback({
        type: 'err',
        text: 'Please enter your name, a valid email and a short message.',
      });
      return;
    }
    saveContactMessage({ n, e: em, t, at: Date.now() });
    setFeedback({
      type: 'ok',
      text: `Thanks, ${n}. Your message is saved in this browser.`,
    });
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <>
      <PageHead
        title="Contact us"
        subtitle="Questions, corrections or ideas? Send us a note."
      />
      <section className="py-13">
        <div className="max-w-[1180px] mx-auto px-4 sm:px-6 grid gap-5 grid-cols-1 md:grid-cols-2">
          <form
            onSubmit={handleSubmit}
            noValidate
            className="bg-[var(--surface)] border border-[var(--line)] rounded-[18px] p-6.5 shadow-[var(--shadow)]"
          >
            <h2 className="text-[26px] font-bold mb-1.5 text-[var(--fg)]">
              Send a message
            </h2>
            <div className="grid gap-1.5 mt-3.5">
              <label htmlFor="cn" className="font-semibold text-[14px]">
                Your name
              </label>
              <input
                id="cn"
                type="text"
                autoComplete="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full [font:inherit] text-[var(--fg)] bg-[var(--bg)] border-[1.5px] border-[var(--line)] rounded-[10px] px-3 py-2.5 min-h-[44px] focus:border-[var(--blue)] outline-none"
              />
            </div>
            <div className="grid gap-1.5 mt-3.5">
              <label htmlFor="ce" className="font-semibold text-[14px]">
                Email
              </label>
              <input
                id="ce"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full [font:inherit] text-[var(--fg)] bg-[var(--bg)] border-[1.5px] border-[var(--line)] rounded-[10px] px-3 py-2.5 min-h-[44px] focus:border-[var(--blue)] outline-none"
              />
            </div>
            <div className="grid gap-1.5 mt-3.5">
              <label htmlFor="cm" className="font-semibold text-[14px]">
                Message
              </label>
              <textarea
                id="cm"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full font-inherit text-[var(--fg)] bg-[var(--bg)] border-[1.5px] border-[var(--line)] rounded-[10px] px-3 py-2.5 min-h-[110px] resize-y focus:border-[var(--blue)] outline-none"
              />
            </div>
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
              className="mt-4 inline-flex items-center justify-center rounded-[10px] px-4.5 py-2.5 min-h-[44px] font-semibold bg-[var(--blue)] text-[var(--blue-ink)] cursor-pointer hover:-translate-y-px transition-transform"
            >
              Send message
            </button>
            <p className="text-[12.5px] text-[var(--muted)] mt-2.5">
              This demo has no mail server, so messages stay in this browser
              only.
            </p>
          </form>

          <div className="bg-[var(--surface)] border border-[var(--line)] rounded-2xl p-5 flex flex-col gap-3 self-start">
            <h3 className="text-[18px] font-bold text-[var(--fg)]">Reach us</h3>
            <div className="grid gap-1 text-[13.5px] text-[var(--muted)]">
              <div>
                <b className="text-[var(--fg)] font-semibold">Email:</b>{' '}
                hello@disha.example
              </div>
              <div>
                <b className="text-[var(--fg)] font-semibold">Phone:</b> +91
                00000 00000
              </div>
              <div>
                <b className="text-[var(--fg)] font-semibold">Hours:</b> Mon to
                Sat, 10 am to 6 pm IST
              </div>
            </div>
            <p className="text-[12.5px] text-[var(--muted)]">
              Contact details are placeholders. Replace them with your own
              before launch.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};
