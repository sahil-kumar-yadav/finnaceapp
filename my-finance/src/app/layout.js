import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { AuthProvider } from "@/components/AuthProvider"; // <-- Add this

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Freelancer Finance CRM",
  description: "Manage clients, invoices, and finances with ease",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900">
        <AuthProvider>
          {/* Top Navbar */}
          <header className="bg-white border-b shadow-sm px-6 py-3 flex justify-between items-center">
            <Link href="/" className="text-lg font-bold text-indigo-600">
              FreelanceCRM
            </Link>
            <nav>
              <Link
                href="/dashboard"
                className="px-3 py-1 rounded hover:bg-gray-100"
              >
                Dashboard
              </Link>
              <Link
                href="/dashboard/clients"
                className="px-3 py-1 rounded hover:bg-gray-100"
              >
                Clients
              </Link>
              <Link
                href="/dashboard/invoices"
                className="px-3 py-1 rounded hover:bg-gray-100"
              >
                Invoices
              </Link>
              <Link
                href="/dashboard/wallets"
                className="px-3 py-1 rounded hover:bg-gray-100"
              >
                Wallets
              </Link>
              <Link
                href="/dashboard/reports"
                className="px-3 py-1 rounded hover:bg-gray-100"
              >
                Reports
              </Link>
            </nav>
          </header>
          {/* Page Content */}
          <main className="max-w-6xl mx-auto px-6 py-6">{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}
