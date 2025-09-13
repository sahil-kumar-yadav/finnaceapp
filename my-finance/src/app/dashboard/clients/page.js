"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function NewClientPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", phone: "", company: "", notes: "" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error } = await supabase.from("clients").insert([form]);
    if (!error) router.push("/dashboard/clients");
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">Add New Client</h1>
      <form onSubmit={handleSubmit} className="space-y-3 mt-4">
        {["name", "email", "phone", "company", "notes"].map((field) => (
          <input
            key={field}
            type="text"
            name={field}
            placeholder={field}
            value={form[field]}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        ))}
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Save</button>
      </form>
    </div>
  );
}
