"use client";

import { useEffect, useState } from "react";
import AuthModal from "./components/AuthModal";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [authInitialTab, setAuthInitialTab] = useState<"login" | "signup">("login");

  useEffect(() => {
    const t1 = setTimeout(() => setFadeOut(true), 3600);
    const fallback = setTimeout(() => setLoading(false), 4200);
    return () => {
      clearTimeout(t1);
      clearTimeout(fallback);
    };
  }, []);

  return (
    <div className="page-root">
      {/* Loader overlay */}
      <div className={`loader-overlay ${fadeOut ? "hidden" : ""}`} aria-hidden={!loading}>
        <div className="loader-inner">
          <div className="sync">SYNC</div>

          <div className="loader-bar" aria-hidden>
            <div
              className="loader-progress"
              onAnimationEnd={() => {
                setLoading(false);
              }}
            />
          </div>
        </div>
      </div>

      <AuthModal
        open={authOpen}
        initialTab={authInitialTab}
        onClose={() => setAuthOpen(false)}
        onSubmitLogin={(data) => { console.log("login", data); setAuthOpen(false); }}
        onSubmitSignup={(data) => { console.log("signup", data); setAuthOpen(false); }}
      />

      {/* Main site content */}
      <div id="site-content" className="site-content" role="main" aria-labelledby="hero-heading" style={{ display: loading ? "none" : undefined }}>
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
            <button className="btn ghost" onClick={() => { setAuthInitialTab("login"); setAuthOpen(true); }}>Log in</button>
            <button className="btn primary" onClick={() => { setAuthInitialTab("signup"); setAuthOpen(true); }}>Sign up</button>
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
              <button className="btn primary large" onClick={() => { setAuthInitialTab("signup"); setAuthOpen(true); }}>Start Matching</button>
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
            <div className="visual-photos">
              <img src="/people-1.svg" alt="people holding phones" className="photo p1" />
              <img src="/people-2.svg" alt="people holding phones" className="photo p2" />
              <img src="/people-3.svg" alt="people holding phones" className="photo p3" />
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
