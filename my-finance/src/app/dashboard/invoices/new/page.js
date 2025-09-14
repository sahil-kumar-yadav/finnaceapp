"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function NewInvoicePage() {
  const [clients, setClients] = useState([]);
  const [clientId, setClientId] = useState("");
  const [amount, setAmount] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const fetchClients = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from("clients")
        .select("id, name")
        .eq("user_id", user.id);

      if (!error) setClients(data);
    };
    fetchClients();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;

    const { error } = await supabase.from("invoices").insert([
      {
        user_id: user.id,
        client_id: clientId,
        amount: parseFloat(amount),
        status: "draft",
        due_date: dueDate,
        notes,
      },
    ]);

    setLoading(false);
    if (!error) {
      router.push("/dashboard/invoices");
    }
  };

  return (
    <main className="p-6 max-w-lg">
      <h1 className="text-2xl font-bold mb-4">New Invoice</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow rounded-lg p-4 space-y-3"
      >
        <select
          value={clientId}
          onChange={(e) => setClientId(e.target.value)}
          required
          className="w-full border rounded px-3 py-2"
        >
          <option value="">Select Client</option>
          {clients.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>

        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
          className="w-full border rounded px-3 py-2"
        />

        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          required
          className="w-full border rounded px-3 py-2"
        />

        <textarea
          placeholder="Notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="w-full border rounded px-3 py-2"
          rows={3}
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {loading ? "Saving..." : "Create Invoice"}
        </button>
      </form>
    </main>
  );
}
