"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";

export default function ClientsPage() {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    const fetchClients = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from("clients")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (!error) setClients(data);
    };
    fetchClients();
  }, []);

  return (
    <main className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Clients</h1>
        <Link
          href="/dashboard/clients/new"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + New Client
        </Link>
      </div>

      {clients.length === 0 ? (
        <p className="text-gray-500">No clients yet.</p>
      ) : (
        <ul className="bg-white shadow rounded-lg divide-y max-w-2xl">
          {clients.map((client) => (
            <li key={client.id} className="p-4 flex justify-between">
              <div>
                <p className="font-medium">{client.name}</p>
                <p className="text-xs text-gray-500">
                  {client.email || "No email"} · {client.company || "No company"}
                </p>
              </div>
              <Link
                href={`/dashboard/clients/${client.id}`}
                className="text-blue-600 hover:underline text-sm"
              >
                View
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
