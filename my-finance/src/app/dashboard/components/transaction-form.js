"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function TransactionForm({ onTransactionAdded }) {
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("INCOME");
  const [category, setCategory] = useState("");
  const [wallets, setWallets] = useState([]);
  const [walletId, setWalletId] = useState("");

  useEffect(() => {
    const fetchWallets = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      const user = session?.user;
      if (!user) return;

      const { data, error } = await supabase
        .from("wallets")
        .select("id, name")
        .eq("user_id", user.id);

      if (!error) setWallets(data);
    };

    fetchWallets();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const {
      data: { session },
    } = await supabase.auth.getSession();

    const user = session?.user;
    if (!user) return;

    const { data, error } = await supabase
      .from("transactions")
      .insert([
        {
          user_id: user.id,
          wallet_id: walletId,
          amount: parseFloat(amount),
          type,
          category,
        },
      ])
      .select("id, amount, type, category, transaction_date, wallet_id");

    if (!error && data && data.length > 0) {
      // fetch wallet name for the new transaction
      const wallet = wallets.find((w) => w.id === walletId);
      const txWithWallet = {
        ...data[0],
        wallets: wallet ? { name: wallet.name } : null,
      };

      onTransactionAdded(txWithWallet);

      setAmount("");
      setCategory("");
      setWalletId("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow rounded-lg p-4 mb-6 space-y-4"
    >
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="w-full border rounded p-2"
        required
      />

      <select
        value={type}
        onChange={(e) => setType(e.target.value)}
        className="w-full border rounded p-2"
      >
        <option value="INCOME">Income</option>
        <option value="EXPENSE">Expense</option>
        <option value="TRANSFER">Transfer</option>
        <option value="INVESTMENT">Investment</option>
      </select>

      <input
        type="text"
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="w-full border rounded p-2"
      />

      <select
        value={walletId}
        onChange={(e) => setWalletId(e.target.value)}
        className="w-full border rounded p-2"
        required
      >
        <option value="">Select Wallet</option>
        {wallets.map((wallet) => (
          <option key={wallet.id} value={wallet.id}>
            {wallet.name}
          </option>
        ))}
      </select>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Add Transaction
      </button>
    </form>
  );
}
