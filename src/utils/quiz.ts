import { CAREERS, Career, EXAMS, Exam, COURSES, Course, SCHOLARS, Scholarship } from '../data/portalData';

export interface QuizOption {
  id: string;
  label: string;
  hint: string;
}

export interface QuizQuestion {
  id: 'stage' | 'subjects' | 'workStyle' | 'problemSolving' | 'environment' | 'goal' | 'studyPath';
  title: string;
  subtitle: string;
  multi?: boolean;
  maxSelect?: number;
  options: QuizOption[];
}

export interface QuizAnswers {
  stage: string;
  subjects: string[];
  workStyle: string;
  problemSolving: string;
  environment: string;
  goal: string;
  studyPath: string;
}

export interface CareerRecommendation {
  career: Career;
  matchPercent: number;
  reason: string;
  courses: Course[];
  exams: Exam[];
  scholarships: Scholarship[];
  courseFilterCat: string;
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'stage',
    title: 'Where are you right now in your education?',
    subtitle: 'This helps us tailor the roadmap and entrance exam timeline to your stage.',
    options: [
      {
        id: 'class10',
        label: 'Class 10 (or Secondary)',
        hint: 'Deciding between Science, Commerce, and Arts/Humanities streams',
      },
      {
        id: 'class12',
        label: 'Class 12 / Junior College',
        hint: 'Choosing undergraduate degrees, colleges, and entrance tests',
      },
      {
        id: 'undergrad',
        label: 'Undergraduate / Graduate',
        hint: 'Planning career entry, MBA/M.Tech/UPSC, or specialisation',
      },
    ],
  },
  {
    id: 'subjects',
    title: 'Which subjects do you enjoy most?',
    subtitle: 'Pick 1 or 2 subject areas that genuinely spark your curiosity.',
    multi: true,
    maxSelect: 2,
    options: [
      {
        id: 'maths_cs',
        label: 'Mathematics & Computing',
        hint: 'Logic, coding, statistics, and problem modelling',
      },
      {
        id: 'bio_health',
        label: 'Biology & Life Sciences',
        hint: 'Anatomy, chemistry, medicine, and living systems',
      },
      {
        id: 'physics_eng',
        label: 'Physics & Applied Science',
        hint: 'Mechanics, structures, electronics, and how things work',
      },
      {
        id: 'commerce_fin',
        label: 'Commerce, Accounts & Economics',
        hint: 'Markets, finance, taxation, and business strategy',
      },
      {
        id: 'art_design',
        label: 'Art, Design & Visual Media',
        hint: 'Drawing, digital interfaces, aesthetics, and storytelling',
      },
      {
        id: 'civics_hum',
        label: 'Civics, Law & Humanities',
        hint: 'Debating, public policy, society, history, and teaching',
      },
    ],
  },
  {
    id: 'workStyle',
    title: 'What kind of work style brings out your best?',
    subtitle: 'Think about how you naturally like to spend a focused afternoon.',
    options: [
      {
        id: 'analytical',
        label: 'Analytical & Systematic',
        hint: 'Organising data, spotting patterns, writing code, or balancing numbers',
      },
      {
        id: 'creative',
        label: 'Creative & Expressive',
        hint: 'Designing layouts, sketching concepts, and crafting fresh experiences',
      },
      {
        id: 'people',
        label: 'People-Oriented & Supportive',
        hint: 'Helping, advising, teaching, or leading teams toward a shared goal',
      },
      {
        id: 'hands_on',
        label: 'Hands-On & Practical',
        hint: 'Building physical systems, working in labs, or leading on the ground',
      },
    ],
  },
  {
    id: 'problemSolving',
    title: 'How do you prefer to solve a tough challenge?',
    subtitle: 'Choose the approach that feels most natural to you.',
    options: [
      {
        id: 'tech_build',
        label: 'Build or debug a technical solution',
        hint: 'Using software, formulas, or engineering principles step by step',
      },
      {
        id: 'research_verify',
        label: 'Investigate, experiment, and verify evidence',
        hint: 'Testing hypotheses in a lab, clinic, or deep research study',
      },
      {
        id: 'debate_lead',
        label: 'Negotiate, argue a case, or rally a team',
        hint: 'Persuasion, structured reasoning, and coordinating people',
      },
      {
        id: 'empathy_design',
        label: 'Observe people and redesign the experience',
        hint: 'Understanding human needs and shaping intuitive solutions',
      },
    ],
  },
  {
    id: 'environment',
    title: 'Where do you picture yourself doing your best work?',
    subtitle: 'Pick the setting that energises you most.',
    options: [
      {
        id: 'tech_studio',
        label: 'Tech company, product team, or design studio',
        hint: 'Collaborative digital workspaces building modern tools',
      },
      {
        id: 'medical_lab',
        label: 'Hospital, pharmacy, or research laboratory',
        hint: 'Clinical care, diagnostics, medicines, or scientific discovery',
      },
      {
        id: 'business_firm',
        label: 'Finance firm, corporate office, or startup',
        hint: 'Audits, strategy, growth planning, and enterprise leadership',
      },
      {
        id: 'public_campus',
        label: 'Courtroom, public service, academy, or campus',
        hint: 'Law, governance, national defence, or education',
      },
    ],
  },
  {
    id: 'goal',
    title: 'What matters most in your long-term career?',
    subtitle: 'Select the outcome you find most rewarding over the next 10 years.',
    options: [
      {
        id: 'innovate',
        label: 'Creating technology, products, or discoveries',
        hint: 'Building things people rely on or advancing scientific knowledge',
      },
      {
        id: 'heal_teach',
        label: 'Healing patients or mentoring the next generation',
        hint: 'Direct, meaningful impact on individuals and families',
      },
      {
        id: 'wealth_strategy',
        label: 'Financial mastery and leading organisations',
        hint: 'Guiding major business decisions, startups, or advisory firms',
      },
      {
        id: 'justice_service',
        label: 'Upholding justice, public policy, or national service',
        hint: 'Representing people, shaping governance, or serving the nation',
      },
    ],
  },
  {
    id: 'studyPath',
    title: 'Which academic pathway sounds closest to your plan?',
    subtitle: 'Every career has a distinct preparation style after school or college.',
    options: [
      {
        id: 'national_exams',
        label: 'Competitive national entrance exams',
        hint: 'Structured preparation for JEE, NEET, CLAT, CAT, NDA, or UPSC',
      },
      {
        id: 'portfolio_skills',
        label: 'Portfolio, projects, and practical craft',
        hint: 'Showing work through designs, apps, or creative problem solving',
      },
      {
        id: 'professional_track',
        label: 'Professional articleship or university degree track',
        hint: 'Step-by-step credentials like CA, B.Ed, B.Pharm, or M.Sc/PhD',
      },
    ],
  },
];

