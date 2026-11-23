export interface Exam {
  id: string;
  name: string;
  full: string;
  for: string;
  body: string;
  win: string;
  elig: string;
}

export interface Career {
  name: string;
  field: string;
  blurb: string;
  path: string;
  skills: string[];
  exams: string[];
  interests: string[];
  kw: string[];
}

export interface Course {
  name: string;
  field: string;
  dur: string;
  elig: string;
  exams: string[];
  blurb: string;
}

export interface College {
  name: string;
  city: string;
  field: string;
  type: string;
  via: string;
  blurb: string;
}

export interface Scholarship {
  name: string;
  by: string;
  who: string;
  blurb: string;
  link?: string;
}

export interface Story {
  n: string;
  r: string;
  q: string;
}

export interface Faq {
  q: string;
  a: string;
}

export const INTERESTS = [
  'Technology & Coding',
  'Medicine & Health',
  'Business & Finance',
  'Design & Creativity',
  'Law & Public Service',
  'Science & Research',
  'Teaching',
  'Engineering',
  'Defence & Services',
];

export const QUALS = [
  'Class 10 (Secondary)',
  'Class 12: Science (PCM)',
  'Class 12: Science (PCB)',
  'Class 12: Commerce',
  'Class 12: Arts / Humanities',
  'Diploma',
  "Bachelor's degree",
  "Master's degree",
];

export const EXAMS: Exam[] = [
  {
    id: 'jee-main',
    name: 'JEE Main',
    full: 'Joint Entrance Examination (Main)',
    for: 'B.E./B.Tech, B.Arch at NITs, IIITs and other institutes',
    body: 'National Testing Agency (NTA)',
    win: 'Sessions usually in January and April',
    elig: 'Class 12 with Physics, Chemistry and Mathematics',
  },
  {
    id: 'neet',
    name: 'NEET UG',
    full: 'National Eligibility cum Entrance Test (UG)',
    for: 'MBBS, BDS, AYUSH and allied courses',
    body: 'National Testing Agency (NTA)',
    win: 'Usually May',
    elig: 'Class 12 with Physics, Chemistry and Biology',
  },
  {
    id: 'cuet',
    name: 'CUET UG',
    full: 'Common University Entrance Test (UG)',
    for: 'Undergraduate programmes in central and many other universities',
    body: 'National Testing Agency (NTA)',
    win: 'Usually May to June',
    elig: 'Class 12 pass or appearing; subjects depend on the course',
  },
  {
    id: 'kcet',
    name: 'KCET',
    full: 'Karnataka Common Entrance Test',
    for: 'Engineering, pharmacy, agriculture and other seats in Karnataka',
    body: 'Karnataka Examinations Authority (KEA)',
    win: 'Usually April',
    elig: 'Class 12 (2nd PUC) with the required subjects; Karnataka domicile rules apply',
  },
  {
    id: 'clat',
    name: 'CLAT',
    full: 'Common Law Admission Test',
    for: '5-year integrated LLB and LLM at National Law Universities',
    body: 'Consortium of National Law Universities',
    win: 'Usually December',
    elig: 'Class 12 pass for UG; LLB degree for PG',
  },
  {
    id: 'cat',
    name: 'CAT',
    full: 'Common Admission Test',
    for: 'MBA/PGDM at IIMs and many other business schools',
    body: 'Conducted by the IIMs on rotation',
    win: 'Usually November',
    elig: "Bachelor's degree with the minimum marks required by the institute",
  },
  {
    id: 'gate',
    name: 'GATE',
    full: 'Graduate Aptitude Test in Engineering',
    for: 'M.Tech, PhD and some public sector recruitment',
    body: 'IITs and IISc on rotation',
    win: 'Usually February',
    elig: "Final-year or completed bachelor's degree in engineering, science or related fields",
  },
  {
    id: 'nda',
    name: 'NDA',
    full: 'National Defence Academy Examination',
    for: 'Entry to the Army, Navy and Air Force wings after Class 12',
    body: 'Union Public Service Commission (UPSC)',
    win: 'Twice a year, usually April and September',
    elig: 'Unmarried candidates in the notified age range; Class 12 (PCM for Air Force and Navy)',
  },
  {
    id: 'uceed',
    name: 'UCEED',
    full: 'Undergraduate Common Entrance Examination for Design',
    for: 'B.Des at IITs and some other design schools',
    body: 'IIT Bombay',
    win: 'Usually January',
    elig: 'Class 12 in any stream, within the notified age limit',
  },
  {
    id: 'upsc',
    name: 'UPSC CSE',
    full: 'Civil Services Examination',
    for: 'IAS, IPS, IFS and other central services',
    body: 'Union Public Service Commission (UPSC)',
    win: 'Prelims usually May to June',
    elig: "Bachelor's degree in any discipline and within the notified age limits",
  },
];

