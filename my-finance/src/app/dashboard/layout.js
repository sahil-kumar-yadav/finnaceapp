// src/app/dashboard/layout.js
"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import SignOutButton from "@/components/signout-button";

const navLinks = [
  { href: "/dashboard", label: "Overview" },
  { href: "/dashboard/clients", label: "Clients" },
  { href: "/dashboard/invoices", label: "Invoices" },
  { href: "/dashboard/wallets", label: "Wallets" },
  { href: "/dashboard/reports", label: "Reports" },
];

export default function DashboardLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();

  // Redirect to /login if not authenticated
  useEffect(() => {
    const checkAuth = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        router.replace("/login");
      }
    };
    checkAuth();
  }, [router]);

  return (
    <div className="min-h-screen flex bg-slate-50">
      {/* Sidebar */}
      <aside className="w-60 bg-white border-r shadow-sm flex flex-col">
        <div className="px-6 py-4 border-b">
          <Link href="/dashboard" className="text-xl font-bold text-sky-600">
            FreelanceCRM
          </Link>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`block px-3 py-2 rounded-md text-sm font-medium transition ${
                pathname === link.href
                  ? "bg-sky-100 text-sky-700"
                  : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t">
          <SignOutButton className="w-full" />
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
