"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function InvoiceForm({ onAdd }) {
  const [clients, setClients] = useState([]);
  const [clientId, setClientId] = useState("");
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState("draft");
  const [dueDate, setDueDate] = useState("");

  useEffect(() => {
    const fetchClients = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      const user = session?.user;
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

    const {
      data: { session },
    } = await supabase.auth.getSession();

    const user = session?.user;
    if (!user) return;

    const { data, error } = await supabase
      .from("invoices")
      .insert([
        {
          user_id: user.id,
          client_id: clientId,
          amount: parseFloat(amount),
          status,
          due_date: dueDate || null,
        },
      ])
      .select();

    if (!error && data && data.length > 0) {
      onAdd();
      setClientId("");
      setAmount("");
      setStatus("draft");
      setDueDate("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow rounded-lg p-4 mb-6 space-y-4 max-w-lg"
    >
      <select
        value={clientId}
        onChange={(e) => setClientId(e.target.value)}
        className="w-full border rounded p-2"
        required
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
        className="w-full border rounded p-2"
        required
      />

      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="w-full border rounded p-2"
      >
        <option value="draft">Draft</option>
        <option value="sent">Sent</option>
        <option value="paid">Paid</option>
        <option value="overdue">Overdue</option>
      </select>

      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        className="w-full border rounded p-2"
      />

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Add Invoice
      </button>
    </form>
  );
}
