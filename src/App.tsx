import { useEffect, useState, useRef } from 'react';
import MatrixBackground from './components/MatrixBackground';
import Hero from './components/Hero';

/* ── Data ──────────────────────────────────────────────────────── */

type Stat = { value: string; label: string; icon: string };
type SkillGroup = { title: string; icon: string; items: string[] };
type Project = { title: string; status: 'Completed' | 'In Progress'; description: string; stack: string[]; demo?: string; code?: string };
type Certification = { title: string; source: string; detail: string; status: 'Completed' | 'In Progress'; note: string };

const stats: Stat[] = [
  { value: '7+', label: 'GitHub Repositories', icon: '📂' },
  { value: '8+', label: 'HackerRank Solved', icon: '🏆' },
  { value: '4+', label: 'Projects Completed', icon: '🚀' },
  { value: '2nd', label: 'Current Semester', icon: '📚' }
];

const skillGroups: SkillGroup[] = [
  {
    title: 'Cybersecurity',
    icon: '🛡️',
    items: ['Linux', 'Scanning', 'Networking Basics', 'Security Basics', 'Python Automation', 'Ethical Hacking']
  },
  {
    title: 'Web Development',
    icon: '🌐',
    items: ['HTML5', 'CSS3', 'JavaScript', 'Flask', 'Responsive Design', 'Frontend Development']
  },
  {
    title: 'Programming & Tools',
    icon: '⚙️',
    items: ['Python', 'Git', 'GitHub', 'Machine Learning', 'NLP', 'Problem Solving']
  },
  {
    title: 'Database & Others',
    icon: '🗄️',
    items: ['Data Structures', 'Algorithms', 'Web Security', 'UI/UX Design']
  }
];

const projects: Project[] = [
  {
    title: 'Phishing Detector',
    status: 'Completed',
    description: 'A phishing URL detection project that identifies suspicious websites through a clean and accessible interface using machine learning models.',
    stack: ['HTML5', 'CSS3', 'JavaScript', 'Python', 'Flask', 'Machine Learning'],
    demo: '#',
    code: '#'
  },
  {
    title: 'AI Resume Screening',
    status: 'Completed',
    description: 'An AI-powered resume screening tool that analyzes candidate profiles and highlights key matches for faster shortlisting using NLP techniques.',
    stack: ['Python', 'NLP', 'Machine Learning'],
    demo: '#',
    code: '#'
  },
  {
    title: 'Tic-Tac-Toe Game',
    status: 'Completed',
    description: 'A fun and interactive Tic-Tac-Toe game built with clean frontend logic, offering smooth gameplay and a responsive user experience.',
    stack: ['HTML5', 'CSS3', 'JavaScript', 'Game Logic'],
    demo: '#',
    code: '#'
  },
  {
    title: 'Personal Portfolio',
    status: 'Completed',
    description: 'A live professional portfolio showcasing skills and projects, built with a focus on performance and modern aesthetics.',
    stack: ['HTML5', 'CSS3', 'JavaScript'],
    demo: '#',
    code: '#'
  }
];

const certifications: Certification[] = [
  {
    title: 'Python Programming',
    source: 'HackerRank',
    detail: 'Actively solving programming challenges',
    status: 'In Progress',
    note: '8 Questions Solved'
  },
  {
    title: 'Cybersecurity Fundamentals',
    source: 'Self Learning',
    detail: 'Security basics and ethical hacking',
    status: 'In Progress',
    note: 'Ongoing'
  },
  {
    title: 'Web Development',
    source: 'Projects & Practice',
    detail: 'Built multiple web applications',
    status: 'Completed',
    note: '2024 - Present'
  },
  {
    title: 'Machine Learning Basics',
    source: 'Self Learning',
    detail: 'Applied ML in phishing detection & resume screening',
    status: 'In Progress',
    note: '2024'
  }
];

/* ── SVG Icons ─────────────────────────────────────────────────── */

function ShieldIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}

function ExternalLinkIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

function CodeIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <polyline points="22,7 12,13 2,7" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}

function MapPinIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function GithubIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

function LinkedinIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  );
}

function WhatsappIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function TerminalIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="4 17 10 11 4 5" />
      <line x1="12" y1="19" x2="20" y2="19" />
    </svg>
  );
}

function GraduationIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
      <path d="M6 12v5c3 3 9 3 12 0v-5" />
    </svg>
  );
}

/* ── Scroll animation hook ─────────────────────────────────────── */

function useScrollReveal() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.12 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, visible };
}

/* ── Section Title Component ───────────────────────────────────── */

