import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/components/AuthProvider";
import GlobalHeader from "@/components/GlobalHeader";

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
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="flex flex-col min-h-screen bg-gray-50 text-gray-900">
        <AuthProvider>
          <GlobalHeader />
          <main className="flex-1 max-w-6xl w-full mx-auto px-6 py-10">
            {children}
          </main>
          <footer className="bg-gray-100 border-t py-4 text-center text-sm text-gray-500">
            © {new Date().getFullYear()} FreelanceCRM. All rights reserved.
          </footer>
        </AuthProvider>
      </body>
    </html>
  );
}
