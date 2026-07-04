"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AuthPage() {
  const router = useRouter();
  const [tab, setTab] = useState<"login" | "signup">("login");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleLoginSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    const data = new FormData(e.currentTarget);
    const email = String(data.get("email") ?? "").trim();
    const password = String(data.get("password") ?? "");

    // basic client-side validation
    if (!email || !password) {
      setError("Please provide both email and password.");
      setSubmitting(false);
      return;
    }

    console.log("[AuthPage] login", { email, password });
    // TODO: call your auth API here. Example:
    // const res = await fetch('/api/login', { method: 'POST', body: JSON.stringify({ email, password }) });

    // temporary simulated success
    setTimeout(() => {
      setSubmitting(false);
      // on success navigate to dashboard or home
      router.push("/");
    }, 700);
  }

  async function handleSignupSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    const data = new FormData(e.currentTarget);
    const email = String(data.get("email") ?? "").trim();
    const password = String(data.get("password") ?? "");

    if (!email || !password) {
      setError("Please provide both email and password.");
      setSubmitting(false);
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      setSubmitting(false);
      return;
    }

    console.log("[AuthPage] signup", { email, password });
    // TODO: call your signup API here

    setTimeout(() => {
      setSubmitting(false);
      router.push("/");
    }, 700);
  }

  return (
    <main className="auth-page" role="main" style={{ padding: 48 }}>
      <div className="container" style={{ maxWidth: 720, margin: "0 auto" }}>
        <h1 style={{ marginBottom: 8 }}>Welcome to SYNC</h1>
        <p style={{ marginTop: 0, color: "#666" }}>Sign in or create an account to start matching minds.</p>

        <div className="auth-switch" style={{ display: "flex", gap: 8, marginTop: 24 }}>
          <button className={`tab ${tab === "login" ? "active" : ""}`} onClick={() => setTab("login")} disabled={submitting}>
            Log in
          </button>
          <button className={`tab ${tab === "signup" ? "active" : ""}`} onClick={() => setTab("signup") } disabled={submitting}>
            Sign up
          </button>
        </div>

        <div className="auth-panel" style={{ marginTop: 20 }}>
          {error && <div className="error" style={{ color: "#b00020", marginBottom: 12 }}>{error}</div>}

          {tab === "login" ? (
            <form onSubmit={handleLoginSubmit} aria-label="Login form">
              <label style={{ display: "block", marginBottom: 8 }}>
                Email
                <input name="email" type="email" required style={{ display: "block", width: "100%", padding: 8, marginTop: 6 }} />
              </label>

              <label style={{ display: "block", marginBottom: 8 }}>
                Password
                <input name="password" type="password" required style={{ display: "block", width: "100%", padding: 8, marginTop: 6 }} />
              </label>

              <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
                <button type="submit" className="btn primary" disabled={submitting}>
                  {submitting ? "Signing in..." : "Log in"}
                </button>
                <button type="button" className="btn ghost" onClick={() => setTab("signup")} disabled={submitting}>
                  Create account
                </button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleSignupSubmit} aria-label="Signup form">
              <label style={{ display: "block", marginBottom: 8 }}>
                Email
                <input name="email" type="email" required style={{ display: "block", width: "100%", padding: 8, marginTop: 6 }} />
              </label>

              <label style={{ display: "block", marginBottom: 8 }}>
                Password
                <input name="password" type="password" required style={{ display: "block", width: "100%", padding: 8, marginTop: 6 }} />
              </label>

              <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
                <button type="submit" className="btn primary" disabled={submitting}>
                  {submitting ? "Creating..." : "Sign up"}
                </button>
                <button type="button" className="btn ghost" onClick={() => setTab("login")} disabled={submitting}>
                  Have an account?
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </main>
  );
}