function SectionTitle({ icon, title }: { icon: React.ReactNode; title: string }) {
  return (
    <div className="section-title">
      <span className="section-icon">{icon}</span>
      <span className="section-chevron">&gt;</span>
      <h2>{title}</h2>
      <span className="section-line" />
    </div>
  );
}

/* ── App ───────────────────────────────────────────────────────── */

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const statsRef = useScrollReveal();
  const aboutRef = useScrollReveal();
  const skillsRef = useScrollReveal();
  const projectsRef = useScrollReveal();
  const certsRef = useScrollReveal();
  const contactRef = useScrollReveal();

  // Close mobile menu on nav link click
  const handleNavClick = () => setMobileMenuOpen(false);

  return (
    <div className="page-shell">
      <MatrixBackground />

      {/* ── Navigation ──────────────────────────────────────── */}
      <header className="topbar">
        <a className="brand" href="#hero" aria-label="CyberSec home">
          <span className="brand-mark">
            <ShieldIcon />
          </span>
          <span>CYBERSEC</span>
        </a>

        <nav className={`topnav ${mobileMenuOpen ? 'mobile-open' : ''}`} aria-label="Main Navigation">
          <ul>
            <li><a href="#about" onClick={handleNavClick}>About</a></li>
            <li><a href="#skills" onClick={handleNavClick}>Skills</a></li>
            <li><a href="#projects" onClick={handleNavClick}>Projects</a></li>
            <li><a href="#certifications" onClick={handleNavClick}>Certifications</a></li>
            <li><a href="#contact" onClick={handleNavClick}>Contact</a></li>
          </ul>
        </nav>

        <div className="topbar-actions">
          <a className="resume-button" href="/resume-placeholder.txt" download>
            <DownloadIcon />
            Resume
          </a>
          <button
            className="menu-toggle"
            aria-label="Toggle navigation"
            onClick={() => setMobileMenuOpen((s) => !s)}
          >
            {mobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>
      </header>

      <main>
        {/* ── Hero ────────────────────────────────────────── */}
        <Hero />

        {/* ── Stats ───────────────────────────────────────── */}
        <section
          className={`stats-strip ${statsRef.visible ? 'fade-in' : 'fade-hidden'}`}
          aria-label="Highlights"
          ref={statsRef.ref as React.RefObject<HTMLElement>}
        >
          {stats.map((stat, i) => (
            <article className="stat-card" key={stat.label} style={{ animationDelay: `${i * 100}ms` }}>
              <span className="stat-icon">{stat.icon}</span>
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </article>
          ))}
        </section>

        {/* ── About ───────────────────────────────────────── */}
        <section
          className={`content-block about-block ${aboutRef.visible ? 'fade-in' : 'fade-hidden'}`}
          id="about"
          ref={aboutRef.ref as React.RefObject<HTMLElement>}
        >
          <SectionTitle icon={<TerminalIcon />} title="About_Me" />
          <div className="about-grid">
            <div className="lead-copy">
              <p>
                Motivated first-year Computer Science and Engineering student at Stella Mary's College
                of Engineering (2025-2029). My journey in tech is driven by a strong curiosity for how
                things work and a desire to build impactful digital solutions.
              </p>
              <p>
                I am passionate about <strong>cybersecurity</strong> and <strong>ethical hacking</strong>,
                focusing on continuous learning and applying modern best practices in every project I
                undertake. From phishing detection to AI-powered tools, I'm committed to making the
                digital world safer.
              </p>
            </div>

            <div className="about-panel">
              <div className="info-row">
                <span className="info-icon"><MailIcon /></span>
                <div>
                  <span className="info-label">Email</span>
                  <span className="info-value">jdharshan2@gmail.com</span>
                </div>
              </div>
              <div className="info-row">
                <span className="info-icon"><MapPinIcon /></span>
                <div>
                  <span className="info-label">Location</span>
                  <span className="info-value">Tamil Nadu, India</span>
                </div>
              </div>
              <div className="education-card">
                <span className="edu-icon"><GraduationIcon /></span>
                <div>
                  <p className="edu-degree">B.E. Computer Science and Engineering</p>
                  <p className="edu-college">Stella Mary's College of Engineering</p>
                  <p className="edu-year">2025 - 2029</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Skills ──────────────────────────────────────── */}
        <section
          className={`content-block ${skillsRef.visible ? 'fade-in' : 'fade-hidden'}`}
          id="skills"
          ref={skillsRef.ref as React.RefObject<HTMLElement>}
        >
          <SectionTitle icon={<ShieldIcon />} title="Skills" />
          <div className="skills-grid">
            {skillGroups.map((group, i) => (
              <article className="skill-card" key={group.title} style={{ animationDelay: `${i * 80}ms` }}>
                <div className="skill-card-header">
                  <span className="skill-emoji">{group.icon}</span>
                  <h3>{group.title}</h3>
                </div>
                <div className="chips">
                  {group.items.map((skill) => (
                    <span className="chip" key={skill}>{skill}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ── Projects ────────────────────────────────────── */}
        <section
          className={`content-block ${projectsRef.visible ? 'fade-in' : 'fade-hidden'}`}
          id="projects"
          ref={projectsRef.ref as React.RefObject<HTMLElement>}
        >
          <SectionTitle icon={<CodeIcon />} title="Projects" />
          <div className="projects-grid">
            {projects.map((project, i) => (
              <article className="project-card" key={project.title} style={{ animationDelay: `${i * 100}ms` }}>
                <div className="project-heading">
                  <div className="project-title-row">
                    <h3>{project.title}</h3>
                    <span className={`status-pill ${project.status === 'Completed' ? 'status--completed' : 'status--progress'}`}>
                      {project.status}
                    </span>
                  </div>
                  <p>{project.description}</p>
                </div>

                <div className="chips project-chips">
                  {project.stack.map((item) => (
                    <span className="chip" key={item}>{item}</span>
                  ))}
                </div>

                <div className="project-actions">
                  <a className="action-button primary" href={project.demo || '#'}>
                    <ExternalLinkIcon />
                    Live Demo
                  </a>
                  <a className="action-button secondary" href={project.code || '#'}>
                    <CodeIcon />
                    Code
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ── Certifications ──────────────────────────────── */}
        <section
          className={`content-block ${certsRef.visible ? 'fade-in' : 'fade-hidden'}`}
          id="certifications"
          ref={certsRef.ref as React.RefObject<HTMLElement>}
        >
          <SectionTitle icon={<GraduationIcon />} title="Certifications" />
          <div className="cert-grid">
            {certifications.map((cert, i) => (
              <article className="cert-card" key={cert.title} style={{ animationDelay: `${i * 100}ms` }}>
                <div className="cert-topline">
                  <div>
                    <h3>{cert.title}</h3>
                    <span className="cert-source">{cert.source}</span>
                  </div>
                  <span className={`status-pill ${cert.status === 'Completed' ? 'status--completed' : 'status--progress'}`}>
                    {cert.status}
                  </span>
                </div>
                <p>{cert.detail}</p>
                <strong className="cert-note">{cert.note}</strong>
              </article>
            ))}
          </div>
        </section>

        {/* ── Contact ─────────────────────────────────────── */}
        <section
          className={`content-block contact-block ${contactRef.visible ? 'fade-in' : 'fade-hidden'}`}
          id="contact"
          ref={contactRef.ref as React.RefObject<HTMLElement>}
        >
          <SectionTitle icon={<MailIcon />} title="Get_In_Touch" />
          <div className="contact-layout">
            <p className="contact-subtitle">
              Interested in collaboration or have security questions? Let's connect and build something amazing!
            </p>

            <div className="contact-grid">
              <a className="contact-card" href="mailto:jdharshan2@gmail.com" id="contact-email">
                <span className="contact-card-icon"><MailIcon /></span>
                <span className="contact-card-label">Email</span>
                <strong>jdharshan2@gmail.com</strong>
              </a>
              <a className="contact-card" href="tel:+919894670423" id="contact-phone">
                <span className="contact-card-icon"><PhoneIcon /></span>
                <span className="contact-card-label">Phone</span>
                <strong>+91 9894670423</strong>
              </a>
            </div>

            <div className="social-row" aria-label="Social links">
              <a className="social-button" href="https://github.com/dharshan00814" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <GithubIcon />
              </a>
              <a className="social-button" href="www.linkedin.com/in/dharshan-jm" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <LinkedinIcon />
              </a>
              <a className="social-button" href="https://www.instagram.com/candy_heart__2k/?__pwa=1" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <InstagramIcon />
              </a>
              <a className="social-button" href="https://wa.me/919894670423" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                <WhatsappIcon />
              </a>
            </div>

            <div className="contact-actions">
              <a className="action-button primary" href="mailto:jdharshan2@gmail.com">
                <MailIcon />
                Send Email
              </a>
              <a className="action-button secondary" href="c:\Users\Dharshan\Downloads\Resume.pdf" download>
                <DownloadIcon />
                Download Resume
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* ── Footer ──────────────────────────────────────────── */}
      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-brand">
            <ShieldIcon />
            <span>CYBERSEC</span>
          </div>
          <p className="footer-copy">© {new Date().getFullYear()} J.M Dharshan. All rights reserved.</p>
          <p className="footer-tagline">Built with React | Secured with passion 🔐</p>
        </div>
      </footer>
    </div>
  );
}

export default App;