import React, { useEffect, useState } from 'react';

const terminalScript = [
  'Initializing secure connection...',
  'Access granted: J.M Dharshan',
  'Role: CS Student | Aspiring Cybersecurity Engineer',
  'Mission: Securing systems, one vulnerability at a time',
  'System ready.'
];

export default function Hero() {
  const [revealedLines, setRevealedLines] = useState<string[]>([]);
  const [activeLine, setActiveLine] = useState('');
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    if (lineIndex >= terminalScript.length) return;
    const currentLine = terminalScript[lineIndex];
    const delay = charIndex < currentLine.length ? 28 : 650;

    const timer = window.setTimeout(() => {
      if (charIndex < currentLine.length) {
        setActiveLine(currentLine.slice(0, charIndex + 1));
        setCharIndex((p) => p + 1);
        return;
      }

      setRevealedLines((p) => [...p, currentLine]);
      setActiveLine('');
      setLineIndex((p) => p + 1);
      setCharIndex(0);
    }, delay);

    return () => window.clearTimeout(timer);
  }, [charIndex, lineIndex]);

  return (
    <section className="neo-hero" id="hero">
      <div className="neo-hero-inner">
        <div className="neo-left">
          <div className="terminal-card neo-terminal">
            <div className="terminal-header">
              <span className="terminal-prompt">root@cybersec:~$</span>
              <span className="terminal-state">secure session established</span>
            </div>

            <div className="terminal-body" aria-live="polite">
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
                  <span className="terminal-text">{terminalScript[terminalScript.length - 1]}<span className="terminal-cursor" aria-hidden="true" /></span>
                </div>
              )}
            </div>

            <div className="neo-identity">
              <h1 className="neo-name">J.M Dharshan</h1>
              <p className="neo-sub">CS Student | Aspiring Cybersecurity Engineer</p>
              <p className="neo-tag">Securing systems, one vulnerability at a time</p>
            </div>
          </div>
        </div>

        <div className="neo-right" aria-hidden="true">
          <div className="neo-profile">
            <div className="neo-profile-glow" />
            <div className="neo-profile-ring" />
            <div className="neo-target top-left" />
            <div className="neo-target top-right" />
            <div className="neo-target bottom-left" />
            <div className="neo-target bottom-right" />
            <div className={`portrait-avatar portrait-avatar--loaded`}>
              <img className="portrait-photo" src="/profile.jpg" alt="profile" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