export function getExamById(id: string): Exam | null {
  return EXAMS.find((e) => e.id === id) || null;
}

export const CAREERS: Career[] = [
  {
    name: 'Software Engineer',
    field: 'Technology',
    blurb: 'Design, build and maintain the apps, websites and systems people use every day.',
    path: 'Class 12 (PCM) → B.E./B.Tech in CS or BCA → optional M.Tech/MCA',
    skills: ['Programming', 'Problem solving', 'Teamwork'],
    exams: ['jee-main', 'kcet', 'cuet'],
    interests: ['Technology & Coding', 'Engineering'],
    kw: ['coding', 'program', 'software', 'computer', 'developer', 'website', 'tech'],
  },
  {
    name: 'Data Scientist',
    field: 'Technology',
    blurb: 'Turn raw data into predictions and decisions using statistics and machine learning.',
    path: 'B.Sc/B.Tech in CS, Maths or Statistics → data science courses → M.Sc/M.Tech optional',
    skills: ['Statistics', 'Python', 'Storytelling'],
    exams: ['cuet', 'jee-main', 'gate'],
    interests: ['Technology & Coding', 'Science & Research', 'Business & Finance'],
    kw: ['data', 'statistic', 'analytics', 'maths', 'math', 'machine', 'learning'],
  },
  {
    name: 'Doctor (MBBS)',
    field: 'Healthcare',
    blurb: 'Diagnose and treat patients, then specialise through postgraduate medicine.',
    path: 'Class 12 (PCB) → NEET UG → MBBS with internship → MD/MS',
    skills: ['Empathy', 'Biology', 'Stamina'],
    exams: ['neet'],
    interests: ['Medicine & Health', 'Science & Research'],
    kw: ['doctor', 'medicine', 'mbbs', 'hospital', 'patient', 'biology', 'health'],
  },
  {
    name: 'Pharmacist',
    field: 'Healthcare',
    blurb: 'Work on medicines in hospitals, drug companies, labs and regulation.',
    path: 'Class 12 (PCB/PCM) → B.Pharm → M.Pharm or Pharm.D',
    skills: ['Chemistry', 'Accuracy', 'Communication'],
    exams: ['kcet'],
    interests: ['Medicine & Health', 'Science & Research'],
    kw: ['pharma', 'pharmacy', 'drug', 'chemistry', 'medicines'],
  },
  {
    name: 'Chartered Accountant',
    field: 'Business',
    blurb: 'Handle accounts, audit, tax and financial planning for people and companies.',
    path: 'Class 12 (any stream, commerce helps) → CA Foundation → Intermediate → Final with articleship',
    skills: ['Numeracy', 'Ethics', 'Persistence'],
    exams: [],
    interests: ['Business & Finance'],
    kw: ['account', 'audit', 'tax', 'finance', 'commerce', 'money', 'bank'],
  },
  {
    name: 'Business Manager',
    field: 'Business',
    blurb: 'Lead teams, products and strategy in companies, startups and consulting.',
    path: "Any bachelor's degree or BBA → CAT or other MBA tests → MBA/PGDM",
    skills: ['Leadership', 'Analysis', 'Communication'],
    exams: ['cat', 'cuet'],
    interests: ['Business & Finance'],
    kw: ['business', 'manage', 'mba', 'startup', 'marketing', 'entrepreneur', 'sales'],
  },
  {
    name: 'UI/UX Designer',
    field: 'Creative',
    blurb: 'Shape how apps and products look and feel, grounded in how people use them.',
    path: 'Class 12 (any stream) → B.Des or any degree plus portfolio → design courses',
    skills: ['Visual sense', 'Empathy', 'Prototyping'],
    exams: ['uceed'],
    interests: ['Design & Creativity', 'Technology & Coding'],
    kw: ['design', 'draw', 'creative', 'art', 'ux', 'sketch', 'animation'],
  },
  {
    name: 'Lawyer',
    field: 'Law & Government',
    blurb: 'Advise clients, argue cases and work in courts, firms or companies.',
    path: 'Class 12 (any stream) → CLAT → 5-year integrated LLB → enrol with the Bar Council',
    skills: ['Reading', 'Argument', 'Research'],
    exams: ['clat'],
    interests: ['Law & Public Service'],
    kw: ['law', 'lawyer', 'court', 'legal', 'advocate', 'judge', 'debate'],
  },
  {
    name: 'Civil Services Officer',
    field: 'Law & Government',
    blurb: 'Serve in the IAS, IPS, IFS and other services that run public administration.',
    path: "Any bachelor's degree → UPSC CSE (prelims, mains, interview) → training",
    skills: ['Reasoning', 'Writing', 'Patience'],
    exams: ['upsc'],
    interests: ['Law & Public Service'],
    kw: ['ias', 'ips', 'civil', 'upsc', 'government', 'administration', 'public'],
  },
  {
    name: 'Teacher / Professor',
    field: 'Education',
    blurb: 'Teach in schools or colleges and shape the next generation of students.',
    path: "Bachelor's degree → B.Ed (schools) or Master's plus NET (colleges) → teaching eligibility tests",
    skills: ['Patience', 'Subject depth', 'Communication'],
    exams: [],
    interests: ['Teaching'],
    kw: ['teach', 'teacher', 'professor', 'school', 'lecturer', 'education'],
  },
  {
    name: 'Civil / Mechanical Engineer',
    field: 'Engineering',
    blurb: 'Plan and build roads, buildings, machines and the systems around them.',
    path: 'Class 12 (PCM) → JEE Main or state CET → B.E./B.Tech → GATE or jobs',
    skills: ['Physics', 'Drawing', 'Site sense'],
    exams: ['jee-main', 'kcet', 'gate'],
    interests: ['Engineering'],
    kw: ['engineer', 'mechanical', 'civil', 'machine', 'construction', 'electrical', 'building'],
  },
  {
    name: 'Research Scientist',
    field: 'Science',
    blurb: 'Investigate open questions in labs, universities and research institutes.',
    path: 'B.Sc → M.Sc → PhD, with research fellowships such as CSIR-NET or GATE',
    skills: ['Curiosity', 'Experiment design', 'Writing'],
    exams: ['gate', 'cuet'],
    interests: ['Science & Research'],
    kw: ['research', 'scientist', 'physics', 'lab', 'space', 'isro', 'science'],
  },
  {
    name: 'Defence Officer',
    field: 'Law & Government',
    blurb: 'Lead in the Army, Navy or Air Force after training at the national academies.',
    path: 'Class 12 → NDA (or CDS after graduation) → SSB interview → training',
    skills: ['Fitness', 'Leadership', 'Discipline'],
    exams: ['nda'],
    interests: ['Defence & Services'],
    kw: ['army', 'navy', 'air force', 'defence', 'nda', 'soldier', 'military', 'pilot'],
  },
];