const CAREER_COURSE_CAT: Record<string, string> = {
  'Software Engineer': 'Engineering',
  'Data Scientist': 'Science',
  'Doctor (MBBS)': 'Medicine',
  Pharmacist: 'Medicine',
  'Chartered Accountant': 'Commerce',
  'Business Manager': 'Management',
  'UI/UX Designer': 'Design',
  Lawyer: 'Law',
  'Civil Services Officer': 'All',
  'Teacher / Professor': 'Education',
  'Civil / Mechanical Engineer': 'Engineering',
  'Research Scientist': 'Science',
  'Defence Officer': 'All',
};

const CAREER_COURSES_MAP: Record<string, string[]> = {
  'Software Engineer': ['B.E. / B.Tech', 'BCA'],
  'Data Scientist': ['B.Sc Data Science', 'B.E. / B.Tech', 'BCA'],
  'Doctor (MBBS)': ['MBBS'],
  Pharmacist: ['B.Pharm'],
  'Chartered Accountant': ['B.Com'],
  'Business Manager': ['BBA', 'B.Com'],
  'UI/UX Designer': ['B.Des'],
  Lawyer: ['BA LLB (Hons)'],
  'Civil Services Officer': ['BA LLB (Hons)', 'B.Com', 'B.E. / B.Tech'],
  'Teacher / Professor': ['B.Ed'],
  'Civil / Mechanical Engineer': ['B.E. / B.Tech'],
  'Research Scientist': ['B.Sc Data Science', 'B.E. / B.Tech'],
  'Defence Officer': ['B.E. / B.Tech', 'BBA'],
};

