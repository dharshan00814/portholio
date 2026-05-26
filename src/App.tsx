import { useEffect, useState } from 'react';
import MatrixBackground from './components/MatrixBackground';

type Stat = {
  value: string;
  label: string;
};

type SkillGroup = {
  title: string;
  items: string[];
};

type Project = {
  title: string;
  status: string;
  description: string;
  stack: string[];
};

type Certification = {
  title: string;
  source: string;
  detail: string;
  status: string;
  note: string;
};

const stats: Stat[] = [
  { value: '7+', label: 'GitHub Repositories' },
  { value: '8+', label: 'HackerRank Solved' },
  { value: '4+', label: 'Projects Completed' },
  { value: '2nd', label: 'Current Semester' }
];

const skillGroups: SkillGroup[] = [
  {
    title: 'Cybersecurity',
    items: ['Linux', 'Scanning', 'Networking Basics', 'Security Basics', 'Python Automation', 'Ethical Hacking']
  },
  {
    title: 'Web Development',
    items: ['HTML5', 'CSS3', 'JavaScript', 'Flask', 'Responsive Design', 'Frontend Development']
  },
  {
    title: 'Programming & Tools',
    items: ['Python', 'Git', 'GitHub', 'Machine Learning', 'NLP', 'Problem Solving']
  },
  {
    title: 'Database & Others',
    items: ['Data Structures', 'Algorithms', 'Web Security', 'UI/UX Design']
  }
];

