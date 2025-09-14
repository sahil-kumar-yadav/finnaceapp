"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import TransactionForm from "./components/transaction-form";
import TransactionList from "./components/transaction-list";
import SignOutButton from "@/components/signout-button";

export default function DashboardPage() {
  const [transactions, setTransactions] = useState([]);

  // Fetch transactions for logged-in user
  useEffect(() => {
    const fetchData = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from("transactions")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (!error) setTransactions(data);
    };

    fetchData();
  }, []);

  return (
    <main className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <SignOutButton />
      </div>

      {/* Add new transaction */}
      <TransactionForm
        onTransactionAdded={(newTx) =>
          setTransactions([newTx, ...transactions])
        }
      />

      {/* List recent transactions */}
      <TransactionList transactions={transactions} />
    </main>
  );
}
