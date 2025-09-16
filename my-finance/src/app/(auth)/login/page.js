"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  // If user already logged in, redirect to dashboard
  useEffect(() => {
    let mounted = true;
    async function check() {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();
        if (mounted && session) {
          router.replace("/dashboard");
        }
      } catch {
        // ignore
      }
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
        router.replace("/dashboard"); // ✅ redirect on success
      }
    } catch (err) {
      setMessage({ type: "error", text: err.message || "Unexpected error." });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-semibold mb-2">Sign in</h1>
        <p className="text-sm text-slate-500 mb-4">
          Enter your email and password to access your dashboard.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block">
            <span className="text-sm text-slate-600">Email</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@work.com"
              className="mt-1 block w-full rounded-md border px-3 py-2 focus:outline-none focus:ring"
              required
            />
          </label>

          <label className="block">
            <span className="text-sm text-slate-600">Password</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="mt-1 block w-full rounded-md border px-3 py-2 focus:outline-none focus:ring"
              required
            />
          </label>

          <button
            type="submit"
            className={`w-full py-2 rounded-md text-white ${
              loading ? "bg-slate-400" : "bg-sky-600 hover:bg-sky-700"
            }`}
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>

          {message && (
            <div
              className={`mt-2 p-2 rounded text-sm ${
                message.type === "error"
                  ? "bg-red-50 text-red-700"
                  : "bg-green-50 text-green-700"
              }`}
            >
              {message.text}
            </div>
          )}
        </form>

        <div className="mt-6 text-center text-sm text-slate-500">
          New here?{" "}
          <a href="/signup" className="text-sky-600 hover:underline">
            Create an account
          </a>
        </div>
      </div>
    </div>
  );
}
