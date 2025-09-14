"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function TransactionForm({ onTransactionAdded }) {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("INCOME");
  const [category, setCategory] = useState("");
  const [wallets, setWallets] = useState([]);
  const [walletId, setWalletId] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch wallets for dropdown
  useEffect(() => {
    const fetchWallets = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from("wallets")
        .select("id, name, currency")
        .eq("user_id", user.id);

      if (!error) {
        setWallets(data);
        if (data.length > 0) setWalletId(data[0].id);
      }
    };
    fetchWallets();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();
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
          notes: description,
        },
      ])
      .select()
      .single();

    setLoading(false);

    if (!error && data) {
      onTransactionAdded(data);
      setAmount("");
      setDescription("");
      setCategory("");
      setType("INCOME");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow rounded-lg p-4 mb-6 max-w-md"
    >
      <h2 className="text-lg font-semibold mb-3">Add Transaction</h2>

      <div className="mb-2">
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
          className="w-full border rounded px-3 py-2"
        />
      </div>

      <div className="mb-2">
        <input
          type="text"
          placeholder="Description / Notes"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="w-full border rounded px-3 py-2"
        />
      </div>

      <div className="mb-2">
        <input
          type="text"
          placeholder="Category (e.g. Food, Rent)"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full border rounded px-3 py-2"
        />
      </div>

      <div className="mb-2">
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="w-full border rounded px-3 py-2"
        >
          <option value="INCOME">Income</option>
          <option value="EXPENSE">Expense</option>
          <option value="TRANSFER">Transfer</option>
          <option value="INVESTMENT">Investment</option>
        </select>
      </div>

      <div className="mb-3">
        <select
          value={walletId}
          onChange={(e) => setWalletId(e.target.value)}
          className="w-full border rounded px-3 py-2"
          required
        >
          {wallets.length === 0 ? (
            <option value="">No wallets available</option>
          ) : (
            wallets.map((w) => (
              <option key={w.id} value={w.id}>
                {w.name} ({w.currency})
              </option>
            ))
          )}
        </select>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {loading ? "Saving..." : "Add Transaction"}
      </button>
    </form>
  );
}
