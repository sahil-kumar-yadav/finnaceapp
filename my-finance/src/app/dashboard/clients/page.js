"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function NewClientPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    notes: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await supabase.from("clients").insert([form]);

      if (error) {
        console.error("❌ Supabase Error:", error.message);
        alert("Failed to save client: " + error.message);
      } else {
        console.log("✅ Inserted:", data);
        router.push("/dashboard/clients");
      }
    } catch (err) {
      console.error("❗ Unexpected Error:", err);
      alert("Something went wrong. Check console for details.");
    } finally {
      setLoading(false);
    }
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
            placeholder={field[0].toUpperCase() + field.slice(1)}
            value={form[field]}
            onChange={handleChange}
            required={field !== "notes"} // make 'notes' optional
            className="w-full border p-2 rounded"
          />
        ))}

        <button
          type="submit"
          disabled={loading}
          className={`px-4 py-2 rounded text-white ${
            loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600"
          }`}
        >
          {loading ? "Saving..." : "Save"}
        </button>
      </form>
    </div>
  );
}
