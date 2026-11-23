import React from 'react';
import {
  CAREERS,
  CFIELDS,
  COLLEGES,
  COURSES,
  EXAMS,
  FIELDS,
  KFIELDS,
  SCHOLARS,
} from '../data/portalData';
import {
  CareerCard,
  CollegeCard,
  CourseCard,
  ExamCard,
  PageHead,
  ScholarshipCard,
} from '../components/Cards';

export interface FilterState {
  q: string;
  cat: string;
}

function matchesSearch<T extends { field: string }>(
  item: T,
  filter: FilterState,
  fields: (keyof T)[]
): boolean {
  if (filter.cat !== 'All' && item.field !== filter.cat) return false;
  if (!filter.q) return true;
  const q = filter.q.toLowerCase();
  return fields.some((k) => {
    const v = item[k];
    const str = Array.isArray(v) ? v.join(' ') : String(v ?? '');
    return str.toLowerCase().includes(q);
  });
}

const FilterBar: React.FC<{
  filter: FilterState;
  categories: string[];
  onChange: (next: FilterState) => void;
}> = ({ filter, categories, onChange }) => (
  <div className="flex gap-3 flex-wrap items-center mb-5.5">
    <input
      type="search"
      value={filter.q}
      onChange={(e) => onChange({ ...filter, q: e.target.value })}
      placeholder="Search"
      aria-label="Search"
      className="flex-[1_1_240px] min-w-0 [font:inherit] text-[var(--fg)] bg-[var(--bg)] border-[1.5px] border-[var(--line)] rounded-[10px] px-3 py-2.5 min-h-[44px] focus:border-[var(--blue)] outline-none"
    />
    <div className="flex gap-1.5 flex-wrap">
      {categories.map((c) => {
        const active = filter.cat === c;
        return (
          <button
            key={c}
            type="button"
            aria-pressed={active}
            onClick={() => onChange({ ...filter, cat: c })}
            className={`border rounded-full px-3.5 py-1.5 text-[13.5px] font-medium cursor-pointer transition-colors ${
              active
                ? 'bg-[var(--blue)] text-[var(--blue-ink)] border-[var(--blue)]'
                : 'bg-[var(--surface)] text-[var(--fg)] border-[var(--line)] hover:bg-[var(--surface2)]'
            }`}
          >
            {c}
          </button>
        );
      })}
    </div>
  </div>
);

export const CareersPage: React.FC<{
  filter: FilterState;
  onFilterChange: (next: FilterState) => void;
}> = ({ filter, onFilterChange }) => {
  const results = CAREERS.filter((c) =>
    matchesSearch(c, filter, ['name', 'field', 'blurb', 'path', 'skills', 'kw'])
  );
  return (
    <>
      <PageHead
        title="Explore careers"
        subtitle="Find a career, see what it involves and which route leads there."
      />
      <section className="py-13">
        <div className="max-w-[1180px] mx-auto px-4 sm:px-6">
          <FilterBar
            filter={filter}
            categories={FIELDS}
            onChange={onFilterChange}
          />
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {results.length > 0 ? (
              results.map((c) => <CareerCard key={c.name} career={c} />)
            ) : (
              <div className="col-span-full p-7.5 text-center text-[var(--muted)] bg-[var(--surface)] border border-dashed border-[var(--line)] rounded-[14px]">
                No matches for that search. Try a shorter word or choose "All".
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export const CoursesPage: React.FC<{
  filter: FilterState;
  onFilterChange: (next: FilterState) => void;
}> = ({ filter, onFilterChange }) => {
  const results = COURSES.filter((c) =>
    matchesSearch(c, filter, ['name', 'field', 'blurb', 'elig'])
  );
  return (
    <>
      <PageHead
        title="Courses"
        subtitle="Compare duration, eligibility and the entrance exams behind each course."
      />
      <section className="py-13">
        <div className="max-w-[1180px] mx-auto px-4 sm:px-6">
          <FilterBar
            filter={filter}
            categories={CFIELDS}
            onChange={onFilterChange}
          />
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {results.length > 0 ? (
              results.map((c) => <CourseCard key={c.name} course={c} />)
            ) : (
              <div className="col-span-full p-7.5 text-center text-[var(--muted)] bg-[var(--surface)] border border-dashed border-[var(--line)] rounded-[14px]">
                No matches for that search. Try a shorter word or choose "All".
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export const CollegesPage: React.FC<{
  filter: FilterState;
  onFilterChange: (next: FilterState) => void;
}> = ({ filter, onFilterChange }) => {
  const results = COLLEGES.filter((c) =>
    matchesSearch(c, filter, ['name', 'city', 'field', 'type', 'blurb'])
  );
  return (
    <>
      <PageHead
        title="Colleges"
        subtitle="Notable institutions across India and how admission works at each."
      />
      <section className="py-13">
        <div className="max-w-[1180px] mx-auto px-4 sm:px-6">
          <FilterBar
            filter={filter}
            categories={KFIELDS}
            onChange={onFilterChange}
          />
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {results.length > 0 ? (
              results.map((c) => <CollegeCard key={c.name} college={c} />)
            ) : (
              <div className="col-span-full p-7.5 text-center text-[var(--muted)] bg-[var(--surface)] border border-dashed border-[var(--line)] rounded-[14px]">
                No matches for that search. Try a shorter word or choose "All".
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export const ScholarshipsPage: React.FC = () => (
  <>
    <PageHead
      title="Scholarships"
      subtitle="Funding options for school-leavers and degree students. Eligibility and last dates change, so read each official notice."
    />
    <section className="py-13">
      <div className="max-w-[1180px] mx-auto px-4 sm:px-6">
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {SCHOLARS.map((s) => (
            <ScholarshipCard key={s.name} scholarship={s} />
          ))}
        </div>
      </div>
    </section>
  </>
);

export const ExamsPage: React.FC = () => (
  <>
    <PageHead
      title="Entrance exams"
      subtitle="The tests that open the door to popular courses, with who can sit them and when they usually happen."
    />
    <section className="py-13">
      <div className="max-w-[1180px] mx-auto px-4 sm:px-6">
        <p className="text-[12.5px] text-[var(--muted)] mb-4">
          Timings show the usual window only. Dates, pattern and eligibility are
          set each year by the conducting body.
        </p>
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {EXAMS.map((e) => (
            <ExamCard key={e.id} exam={e} />
          ))}
        </div>
      </div>
    </section>
  </>
);
