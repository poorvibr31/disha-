import React from 'react';
import { DishaBrandLockup } from './DishaLogo';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[var(--hero)] text-[var(--hero-muted)] py-10">
      <div className="max-w-[1180px] mx-auto px-4 sm:px-6">
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <a
              href="#home"
              aria-label="Disha Career Portal home"
              className="inline-flex items-center no-underline group mb-3"
            >
              <DishaBrandLockup variant="footer" />
            </a>
            <p className="text-[14px] leading-relaxed">
              Reliable information on careers, courses, colleges, entrance exams and scholarships, in one place for students.
            </p>
          </div>
          <div>
            <h4 className="text-white text-[15px] font-bold mb-2.5">Explore</h4>
            <div className="flex flex-col">
              <a href="#careers" className="text-[var(--hero-muted)] hover:text-white no-underline py-0.5 text-[14px]">Careers</a>
              <a href="#courses" className="text-[var(--hero-muted)] hover:text-white no-underline py-0.5 text-[14px]">Courses</a>
              <a href="#colleges" className="text-[var(--hero-muted)] hover:text-white no-underline py-0.5 text-[14px]">Colleges</a>
              <a href="#scholarships" className="text-[var(--hero-muted)] hover:text-white no-underline py-0.5 text-[14px]">Scholarships</a>
              <a href="#exams" className="text-[var(--hero-muted)] hover:text-white no-underline py-0.5 text-[14px]">Entrance exams</a>
              <a href="#quiz" className="text-[var(--hero-muted)] hover:text-white no-underline py-0.5 text-[14px]">Career quiz</a>
            </div>
          </div>
          <div>
            <h4 className="text-white text-[15px] font-bold mb-2.5">Contact</h4>
            <p className="text-[14px] leading-relaxed">
              Email: hello@disha.example<br />
              Phone: +91 00000 00000<br />
              Mon to Sat, 10 am to 6 pm IST
            </p>
          </div>
          <div>
            <h4 className="text-white text-[15px] font-bold mb-2.5">Follow us</h4>
            <p className="text-[14px] leading-relaxed">
              Instagram · LinkedIn · YouTube · X<br />
              <span className="text-[12.5px]">(social handles to be added)</span>
            </p>
          </div>
        </div>
        <div className="border-t border-white/15 mt-7 pt-4 text-[13px]">
          © 2026 Disha Career Portal. Always confirm dates, fees and eligibility on the official website of the exam, college or scholarship before applying.
        </div>
      </div>
    </footer>
  );
};
