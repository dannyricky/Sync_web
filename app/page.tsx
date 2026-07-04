"use client";

import { useEffect, useRef, useState } from "react";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const [authInitialTab, setAuthInitialTab] = useState<"login" | "signup">("login");
  const authRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const t1 = setTimeout(() => setFadeOut(true), 3600);
    const fallback = setTimeout(() => setLoading(false), 4200);
    return () => {
      clearTimeout(t1);
      clearTimeout(fallback);
    };
  }, []);

  function openAuthSection(tab: "login" | "signup") {
    setAuthInitialTab(tab);
    // give React a tick to render the section, then scroll to it
    setTimeout(() => authRef.current?.scrollIntoView({ behavior: "smooth" }), 50);
  }

  function handleLoginSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const email = data.get("email");
    const password = data.get("password");
    console.log("login", { email, password });
    // TODO: replace with real login logic
  }

  function handleSignupSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const email = data.get("email");
    const password = data.get("password");
    console.log("signup", { email, password });
    // TODO: replace with real signup logic
  }

  return (
    <div className="page-root">
      {/* Loader overlay - only in DOM while loading */}
      {loading && (
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
      )}

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
            <button
              className="btn ghost"
              onClick={() => {
                console.log('Nav: Log in clicked');
                openAuthSection("login");
              }}
            >
              Log in
            </button>
            <button
              className="btn primary"
              onClick={() => {
                console.log('Nav: Sign up clicked');
                openAuthSection("signup");
              }}
            >
              Sign up
            </button>
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
              <button
                className="btn primary large"
                onClick={() => {
                  console.log('Hero: Start Matching clicked');
                  openAuthSection("signup");
                }}
              >
                Start Matching
              </button>
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

        {/* Inline auth section that users are scrolled to */}
        <section id="auth-section" ref={authRef} className="auth-section" aria-labelledby="auth-heading" style={{ padding: '48px 0' }}>
          <h2 id="auth-heading">Join SYNC</h2>
          <div className="auth-tabs">
            <button
              className={`tab ${authInitialTab === 'login' ? 'active' : ''}`}
              onClick={() => setAuthInitialTab('login')}
            >
              Log in
            </button>
            <button
              className={`tab ${authInitialTab === 'signup' ? 'active' : ''}`}
              onClick={() => setAuthInitialTab('signup')}
            >
              Sign up
            </button>
          </div>

          <div className="auth-panels">
            {authInitialTab === 'login' ? (
              <form className="auth-form" onSubmit={handleLoginSubmit} aria-label="Login form">
                <label>
                  Email
                  <input name="email" type="email" required />
                </label>
                <label>
                  Password
                  <input name="password" type="password" required />
                </label>
                <div className="auth-actions">
                  <button type="submit" className="btn primary">Log in</button>
                  <button type="button" className="btn ghost" onClick={() => openAuthSection('signup')}>Create Account</button>
                </div>
              </form>
            ) : (
              <form className="auth-form" onSubmit={handleSignupSubmit} aria-label="Signup form">
                <label>
                  Email
                  <input name="email" type="email" required />
                </label>
                <label>
                  Password
                  <input name="password" type="password" required />
                </label>
                <div className="auth-actions">
                  <button type="submit" className="btn primary">Sign up</button>
                  <button type="button" className="btn ghost" onClick={() => openAuthSection('login')}>Have an account?</button>
                </div>
              </form>
            )}
          </div>
        </section>

      </div>
    </div>
  );
}
