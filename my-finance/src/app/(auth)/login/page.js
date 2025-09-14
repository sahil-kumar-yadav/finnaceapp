// src/app/(auth)/login/page.js
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

/**
 * Simple magic-link login page.
 * - Sends a magic link to email via supabase.auth.signInWithOtp
 * - If user already has an active session, redirects to /dashboard
 *
 * Notes:
 * - After clicking the magic link, Supabase will redirect back (if configured)
 *   and the session will be available in the client. You can then route user to dashboard.
 */

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
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
      } catch (err) {
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

    setLoading(true);
    try {
      // signInWithOtp is the V2 magic link / OTP API
      const { data, error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          // Optional: sendRedirectTo can be set to the site URL where Supabase should redirect after auth
          // redirectTo: `${window.location.origin}/auth/callback`
        },
      });

      if (error) {
        setMessage({ type: "error", text: error.message });
      } else {
        // show generic success to avoid leaking if email exists
        setMessage({
          type: "success",
          text:
            "Magic link sent. Check your email (including spam). Click the link to sign in.",
        });
        // keep email in input for convenience
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
          Enter your email and we’ll send a magic sign-in link.
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

          <button
            type="submit"
            className={`w-full py-2 rounded-md text-white ${
              loading ? "bg-slate-400" : "bg-sky-600 hover:bg-sky-700"
            }`}
            disabled={loading}
          >
            {loading ? "Sending..." : "Send magic link"}
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
          <a href="/(auth)/signup" className="text-sky-600 hover:underline">
            Create an account
          </a>
        </div>
      </div>
    </div>
  );
}
