"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { LockKeyhole } from "lucide-react";

const DEV_BYPASS_ENABLED = process.env.NEXT_PUBLIC_ADMIN_DEV_BYPASS === "true";

const inputClass =
  "w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-[#1a3a5c] outline-none transition-colors focus:border-primary-400 focus:bg-white focus:ring-2 focus:ring-primary-100";

const passwordInputClass =
  "w-full rounded-xl border border-slate-200 bg-primary-50/70 px-4 py-3 text-sm text-[#1a3a5c] outline-none transition-colors focus:border-primary-400 focus:bg-white focus:ring-2 focus:ring-primary-100";

const labelClass =
  "mb-2 block text-[11px] font-bold uppercase tracking-wider text-primary-600";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [devLoading, setDevLoading] = useState(false);

  const enterDashboard = () => {
    router.push("/admin");
    router.refresh();
  };

  const handleDevLogin = async () => {
    setDevLoading(true);
    setError("");

    try {
      const response = await fetch("/api/admin/dev-login", { method: "POST" });
      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Dev login failed.");
        return;
      }

      enterDashboard();
    } catch {
      enterDashboard();
    } finally {
      setDevLoading(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Login failed.");
        return;
      }

      enterDashboard();
    } catch {
      setError("Unable to connect. Check database and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col lg:flex-row">
      {/* Left — brand panel */}
      <section className="relative flex min-h-[320px] flex-1 flex-col justify-between overflow-hidden px-6 py-8 sm:px-10 sm:py-10 lg:min-h-screen lg:max-w-[50%]">
        <Image
          src="/images/main-medical.jpg"
          alt=""
          fill
          priority
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
        <div className="absolute inset-0 bg-[#061d2e]/80" />

        <div className="relative z-10">
          <div className="inline-flex items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-lg">
            <Image
              src="/images/logos/logo.jpg"
              alt="Everest Polyclinic"
              width={40}
              height={40}
              className="rounded-full"
            />
            <div>
              <p className="font-heading text-sm font-bold leading-tight text-[#1a3a5c]">
                Everest International
              </p>
              <p className="text-xs font-semibold text-secondary-600">Polyclinic</p>
            </div>
          </div>
        </div>

        <div className="relative z-10 max-w-lg">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-secondary-300">
            Healthcare operations
          </p>
          <h1 className="mt-4 font-heading text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-[2.75rem] lg:leading-[1.15]">
            Staff workspace for bookings and content
          </h1>
          <p className="mt-5 text-sm leading-relaxed text-white/85 sm:text-base">
            Confirm appointments, update services, and keep the catalog
            current — same brand as the public site.
          </p>
        </div>

        <div className="relative z-10 flex items-center gap-2 text-xs text-white/70">
          <LockKeyhole size={14} />
          <span>Staff access only • Secure session</span>
        </div>
      </section>

      {/* Right — login form */}
      <section className="flex flex-1 items-center justify-center bg-[#f8fafc] px-4 py-10 sm:px-8 lg:min-h-screen">
        <div className="w-full max-w-[420px] overflow-hidden rounded-2xl border border-primary-100 bg-white shadow-card">
          <div className="h-1 bg-gradient-to-r from-secondary-500 to-primary-600" />

          <div className="px-6 py-8 sm:px-8 sm:py-10">
            <div className="mb-6 flex justify-center">
              <Image
                src="/images/logos/logo.jpg"
                alt="Everest Polyclinic"
                width={72}
                height={72}
                className="rounded-full"
                className="rounded-full ring-2 ring-primary-100"
              />
            </div>

            <p className="text-center text-[11px] font-bold uppercase tracking-[0.18em] text-secondary-600">
              Admin sign in
            </p>
            <h2 className="mt-2 text-center font-heading text-3xl font-bold text-[#1a3a5c]">
              Welcome back
            </h2>
            <p className="mt-2 text-center text-sm text-slate-500">
              Use your admin credentials to open the operations desk.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <div>
                <label className={labelClass} htmlFor="email">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  autoComplete="username"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className={inputClass}
                  placeholder="admin@everestpolyclinic.com"
                  required
                />
              </div>

              <div>
                <label className={labelClass} htmlFor="password">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className={passwordInputClass}
                  required
                />
              </div>

              {error ? (
                <p className="rounded-xl bg-alert-50 px-4 py-3 text-sm text-alert-700">
                  {error}
                </p>
              ) : null}

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-primary-600 py-3.5 text-sm font-bold text-white shadow-lg shadow-primary-200 transition-colors hover:bg-primary-700 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading ? "Signing in…" : "Enter admin"}
              </button>
            </form>

            {DEV_BYPASS_ENABLED ? (
              <div className="mt-8 space-y-3 border-t border-slate-100 pt-6">
                <p className="text-center text-xs text-slate-500">
                  SQL Server offline? Preview the dashboard without signing in.
                </p>
                <button
                  type="button"
                  disabled={devLoading}
                  onClick={handleDevLogin}
                  className="w-full rounded-xl border-2 border-primary-600 bg-white py-3 text-sm font-semibold text-primary-600 transition-colors hover:bg-primary-50 disabled:opacity-70"
                >
                  {devLoading ? "Opening…" : "Open dashboard (dev)"}
                </button>
                <Link
                  href="/admin"
                  className="block text-center text-xs font-semibold text-secondary-600 hover:text-secondary-700"
                >
                  Go directly to /admin
                </Link>
              </div>
            ) : null}
          </div>
        </div>
      </section>
    </div>
  );
}
