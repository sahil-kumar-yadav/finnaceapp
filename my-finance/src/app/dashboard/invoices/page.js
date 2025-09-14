"use client";

import { useState } from "react";
import InvoiceForm from "../components/invoice-form";
import InvoiceList from "../components/invoice-list";

export default function InvoicesPage() {
  const [refresh, setRefresh] = useState(false);

  const handleInvoiceAdded = () => setRefresh(!refresh);

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-6">Invoices</h1>
      <InvoiceForm onAdd={handleInvoiceAdded} />
      <InvoiceList refresh={refresh} />
    </main>
  );
}
