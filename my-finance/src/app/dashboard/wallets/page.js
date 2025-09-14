"use client";

import { useEffect, useState } from "react";
import { getWallets, createWallet, deleteWallet } from "@/lib/wallets";
import { createClient } from "@/lib/supabaseServer";

export default function WalletsPage() {
    const [wallets, setWallets] = useState([]);
    const [newWallet, setNewWallet] = useState({ name: "", currency: "INR" });

    useEffect(() => {
        const fetchWallets = async () => {
            const supabase = createClient();
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                const data = await getWallets(user.id);
                setWallets(data);
            }
        };
        fetchWallets();
    }, []);

    const handleCreate = async () => {
        const supabase = createClient();
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        const wallet = await createWallet(user.id, newWallet);
        setWallets([...wallets, wallet]);
        setNewWallet({ name: "", currency: "INR" });
    };

    const handleDelete = async (id) => {
        await deleteWallet(id);
        setWallets(wallets.filter((w) => w.id !== id));
    };

    return (
        <div className="p-6">
            <h1 className="text-xl font-bold mb-4">My Wallets</h1>

            {/* Create Wallet */}
            <div className="mb-6 flex gap-2">
                <input
                    type="text"
                    placeholder="Wallet name"
                    value={newWallet.name}
                    onChange={(e) => setNewWallet({ ...newWallet, name: e.target.value })}
                    className="border p-2 rounded"
                />
                <select
                    value={newWallet.currency}
                    onChange={(e) => setNewWallet({ ...newWallet, currency: e.target.value })}
                    className="border p-2 rounded"
                >
                    <option value="INR">INR ₹</option>
                    <option value="USD">USD $</option>
                    <option value="EUR">EUR €</option>
                </select>
                <button
                    onClick={handleCreate}
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                    Add
                </button>
            </div>

            {/* Wallet List */}
            <ul className="space-y-3">
                {wallets.map((wallet) => (
                    <li
                        key={wallet.id}
                        className="flex justify-between items-center border p-3 rounded shadow"
                    >
                        <div>
                            <h2 className="font-semibold">{wallet.name}</h2>
                            <p className="text-sm text-gray-500">
                                Balance: {wallet.balance} {wallet.currency}
                            </p>
                        </div>
                        <button
                            onClick={() => handleDelete(wallet.id)}
                            className="text-red-600"
                        >
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
