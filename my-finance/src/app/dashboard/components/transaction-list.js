"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function TransactionList({ transactions }) {
  const [wallets, setWallets] = useState({});

  // Map wallet IDs → wallet names
  useEffect(() => {
    const fetchWallets = async () => {
      const { data, error } = await supabase
        .from("wallets")
        .select("id, name, currency");

      if (!error) {
        const map = {};
        data.forEach((w) => {
          map[w.id] = `${w.name} (${w.currency})`;
        });
        setWallets(map);
      }
    };
    fetchWallets();
  }, []);

  if (transactions.length === 0) {
    return <p className="text-gray-500">No transactions yet.</p>;
  }

  return (
    <div className="bg-white shadow rounded-lg p-4 max-w-2xl">
      <h2 className="text-lg font-semibold mb-3">Recent Transactions</h2>
      <ul className="divide-y">
        {transactions.map((tx) => (
          <li
            key={tx.id}
            className="flex justify-between py-2 text-sm"
          >
            <div>
              <p className="font-medium">{tx.notes || "No description"}</p>
              <p className="text-xs text-gray-500">
                {tx.category || "Uncategorized"} ·{" "}
                {wallets[tx.wallet_id] || "Wallet"}
              </p>
            </div>
            <span
              className={`font-medium ${
                tx.type === "INCOME"
                  ? "text-green-600"
                  : tx.type === "EXPENSE"
                  ? "text-red-600"
                  : "text-blue-600"
              }`}
            >
              {tx.type === "EXPENSE" ? "-" : "+"}₹{tx.amount}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
