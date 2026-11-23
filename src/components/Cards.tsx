import React from 'react';
import {
  Career,
  College,
  Course,
  Exam,
  Scholarship,
  getExamById,
} from '../data/portalData';

export const SectionHead: React.FC<{
  title: string;
  subtitle?: string;
  link?: { href: string; label: string };
}> = ({ title, subtitle, link }) => (
  <div className="flex justify-between items-end gap-3 flex-wrap mb-6">
    <div>
      <h2 className="text-[clamp(24px,3.4vw,32px)] font-bold tracking-[-0.01em] text-[var(--fg)]">
        {title}
      </h2>
      {subtitle && (
        <p className="text-[var(--muted)] mt-1.5 max-w-[60ch]">{subtitle}</p>
      )}
    </div>
    {link && (
      <a
        href={link.href}
        className="inline-flex items-center justify-center min-h-[38px] px-3.5 py-1.5 rounded-[10px] text-[14px] font-semibold border-[1.5px] border-[var(--blue)] text-[var(--blue)] no-underline hover:-translate-y-px transition-transform whitespace-nowrap shrink-0"
      >
        {link.label}
      </a>
    )}
  </div>
);

export const PageHead: React.FC<{ title: string; subtitle: string }> = ({
  title,
  subtitle,
}) => (
  <section className="bg-[var(--hero)] text-white py-9">
    <div className="max-w-[1180px] mx-auto px-4 sm:px-6">
      <h1 className="text-[clamp(26px,4vw,38px)] font-extrabold">{title}</h1>
      <p className="text-[var(--hero-muted)] mt-2 max-w-[62ch]">{subtitle}</p>
    </div>
  </section>
);

const ExamLine: React.FC<{ ids: string[] }> = ({ ids }) => {
  const names = ids
    .map((id) => getExamById(id)?.name)
    .filter((n): n is string => Boolean(n));
  if (names.length === 0) return null;
  return (
    <div className="text-[13px] font-semibold text-[var(--blue)]">
      {names.join(' · ')}
    </div>
  );
};

export const CareerCard: React.FC<{ career: Career }> = ({ career }) => (
  <article className="bg-[var(--surface)] border border-[var(--line)] rounded-2xl p-5 flex flex-col gap-2.5 min-w-0 transition-all duration-200 hover:-translate-y-[3px] hover:shadow-[var(--shadow)]">
    <div className="flex items-center justify-between gap-2.5">
      <div className="w-11 h-11 rounded-xl grid place-items-center font-[family-name:var(--f-head)] font-extrabold text-[17px] bg-[var(--blue-soft)] text-[var(--blue)] shrink-0">
        {career.name[0]}
      </div>
      <span className="text-[12.5px] font-semibold text-[var(--purple)] whitespace-nowrap">
        {career.field}
      </span>
    </div>
    <h3 className="text-[18px] font-bold text-[var(--fg)]">{career.name}</h3>
    <p className="text-[var(--muted)] text-[14px]">{career.blurb}</p>
    <details className="border-t border-[var(--line)] pt-2 text-[13.5px] mt-auto group">
      <summary className="cursor-pointer text-[var(--blue)] font-semibold list-none select-none">
        See the path
      </summary>
      <div className="grid gap-1 text-[13.5px] text-[var(--muted)] mt-1.5">
        <div>
          <b className="text-[var(--fg)] font-semibold">Path:</b> {career.path}
        </div>
        <div>
          <b className="text-[var(--fg)] font-semibold">Skills:</b>{' '}
          {career.skills.join(', ')}
        </div>
        {career.exams.length > 0 ? (
          <div className="pt-1">
            <ExamLine ids={career.exams} />
          </div>
        ) : (
          <div>No single entrance exam; see the path above.</div>
        )}
      </div>
    </details>
  </article>
);

export const CourseCard: React.FC<{ course: Course }> = ({ course }) => (
  <article className="bg-[var(--surface)] border border-[var(--line)] rounded-2xl p-5 flex flex-col gap-2.5 min-w-0 transition-all duration-200 hover:-translate-y-[3px] hover:shadow-[var(--shadow)]">
    <div className="flex items-center justify-between gap-2.5">
      <div className="w-11 h-11 rounded-xl grid place-items-center font-[family-name:var(--f-head)] font-extrabold text-[17px] bg-[var(--purple-soft)] text-[var(--purple)] shrink-0">
        {course.name[0]}
      </div>
      <span className="text-[12.5px] font-semibold text-[var(--purple)] whitespace-nowrap">
        {course.field}
      </span>
    </div>
    <h3 className="text-[18px] font-bold text-[var(--fg)]">{course.name}</h3>
    <p className="text-[var(--muted)] text-[14px]">{course.blurb}</p>
    <div className="grid gap-1 text-[13.5px] text-[var(--muted)]">
      <div>
        <b className="text-[var(--fg)] font-semibold">Duration:</b> {course.dur}
      </div>
      <div>
        <b className="text-[var(--fg)] font-semibold">Eligibility:</b>{' '}
        {course.elig}
      </div>
    </div>
    {course.exams.length > 0 && (
      <div className="mt-auto pt-1">
        <ExamLine ids={course.exams} />
      </div>
    )}
  </article>
);

