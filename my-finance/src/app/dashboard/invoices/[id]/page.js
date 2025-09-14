"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function InvoiceDetailPage() {
  const params = useParams();
  const [invoice, setInvoice] = useState(null);

  useEffect(() => {
    const fetchInvoice = async () => {
      const { data, error } = await supabase
        .from("invoices")
        .select("*, clients(name, email)")
        .eq("id", params.id)
        .single();

      if (!error) setInvoice(data);
    };
    fetchInvoice();
  }, [params.id]);

  if (!invoice) return <p className="p-6">Loading...</p>;

  return (
    <main className="p-6 max-w-lg">
      <h1 className="text-2xl font-bold mb-4">Invoice #{invoice.id.slice(0, 6)}</h1>
      <div className="bg-white shadow rounded-lg p-4 space-y-2">
        <p>
          <span className="font-semibold">Client:</span>{" "}
          {invoice.clients?.name} ({invoice.clients?.email})
        </p>
        <p>
          <span className="font-semibold">Amount:</span> ₹{invoice.amount}
        </p>
        <p>
          <span className="font-semibold">Status:</span>{" "}
          <span
            className={
              invoice.status === "paid"
                ? "text-green-600"
                : invoice.status === "sent"
                ? "text-blue-600"
                : "text-gray-500"
            }
          >
            {invoice.status}
          </span>
        </p>
        <p>
          <span className="font-semibold">Due Date:</span>{" "}
          {new Date(invoice.due_date).toLocaleDateString()}
        </p>
        <p>
          <span className="font-semibold">Notes:</span> {invoice.notes || "—"}
        </p>
      </div>
    </main>
  );
}
