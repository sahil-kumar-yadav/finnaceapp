"use client";

import Link from "next/link";
import { useAuth } from "@/components/AuthProvider";

export default function GlobalHeader() {
    const { user, loading } = useAuth();

    return (
        <header className="bg-white border-b shadow-sm">
            <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
                {/* Brand */}
                <Link href="/" className="text-xl font-bold text-indigo-600">
                    FreelanceCRM
                </Link>

                {/* Right side links */}
                {!loading && (
                    <div className="flex items-center gap-4">
                        {user ? (
                            <Link
                                href="/dashboard"
                                className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700"
                            >
                                Go to Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link href="/login" className="hover:text-indigo-600">
                                    Login
                                </Link>
                                <Link
                                    href="/signup"
                                    className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700"
                                >
                                    Sign Up
                                </Link>
                            </>
                        )}
                    </div>
                )}
            </nav>
        </header>
    );
}