export const CollegeCard: React.FC<{ college: College }> = ({ college }) => (
  <article className="bg-[var(--surface)] border border-[var(--line)] rounded-2xl p-5 flex flex-col gap-2.5 min-w-0 transition-all duration-200 hover:-translate-y-[3px] hover:shadow-[var(--shadow)]">
    <div className="flex items-center justify-between gap-2.5">
      <div className="w-11 h-11 rounded-xl grid place-items-center font-[family-name:var(--f-head)] font-extrabold text-[17px] bg-[var(--blue-soft)] text-[var(--blue)] shrink-0">
        {college.name[0]}
      </div>
      <span className="text-[12.5px] font-semibold text-[var(--purple)] whitespace-nowrap">
        {college.field}
      </span>
    </div>
    <h3 className="text-[18px] font-bold text-[var(--fg)]">{college.name}</h3>
    <p className="text-[var(--muted)] text-[14px]">{college.blurb}</p>
    <div className="grid gap-1 text-[13.5px] text-[var(--muted)] mt-auto">
      <div>
        <b className="text-[var(--fg)] font-semibold">Location:</b>{' '}
        {college.city}
      </div>
      <div>
        <b className="text-[var(--fg)] font-semibold">Type:</b> {college.type}
      </div>
      <div>
        <b className="text-[var(--fg)] font-semibold">Admission:</b>{' '}
        {college.via}
      </div>
    </div>
  </article>
);

export const ScholarshipCard: React.FC<{ scholarship: Scholarship }> = ({
  scholarship,
}) => (
  <article className="bg-[var(--surface)] border border-[var(--line)] rounded-2xl p-5 flex flex-col gap-2.5 min-w-0 transition-all duration-200 hover:-translate-y-[3px] hover:shadow-[var(--shadow)]">
    <div className="w-11 h-11 rounded-xl grid place-items-center font-[family-name:var(--f-head)] font-extrabold text-[17px] bg-[var(--purple-soft)] text-[var(--purple)] shrink-0">
      ₹
    </div>
    <h3 className="text-[18px] font-bold text-[var(--fg)]">
      {scholarship.name}
    </h3>
    <p className="text-[var(--muted)] text-[14px]">{scholarship.blurb}</p>
    <div className="grid gap-1 text-[13.5px] text-[var(--muted)] mt-auto">
      <div>
        <b className="text-[var(--fg)] font-semibold">Offered by:</b>{' '}
        {scholarship.by}
      </div>
      <div>
        <b className="text-[var(--fg)] font-semibold">Who can apply:</b>{' '}
        {scholarship.who}
      </div>
    </div>
    {scholarship.link && (
      <a
        href={scholarship.link}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center min-h-[38px] px-3.5 py-1.5 rounded-[10px] text-[14px] font-semibold border-[1.5px] border-[var(--blue)] text-[var(--blue)] no-underline hover:-translate-y-px transition-transform self-start mt-1"
      >
        Official site
      </a>
    )}
  </article>
);

export const ExamCard: React.FC<{ exam: Exam }> = ({ exam }) => (
  <article className="bg-[var(--surface)] border border-[var(--line)] rounded-2xl p-5 flex flex-col gap-2.5 min-w-0 transition-all duration-200 hover:-translate-y-[3px] hover:shadow-[var(--shadow)]">
    <div className="flex items-center justify-between gap-2.5">
      <div className="w-11 h-11 rounded-xl grid place-items-center font-[family-name:var(--f-head)] font-extrabold text-[17px] bg-[var(--blue-soft)] text-[var(--blue)] shrink-0">
        {exam.name[0]}
      </div>
      <span className="text-[12.5px] font-semibold text-[var(--blue)] text-right">
        {exam.win}
      </span>
    </div>
    <h3 className="text-[18px] font-bold text-[var(--fg)]">{exam.name}</h3>
    <p className="text-[var(--muted)] text-[14px]">{exam.full}</p>
    <div className="grid gap-1 text-[13.5px] text-[var(--muted)] mt-auto">
      <div>
        <b className="text-[var(--fg)] font-semibold">For:</b> {exam.for}
      </div>
      <div>
        <b className="text-[var(--fg)] font-semibold">Eligibility:</b>{' '}
        {exam.elig}
      </div>
      <div>
        <b className="text-[var(--fg)] font-semibold">Conducted by:</b>{' '}
        {exam.body}
      </div>
    </div>
  </article>
);
