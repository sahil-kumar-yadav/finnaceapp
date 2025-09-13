"use client";

import { useState } from "react";
import { addTransaction } from "@/lib/actions";

export default function TransactionForm({ wallets }) {
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();
        setLoading(true);

        const formData = {
            wallet_id: e.target.wallet.value,
            amount: parseFloat(e.target.amount.value),
            type: e.target.type.value,
            category: e.target.category.value,
            notes: e.target.notes.value,
            date: e.target.date.value,
        };

        await addTransaction(formData);
        setLoading(false);
        e.target.reset();
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow mb-6"
        >
            <div className="grid gap-4">
                <select name="wallet" className="border p-2 rounded" required>
                    {wallets.map((w) => (
                        <option key={w.id} value={w.id}>
                            {w.name} ({w.currency})
                        </option>
                    ))}
                </select>

                <input
                    type="number"
                    name="amount"
                    step="0.01"
                    placeholder="Amount"
                    required
                    className="border p-2 rounded"
                />

                <select name="type" className="border p-2 rounded" required>
                    <option value="INCOME">Income</option>
                    <option value="EXPENSE">Expense</option>
                    <option value="TRANSFER">Transfer</option>
                    <option value="INVESTMENT">Investment</option>
                </select>

                <input
                    type="text"
                    name="category"
                    placeholder="Category"
                    className="border p-2 rounded"
                />

                <textarea
                    name="notes"
                    placeholder="Notes"
                    className="border p-2 rounded"
                />

                <input type="date" name="date" className="border p-2 rounded" />

                <button
                    type="submit"
                    disabled={loading}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    {loading ? "Adding..." : "Add Transaction"}
                </button>
            </div>
        </form>
    );
}
