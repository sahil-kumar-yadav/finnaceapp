"use client";

import { deleteTransaction } from "@/lib/actions";

export default function TransactionList({ transactions }) {
  async function handleDelete(id) {
    await deleteTransaction(id);
  }

  if (!transactions.length) {
    return <p className="text-gray-500">No transactions yet.</p>;
  }

  return (
    <ul className="space-y-3">
      {transactions.map((t) => (
        <li
          key={t.id}
          className="flex justify-between items-center bg-white dark:bg-gray-800 p-4 rounded shadow"
        >
          <div>
            <p className="font-medium">
              {t.type}: {t.amount}
            </p>
            <p className="text-sm text-gray-500">{t.category} — {t.notes}</p>
            <p className="text-xs text-gray-400">{t.transaction_date}</p>
          </div>
          <button
            onClick={() => handleDelete(t.id)}
            className="text-red-600 hover:underline"
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}