const projects: Project[] = [
  {
    title: 'Phishing Detector',
    status: 'Completed',
    description:
      'A phishing URL detection project that identifies suspicious websites through a clean and accessible interface using machine learning models.',
    stack: ['HTML5', 'CSS3', 'JavaScript', 'Python', 'Flask', 'Machine Learning']
  },
  {
    title: 'AI Resume Screening',
    status: 'Completed',
    description:
      'An AI-powered resume screening tool that analyzes candidate profiles and highlights key matches for faster shortlisting using NLP techniques.',
    stack: ['Python', 'NLP', 'Machine Learning']
  },
  {
    title: 'Tic-Tac-Toe Game',
    status: 'Completed',
    description:
      'A fun and interactive Tic-Tac-Toe game built with clean frontend logic, offering smooth gameplay and a responsive user experience.',
    stack: ['HTML5', 'CSS3', 'JavaScript', 'Game Logic']
  },
  {
    title: 'Personal Portfolio',
    status: 'Completed',
    description:
      'A live professional portfolio showcasing skills and projects, built with a focus on performance and modern aesthetics.',
    stack: ['HTML5', 'CSS3', 'JavaScript']
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

const terminalScript = [
  'Initializing secure connection...',
  'Access granted: J.M Dharshan',
  'Role: CS Student | Aspiring Cybersecurity Engineer',
  'Mission: Securing systems, one vulnerability at a time',
  'System ready.'
];

function SectionTitle({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="section-title">
      <span className="section-eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
    </div>
  );
}

function Icon({ children }: { children: React.ReactNode }) {
  return <span className="icon">{children}</span>;
}

function App() {
  const [revealedLines, setRevealedLines] = useState<string[]>([]);
  const [activeLine, setActiveLine] = useState('');
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [profileLoaded, setProfileLoaded] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (lineIndex >= terminalScript.length) {
      return;
    }

    const currentLine = terminalScript[lineIndex];
    const delay = charIndex < currentLine.length ? 28 : 650;

    const timer = window.setTimeout(() => {
      if (charIndex < currentLine.length) {
        setActiveLine(currentLine.slice(0, charIndex + 1));
        setCharIndex((previous) => previous + 1);
        return;
      }

      setRevealedLines((previous) => [...previous, currentLine]);
      setActiveLine('');
      setLineIndex((previous) => previous + 1);
      setCharIndex(0);
    }, delay);

    return () => window.clearTimeout(timer);
  }, [charIndex, lineIndex]);

  return (
    <div className="page-shell">
      <MatrixBackground />
      <header className="topbar">
        <a className="brand" href="#hero" aria-label="CyberSec home">
          <span className="brand-mark" aria-hidden="true">
            ⛨
          </span>
          <span>CYBERSEC</span>
        </a>

        <nav className={`topnav ${mobileMenuOpen ? 'mobile-open' : ''}`} aria-label="Main Navigation">
          <ul>
            <li><a href="#about">About</a></li>
            <li><a href="#skills">Skills</a></li>
            <li><a href="#projects">Projects</a></li>
            <li><a href="#certifications">Certifications</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </nav>
        <button className="menu-toggle" aria-label="Toggle navigation" onClick={() => setMobileMenuOpen((s) => !s)}>
          ☰
        </button>

        <a className="resume-button" href="/resume-placeholder.txt" download>
          <Icon>⇩</Icon>
          Resume
        </a>
      </header>

      <main>
        <section className="hero" id="hero">
          <div className="hero-layout">
            <div className="hero-media" aria-hidden="true">
              <div className="hero-video-wrap" aria-hidden="true">
                <video className="hero-video" src="/animation.mp4" autoPlay loop muted playsInline />
              </div>
              <div className="scanlines" />
              <div className="portrait-frame">
                <div className="portrait-glow" />
                <div className="portrait-orbit portrait-orbit-top-left" />
                <div className="portrait-orbit portrait-orbit-top-right" />
                <div className="portrait-orbit portrait-orbit-bottom-left" />
                <div className="portrait-orbit portrait-orbit-bottom-right" />
                <div className={`portrait-avatar${profileLoaded ? ' portrait-avatar--loaded' : ''}`}>
                  <div className="portrait-overlay" aria-hidden="true" />
                  <div className="portrait-overlay portrait-overlay--glitch" aria-hidden="true" />
                  <div className="portrait-overlay portrait-overlay--scan" aria-hidden="true" />
                  <img
                    className="portrait-photo"
                    src="/profile.jpg"
                    alt="J.M Dharshan profile portrait"
                    decoding="async"
                    onLoad={() => setProfileLoaded(true)}
                    onError={() => setProfileLoaded(false)}
                  />
                  {!profileLoaded ? (
                    <div className="portrait-placeholder">
                      <span>J.M</span>
                      <small>Dharshan</small>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>

            <div className="hero-copy">
              <p className="hero-eyebrow">&gt; secure terminal / live status</p>
              <h1 className="hero-title">J.M Dharshan</h1>
              <p className="hero-subtitle">CS Student | Aspiring Cybersecurity Engineer</p>

              <div className="terminal-card hero-terminal">
                <div className="terminal-header">
                  <span className="terminal-prompt">root@cybersec:~$</span>
                  <span className="terminal-state">secure session established</span>
                </div>

                <div className="terminal-body terminal-body--animated" aria-live="polite" aria-atomic="false">
                  <div className="terminal-line terminal-line--prompt">
                    <span className="terminal-chevron">&gt;</span>
                    <span className="terminal-text terminal-text--dim">root@cybersec:~$</span>
                  </div>

                  {revealedLines.map((line) => (
                    <div className="terminal-line" key={line}>
                      <span className="terminal-chevron">&gt;</span>
                      <span className="terminal-text">{line}</span>
                    </div>
                  ))}

                  {lineIndex < terminalScript.length ? (
                    <div className="terminal-line terminal-line--typing terminal-line--active">
                      <span className="terminal-chevron">&gt;</span>
                      <span className="terminal-text">
                        {activeLine}
                        <span className="terminal-cursor" aria-hidden="true" />
                      </span>
                    </div>
                  ) : (
                    <div className="terminal-line terminal-line--typing terminal-line--complete terminal-line--active">
                      <span className="terminal-chevron">&gt;</span>
                      <span className="terminal-text">
                        {terminalScript[terminalScript.length - 1]}
                        <span className="terminal-cursor" aria-hidden="true" />
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="stats-strip" aria-label="Highlights">
          {stats.map((stat) => (
            <article className="stat-card" key={stat.label}>
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </article>
          ))}
        </section>

        <section className="content-block about-block" id="about">
          <SectionTitle eyebrow=">" title="About_Me" />
          <div className="about-grid">
            <p className="lead-copy">
              Motivated first-year Computer Science and Engineering student at Stella Mary's College of Engineering (2025-2029). My journey in tech is driven by a strong curiosity for how things work and a desire to build impactful digital solutions. I am passionate about cybersecurity and ethical hacking, focusing on continuous learning and applying modern best practices in every project I undertake.
            </p>

            <div className="about-panel">
              <div className="info-row">
                <Icon>@</Icon>
                <span>jdharshan2@gmail.com</span>
              </div>
              <div className="info-row">
                <Icon>⌁</Icon>
                <span>Tamil Nadu, India</span>
              </div>
              <div className="education-card">
                <p>B.E. Computer Science and Engineering</p>
                <p>Stella Mary's College of Engineering ( 2025 - 2029 )</p>
              </div>
            </div>
          </div>
        </section>

        <section className="content-block" id="skills">
          <SectionTitle eyebrow=">" title="Skills" />
          <div className="skills-grid">
            {skillGroups.map((group) => (
              <article className="skill-card" key={group.title}>
                <div className="skill-card-title">
                  <Icon>▣</Icon>
                  <h3>{group.title}</h3>
                </div>
                <div className="chips">
                  {group.items.map((skill) => (
                    <span className="chip" key={skill}>
                      {skill}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="content-block" id="projects">
          <SectionTitle eyebrow=">" title="Projects" />
          <div className="projects-grid">
            {projects.map((project) => (
              <article className="project-card" key={project.title}>
                <div className="project-heading">
                  <div>
                    <h3>{project.title}</h3>
                    <span className="status-pill">{project.status}</span>
                  </div>
                  <p>{project.description}</p>
                </div>

                <div className="chips project-chips">
                  {project.stack.map((item) => (
                    <span className="chip" key={item}>
                      {item}
                    </span>
                  ))}
                </div>

                <div className="project-actions">
                  <a className="action-button primary" href="#contact">
                    <Icon>↗</Icon>
                    Live Demo
                  </a>
                  <a className="action-button" href="#about">
                    <Icon>{'{'}</Icon>
                    Code
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="content-block" id="certifications">
          <SectionTitle eyebrow=">" title="Certifications" />
          <div className="cert-grid">
            {certifications.map((cert) => (
              <article className="cert-card" key={cert.title}>
                <div className="cert-topline">
                  <div>
                    <h3>{cert.title}</h3>
                    <span>{cert.source}</span>
                  </div>
                  <span className="status-pill">{cert.status}</span>
                </div>
                <p>{cert.detail}</p>
                <strong>{cert.note}</strong>
              </article>
            ))}
          </div>
        </section>

        <section className="content-block contact-block" id="contact">
          <SectionTitle eyebrow=">" title="Get_In_Touch" />
          <div className="contact-layout">
            <p className="lead-copy contact-copy">
              Interested in collaboration or have security questions? Let's connect!
            </p>

            <div className="contact-grid">
              <a className="contact-card" href="mailto:jdharshan2@gmail.com">
                <Icon>@</Icon>
                <span>Email</span>
                <strong>jdharshan2@gmail.com</strong>
              </a>
              <a className="contact-card" href="tel:+919894670423">
                <Icon>☎</Icon>
                <span>Phone</span>
                <strong>+91 9894670423</strong>
              </a>
            </div>

            <div className="social-row" aria-label="Social links">
              <a className="social-button" href="#hero" aria-label="GitHub profile placeholder">
                in
              </a>
              <a className="social-button" href="#hero" aria-label="Instagram profile placeholder">
                ig
              </a>
              <a className="social-button" href="#hero" aria-label="LinkedIn profile placeholder">
                li
              </a>
              <a className="social-button" href="#hero" aria-label="Telegram profile placeholder">
                tg
              </a>
            </div>

            <div className="contact-actions">
              <a className="action-button primary" href="mailto:jdharshan2@gmail.com">
                <Icon>✉</Icon>
                Send Email
              </a>
              <a className="action-button" href="/resume-placeholder.txt" download>
                <Icon>⇩</Icon>
                Download Resume
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <span>CYBERSEC</span>
        <span>Built with React and a terminal-first visual system</span>
      </footer>
    </div>
  );
}

export default App;