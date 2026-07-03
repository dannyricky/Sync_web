"use client";

import { useState, useEffect } from "react";

type AuthMode = "login" | "signup";

export default function LoginSignup({ initialMode = "login" }: { initialMode?: AuthMode }) {
  const [mode, setMode] = useState<AuthMode>(initialMode);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    rememberMe: false,
  });
  const [passwordStrength, setPasswordStrength] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const calculatePasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^a-zA-Z0-9]/.test(password)) strength++;
    setPasswordStrength(strength);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    const finalValue = type === "checkbox" ? checked : value;
    setFormData((prev) => ({ ...prev, [name]: finalValue }));

    if (name === "password") {
      calculatePasswordStrength(value);
    }
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength === 0) return "bg-gray-600";
    if (passwordStrength === 1) return "bg-red-500";
    if (passwordStrength === 2) return "bg-orange-500";
    if (passwordStrength === 3) return "bg-yellow-500";
    return "bg-green-500";
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength === 0) return "Very weak";
    if (passwordStrength === 1) return "Weak";
    if (passwordStrength === 2) return "Fair";
    if (passwordStrength === 3) return "Good";
    return "Strong";
  };

  if (isLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top,_rgba(139,92,246,0.25),_transparent_45%),linear-gradient(135deg,#080810_0%,#11111b_100%)] text-white">
        <div className="fade-in-out text-8xl font-black tracking-widest">SYNC</div>
      </main>
    );
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-10 text-white">
      {/* Animated Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/3 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-violet-600/20 blur-[150px]" />
        <div className="absolute right-1/4 bottom-1/4 h-[400px] w-[400px] rounded-full bg-blue-600/10 blur-[150px]" />
        <div className="absolute left-1/4 bottom-1/3 h-[300px] w-[300px] rounded-full bg-violet-500/10 blur-[120px]" />
      </div>

      {/* Gradient Background */}
      <div className="absolute inset-0 -z-20 bg-gradient-to-br from-[#080810] via-[#0f0f1a] to-[#1a0033]" />

      {/* Main Card */}
      <div className="relative w-full max-w-md">
        <div className="overflow-hidden rounded-3xl border border-white/20 bg-gradient-to-br from-white/10 to-white/5 shadow-[0_0_70px_rgba(124,58,237,0.3)] backdrop-blur-2xl">
          {/* Animated Top Border */}
          <div className="absolute top-0 left-0 h-px w-1/3 bg-gradient-to-r from-violet-600 to-transparent opacity-0 animate-pulse" />

          <div className="relative p-8 sm:p-10">
            {/* Header with Glow */}
            <div className="mb-10 text-center">
              <div className="mb-4 inline-block rounded-full bg-gradient-to-r from-violet-600/20 to-blue-600/20 px-4 py-2 backdrop-blur">
                <span className="text-xs font-semibold uppercase tracking-widest text-violet-400">
                  {mode === "login" ? "👋 Welcome Back" : "✨ Join the Sync"}
                </span>
              </div>
              <h1 className="text-4xl font-black bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">
                SYNC
              </h1>
              <p className="mt-3 text-sm text-gray-400">
                {mode === "login" 
                  ? "Sign in and find your perfect match" 
                  : "Create an account and start connecting"}
              </p>
            </div>

            {/* Enhanced Tabs */}
            <div className="mb-10 flex gap-3 rounded-2xl border border-white/10 bg-white/5 p-1.5">
              <button
                type="button"
                onClick={() => setMode("login")}
                className={`flex-1 rounded-xl px-4 py-2.5 text-sm font-bold transition-all duration-300 ${
                  mode === "login"
                    ? "bg-gradient-to-r from-violet-600 to-violet-700 text-white shadow-[0_0_20px_rgba(124,58,237,0.5)]"
                    : "text-gray-400 hover:text-gray-200"
                }`}
              >
                🔐 Login
              </button>
              <button
                type="button"
                onClick={() => setMode("signup")}
                className={`flex-1 rounded-xl px-4 py-2.5 text-sm font-bold transition-all duration-300 ${
                  mode === "signup"
                    ? "bg-gradient-to-r from-blue-600 to-violet-600 text-white shadow-[0_0_20px_rgba(59,130,246,0.5)]"
                    : "text-gray-400 hover:text-gray-200"
                }`}
              >
                ⭐ Sign Up
              </button>
            </div>

            {/* Form */}
            <form className="space-y-5">
              {mode === "signup" && (
                <div className="group">
                  <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-300">
                    <span className="text-lg">👤</span> Full Name
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="Alex Morgan"
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition-all placeholder:text-gray-600 focus:border-violet-500 focus:bg-white/10 focus:ring-2 focus:ring-violet-500/30 group-hover:border-white/20"
                  />
                </div>
              )}

              <div className="group">
                <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-300">
                  <span className="text-lg">📧</span> Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="you@example.com"
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition-all placeholder:text-gray-600 focus:border-violet-500 focus:bg-white/10 focus:ring-2 focus:ring-violet-500/30 group-hover:border-white/20"
                />
              </div>

              <div className="group">
                <div className="mb-2 flex items-center justify-between">
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-300">
                    <span className="text-lg">🔑</span> Password
                  </label>
                  {mode === "login" && (
                    <a href="#" className="text-xs font-semibold text-violet-400 transition hover:text-violet-300">
                      Forgot?
                    </a>
                  )}
                </div>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition-all placeholder:text-gray-600 focus:border-violet-500 focus:bg-white/10 focus:ring-2 focus:ring-violet-500/30 group-hover:border-white/20"
                />
                {mode === "signup" && formData.password && (
                  <div className="mt-3 space-y-2">
                    <div className="flex gap-1">
                      {[0, 1, 2, 3].map((i) => (
                        <div
                          key={i}
                          className={`h-1.5 flex-1 rounded-full transition-all ${
                            i < passwordStrength 
                              ? getPasswordStrengthColor() 
                              : "bg-gray-700/50"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-xs text-gray-500">
                      Strength: <span className={`font-bold ${
                        passwordStrength === 4 ? "text-green-400" :
                        passwordStrength === 3 ? "text-yellow-400" :
                        passwordStrength === 2 ? "text-orange-400" :
                        passwordStrength === 1 ? "text-red-400" :
                        "text-gray-500"
                      }`}>{getPasswordStrengthText()}</span>
                    </p>
                  </div>
                )}
              </div>

              {mode === "signup" && (
                <div className="group">
                  <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-300">
                    <span className="text-lg">✓</span> Confirm Password
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    placeholder="••••••••"
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition-all placeholder:text-gray-600 focus:border-violet-500 focus:bg-white/10 focus:ring-2 focus:ring-violet-500/30 group-hover:border-white/20"
                  />
                </div>
              )}

              {mode === "login" && (
                <label className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 transition hover:bg-white/10">
                  <input
                    type="checkbox"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleInputChange}
                    className="h-4 w-4 rounded border-white/20 bg-white/5 accent-violet-600"
                  />
                  <span className="text-sm font-medium text-gray-300">Remember me for 30 days</span>
                </label>
              )}

              <button
                type="submit"
                className="group relative mt-8 w-full overflow-hidden rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 px-4 py-3 font-bold text-white shadow-[0_0_30px_rgba(124,58,237,0.4)] transition-all duration-300 hover:shadow-[0_0_40px_rgba(124,58,237,0.6)] hover:from-violet-700 hover:to-blue-700 active:scale-95"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {mode === "login" ? "🔐 Sign In" : "✨ Create Account"}
                </span>
              </button>
            </form>

            {/* Divider */}
            <div className="my-8 flex items-center gap-4">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
              <span className="text-xs uppercase tracking-widest text-gray-500">or continue with</span>
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            </div>

            {/* Social Buttons */}
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                className="group rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold transition-all hover:border-white/30 hover:bg-white/10 hover:shadow-[0_0_20px_rgba(124,58,237,0.2)]"
              >
                🔍 Google
              </button>
              <button
                type="button"
                className="group rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold transition-all hover:border-white/30 hover:bg-white/10 hover:shadow-[0_0_20px_rgba(124,58,237,0.2)]"
              >
                🍎 Apple
              </button>
            </div>

            {/* Footer */}
            <p className="mt-8 text-center text-sm text-gray-400">
              {mode === "login" ? (
                <>
                  Don&apos;t have an account?{" "}
                  <button
                    type="button"
                    onClick={() => setMode("signup")}
                    className="font-bold text-transparent bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text transition hover:from-violet-300 hover:to-blue-300"
                  >
                    Sign up now
                  </button>
                </>
              ) : (
                <>
                  Already have an account?{" "}
                  <button
                    type="button"
                    onClick={() => setMode("login")}
                    className="font-bold text-transparent bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text transition hover:from-violet-300 hover:to-blue-300"
                  >
                    Log in
                  </button>
                </>
              )}
            </p>

            {mode === "signup" && (
              <p className="mt-4 text-center text-xs text-gray-500">
                By signing up, you agree to our{" "}
                <a href="#" className="text-violet-400 transition hover:text-violet-300">
                  Terms
                </a>{" "}
                and{" "}
                <a href="#" className="text-violet-400 transition hover:text-violet-300">
                  Privacy Policy
                </a>
              </p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
