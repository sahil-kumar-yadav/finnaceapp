"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";

export default function InvoicesPage() {
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    const fetchInvoices = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from("invoices")
        .select("*, clients(name)")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (!error) setInvoices(data);
    };
    fetchInvoices();
  }, []);

  return (
    <main className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Invoices</h1>
        <Link
          href="/dashboard/invoices/new"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + New Invoice
        </Link>
      </div>

      {invoices.length === 0 ? (
        <p className="text-gray-500">No invoices yet.</p>
      ) : (
        <ul className="bg-white shadow rounded-lg divide-y max-w-3xl">
          {invoices.map((inv) => (
            <li key={inv.id} className="p-4 flex justify-between items-center">
              <div>
                <p className="font-medium">#{inv.id.slice(0, 6)}</p>
                <p className="text-sm text-gray-500">
                  Client: {inv.clients?.name || "Unknown"} ·{" "}
                  {new Date(inv.due_date).toLocaleDateString()}
                </p>
              </div>
              <div className="text-right">
                <p className="font-semibold">₹{inv.amount}</p>
                <p
                  className={`text-xs ${
                    inv.status === "paid"
                      ? "text-green-600"
                      : inv.status === "sent"
                      ? "text-blue-600"
                      : "text-gray-500"
                  }`}
                >
                  {inv.status}
                </p>
                <Link
                  href={`/dashboard/invoices/${inv.id}`}
                  className="text-blue-600 hover:underline text-sm ml-2"
                >
                  View
                </Link>
              </div>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
