"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const [authTab, setAuthTab] = useState<"login" | "signup">("login");

  useEffect(() => {
    // start fade slightly before the progress finishes so we get a smooth crossfade
    const t1 = setTimeout(() => setFadeOut(true), 3600); // start fade at 3.6s
    // fallback: if animationend doesn't fire for any reason, hide after 4.2s
    const fallback = setTimeout(() => setLoading(false), 4200);
    return () => {
      clearTimeout(t1);
      clearTimeout(fallback);
    };
  }, []);

  function goToAuth(tab: "login" | "signup") {
    setAuthTab(tab);
    // reveal content if still hidden
    const content = document.getElementById("site-content");
    if (content && content.style.display === "none") {
      // make sure content is visible (if loader hasn't finished) — still scroll after
      content.style.display = undefined;
      setLoading(false);
    }
    // smooth scroll to auth section after a tiny delay to ensure render
    setTimeout(() => {
      const el = document.getElementById("auth");
      if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
      // focus first input
      const first = el?.querySelector("input") as HTMLInputElement | null;
      if (first) first.focus();
    }, 90);
  }

  function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const email = formData.get("email");
    const password = formData.get("password");
    console.log("Login attempt", { email, password });
    // TODO: call API
    alert("Login submitted (demo)\nEmail: " + email);
  }

  function handleSignup(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");
    console.log("Signup attempt", { name, email, password });
    // TODO: call API
    alert("Signup submitted (demo)\nEmail: " + email);
  }

  return (
    <div className="page-root">
      {/* Loader overlay */}
      <div className={`loader-overlay ${fadeOut ? "hidden" : ""}`} aria-hidden={!loading}>
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
            <button className="btn ghost" onClick={() => goToAuth("login")}>Log in</button>
            <button className="btn primary" onClick={() => goToAuth("signup")}>Sign up</button>
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
              <button className="btn primary large" onClick={() => goToAuth("signup")}>Start Matching</button>
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

        {/* Auth section */}
        <section id="auth" className="auth-section">
          <div className="auth-inner">
            <div className="auth-card">
              <div className="tabs" role="tablist" aria-label="Authentication Tabs">
                <button className={`tab ${authTab === "login" ? "active" : ""}`} role="tab" aria-selected={authTab === "login"} onClick={() => setAuthTab("login")}>Log in</button>
                <button className={`tab ${authTab === "signup" ? "active" : ""}`} role="tab" aria-selected={authTab === "signup"} onClick={() => setAuthTab("signup")}>Sign up</button>
              </div>

              {authTab === "login" ? (
                <form onSubmit={handleLogin} className="auth-form" aria-labelledby="login-heading">
                  <h3 id="login-heading">Welcome back</h3>
                  <label>Email
                    <input name="email" type="email" required />
                  </label>
                  <label>Password
                    <input name="password" type="password" required />
                  </label>
                  <div className="auth-actions">
                    <button type="submit" className="btn primary">Log in</button>
                    <button type="button" className="btn ghost" onClick={() => setAuthTab("signup")}>Create account</button>
                  </div>
                </form>
              ) : (
                <form onSubmit={handleSignup} className="auth-form" aria-labelledby="signup-heading">
                  <h3 id="signup-heading">Create your account</h3>
                  <label>Full name
                    <input name="name" type="text" required />
                  </label>
                  <label>Email
                    <input name="email" type="email" required />
                  </label>
                  <label>Password
                    <input name="password" type="password" required />
                  </label>
                  <div className="auth-actions">
                    <button type="submit" className="btn primary">Sign up</button>
                    <button type="button" className="btn ghost" onClick={() => setAuthTab("login")}>Already have an account</button>
                  </div>
                </form>
              )}
            </div>

            <div className="auth-visual">
              <div className="visual-mini">
                <div className="brain-left small" />
                <div className="heartbeat small" />
                <div className="brain-right small" />
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
