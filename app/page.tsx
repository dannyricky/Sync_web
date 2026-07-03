"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 4000); // 4 seconds
    return () => clearTimeout(t);
  }, []);

  return (
    <main style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#f3f4f6", fontFamily: "Inter, Arial, Helvetica, sans-serif" }}>
      <style>{`
        .loader {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
        }
        .sync {
          font-size: 5rem;
          font-weight: 800;
          letter-spacing: 0.08em;
          color: #111827;
          -webkit-text-stroke: 0.5px rgba(0,0,0,0.05);
          animation: fadeInOut 1.2s ease-in-out infinite;
        }
        @keyframes fadeInOut {
          0% { opacity: 0; transform: scale(0.98); }
          50% { opacity: 1; transform: scale(1); }
          100% { opacity: 0; transform: scale(0.98); }
        }
        .card {
          width: 420px;
          max-width: calc(100% - 48px);
          background: #ffffff;
          border-radius: 12px;
          box-shadow: 0 6px 24px rgba(16,24,40,0.08);
          padding: 28px;
        }
        .heading {
          font-size: 1.25rem;
          font-weight: 700;
          margin-bottom: 12px;
          color: #0f172a;
        }
        .sub { color: #475569; margin-bottom: 18px; }
        .input { width: 100%; padding: 10px 12px; border-radius: 8px; border: 1px solid #e6eef8; margin-bottom: 12px; }
        .actions { display:flex; gap:10px; margin-top:8px; }
        .btn { flex:1; padding:10px 12px; border-radius:8px; border:none; cursor:pointer; font-weight:700; }
        .btn.primary { background:#0f172a; color:white; }
        .btn.ghost { background:transparent; border:1px solid #e2e8f0; color:#0f172a; }
      `}</style>

      {loading ? (
        <div className="loader" aria-live="polite">
          <div className="sync">SYNC</div>
        </div>
      ) : (
        <div className="card" role="main">
          <div className="heading">Welcome back</div>
          <div className="sub">Log in or create an account to continue to Sync.</div>

          <label style={{ fontSize: 12, color: "#475569" }}>Email</label>
          <input className="input" type="email" placeholder="you@company.com" />

          <label style={{ fontSize: 12, color: "#475569" }}>Password</label>
          <input className="input" type="password" placeholder="••••••••" />

          <div className="actions">
            <button className="btn primary">Login</button>
            <button className="btn ghost">Sign up</button>
          </div>
        </div>
      )}
    </main>
  );
}
