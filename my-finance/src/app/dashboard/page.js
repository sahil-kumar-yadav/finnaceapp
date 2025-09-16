// src/app/dashboard/page.js
"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import TransactionForm from "./components/transaction-form";
import TransactionList from "./components/transaction-list";

export default function DashboardPage() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch transactions for logged-in user
  useEffect(() => {
    const fetchData = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("transactions")
        .select("id, amount, type, category, transaction_date, wallets(name)")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(10);

      if (!error) setTransactions(data);
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <div className="space-y-8">
      {/* Header */}
      <header>
        <h1 className="text-2xl font-bold text-slate-800">Dashboard</h1>
        <p className="text-slate-500">
          Track your latest activity and manage your finances.
        </p>
      </header>

      {/* Add new transaction */}
      <section className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-semibold mb-4">Add Transaction</h2>
        <TransactionForm
          onTransactionAdded={(newTx) =>
            setTransactions((prev) => [newTx, ...prev])
          }
        />
      </section>

      {/* Recent transactions */}
      <section>
        <h2 className="text-lg font-semibold mb-4">Recent Transactions</h2>
        {loading ? (
          <div className="text-slate-500">Loading...</div>
        ) : transactions.length === 0 ? (
          <div className="text-slate-500">
            No transactions yet. Start by adding one above.
          </div>
        ) : (
          <TransactionList transactions={transactions} />
        )}
      </section>
    </div>
  );
}
