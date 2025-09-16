"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  // Redirect if already logged in
  useEffect(() => {
    let mounted = true;
    async function check() {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (mounted && session) router.replace("/dashboard");
    }
    check();
    return () => (mounted = false);
  }, [router]);

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage(null);

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setMessage({ type: "error", text: "Please enter a valid email." });
      return;
    }
    if (!password) {
      setMessage({ type: "error", text: "Password is required." });
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        setMessage({ type: "error", text: error.message });
      } else if (data?.session) {
        router.replace("/dashboard");
      }
    } catch (err) {
      setMessage({ type: "error", text: err.message || "Unexpected error." });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Welcome back</h1>
        <p className="text-sm text-slate-500 mb-6">
          Enter your credentials to access your dashboard.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@work.com"
              className="mt-1 block w-full rounded-lg border px-3 py-2 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="mt-1 block w-full rounded-lg border px-3 py-2 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none"
              required
            />
          </div>

          {message && (
            <div
              className={`p-2 rounded text-sm ${
                message.type === "error"
                  ? "bg-red-50 text-red-700"
                  : "bg-green-50 text-green-700"
              }`}
            >
              {message.text}
            </div>
          )}

          <button
            type="submit"
            className={`w-full py-2 rounded-lg text-white font-medium transition ${
              loading
                ? "bg-slate-400 cursor-not-allowed"
                : "bg-sky-600 hover:bg-sky-700"
            }`}
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-slate-600">
          New here?{" "}
          <Link href="/signup" className="text-sky-600 hover:underline">
            Create an account
          </Link>
        </div>
      </div>
    </div>
  );
}