export const FIELDS = [
  'All',
  'Technology',
  'Healthcare',
  'Business',
  'Creative',
  'Law & Government',
  'Education',
  'Engineering',
  'Science',
];

export const COURSES: Course[] = [
  {
    name: 'B.E. / B.Tech',
    field: 'Engineering',
    dur: '4 years',
    elig: 'Class 12 with PCM',
    exams: ['jee-main', 'kcet'],
    blurb: 'Core engineering degree across computer science, mechanical, civil, electrical and more.',
  },
  {
    name: 'MBBS',
    field: 'Medicine',
    dur: '5.5 years including internship',
    elig: 'Class 12 with PCB',
    exams: ['neet'],
    blurb: 'The undergraduate medical degree required to practise as a doctor.',
  },
  {
    name: 'BCA',
    field: 'Computing',
    dur: '3 years',
    elig: 'Class 12, any stream (maths often preferred)',
    exams: ['cuet'],
    blurb: 'Programming, databases and software development with a computing focus.',
  },
  {
    name: 'B.Sc Data Science',
    field: 'Science',
    dur: '3 years',
    elig: 'Class 12 with Mathematics',
    exams: ['cuet'],
    blurb: 'Statistics, programming and machine learning from the first year.',
  },
  {
    name: 'B.Com',
    field: 'Commerce',
    dur: '3 years',
    elig: 'Class 12, commerce preferred',
    exams: ['cuet'],
    blurb: 'Accounting, taxation and economics; a base for CA, CS and MBA.',
  },
  {
    name: 'BBA',
    field: 'Management',
    dur: '3 years',
    elig: 'Class 12, any stream',
    exams: ['cuet'],
    blurb: 'Business basics, marketing and operations; a direct route into management.',
  },
  {
    name: 'B.Des',
    field: 'Design',
    dur: '4 years',
    elig: 'Class 12, any stream',
    exams: ['uceed'],
    blurb: 'Product, communication and interaction design with a portfolio-based approach.',
  },
  {
    name: 'BA LLB (Hons)',
    field: 'Law',
    dur: '5 years integrated',
    elig: 'Class 12, any stream',
    exams: ['clat'],
    blurb: 'Arts and law combined, taught at National Law Universities and others.',
  },
  {
    name: 'B.Pharm',
    field: 'Medicine',
    dur: '4 years',
    elig: 'Class 12 with PCB or PCM',
    exams: ['kcet'],
    blurb: 'Pharmaceutical sciences, drug formulation and healthcare practice.',
  },
  {
    name: 'B.Ed',
    field: 'Education',
    dur: '2 years after graduation',
    elig: "Bachelor's degree",
    exams: [],
    blurb: 'Professional teaching degree for school-level careers.',
  },
];

