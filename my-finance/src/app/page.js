"use client";
import Link from "next/link";
import { useAuth } from "@/components/AuthProvider";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.replace("/dashboard");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[80vh]">
        Loading...
      </div>
    );
  }

  if (user) {
    return null; // user already redirected
  }

  return (
    <section className="flex flex-col items-center text-center">
      {/* Hero */}
      <h1 className="text-5xl font-extrabold text-indigo-700 mb-6">
        FreelanceCRM
      </h1>
      <p className="text-lg text-gray-600 mb-8 max-w-2xl">
        Track your income, manage clients, send invoices, and get insights —
        all in one place. Built for freelancers & solopreneurs.
      </p>

      {/* CTA */}
      <div className="flex space-x-4">
        <Link
          href="/signup"
          className="px-6 py-3 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700"
        >
          Get Started
        </Link>
        <Link
          href="/login"
          className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-100"
        >
          Log In
        </Link>
      </div>

      {/* Features */}
      <div className="mt-20 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 max-w-5xl">
        <div className="p-6 bg-white rounded-lg shadow hover:shadow-md">
          <h3 className="text-lg font-semibold text-gray-900">💼 Clients</h3>
          <p className="text-sm text-gray-600 mt-2">
            Keep track of all your clients with financial histories and notes.
          </p>
        </div>
        <div className="p-6 bg-white rounded-lg shadow hover:shadow-md">
          <h3 className="text-lg font-semibold text-gray-900">📑 Invoices</h3>
          <p className="text-sm text-gray-600 mt-2">
            Generate, send, and manage invoices with ease.
          </p>
        </div>
        <div className="p-6 bg-white rounded-lg shadow hover:shadow-md">
          <h3 className="text-lg font-semibold text-gray-900">💳 Wallets</h3>
          <p className="text-sm text-gray-600 mt-2">
            Stay on top of account balances and wallet transactions.
          </p>
        </div>
        <div className="p-6 bg-white rounded-lg shadow hover:shadow-md">
          <h3 className="text-lg font-semibold text-gray-900">📊 Reports</h3>
          <p className="text-sm text-gray-600 mt-2">
            Visualize income, expenses, and client performance with insights.
          </p>
        </div>
      </div>
    </section>
  );
}
