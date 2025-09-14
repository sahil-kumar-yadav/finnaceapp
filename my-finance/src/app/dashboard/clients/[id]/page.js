"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function ClientDetailPage() {
  const params = useParams();
  const [client, setClient] = useState(null);

  useEffect(() => {
    const fetchClient = async () => {
      const { data, error } = await supabase
        .from("clients")
        .select("*")
        .eq("id", params.id)
        .single();

      if (!error) setClient(data);
    };
    fetchClient();
  }, [params.id]);

  if (!client) {
    return <p className="p-6">Loading...</p>;
  }

  return (
    <main className="p-6 max-w-lg">
      <h1 className="text-2xl font-bold mb-4">{client.name}</h1>
      <div className="bg-white shadow rounded-lg p-4 space-y-2">
        <p><span className="font-semibold">Email:</span> {client.email || "—"}</p>
        <p><span className="font-semibold">Phone:</span> {client.phone || "—"}</p>
        <p><span className="font-semibold">Company:</span> {client.company || "—"}</p>
        <p><span className="font-semibold">Notes:</span> {client.notes || "—"}</p>
      </div>
    </main>
  );
}
