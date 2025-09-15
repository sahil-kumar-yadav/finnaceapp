"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function WalletForm({ onAdd }) {
    const [name, setName] = useState("");
    const [currency, setCurrency] = useState("INR");
    const [balance, setBalance] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        // get current session
        const {
            data: { session },
        } = await supabase.auth.getSession();

        const user = session?.user;
        if (!user) {
            alert("You must be logged in to create a wallet.");
            return;
        }

        const { error } = await supabase.from("wallets").insert([
            {
                user_id: user.id,
                name,
                currency,
                balance: balance ? parseFloat(balance) : 0,
            },
        ]);

        if (error) {
            console.error("Error creating wallet:", error.message);
            alert("Could not create wallet");
            return;
        }

        setName("");
        setCurrency("INR");
        setBalance("");

        if (onAdd) onAdd(); // refresh wallets list
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white shadow rounded-lg p-4 mb-6 space-y-4 max-w-md"
        >
            <input
                type="text"
                placeholder="Wallet Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border rounded p-2"
                required
            />

            <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="w-full border rounded p-2"
            >
                <option value="INR">INR (₹)</option>
                <option value="USD">USD ($)</option>
                <option value="EUR">EUR (€)</option>
            </select>

            <input
                type="number"
                placeholder="Initial Balance"
                value={balance}
                onChange={(e) => setBalance(e.target.value)}
                className="w-full border rounded p-2"
            />

            <button
                type="submit"
                className="bg-green-600 text-white px-4 py-2 rounded"
            >
                Add Wallet
            </button>
        </form>
    );
}