export const CFIELDS = [
  'All',
  'Engineering',
  'Medicine',
  'Computing',
  'Science',
  'Commerce',
  'Management',
  'Design',
  'Law',
  'Education',
];

export const COLLEGES: College[] = [
  {
    name: 'IIT Bombay',
    city: 'Mumbai, Maharashtra',
    field: 'Engineering',
    type: 'Institute of National Importance',
    via: 'JEE Advanced (B.Tech), UCEED (B.Des)',
    blurb: 'Engineering, science and design programmes with a strong research culture.',
  },
  {
    name: 'IIT Madras',
    city: 'Chennai, Tamil Nadu',
    field: 'Engineering',
    type: 'Institute of National Importance',
    via: 'JEE Advanced',
    blurb: 'Engineering and data science programmes, including an online BS degree.',
  },
  {
    name: 'NIT Karnataka, Surathkal',
    city: 'Surathkal, Karnataka',
    field: 'Engineering',
    type: 'National Institute of Technology',
    via: 'JEE Main through JoSAA',
    blurb: 'One of the leading NITs, known for engineering and its coastal campus.',
  },
  {
    name: 'Indian Institute of Science (IISc)',
    city: 'Bengaluru, Karnataka',
    field: 'Science',
    type: 'Institute of Eminence',
    via: 'Varies by programme; check the current admission route',
    blurb: 'Research-first institute for science and engineering at all levels.',
  },
  {
    name: 'AIIMS New Delhi',
    city: 'New Delhi, Delhi',
    field: 'Medicine',
    type: 'Institute of National Importance',
    via: 'NEET UG',
    blurb: 'Premier medical college, hospital and research institute.',
  },
  {
    name: 'NLSIU',
    city: 'Bengaluru, Karnataka',
    field: 'Law',
    type: 'National Law University',
    via: 'CLAT',
    blurb: "India's first National Law University, offering integrated and postgraduate law degrees.",
  },
  {
    name: 'IIM Bangalore',
    city: 'Bengaluru, Karnataka',
    field: 'Management',
    type: 'Indian Institute of Management',
    via: 'CAT, followed by interviews',
    blurb: 'Management education from the MBA to doctoral programmes.',
  },
  {
    name: 'National Institute of Design',
    city: 'Ahmedabad, Gujarat',
    field: 'Design',
    type: 'Institute of National Importance',
    via: 'NID DAT',
    blurb: 'Design education in product, communication, textile and more.',
  },
  {
    name: 'University of Delhi',
    city: 'Delhi',
    field: 'Multi-discipline',
    type: 'Central University',
    via: 'CUET UG',
    blurb: 'Wide range of arts, commerce and science undergraduate programmes.',
  },
];

