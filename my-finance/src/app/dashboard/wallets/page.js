"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function WalletsPage() {
  const [wallets, setWallets] = useState([]);

  useEffect(() => {
    const fetchWallets = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      const user = session?.user;
      if (!user) return;

      const { data, error } = await supabase
        .from("wallets")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (!error) setWallets(data);
    };

    fetchWallets();
  }, []);

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Wallets</h1>

      {wallets.length === 0 ? (
        <p className="text-gray-500">No wallets yet.</p>
      ) : (
        <ul className="bg-white shadow rounded-lg divide-y max-w-lg">
          {wallets.map((wallet) => (
            <li key={wallet.id} className="p-4 flex justify-between">
              <span>{wallet.name}</span>
              <span>
                {wallet.balance} {wallet.currency}
              </span>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
