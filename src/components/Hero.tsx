import { useEffect, useState, useRef, useCallback } from 'react';

const terminalScript = [
  'Initializing secure connection...',
  'Encrypting communication channel...',
  'Access granted: J.M Dharshan',
  'Role: CS Student | Aspiring Cybersecurity Engineer',
  'Mission: Securing systems, one vulnerability at a time',
  '> System ready. All protocols active.'
];

export default function Hero() {
  const [revealedLines, setRevealedLines] = useState<string[]>([]);
  const [activeLine, setActiveLine] = useState('');
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [animDone, setAnimDone] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    if (lineIndex >= terminalScript.length) {
      setAnimDone(true);
      return;
    }
    const currentLine = terminalScript[lineIndex];
    const delay = charIndex < currentLine.length ? 30 : 500;

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

  const handleImageLoad = useCallback(() => setImageLoaded(true), []);

  return (
    <section className="neo-hero" id="hero">
      <div className="neo-hero-inner">
        {/* LEFT: Terminal */}
        <div className="neo-left">
          <div className="terminal-card neo-terminal">
            <div className="terminal-header">
              <div className="terminal-dots">
                <span className="dot dot--red" />
                <span className="dot dot--yellow" />
                <span className="dot dot--green" />
              </div>
              <span className="terminal-title">root@cybersec:~$</span>
              <span className="terminal-status">
                <span className="status-indicator" />
                secure
              </span>
            </div>

            <div className="terminal-body" aria-live="polite">
              {revealedLines.map((line, i) => (
                <div className="terminal-line" key={i}>
                  <span className="terminal-chevron">❯</span>
                  <span className="terminal-text">{line}</span>
                </div>
              ))}

              {lineIndex < terminalScript.length ? (
                <div className="terminal-line terminal-line--typing terminal-line--active">
                  <span className="terminal-chevron">❯</span>
                  <span className="terminal-text">
                    {activeLine}
                    <span className="terminal-cursor" aria-hidden="true" />
                  </span>
                </div>
              ) : (
                <div className="terminal-line terminal-line--complete terminal-line--active">
                  <span className="terminal-chevron">❯</span>
                  <span className="terminal-text">
                    <span className="terminal-cursor" aria-hidden="true" />
                  </span>
                </div>
              )}
            </div>

            <div className={`neo-identity ${animDone ? 'neo-identity--visible' : ''}`}>
              <h1 className="neo-name">J.M Dharshan</h1>
              <p className="neo-sub">CS Student | Aspiring Cybersecurity Engineer</p>
              <p className="neo-tag">
                <span className="neo-tag-icon">🔒</span>
                Securing systems, one vulnerability at a time
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT: Profile */}
        <div className="neo-right" aria-hidden="true">
          <div className="neo-profile">
            <div className="neo-profile-glow" />
            <div className="neo-profile-pulse" />

            {/* Rotating rings */}
            <div className="neo-ring neo-ring--outer" />
            <div className="neo-ring neo-ring--inner" />

            {/* Corner brackets */}
            <div className="neo-target top-left" />
            <div className="neo-target top-right" />
            <div className="neo-target bottom-left" />
            <div className="neo-target bottom-right" />

            {/* Avatar */}
            <div className={`portrait-avatar ${imageLoaded ? 'portrait-avatar--loaded' : ''}`}>
              <img
                ref={imgRef}
                className="portrait-photo"
                src="/profile.jpg"
                alt="J.M Dharshan"
                onLoad={handleImageLoad}
                loading="eager"
              />
              {/* Scanning line */}
              <div className="portrait-scanline" />
              {/* Glitch overlay */}
              <div className="portrait-overlay portrait-overlay--glitch" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
