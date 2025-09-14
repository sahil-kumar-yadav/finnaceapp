"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function TransactionList({ refresh }) {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      const user = session?.user;
      if (!user) return;

      const { data, error } = await supabase
        .from("transactions")
        .select("id, amount, type, category, transaction_date, wallets(name)")
        .eq("user_id", user.id)
        .order("transaction_date", { ascending: false });

      if (!error) setTransactions(data);
    };

    fetchTransactions();
  }, [refresh]);

  return (
    <div className="bg-white shadow rounded-lg p-4">
      <h2 className="text-lg font-semibold mb-3">Recent Transactions</h2>
      {transactions.length === 0 ? (
        <p className="text-gray-500">No transactions yet.</p>
      ) : (
        <ul className="divide-y">
          {transactions.map((t) => (
            <li key={t.id} className="py-2 flex justify-between">
              <span>
                {t.category} ({t.type}) – {t.wallets?.name}
              </span>
              <span>{t.amount}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
