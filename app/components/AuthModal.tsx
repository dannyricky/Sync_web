"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

type Props = {
  open: boolean;
  initialTab?: "login" | "signup";
  onClose: () => void;
  onSubmitLogin: (data: { email: string; password: string }) => void;
  onSubmitSignup: (data: { name: string; email: string; password: string }) => void;
};

export default function AuthModal({ open, initialTab = "login", onClose, onSubmitLogin, onSubmitSignup }: Props) {
  const [tab, setTab] = useState<"login" | "signup">(initialTab);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const firstInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    setTab(initialTab);
  }, [initialTab]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (open) {
      document.addEventListener("keydown", onKey);
      // focus first input slightly after open
      setTimeout(() => firstInputRef.current?.focus(), 40);
    }
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  // simple focus trap
  useEffect(() => {
    function trap(e: KeyboardEvent) {
      if (!open) return;
      if (e.key !== "Tab" || !containerRef.current) return;
      const focusable = containerRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
      );
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
    document.addEventListener("keydown", trap);
    return () => document.removeEventListener("keydown", trap);
  }, [open]);

  if (!open) return null;

  function submitLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const email = String(fd.get("email") || "");
    const password = String(fd.get("password") || "");
    onSubmitLogin({ email, password });
  }

  function submitSignup(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const name = String(fd.get("name") || "");
    const email = String(fd.get("email") || "");
    const password = String(fd.get("password") || "");
    onSubmitSignup({ name, email, password });
  }

  const modal = (
    <div className="auth-modal-backdrop" role="dialog" aria-modal="true" aria-label="Authentication" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="auth-modal" ref={containerRef}>
        <button className="modal-close" aria-label="Close" onClick={onClose}>✕</button>

        <div className="modal-tabs">
          <button className={`tab ${tab === "login" ? "active" : ""}`} onClick={() => setTab("login")} type="button">Log in</button>
          <button className={`tab ${tab === "signup" ? "active" : ""}`} onClick={() => setTab("signup")} type="button">Sign up</button>
        </div>

        <div className="modal-body">
          {tab === "login" && (
            <form onSubmit={submitLogin} className="auth-form" aria-labelledby="login-heading">
              <h3 id="login-heading">Welcome back</h3>
              <label>
                Email
                <input ref={firstInputRef} name="email" type="email" required />
              </label>
              <label>
                Password
                <input name="password" type="password" required />
              </label>
              <div className="auth-actions">
                <button className="btn primary" type="submit">Log in</button>
              </div>
            </form>
          )}

          {tab === "signup" && (
            <form onSubmit={submitSignup} className="auth-form" aria-labelledby="signup-heading">
              <h3 id="signup-heading">Create account</h3>
              <label>
                Full name
                <input ref={firstInputRef} name="name" type="text" required />
              </label>
              <label>
                Email
                <input name="email" type="email" required />
              </label>
              <label>
                Password
                <input name="password" type="password" required />
              </label>
              <div className="auth-actions">
                <button className="btn primary" type="submit">Sign up</button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );

  return createPortal(modal, typeof document !== "undefined" ? document.body : document.createElement("div"));
}