const WEIGHT_TABLE: Record<string, Record<string, number>> = {
  'Software Engineer': {
    maths_cs: 5,
    physics_eng: 3,
    art_design: 1,
    analytical: 4,
    hands_on: 2,
    tech_build: 5,
    research_verify: 2,
    tech_studio: 5,
    innovate: 5,
    portfolio_skills: 3,
    national_exams: 3,
  },
  'Data Scientist': {
    maths_cs: 5,
    commerce_fin: 2,
    physics_eng: 2,
    analytical: 5,
    research_verify: 4,
    tech_build: 4,
    tech_studio: 4,
    business_firm: 3,
    innovate: 4,
    wealth_strategy: 2,
    national_exams: 2,
    portfolio_skills: 3,
  },
  'Doctor (MBBS)': {
    bio_health: 6,
    people: 4,
    analytical: 2,
    research_verify: 4,
    empathy_design: 2,
    medical_lab: 6,
    heal_teach: 6,
    national_exams: 4,
  },
  Pharmacist: {
    bio_health: 5,
    physics_eng: 2,
    analytical: 3,
    hands_on: 4,
    research_verify: 5,
    medical_lab: 6,
    heal_teach: 4,
    innovate: 2,
    professional_track: 4,
  },
  'Chartered Accountant': {
    commerce_fin: 6,
    maths_cs: 3,
    analytical: 5,
    tech_build: 2,
    research_verify: 3,
    business_firm: 5,
    wealth_strategy: 5,
    professional_track: 5,
  },
  'Business Manager': {
    commerce_fin: 5,
    civics_hum: 2,
    people: 5,
    analytical: 3,
    debate_lead: 5,
    business_firm: 5,
    tech_studio: 2,
    wealth_strategy: 5,
    national_exams: 3,
    professional_track: 3,
  },
  'UI/UX Designer': {
    art_design: 6,
    maths_cs: 2,
    creative: 6,
    empathy_design: 5,
    tech_studio: 5,
    innovate: 4,
    portfolio_skills: 5,
  },
  Lawyer: {
    civics_hum: 6,
    commerce_fin: 2,
    people: 4,
    analytical: 3,
    debate_lead: 6,
    research_verify: 2,
    public_campus: 5,
    business_firm: 2,
    justice_service: 6,
    national_exams: 4,
  },
  'Civil Services Officer': {
    civics_hum: 5,
    commerce_fin: 2,
    people: 5,
    analytical: 3,
    debate_lead: 5,
    research_verify: 3,
    public_campus: 6,
    justice_service: 6,
    national_exams: 4,
  },
  'Teacher / Professor': {
    civics_hum: 4,
    bio_health: 2,
    maths_cs: 2,
    art_design: 2,
    people: 6,
    creative: 2,
    empathy_design: 4,
    debate_lead: 2,
    public_campus: 5,
    heal_teach: 6,
    professional_track: 4,
  },
  'Civil / Mechanical Engineer': {
    physics_eng: 6,
    maths_cs: 3,
    hands_on: 5,
    analytical: 3,
    tech_build: 5,
    tech_studio: 2,
    business_firm: 2,
    innovate: 4,
    national_exams: 4,
  },
  'Research Scientist': {
    physics_eng: 4,
    bio_health: 4,
    maths_cs: 4,
    analytical: 5,
    hands_on: 3,
    research_verify: 6,
    medical_lab: 4,
    public_campus: 2,
    innovate: 5,
    professional_track: 4,
  },
  'Defence Officer': {
    physics_eng: 3,
    civics_hum: 3,
    hands_on: 5,
    people: 4,
    debate_lead: 4,
    public_campus: 5,
    justice_service: 6,
    national_exams: 4,
  },
};

