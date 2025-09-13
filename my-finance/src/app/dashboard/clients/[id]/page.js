"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useParams } from "next/navigation";

export default function ClientDetailPage() {
  const { id } = useParams();
  const [client, setClient] = useState(null);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchClient = async () => {
      const { data } = await supabase.from("clients").select("*").eq("id", id).single();
      setClient(data);
    };

    const fetchTransactions = async () => {
      const { data } = await supabase.from("transactions").select("*").eq("client_id", id);
      setTransactions(data || []);
    };

    fetchClient();
    fetchTransactions();
  }, [id]);

  if (!client) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">{client.name}</h1>
      <p>{client.email} | {client.phone}</p>
      <p>{client.company}</p>
      <p className="text-gray-600">{client.notes}</p>

      <h2 className="mt-6 text-lg font-semibold">Transactions</h2>
      <ul className="mt-2 space-y-2">
        {transactions.map((tx) => (
          <li key={tx.id} className="border p-2 rounded">
            {tx.type} — ₹{tx.amount} ({tx.notes})
          </li>
        ))}
      </ul>
    </div>
  );
}
