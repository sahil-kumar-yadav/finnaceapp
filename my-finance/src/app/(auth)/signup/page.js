"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient"; // Make sure this is correctly configured

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    setErrorMsg(""); // reset error

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      console.log("Signup response:", { data, error });

      if (error) {
        // Supabase error (auth)
        setErrorMsg(`Signup error: ${error.message}`);
        return;
      }

      // Check if session/user exists (may depend on email confirmation settings)
      if (!data.user) {
        setErrorMsg("Signup succeeded, but no user was returned.");
        return;
      }

      // Redirect on success
      router.push("/dashboard");
    } catch (err) {
      console.error("Unexpected error during signup:", err);
      setErrorMsg("Unexpected error: " + (err.message || "Unknown error"));
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-[80vh]">
      <h1 className="text-2xl font-bold mb-4">Create Account</h1>
      <form onSubmit={handleSignup} className="space-y-4 w-80">
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border w-full px-4 py-2 rounded"
          required
        />
        <input
          type="password"
          placeholder="Create password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border w-full px-4 py-2 rounded"
          required
        />
        <button
          type="submit"
          className="bg-indigo-600 text-white w-full px-4 py-2 rounded"
        >
          Sign Up
        </button>
      </form>

      {errorMsg && <p className="mt-4 text-sm text-red-600">{errorMsg}</p>}
    </div>
  );
}
