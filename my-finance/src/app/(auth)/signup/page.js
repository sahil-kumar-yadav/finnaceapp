"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";

export default function SignupPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

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

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage(null);

    if (!form.email || !form.password) {
      setMessage({ type: "error", text: "Fill in both fields" });
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email: form.email,
        password: form.password,
      });
      if (error) {
        setMessage({ type: "error", text: error.message });
      } else {
        setMessage({
          type: "success",
          text:
            "Account created! Please check your inbox to confirm your email before logging in.",
        });
        setForm({ email: "", password: "" });
      }
    } catch (err) {
      setMessage({ type: "error", text: err.message });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Create an account
        </h1>
        <p className="text-sm text-slate-500 mb-6">
          Sign up with your email and password to get started.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
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
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Password"
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
            {loading ? "Creating account..." : "Sign Up"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-slate-600">
          Already have an account?{" "}
          <Link href="/login" className="text-sky-600 hover:underline">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
