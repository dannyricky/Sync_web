"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // fallback: if animationend doesn't fire for any reason, hide after 4.2s
    const fallback = setTimeout(() => setLoading(false), 4200);
    return () => clearTimeout(fallback);
  }, []);

  return (
    <div className="page-root">
      {/* Loader overlay */}
      {loading && (
        <div className="loader-overlay" role="status" aria-live="polite" aria-label="Loading">
          <div className="loader-inner">
            <div className="sync">SYNC</div>

            <div className="loader-bar" aria-hidden>
              {/* animate this element from left to right over 4s */}
              <div
                className="loader-progress"
                onAnimationEnd={() => {
                  // animation finished -> show content
                  setLoading(false);
                }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Main site content kept in DOM but hidden while loading to avoid reflow */}
      <div
        className="site-content"
        role="main"
        aria-labelledby="hero-heading"
        style={{ display: loading ? "none" : undefined }}
      >
        <header className="top-nav">
          <div className="nav-left">
            <div className="nav-logo">S<span className="accent">YNC</span></div>
            <nav className="nav-links">
              <a>How it works</a>
              <a>Features</a>
              <a>Community</a>
              <a>About</a>
            </nav>
          </div>
          <div className="nav-right">
            <button className="btn ghost">Log in</button>
            <button className="btn primary">Sign up</button>
          </div>
        </header>

        <section className="hero">
          <div className="hero-left">
            <h1 id="hero-heading" className="hero-title">
              Think alike.
              <br />
              <span className="highlight">Connect deeper.</span>
            </h1>
            <p className="hero-sub">On SYNC, you have to think like a stranger before you can talk. Match minds and form meaningful connections.</p>
            <div className="hero-ctas">
              <button className="btn primary large">Start Matching</button>
              <button className="btn ghost large">See How It Works</button>
            </div>
            <div className="trust-row">
              <div className="avatars">
                <div className="avatar" />
                <div className="avatar" />
                <div className="avatar" />
                <div className="avatar" />
              </div>
              <div className="trust-text">10,000+ minds already connected</div>
            </div>
          </div>

          <div className="hero-right" aria-hidden>
            <div className="visual">
              {/* Placeholder neon illustration */}
              <div className="brain-left" />
              <div className="heartbeat" />
              <div className="brain-right" />
            </div>
          </div>
        </section>

        <section className="features">
          <div className="feature">
            <div className="feature-icon">🧠</div>
            <div className="feature-title">Mind Match Game</div>
            <div className="feature-sub">Answer the same questions to unlock a match.</div>
          </div>
          <div className="feature">
            <div className="feature-icon">✨</div>
            <div className="feature-title">Personality Insights</div>
            <div className="feature-sub">Discover how you compare to others.</div>
          </div>
          <div className="feature">
            <div className="feature-icon">🔒</div>
            <div className="feature-title">Safe & Private</div>
            <div className="feature-sub">Your privacy and safety come first.</div>
          </div>
          <div className="feature">
            <div className="feature-icon">🤝</div>
            <div className="feature-title">Real Connections</div>
            <div className="feature-sub">Meaningful conversations that actually matter.</div>
          </div>
        </section>
      </div>
    </div>
  );
}
