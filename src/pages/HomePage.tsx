import React, { useState } from 'react';
import { ArrowRight, Compass } from 'lucide-react';
import {
  CAREERS,
  COLLEGES,
  COURSES,
  FAQS,
  SCHOLARS,
  STORIES,
  getExamById,
} from '../data/portalData';
import {
  CareerCard,
  CollegeCard,
  CourseCard,
  ExamCard,
  ScholarshipCard,
  SectionHead,
} from '../components/Cards';
import { UserAccount, initials } from '../utils/auth';

interface HomePageProps {
  user: UserAccount | null;
  onHeroSearch: (query: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ user, onHeroSearch }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onHeroSearch(query);
  };

  return (
    <>
      <section className="bg-[var(--hero)] text-[var(--hero-fg)] overflow-hidden">
        <div className="max-w-[1180px] mx-auto px-4 sm:px-6 grid gap-7 grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] items-center py-11 lg:py-16 hero-animate">
          <div>
            <h1 className="text-[clamp(32px,5.2vw,54px)] font-extrabold tracking-[-0.02em]">
              Discover Your Future,{' '}
              <em className="not-italic text-[#b9a2ff]">Shape Your Career</em>
            </h1>
            <p className="text-[var(--hero-muted)] text-[17px] mt-4 max-w-[54ch]">
              Choosing a stream, course or college shapes the next ten years.
              Disha puts careers, courses, colleges, entrance exams and
              scholarships side by side so you can decide with facts, not
              guesswork.
            </p>
            <form
              onSubmit={handleSubmit}
              role="search"
              className="flex gap-2 mt-6 bg-white rounded-[14px] p-1.5 max-w-[560px] shadow-[0_10px_30px_rgba(0,0,0,0.25)]"
            >
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search careers or courses, e.g. data, MBBS, law"
                aria-label="Search careers and courses"
                className="flex-1 min-w-0 border-0 bg-transparent px-3 py-2.5 text-[#141a38] placeholder-[#6b7399] outline-none text-[15px]"
              />
              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-[10px] px-4.5 py-2.5 min-h-[44px] font-semibold bg-[#2c58e8] text-white cursor-pointer hover:-translate-y-px transition-transform shrink-0"
              >
                Search
              </button>
            </form>
            <div className="flex gap-2.5 flex-wrap mt-4.5">
              <a
                href={user ? '#profile' : '#register'}
                className="inline-flex items-center justify-center rounded-[10px] px-4.5 py-2.5 min-h-[44px] font-semibold bg-[var(--purple)] text-white no-underline hover:-translate-y-px transition-transform"
              >
                Get Started
              </a>
              <a
                href="#careers"
                className="inline-flex items-center justify-center rounded-[10px] px-4.5 py-2.5 min-h-[44px] font-semibold bg-white/12 text-white border-[1.5px] border-white/35 no-underline hover:-translate-y-px transition-transform"
              >
                Explore Careers
              </a>
            </div>
            <div className="mt-4.5 text-[var(--hero-muted)] text-[13px] flex gap-2 flex-wrap items-center">
              <span>Popular:</span>
              {['software', 'doctor', 'law', 'design'].map((term) => (
                <button
                  key={term}
                  type="button"
                  onClick={() => onHeroSearch(term)}
                  className="bg-white/10 hover:bg-white/20 text-white border border-white/22 rounded-full px-3 py-1 text-[13px] cursor-pointer capitalize transition-colors"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>

          <svg
            className="w-full h-auto max-w-[480px] justify-self-center"
            viewBox="0 0 480 400"
            role="img"
            aria-label="A winding path from self-discovery, to choosing a course, to picking a career and reaching a goal"
          >
            <circle cx="270" cy="210" r="170" fill="#7a4ee0" opacity=".28" />
            <circle cx="270" cy="210" r="118" fill="#2c58e8" opacity=".28" />
            <path
              d="M60 340C170 340 110 250 220 240S340 190 300 120S390 70 420 62"
              fill="none"
              stroke="#ffffff"
              strokeWidth="5"
              strokeLinecap="round"
              strokeDasharray="2 13"
              opacity=".9"
            />
            <circle cx="60" cy="340" r="15" fill="#fff" />
            <circle cx="60" cy="340" r="6" fill="#2c58e8" />
            <text
              x="84"
              y="345"
              fill="#fff"
              fontSize="14"
              fontWeight="600"
              fontFamily="Plus Jakarta Sans, sans-serif"
            >
              Know yourself
            </text>
            <circle cx="220" cy="240" r="15" fill="#fff" />
            <circle cx="220" cy="240" r="6" fill="#7a4ee0" />
            <text
              x="244"
              y="262"
              fill="#fff"
              fontSize="14"
              fontWeight="600"
              fontFamily="Plus Jakarta Sans, sans-serif"
            >
              Choose a course
            </text>
            <circle cx="300" cy="120" r="15" fill="#fff" />
            <circle cx="300" cy="120" r="6" fill="#2c58e8" />
            <text
              x="278"
              y="126"
              textAnchor="end"
              fill="#fff"
              fontSize="14"
              fontWeight="600"
              fontFamily="Plus Jakarta Sans, sans-serif"
            >
              Pick a career
            </text>
            <path
              d="M420 62V22"
              stroke="#fff"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <path d="M420 22l38 12l-38 12z" fill="#c9b6ff" />
            <circle cx="420" cy="62" r="7" fill="#fff" />
            <text
              x="420"
              y="92"
              textAnchor="middle"
              fill="#fff"
              fontSize="13"
              fontWeight="600"
              fontFamily="Plus Jakarta Sans, sans-serif"
            >
              Your goal
            </text>
            <polygon points="100,170 148,150 196,170 148,190" fill="#fff" />
            <path
              d="M122 180v20c0 10 52 10 52 0v-20"
              fill="#c9b6ff"
            />
            <path
              d="M190 172v26"
              stroke="#fff"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <circle cx="190" cy="202" r="4" fill="#fff" />
          </svg>
        </div>
      </section>

      {/* Career Quiz Call-to-Action Card */}
      <section className="pt-10 pb-2">
        <div className="max-w-[1180px] mx-auto px-4 sm:px-6">
          <div className="bg-[var(--surface)] border border-[var(--line)] rounded-2xl p-6 sm:p-7 shadow-[var(--shadow)] flex flex-col md:flex-row md:items-center justify-between gap-5">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-[var(--blue-soft)] text-[var(--blue)] grid place-items-center shrink-0">
                <Compass size={24} />
              </div>
              <div>
                <h2 className="text-[20px] sm:text-[22px] font-bold text-[var(--fg)]">
                  Not sure which career fits you best?
                </h2>
                <p className="text-[var(--muted)] text-[14.5px] mt-1 max-w-[60ch]">
                  Take our 7-question Career Quiz to match your education stage,
                  favorite subjects, and work style with your top 3 recommended
                  careers, courses, and entrance exams.
                </p>
              </div>
            </div>
            <a
              href="#quiz"
              className="inline-flex items-center justify-center gap-2 rounded-[10px] px-5 py-2.5 min-h-[44px] font-semibold bg-[var(--blue)] text-[var(--blue-ink)] no-underline hover:-translate-y-px hover:shadow-[0_6px_16px_rgba(44,88,232,0.3)] transition-all whitespace-nowrap shrink-0"
            >
              Take the Career Quiz
              <ArrowRight size={17} />
            </a>
          </div>
        </div>
      </section>

      <section className="py-13">
        <div className="max-w-[1180px] mx-auto px-4 sm:px-6">
          <SectionHead
            title="Popular career options"
            subtitle="Roles students ask about most, with the route to get there."
            link={{ href: '#careers', label: 'All careers' }}
          />
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {CAREERS.slice(0, 6).map((c) => (
              <CareerCard key={c.name} career={c} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-13 bg-[var(--surface2)]">
        <div className="max-w-[1180px] mx-auto px-4 sm:px-6">
          <SectionHead
            title="Trending courses"
            subtitle="Undergraduate programmes with clear eligibility and entrance routes."
            link={{ href: '#courses', label: 'All courses' }}
          />
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {[0, 1, 3, 6].map((idx) => (
              <CourseCard key={COURSES[idx].name} course={COURSES[idx]} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-13">
        <div className="max-w-[1180px] mx-auto px-4 sm:px-6">
          <SectionHead
            title="Top colleges"
            subtitle="Well-known institutions and how students get in."
            link={{ href: '#colleges', label: 'All colleges' }}
          />
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {COLLEGES.slice(0, 4).map((c) => (
              <CollegeCard key={c.name} college={c} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-13 bg-[var(--surface2)]">
        <div className="max-w-[1180px] mx-auto px-4 sm:px-6">
          <SectionHead
            title="Latest scholarships"
            subtitle="Funding schemes to check before you finalise your plan."
            link={{ href: '#scholarships', label: 'All scholarships' }}
          />
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {SCHOLARS.slice(0, 3).map((s) => (
              <ScholarshipCard key={s.name} scholarship={s} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-13">
        <div className="max-w-[1180px] mx-auto px-4 sm:px-6">
          <SectionHead
            title="Upcoming entrance examinations"
            subtitle="Usual windows shown below. Dates change every year, so confirm on the official site."
            link={{ href: '#exams', label: 'All exams' }}
          />
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {['clat', 'jee-main', 'uceed', 'gate'].map((id) => {
              const ex = getExamById(id);
              return ex ? <ExamCard key={id} exam={ex} /> : null;
            })}
          </div>
        </div>
      </section>

      <section className="py-13 bg-[var(--surface2)]">
        <div className="max-w-[1180px] mx-auto px-4 sm:px-6">
          <SectionHead title="How it works" />
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                n: 1,
                t: 'Create your profile',
                d: 'Tell us your class, qualification and interests. It takes about two minutes.',
              },
              {
                n: 2,
                t: 'Explore options',
                d: 'Browse careers, courses and colleges, or ask the AI Career Assistant.',
              },
              {
                n: 3,
                t: 'Check the route',
                d: 'See which entrance exams, eligibility and scholarships match each option.',
              },
              {
                n: 4,
                t: 'Plan and apply',
                d: 'Note the exam windows, prepare, and confirm details on official sites.',
              },
            ].map((s) => (
              <div
                key={s.n}
                className="bg-[var(--surface)] border border-[var(--line)] rounded-2xl p-5"
              >
                <div className="w-8.5 h-8.5 rounded-full bg-[var(--purple)] text-white grid place-items-center font-[family-name:var(--f-head)] font-bold text-[15px] mb-3">
                  {s.n}
                </div>
                <h3 className="text-[18px] font-bold text-[var(--fg)]">
                  {s.t}
                </h3>
                <p className="text-[var(--muted)] text-[14px] mt-1.5">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-13">
        <div className="max-w-[1180px] mx-auto px-4 sm:px-6">
          <SectionHead
            title="Student success stories"
            subtitle="Illustrative examples of how students use the portal."
          />
          <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
            {STORIES.map((s) => (
              <article
                key={s.n}
                className="bg-[var(--surface)] border border-[var(--line)] rounded-2xl p-5 flex flex-col gap-3"
              >
                <q className="text-[15px] [quotes:none] text-[var(--fg)]">
                  {s.q}
                </q>
                <div className="flex gap-2.5 items-center mt-auto">
                  <div className="w-9.5 h-9.5 rounded-full bg-[var(--purple)] text-white grid place-items-center font-bold shrink-0">
                    {initials(s.n)}
                  </div>
                  <div>
                    <b className="text-[var(--fg)] block text-[14.5px]">
                      {s.n}
                    </b>
                    <small className="text-[var(--muted)] block text-[12.5px]">
                      {s.r}
                    </small>
                  </div>
                </div>
              </article>
            ))}
          </div>
          <p className="text-[12.5px] text-[var(--muted)] mt-3">
            These are sample profiles written for this demo, not real
            testimonials.
          </p>
        </div>
      </section>

      <section className="py-13 bg-[var(--surface2)]">
        <div className="max-w-[1180px] mx-auto px-4 sm:px-6">
          <SectionHead title="Frequently asked questions" />
          <div className="grid gap-2.5 max-w-[820px]">
            {FAQS.map((f) => (
              <details
                key={f.q}
                className="bg-[var(--surface)] border border-[var(--line)] rounded-xl px-4.5 py-3.5"
              >
                <summary className="font-semibold cursor-pointer text-[var(--fg)]">
                  {f.q}
                </summary>
                <p className="text-[var(--muted)] mt-2">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};
