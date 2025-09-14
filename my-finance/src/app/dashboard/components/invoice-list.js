"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function InvoiceList({ refresh }) {
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    const fetchInvoices = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      const user = session?.user;
      if (!user) return;

      const { data, error } = await supabase
        .from("invoices")
        .select("id, amount, status, due_date, clients(name)")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (!error) setInvoices(data);
    };

    fetchInvoices();
  }, [refresh]);

  return (
    <div className="bg-white shadow rounded-lg p-4 max-w-2xl">
      <h2 className="text-lg font-semibold mb-3">Recent Invoices</h2>
      {invoices.length === 0 ? (
        <p className="text-gray-500">No invoices yet.</p>
      ) : (
        <ul className="divide-y">
          {invoices.map((inv) => (
            <li key={inv.id} className="py-2 flex justify-between">
              <span>
                {inv.clients?.name} — {inv.status}
              </span>
              <span>
                {inv.amount} (due: {inv.due_date || "N/A"})
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
