import React, { useEffect, useRef, useState } from 'react';
import { PageHead } from '../components/Cards';
import {
  AssistantMessage,
  generateAssistantReply,
} from '../utils/assistant';

const PROMPTS = [
  'I like biology and helping people',
  'I enjoy drawing and technology',
  'Tell me about NEET',
  'Scholarships for girls in engineering',
  'I want to join the army',
  'I am good at maths and coding',
];

export const AssistantPage: React.FC = () => {
  const [messages, setMessages] = useState<AssistantMessage[]>([
    {
      role: 'bot',
      text: "Hi, I'm the Disha assistant. Tell me what you enjoy studying or the kind of work you picture yourself doing, and I'll suggest careers and the exams that lead to them.",
    },
  ]);
  const [input, setInput] = useState('');
  const logRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (logRef.current) {
      logRef.current.scrollTop = logRef.current.scrollHeight;
    }
  }, [messages]);

  const ask = (raw: string) => {
    const text = raw.trim();
    if (!text) return;
    setMessages((prev) => [...prev, { role: 'me', text }]);
    setTimeout(() => {
      setMessages((prev) => [...prev, generateAssistantReply(text)]);
    }, 280);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    ask(input);
    setInput('');
  };

  return (
    <>
      <PageHead
        title="AI Career Assistant"
        subtitle="Describe your interests, subjects or goals. The assistant suggests careers, exams and scholarships from the portal."
      />
      <section className="py-13">
        <div className="max-w-[1180px] mx-auto px-4 sm:px-6">
          <div className="grid gap-4 grid-cols-1 lg:grid-cols-[1fr_300px]">
            <div>
              <div
                ref={logRef}
                aria-live="polite"
                className="bg-[var(--surface)] border border-[var(--line)] rounded-2xl p-4 h-[440px] overflow-y-auto flex flex-col gap-3"
              >
                {messages.map((m, i) => (
                  <div
                    key={i}
                    className={`max-w-[88%] px-3.5 py-2.5 rounded-[14px] text-[14.5px] break-words ${
                      m.role === 'me'
                        ? 'bg-[var(--blue)] text-[var(--blue-ink)] self-end rounded-br-[4px]'
                        : 'bg-[var(--surface2)] text-[var(--fg)] self-start rounded-bl-[4px]'
                    }`}
                  >
                    {m.boldTitle && (
                      <>
                        <b>{m.boldTitle}</b>
                        {m.subtitle}
                      </>
                    )}
                    {m.text && <span>{m.text}</span>}
                    {m.bullets && (
                      <ul className="mt-1.5 pl-4.5 list-disc space-y-1">
                        {m.bullets.map((b, j) => (
                          <li key={j}>
                            {b.label && <b>{b.label} </b>}
                            {b.text}
                          </li>
                        ))}
                      </ul>
                    )}
                    {(m.afterText || m.link) && (
                      <div className="mt-2">
                        {m.afterText}
                        {m.link && (
                          <a
                            href={m.link.href}
                            className="text-[var(--blue)] font-medium underline"
                          >
                            {m.link.label}
                          </a>
                        )}
                        .
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <form onSubmit={handleSubmit} className="flex gap-2 mt-3">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="e.g. I like maths and coding. What should I do after 12th?"
                  aria-label="Your question"
                  autoComplete="off"
                  className="flex-1 min-w-0 [font:inherit] text-[var(--fg)] bg-[var(--bg)] border-[1.5px] border-[var(--line)] rounded-[10px] px-3 py-2.5 min-h-[44px] focus:border-[var(--blue)] outline-none"
                />
                <button
                  type="submit"
                  className="inline-flex items-center justify-center rounded-[10px] px-4.5 py-2.5 min-h-[44px] font-semibold bg-[var(--blue)] text-[var(--blue-ink)] cursor-pointer hover:-translate-y-px transition-transform shrink-0"
                >
                  Send
                </button>
              </form>
              <p className="text-[12.5px] text-[var(--muted)] mt-2">
                Rule-based guidance from the data on this site. It does not
                replace a career counsellor.
              </p>
            </div>
            <aside className="bg-[var(--surface)] border border-[var(--line)] rounded-2xl p-5 flex flex-col gap-3 self-start">
              <h3 className="text-[18px] font-bold text-[var(--fg)]">
                Try asking
              </h3>
              <div className="flex flex-col gap-2">
                {PROMPTS.map((q) => (
                  <button
                    key={q}
                    type="button"
                    onClick={() => ask(q)}
                    className="border border-[var(--line)] bg-[var(--surface)] text-[var(--fg)] hover:bg-[var(--surface2)] rounded-xl px-3.5 py-2 text-[13.5px] text-left cursor-pointer transition-colors"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
};
