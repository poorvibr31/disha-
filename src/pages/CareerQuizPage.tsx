import React, { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  BookmarkCheck,
  BookmarkPlus,
  BookOpen,
  Check,
  Compass,
  FileText,
  GraduationCap,
  RotateCcw,
} from 'lucide-react';
import { PageHead } from '../components/Cards';
import {
  CareerRecommendation,
  QUIZ_QUESTIONS,
  QuizAnswers,
  evaluateCareerQuiz,
} from '../utils/quiz';
import { SavedQuizResult, UserAccount } from '../utils/auth';

interface CareerQuizPageProps {
  user: UserAccount | null;
  onSaveQuizResult: (result: SavedQuizResult) => void;
  onNavigateCourses: (category: string) => void;
  onNavigateExams: () => void;
  onNavigateScholarships: () => void;
}

const INITIAL_ANSWERS: QuizAnswers = {
  stage: '',
  subjects: [],
  workStyle: '',
  problemSolving: '',
  environment: '',
  goal: '',
  studyPath: '',
};

export const CareerQuizPage: React.FC<CareerQuizPageProps> = ({
  user,
  onSaveQuizResult,
  onNavigateCourses,
  onNavigateExams,
  onNavigateScholarships,
}) => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswers>(INITIAL_ANSWERS);
  const [results, setResults] = useState<CareerRecommendation[] | null>(null);
  const [savedNow, setSavedNow] = useState(false);

  const total = QUIZ_QUESTIONS.length;
  const currentQ = QUIZ_QUESTIONS[step];

  const isSelected = (optionId: string): boolean => {
    if (currentQ.id === 'subjects') {
      return answers.subjects.includes(optionId);
    }
    return answers[currentQ.id] === optionId;
  };

  const canProceed =
    currentQ.id === 'subjects'
      ? answers.subjects.length > 0
      : Boolean(answers[currentQ.id]);

  const handleSelectOption = (optionId: string) => {
    if (currentQ.id === 'subjects') {
      setAnswers((prev) => {
        const exists = prev.subjects.includes(optionId);
        if (exists) {
          return {
            ...prev,
            subjects: prev.subjects.filter((s) => s !== optionId),
          };
        }
        const max = currentQ.maxSelect || 2;
        const next =
          prev.subjects.length >= max
            ? [...prev.subjects.slice(1), optionId]
            : [...prev.subjects, optionId];
        return { ...prev, subjects: next };
      });
    } else {
      setAnswers((prev) => ({
        ...prev,
        [currentQ.id]: optionId,
      }));
    }
  };

  const handleNext = () => {
    if (!canProceed) return;
    if (step < total - 1) {
      setStep((s) => s + 1);
    } else {
      const evaluated = evaluateCareerQuiz(answers);
      setResults(evaluated);
      setSavedNow(false);
    }
  };

  const handleBack = () => {
    if (step > 0) setStep((s) => s - 1);
  };

  const handleRetake = () => {
    setAnswers(INITIAL_ANSWERS);
    setResults(null);
    setSavedNow(false);
    setStep(0);
  };

  const handleSaveToProfile = () => {
    if (!results || !user) return;
    const stageOption = QUIZ_QUESTIONS[0].options.find(
      (o) => o.id === answers.stage
    );
    const payload: SavedQuizResult = {
      takenAt: Date.now(),
      stageLabel: stageOption?.label || 'Student',
      recommendations: results.map((r) => ({
        name: r.career.name,
        field: r.career.field,
        matchPercent: r.matchPercent,
        reason: r.reason,
        courseFilterCat: r.courseFilterCat,
      })),
    };
    onSaveQuizResult(payload);
    setSavedNow(true);
  };

  const progressPercent = Math.round(((step + 1) / total) * 100);

  return (
    <>
      <PageHead
        title="Career Quiz"
        subtitle="Answer 7 quick questions about your education stage, favorite subjects, and work style to discover your top matching career paths."
      />
      <section className="py-12">
        <div className="max-w-[1180px] mx-auto px-4 sm:px-6">
          {!results ? (
            <div className="bg-[var(--surface)] border border-[var(--line)] rounded-[18px] p-6 sm:p-8 shadow-[var(--shadow)] max-w-[760px] mx-auto">
              {/* Progress Bar */}
              <div className="mb-6">
                <div className="flex items-center justify-between text-[13.5px] font-semibold mb-2">
                  <span className="text-[var(--blue)] tabular-nums">
                    Question {step + 1} of {total}
                  </span>
                  <span className="text-[var(--muted)] tabular-nums">
                    {progressPercent}% complete
                  </span>
                </div>
                <div
                  className="w-full h-2.5 bg-[var(--surface2)] rounded-full overflow-hidden"
                  role="progressbar"
                  aria-valuenow={progressPercent}
                  aria-valuemin={0}
                  aria-valuemax={100}
                >
                  <div
                    className="h-full bg-gradient-to-r from-[var(--blue)] to-[var(--purple)] rounded-full transition-all duration-300"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>

              {/* Question Heading */}
              <div className="mb-5">
                <h2 className="text-[22px] sm:text-[26px] font-bold text-[var(--fg)]">
                  {currentQ.title}
                </h2>
                <p className="text-[var(--muted)] text-[14.5px] mt-1.5">
                  {currentQ.subtitle}
                  {currentQ.multi && (
                    <span className="ml-1.5 font-semibold text-[var(--blue)]">
                      (Pick up to {currentQ.maxSelect || 2})
                    </span>
                  )}
                </p>
              </div>

              {/* Options Grid */}
              <div className="grid gap-3 grid-cols-1 sm:grid-cols-2">
                {currentQ.options.map((opt) => {
                  const active = isSelected(opt.id);
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => handleSelectOption(opt.id)}
                      aria-pressed={active}
                      className={`text-left p-4 rounded-xl border-[1.5px] transition-all cursor-pointer flex items-start gap-3 ${
                        active
                          ? 'bg-[var(--blue-soft)] border-[var(--blue)] shadow-sm'
                          : 'bg-[var(--bg)] border-[var(--line)] hover:border-[var(--blue)]/50 hover:bg-[var(--surface2)]/60'
                      }`}
                    >
                      <span
                        className={`mt-0.5 w-5 h-5 shrink-0 grid place-items-center border-[1.5px] transition-colors ${
                          currentQ.multi ? 'rounded-md' : 'rounded-full'
                        } ${
                          active
                            ? 'bg-[var(--blue)] border-[var(--blue)] text-[var(--blue-ink)]'
                            : 'border-[var(--muted)]/50 bg-[var(--surface)]'
                        }`}
                      >
                        {active && <Check size={13} strokeWidth={3} />}
                      </span>
                      <span className="min-w-0">
                        <span className="block font-semibold text-[15px] text-[var(--fg)] leading-snug">
                          {opt.label}
                        </span>
                        <span className="block text-[13px] text-[var(--muted)] mt-1 leading-snug">
                          {opt.hint}
                        </span>
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Navigation Controls */}
              <div className="flex items-center justify-between gap-3 mt-7 pt-5 border-t border-[var(--line)]">
                <button
                  type="button"
                  onClick={handleBack}
                  disabled={step === 0}
                  className="inline-flex items-center justify-center gap-2 rounded-[10px] px-4 py-2.5 min-h-[44px] font-semibold bg-[var(--surface2)] text-[var(--fg)] cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[var(--line)]/60 transition-colors"
                >
                  <ArrowLeft size={16} />
                  Back
                </button>

                <button
                  type="button"
                  onClick={handleNext}
                  disabled={!canProceed}
                  className="inline-flex items-center justify-center gap-2 rounded-[10px] px-5 py-2.5 min-h-[44px] font-semibold bg-[var(--blue)] text-[var(--blue-ink)] cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed hover:-translate-y-px hover:shadow-[0_6px_16px_rgba(44,88,232,0.3)] transition-all"
                >
                  {step === total - 1 ? 'See My Results' : 'Next'}
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          ) : (
            <div className="grid gap-6">
              {/* Results Summary Banner */}
              <div className="bg-[var(--surface)] border border-[var(--line)] rounded-[18px] p-6 sm:p-7 shadow-[var(--shadow)] flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="inline-flex items-center gap-2 text-[13px] font-semibold text-[var(--purple)] mb-1">
                    <Compass size={16} />
                    <span>Personalised Career Match</span>
                  </div>
                  <h2 className="text-[24px] sm:text-[28px] font-bold text-[var(--fg)]">
                    Your Top 3 Recommended Career Paths
                  </h2>
                  <p className="text-[var(--muted)] text-[14.5px] mt-1 max-w-[62ch]">
                    Ranked from your answers across education stage, favorite
                    subjects, work style, and long-term goals.
                  </p>
                </div>

                <div className="flex items-center gap-2.5 flex-wrap shrink-0">
                  {user ? (
                    savedNow ? (
                      <a
                        href="#profile"
                        className="inline-flex items-center justify-center gap-2 rounded-[10px] px-4 py-2.5 min-h-[44px] font-semibold bg-[var(--blue-soft)] text-[var(--blue)] no-underline whitespace-nowrap"
                      >
                        <BookmarkCheck size={17} />
                        Saved to Profile
                      </a>
                    ) : (
                      <button
                        type="button"
                        onClick={handleSaveToProfile}
                        className="inline-flex items-center justify-center gap-2 rounded-[10px] px-4 py-2.5 min-h-[44px] font-semibold bg-[var(--blue)] text-[var(--blue-ink)] cursor-pointer hover:-translate-y-px transition-transform whitespace-nowrap"
                      >
                        <BookmarkPlus size={17} />
                        Save to Profile
                      </button>
                    )
                  ) : (
                    <a
                      href="#login"
                      className="inline-flex items-center justify-center gap-2 rounded-[10px] px-4 py-2.5 min-h-[44px] font-semibold bg-[var(--blue)] text-[var(--blue-ink)] no-underline hover:-translate-y-px transition-transform whitespace-nowrap"
                    >
                      <BookmarkPlus size={17} />
                      Log in to Save Result
                    </a>
                  )}
                  <button
                    type="button"
                    onClick={handleRetake}
                    className="inline-flex items-center justify-center gap-2 rounded-[10px] px-4 py-2.5 min-h-[44px] font-semibold bg-[var(--surface2)] text-[var(--fg)] cursor-pointer hover:bg-[var(--line)]/60 transition-colors whitespace-nowrap"
                  >
                    <RotateCcw size={16} />
                    Retake Quiz
                  </button>
                </div>
              </div>

              {!user && (
                <div className="bg-[var(--blue-soft)] border border-[var(--blue)]/25 rounded-xl px-4.5 py-3 text-[14px] text-[var(--fg)] flex items-center justify-between gap-3 flex-wrap">
                  <span>
                    Want to keep these recommendations for later?{' '}
                    <a
                      href="#register"
                      className="text-[var(--blue)] font-semibold underline"
                    >
                      Create a free student account
                    </a>{' '}
                    or{' '}
                    <a
                      href="#login"
                      className="text-[var(--blue)] font-semibold underline"
                    >
                      log in
                    </a>{' '}
                    to save results to your browser profile.
                  </span>
                </div>
              )}

              {/* Top 3 Career Cards */}
              <div className="grid gap-5 grid-cols-1 lg:grid-cols-3">
                {results.map((rec, index) => (
                  <article
                    key={rec.career.name}
                    className="bg-[var(--surface)] border border-[var(--line)] rounded-2xl p-6 flex flex-col gap-3.5 shadow-[var(--shadow)]"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[12.5px] font-bold text-[var(--purple)]">
                        #{index + 1} Recommended · {rec.career.field}
                      </span>
                      <span className="text-[15px] font-extrabold text-[var(--blue)] tabular-nums">
                        {rec.matchPercent}% Match
                      </span>
                    </div>

                    {/* Match Meter */}
                    <div className="w-full h-1.5 bg-[var(--surface2)] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[var(--blue)] to-[var(--purple)] rounded-full"
                        style={{ width: `${rec.matchPercent}%` }}
                      />
                    </div>

                    <div>
                      <h3 className="text-[21px] font-bold text-[var(--fg)]">
                        {rec.career.name}
                      </h3>
                      <p className="text-[var(--muted)] text-[14px] mt-1">
                        {rec.career.blurb}
                      </p>
                    </div>

                    <div className="bg-[var(--surface2)]/70 rounded-xl p-3.5 text-[13.5px] text-[var(--fg)]">
                      <span className="block font-bold text-[var(--fg)] mb-0.5">
                        Why it fits you
                      </span>
                      <span className="text-[var(--muted)] leading-relaxed">
                        {rec.reason}
                      </span>
                    </div>

                    <div className="grid gap-1.5 text-[13.5px] text-[var(--muted)]">
                      <div>
                        <b className="text-[var(--fg)] font-semibold">Route:</b>{' '}
                        {rec.career.path}
                      </div>
                      {rec.courses.length > 0 && (
                        <div>
                          <b className="text-[var(--fg)] font-semibold">
                            Key courses:
                          </b>{' '}
                          {rec.courses.map((c) => c.name).join(', ')}
                        </div>
                      )}
                      {rec.exams.length > 0 && (
                        <div>
                          <b className="text-[var(--fg)] font-semibold">
                            Entrance exams:
                          </b>{' '}
                          {rec.exams.map((e) => e.name).join(', ')}
                        </div>
                      )}
                    </div>

                    {/* Direct Portal Action Buttons */}
                    <div className="mt-auto pt-3 border-t border-[var(--line)] grid gap-2">
                      <button
                        type="button"
                        onClick={() => onNavigateCourses(rec.courseFilterCat)}
                        className="w-full inline-flex items-center justify-center gap-2 rounded-[10px] px-3.5 py-2 min-h-[40px] text-[13.5px] font-semibold bg-[var(--blue)] text-[var(--blue-ink)] cursor-pointer hover:-translate-y-px transition-transform"
                      >
                        <BookOpen size={15} />
                        View Matching Courses
                      </button>
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={onNavigateExams}
                          className="inline-flex items-center justify-center gap-1.5 rounded-[10px] px-3 py-2 min-h-[38px] text-[13px] font-semibold border-[1.5px] border-[var(--blue)] text-[var(--blue)] bg-transparent cursor-pointer hover:bg-[var(--blue-soft)] transition-colors"
                        >
                          <FileText size={14} />
                          Entrance Exams
                        </button>
                        <button
                          type="button"
                          onClick={onNavigateScholarships}
                          className="inline-flex items-center justify-center gap-1.5 rounded-[10px] px-3 py-2 min-h-[38px] text-[13px] font-semibold bg-[var(--surface2)] text-[var(--fg)] cursor-pointer hover:bg-[var(--line)]/60 transition-colors"
                        >
                          <GraduationCap size={14} />
                          Scholarships
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
};
