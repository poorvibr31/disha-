import { useCallback, useEffect, useState } from 'react';
import { Header, RouteName } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import {
  CareersPage,
  CollegesPage,
  CoursesPage,
  ExamsPage,
  FilterState,
  ScholarshipsPage,
} from './pages/DirectoryPages';
import { AssistantPage } from './pages/AssistantPage';
import { CareerQuizPage } from './pages/CareerQuizPage';
import { AboutPage, ContactPage } from './pages/InfoPages';
import {
  ForgotPasswordPage,
  LoginPage,
  ProfilePage,
  RegisterPage,
} from './pages/AuthPages';
import { CAREERS, COURSES } from './data/portalData';
import {
  SavedQuizResult,
  UserAccount,
  getCurrentUser,
  logoutUser,
  saveQuizResultToProfile,
} from './utils/auth';

const VALID_ROUTES = new Set<RouteName>([
  'home',
  'careers',
  'courses',
  'colleges',
  'scholarships',
  'exams',
  'assistant',
  'quiz',
  'about',
  'contact',
  'register',
  'login',
  'forgot-password',
  'profile',
]);

function parseHash(): RouteName {
  const raw = (window.location.hash || '#home').slice(1) as RouteName;
  return VALID_ROUTES.has(raw) ? raw : 'home';
}

export default function App() {
  const [route, setRoute] = useState<RouteName>(parseHash);
  const [user, setUser] = useState<UserAccount | null>(getCurrentUser);
  const [flash, setFlash] = useState('');
  const [toastText, setToastText] = useState('');

  const [careerFilter, setCareerFilter] = useState<FilterState>({
    q: '',
    cat: 'All',
  });
  const [courseFilter, setCourseFilter] = useState<FilterState>({
    q: '',
    cat: 'All',
  });
  const [collegeFilter, setCollegeFilter] = useState<FilterState>({
    q: '',
    cat: 'All',
  });

  const showToast = useCallback((msg: string) => {
    setToastText(msg);
  }, []);

  useEffect(() => {
    if (!toastText) return;
    const t = setTimeout(() => setToastText(''), 2600);
    return () => clearTimeout(t);
  }, [toastText]);

  useEffect(() => {
    const onHashChange = () => {
      const next = parseHash();
      setRoute(next);
      window.scrollTo(0, 0);
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const effectiveRoute: RouteName =
    route === 'profile' && !user ? 'login' : route;

  const handleHeroSearch = (rawQuery: string) => {
    const q = rawQuery.trim().toLowerCase();
    setCareerFilter({ q, cat: 'All' });
    setCourseFilter({ q, cat: 'All' });

    const inCareers = CAREERS.some((c) =>
      [c.name, c.field, c.blurb, c.path, ...c.skills, ...c.kw]
        .join(' ')
        .toLowerCase()
        .includes(q)
    );
    const inCourses = COURSES.some((c) =>
      [c.name, c.field, c.blurb, c.elig].join(' ').toLowerCase().includes(q)
    );

    window.location.hash = inCareers || !inCourses ? '#careers' : '#courses';
  };

  const handleLogout = () => {
    logoutUser();
    setUser(null);
    showToast('You have been logged out');
    if (window.location.hash === '#profile') {
      window.location.hash = '#home';
    }
  };

  const handleNavigateCourses = (category: string) => {
    setCourseFilter({ q: '', cat: category });
    window.location.hash = '#courses';
  };

  const handleSaveQuizResult = (result: SavedQuizResult) => {
    const updated = saveQuizResultToProfile(result);
    if (updated) {
      setUser(updated);
      showToast('Quiz results saved to your profile');
    }
  };

  const renderPage = () => {
    switch (effectiveRoute) {
      case 'home':
        return <HomePage user={user} onHeroSearch={handleHeroSearch} />;
      case 'careers':
        return (
          <CareersPage
            filter={careerFilter}
            onFilterChange={setCareerFilter}
          />
        );
      case 'courses':
        return (
          <CoursesPage
            filter={courseFilter}
            onFilterChange={setCourseFilter}
          />
        );
      case 'colleges':
        return (
          <CollegesPage
            filter={collegeFilter}
            onFilterChange={setCollegeFilter}
          />
        );
      case 'scholarships':
        return <ScholarshipsPage />;
      case 'exams':
        return <ExamsPage />;
      case 'assistant':
        return <AssistantPage />;
      case 'quiz':
        return (
          <CareerQuizPage
            user={user}
            onSaveQuizResult={handleSaveQuizResult}
            onNavigateCourses={handleNavigateCourses}
            onNavigateExams={() => {
              window.location.hash = '#exams';
            }}
            onNavigateScholarships={() => {
              window.location.hash = '#scholarships';
            }}
          />
        );
      case 'about':
        return <AboutPage />;
      case 'contact':
        return <ContactPage />;
      case 'register':
        return (
          <RegisterPage
            onAuthSuccess={(u, msg) => {
              setUser(u);
              showToast(msg);
              window.location.hash = '#profile';
            }}
          />
        );
      case 'login':
        return (
          <LoginPage
            flashMessage={
              flash ||
              (route === 'profile' && !user
                ? 'Please log in to see your profile.'
                : '')
            }
            onAuthSuccess={(u, msg) => {
              setFlash('');
              setUser(u);
              showToast(msg);
              window.location.hash = '#profile';
            }}
          />
        );
      case 'forgot-password':
        return (
          <ForgotPasswordPage
            onPasswordUpdated={(msg) => {
              setFlash(msg);
              window.location.hash = '#login';
            }}
          />
        );
      case 'profile':
        return user ? (
          <ProfilePage
            user={user}
            onSaveProfile={(updated) => {
              setUser(updated);
              showToast('Profile saved');
            }}
            onLogout={handleLogout}
            onNavigateCourses={handleNavigateCourses}
          />
        ) : null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header
        currentRoute={effectiveRoute}
        user={user}
        onLogout={handleLogout}
      />
      <main className="flex-1">{renderPage()}</main>
      <Footer />
      <div
        role="status"
        aria-live="polite"
        className={`fixed left-1/2 bottom-6 -translate-x-1/2 bg-[var(--fg)] text-[var(--bg)] px-4.5 py-2.5 rounded-[10px] text-[14px] pointer-events-none transition-all duration-250 z-40 max-w-[90vw] ${
          toastText ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
        }`}
      >
        {toastText}
      </div>
    </div>
  );
}
