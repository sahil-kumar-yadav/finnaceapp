"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function NewClientPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;

    const { error } = await supabase.from("clients").insert([
      {
        user_id: user.id,
        name,
        email,
        phone,
        company,
        notes,
      },
    ]);

    setLoading(false);
    if (!error) {
      router.push("/dashboard/clients");
    }
  };

  return (
    <main className="p-6 max-w-lg">
      <h1 className="text-2xl font-bold mb-4">New Client</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow rounded-lg p-4"
      >
        <div className="mb-2">
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div className="mb-2">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div className="mb-2">
          <input
            type="text"
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div className="mb-2">
          <input
            type="text"
            placeholder="Company"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div className="mb-4">
          <textarea
            placeholder="Notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full border rounded px-3 py-2"
            rows={3}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {loading ? "Saving..." : "Add Client"}
        </button>
      </form>
    </main>
  );
}
