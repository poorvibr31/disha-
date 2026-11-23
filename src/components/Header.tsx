import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { UserAccount } from '../utils/auth';
import { DishaBrandLockup } from './DishaLogo';

export type RouteName =
  | 'home'
  | 'careers'
  | 'courses'
  | 'colleges'
  | 'scholarships'
  | 'exams'
  | 'assistant'
  | 'quiz'
  | 'about'
  | 'contact'
  | 'register'
  | 'login'
  | 'forgot-password'
  | 'profile';

interface HeaderProps {
  currentRoute: RouteName;
  user: UserAccount | null;
  onLogout: () => void;
}

const NAV_ITEMS: { route: RouteName; label: string; href: string }[] = [
  { route: 'home', label: 'Home', href: '#home' },
  { route: 'careers', label: 'Explore Careers', href: '#careers' },
  { route: 'courses', label: 'Courses', href: '#courses' },
  { route: 'colleges', label: 'Colleges', href: '#colleges' },
  { route: 'scholarships', label: 'Scholarships', href: '#scholarships' },
  { route: 'exams', label: 'Entrance Exams', href: '#exams' },
  { route: 'assistant', label: 'AI Career Assistant', href: '#assistant' },
  { route: 'quiz', label: 'Career Quiz', href: '#quiz' },
  { route: 'about', label: 'About Us', href: '#about' },
  { route: 'contact', label: 'Contact Us', href: '#contact' },
];

export const Header: React.FC<HeaderProps> = ({
  currentRoute,
  user,
  onLogout,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="sticky top-0 z-20 bg-[var(--surface)] border-b border-[var(--line)]">
      <div className="max-w-[1380px] mx-auto px-4 sm:px-6 h-[78px] flex items-center justify-between gap-3 xl:gap-5">
        {/* Prominent Disha Career Brand Lockup */}
        <a
          href="#home"
          onClick={closeMenu}
          aria-label="Disha Career Portal home"
          className="flex items-center no-underline text-[var(--fg)] shrink-0 group py-1"
        >
          <DishaBrandLockup variant="header" />
        </a>

        {/* Desktop Navigation Links (Center Zone) */}
        <nav
          aria-label="Main"
          className="hidden min-[1280px]:flex items-center justify-center gap-0.5 2xl:gap-1 flex-1 min-w-0"
        >
          {NAV_ITEMS.map((item) => {
            const active = currentRoute === item.route;
            return (
              <a
                key={item.route}
                href={item.href}
                className={`px-1.5 min-[1360px]:px-2 2xl:px-2.5 py-2 rounded-lg text-[12.5px] min-[1360px]:text-[13px] 2xl:text-[13.5px] font-medium whitespace-nowrap shrink-0 no-underline transition-colors ${
                  active
                    ? 'text-[var(--blue)] bg-[var(--blue-soft)] font-semibold'
                    : 'text-[var(--fg)] hover:bg-[var(--surface2)]'
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* Desktop Auth Actions (Right Zone) */}
        <div className="hidden min-[1280px]:flex items-center gap-2 shrink-0">
          {user ? (
            <>
              <a
                href="#profile"
                className="inline-flex items-center justify-center h-9.5 px-3.5 rounded-[10px] text-[13px] min-[1360px]:text-[13.5px] font-semibold border-[1.5px] border-[var(--blue)] text-[var(--blue)] bg-transparent hover:-translate-y-px transition-transform whitespace-nowrap shrink-0 no-underline"
              >
                My profile
              </a>
              <button
                type="button"
                onClick={onLogout}
                className="inline-flex items-center justify-center h-9.5 px-3.5 rounded-[10px] text-[13px] min-[1360px]:text-[13.5px] font-semibold bg-[var(--surface2)] text-[var(--fg)] border-[1.5px] border-transparent hover:-translate-y-px transition-transform whitespace-nowrap shrink-0 cursor-pointer"
              >
                Log out
              </button>
            </>
          ) : (
            <>
              <a
                href="#login"
                className="inline-flex items-center justify-center h-9.5 px-3.5 rounded-[10px] text-[13px] min-[1360px]:text-[13.5px] font-semibold border-[1.5px] border-[var(--blue)] text-[var(--blue)] bg-transparent hover:-translate-y-px transition-transform whitespace-nowrap shrink-0 no-underline"
              >
                Log in
              </a>
              <a
                href="#register"
                className="inline-flex items-center justify-center h-9.5 px-3.5 rounded-[10px] text-[13px] min-[1360px]:text-[13.5px] font-semibold bg-[var(--blue)] text-[var(--blue-ink)] border-[1.5px] border-transparent hover:-translate-y-px hover:shadow-[0_6px_16px_rgba(44,88,232,0.35)] transition-all whitespace-nowrap shrink-0 no-underline"
              >
                Register
              </a>
            </>
          )}
        </div>

        {/* Mobile / Tablet Menu Button */}
        <button
          type="button"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-nav"
          className="min-[1280px]:hidden grid place-items-center w-11 h-11 rounded-[10px] border border-[var(--line)] bg-transparent text-[var(--fg)] cursor-pointer shrink-0"
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile / Tablet Dropdown Menu */}
      {menuOpen && (
        <nav
          id="mobile-nav"
          aria-label="Main mobile"
          className="min-[1280px]:hidden border-t border-[var(--line)] bg-[var(--surface)] px-4 sm:px-6 pt-2 pb-4 flex flex-col gap-0.5 max-h-[calc(100vh-84px)] overflow-y-auto shadow-lg"
        >
          {NAV_ITEMS.map((item) => {
            const active = currentRoute === item.route;
            return (
              <a
                key={item.route}
                href={item.href}
                onClick={closeMenu}
                className={`px-3 py-2.5 rounded-lg text-[15px] font-medium no-underline transition-colors ${
                  active
                    ? 'text-[var(--blue)] bg-[var(--blue-soft)] font-semibold'
                    : 'text-[var(--fg)] hover:bg-[var(--surface2)]'
                }`}
              >
                {item.label}
              </a>
            );
          })}
          <div className="flex items-center gap-2.5 flex-wrap pt-3 mt-2 border-t border-[var(--line)]">
            {user ? (
              <>
                <a
                  href="#profile"
                  onClick={closeMenu}
                  className="inline-flex items-center justify-center min-h-[42px] px-4 rounded-[10px] text-[14px] font-semibold border-[1.5px] border-[var(--blue)] text-[var(--blue)] no-underline"
                >
                  My profile
                </a>
                <button
                  type="button"
                  onClick={() => {
                    closeMenu();
                    onLogout();
                  }}
                  className="inline-flex items-center justify-center min-h-[42px] px-4 rounded-[10px] text-[14px] font-semibold bg-[var(--surface2)] text-[var(--fg)] cursor-pointer"
                >
                  Log out
                </button>
              </>
            ) : (
              <>
                <a
                  href="#login"
                  onClick={closeMenu}
                  className="inline-flex items-center justify-center min-h-[42px] px-4 rounded-[10px] text-[14px] font-semibold border-[1.5px] border-[var(--blue)] text-[var(--blue)] no-underline"
                >
                  Log in
                </a>
                <a
                  href="#register"
                  onClick={closeMenu}
                  className="inline-flex items-center justify-center min-h-[42px] px-4 rounded-[10px] text-[14px] font-semibold bg-[var(--blue)] text-[var(--blue-ink)] no-underline"
                >
                  Register
                </a>
              </>
            )}
          </div>
        </nav>
      )}
    </header>
  );
};
