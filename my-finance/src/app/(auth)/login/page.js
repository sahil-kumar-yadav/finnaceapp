"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();
        setMessage("");
        const { error } = await supabase.auth.signInWithOtp({ email }); // v2 API
        if (error) setMessage(error.message);
        else setMessage("Magic link sent — check your email.");
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <input
                type="email"
                placeholder="you@work.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full p-2 rounded border"
            />
            <button className="btn" type="submit">Send magic link</button>
            {message && <p>{message}</p>}
        </form>
    );
}
