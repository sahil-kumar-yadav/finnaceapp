"use client";
import { useEffect, useState } from "react";
import { getInvoices } from "@/lib/invoices";

export default function InvoicesPage() {
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    async function fetchInvoices() {
      const userId = "CURRENT_USER_ID"; // TODO: inject real user
      const data = await getInvoices(userId);
      setInvoices(data);
    }
    fetchInvoices();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Invoices</h1>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 text-left">Client</th>
            <th className="p-2">Amount</th>
            <th className="p-2">Status</th>
            <th className="p-2">Due</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((inv) => (
            <tr key={inv.id} className="border-b">
              <td className="p-2">{inv.clients?.name}</td>
              <td className="p-2">${inv.amount}</td>
              <td className="p-2">{inv.status}</td>
              <td className="p-2">{inv.due_date || "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
