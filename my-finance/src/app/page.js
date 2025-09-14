
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center h-[80vh] text-center">
      <h1 className="text-4xl font-bold text-indigo-700 mb-4">
        FreelanceCRM
      </h1>
      <p className="text-lg text-gray-600 mb-6 max-w-2xl">
        Track your income, manage clients, send invoices, and get insights —
        all in one place. Built for freelancers & solopreneurs.
      </p>

      <div className="flex space-x-4">
        <Link
          href="/login"
          className="px-5 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          Login
        </Link>
        <Link
          href="/signup"
          className="px-5 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
        >
          Sign Up
        </Link>
      </div>

    </section>
  );
}
