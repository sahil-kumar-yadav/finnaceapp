// src/app/(auth)/signup/page.js
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

/**
 * Signup page (email + password)
 * - Creates new user in Supabase
 * - Redirects to /dashboard after signup
 */
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
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-semibold mb-2">Create account</h1>
        <p className="text-sm text-slate-500 mb-4">
          Sign up with email + password.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="you@work.com"
            className="w-full border rounded p-2"
            required
          />
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full border rounded p-2"
            required
          />
          <button
            type="submit"
            className={`w-full py-2 rounded text-white ${
              loading ? "bg-slate-400" : "bg-sky-600 hover:bg-sky-700"
            }`}
            disabled={loading}
          >
            {loading ? "Signing up..." : "Sign up"}
          </button>
          {message && (
            <p
              className={`text-sm ${
                message.type === "error" ? "text-red-600" : "text-green-600"
              }`}
            >
              {message.text}
            </p>
          )}
        </form>

        <div className="mt-6 text-center text-sm text-slate-500">
          Already have an account?{" "}
          <a href="/(auth)/login" className="text-sky-600 hover:underline">
            Sign in
          </a>
        </div>
      </div>
    </div>
  );
}