function labelFor(qId: QuizQuestion['id'], optionId: string): string {
  const q = QUIZ_QUESTIONS.find((item) => item.id === qId);
  return q?.options.find((o) => o.id === optionId)?.label || optionId;
}

function buildReason(career: Career, answers: QuizAnswers): string {
  const subjLabels = answers.subjects.map((id) => labelFor('subjects', id));
  const styleLabel = labelFor('workStyle', answers.workStyle).toLowerCase();
  const goalLabel = labelFor('goal', answers.goal).toLowerCase();
  const stageHint =
    answers.stage === 'class10'
      ? 'As a Class 10 student, this gives you a clear stream target early.'
      : answers.stage === 'class12'
        ? 'At the Class 12 stage, you can aim straight for its core degree and entrance tests.'
        : 'At the undergraduate or graduate stage, you can build directly on your degree or target its qualifying exams.';

  const subjText =
    subjLabels.length > 0 ? subjLabels.join(' and ') : 'your chosen subjects';

  return `Matches your interest in ${subjText}, your ${styleLabel} approach, and your focus on ${goalLabel}. ${stageHint}`;
}

function pickScholarships(career: Career): Scholarship[] {
  if (career.field === 'Science' || career.field === 'Healthcare') {
    return [SCHOLARS[0], SCHOLARS[1], SCHOLARS[2]].filter(Boolean);
  }
  if (career.field === 'Technology' || career.field === 'Engineering') {
    return [SCHOLARS[0], SCHOLARS[4], SCHOLARS[2]].filter(Boolean);
  }
  return [SCHOLARS[0], SCHOLARS[2], SCHOLARS[3]].filter(Boolean);
}

export function evaluateCareerQuiz(answers: QuizAnswers): CareerRecommendation[] {
  const selectedTokens = [
    ...answers.subjects,
    answers.workStyle,
    answers.problemSolving,
    answers.environment,
    answers.goal,
    answers.studyPath,
  ].filter(Boolean);

  const rawScored = CAREERS.map((career) => {
    const weights = WEIGHT_TABLE[career.name] || {};
    let score = 0;

    for (const token of selectedTokens) {
      if (weights[token]) {
        score += weights[token];
      }
    }

    // Stage nudges for realistic alignment
    if (answers.stage === 'undergrad') {
      if (
        career.name === 'Business Manager' ||
        career.name === 'Civil Services Officer' ||
        career.name === 'Data Scientist' ||
        career.name === 'Research Scientist'
      ) {
        score += 1.5;
      }
    } else if (answers.stage === 'class10') {
      if (
        career.name === 'Software Engineer' ||
        career.name === 'Doctor (MBBS)' ||
        career.name === 'Chartered Accountant' ||
        career.name === 'UI/UX Designer'
      ) {
        score += 1;
      }
    }

    return { career, score };
  });

  rawScored.sort((a, b) => b.score - a.score);
  const topScore = Math.max(rawScored[0]?.score || 1, 1);

  return rawScored.slice(0, 3).map(({ career, score }, idx) => {
    // Normalize into a crisp 74% - 96% range while preserving relative rank differences
    const ratio = score / topScore;
    const base = Math.round(72 + ratio * 23 - idx * 2);
    const matchPercent = Math.max(68, Math.min(96, base));

    const courseNames = CAREER_COURSES_MAP[career.name] || [];
    const courses = COURSES.filter((c) => courseNames.includes(c.name));
    const exams = career.exams
      .map((id) => EXAMS.find((e) => e.id === id))
      .filter((e): e is Exam => Boolean(e));

    return {
      career,
      matchPercent,
      reason: buildReason(career, answers),
      courses,
      exams,
      scholarships: pickScholarships(career),
      courseFilterCat: CAREER_COURSE_CAT[career.name] || 'All',
    };
  });
}
