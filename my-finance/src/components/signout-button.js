// src/components/signout-button.js
"use client";

import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function SignOutButton() {
  const router = useRouter();

  async function handleSignOut() {
    await supabase.auth.signOut();
    router.replace("/login");
  }

  return (
    <button
      onClick={handleSignOut}
      className="px-3 py-1 rounded-md bg-red-600 text-white hover:bg-red-700 text-sm"
    >
      Sign out
    </button>
  );
}