export const KFIELDS = [
  'All',
  'Engineering',
  'Science',
  'Medicine',
  'Law',
  'Management',
  'Design',
  'Multi-discipline',
];

export const SCHOLARS: Scholarship[] = [
  {
    name: 'National Scholarship Portal (NSP)',
    by: 'Government of India',
    who: 'Students across levels; one portal for many central and state schemes',
    blurb: 'Create one account, check which schemes you qualify for and apply online.',
    link: 'https://scholarships.gov.in',
  },
  {
    name: 'INSPIRE Scholarship (SHE)',
    by: 'Department of Science and Technology',
    who: 'High scorers choosing basic and natural sciences for degree study',
    blurb: 'Supports students who pursue B.Sc, integrated M.Sc and similar science programmes.',
  },
  {
    name: 'Central Sector Scholarship for College and University Students',
    by: 'Ministry of Education',
    who: 'Students above the board-exam percentile cut-off with a family income limit',
    blurb: 'Merit-based support for regular degree students in recognised institutions.',
  },
  {
    name: 'Post-Matric Scholarships',
    by: 'Central and state social justice departments',
    who: 'Category-based eligibility (for example SC, ST, OBC, minorities) with income limits',
    blurb: 'Helps with fees and maintenance after Class 10 for eligible students.',
  },
  {
    name: 'AICTE Pragati Scholarship',
    by: 'AICTE',
    who: 'Girl students admitted to AICTE-approved degree or diploma programmes',
    blurb: "Supports women in technical education; check each year's notice for details.",
  },
  {
    name: 'State scholarship portals',
    by: 'Your state government',
    who: 'Residents of the state, with rules that change by scheme',
    blurb: "Many states run their own portals (Karnataka has one for post-matric schemes). Search your state's official portal.",
  },
];

export const STORIES: Story[] = [
  {
    n: 'Ananya R.',
    r: 'B.Des student',
    q: 'I was torn between engineering and art. Seeing design as a real career with a clear entrance exam made the decision easy.',
  },
  {
    n: 'Imran S.',
    r: 'B.Tech, Computer Science',
    q: 'The exam calendar kept me on schedule. I knew which tests mattered for my state and prepared only for those.',
  },
  {
    n: 'Meera K.',
    r: 'First-year MBBS',
    q: "My family wasn't sure about the cost. Finding scholarship options early helped us plan with confidence.",
  },
];

export const FAQS: Faq[] = [
  {
    q: 'When should I start planning my career?',
    a: 'Class 9 or 10 is a good time to explore interests. Your stream choice after Class 10 narrows options, so it helps to know what each stream leads to.',
  },
  {
    q: 'Can I change my stream after Class 10 or 12?',
    a: 'Often yes. Many degrees accept students from more than one stream, and bridge courses exist. Check the eligibility of the exact course you want.',
  },
  {
    q: 'Do I need coaching for entrance exams?',
    a: 'Not always. It depends on the exam and how you learn. Official syllabi, past papers and a steady plan matter more than any one method.',
  },
  {
    q: 'How reliable is the information here?',
    a: 'It is a starting guide. Exam dates, fees and eligibility change every year, so always confirm on the official website before you apply.',
  },
  {
    q: 'How does the AI Career Assistant work?',
    a: 'It matches the interests and subjects you describe against the careers, exams and scholarships listed on this site. It is rule-based guidance, not a replacement for a counsellor.',
  },
  {
    q: 'Where is my account data kept?',
    a: 'In this demo, your account and profile are stored only in your own browser, and no server receives them. Use a practice password, not one you use elsewhere.',
  },
];
