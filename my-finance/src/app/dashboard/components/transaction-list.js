"use client";

export default function TransactionList({ transactions }) {
  return (
    <div className="bg-white shadow rounded-lg p-4">
      <h2 className="text-lg font-semibold mb-3">Recent Transactions</h2>
      {transactions.length === 0 ? (
        <p className="text-gray-500">No transactions yet.</p>
      ) : (
        <ul className="divide-y">
          {transactions.map((t) => (
            <li key={t.id} className="py-2 flex justify-between">
              <span>
                {t.category} ({t.type}) – {t.wallets?.name || "No Wallet"}
              </span>
              <span>{t.amount}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
