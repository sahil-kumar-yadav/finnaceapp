"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function ClientReportsPage() {
    const [reports, setReports] = useState([]);

    useEffect(() => {
        const fetchReports = async () => {
            const { data, error } = await supabase.rpc("get_client_reports");
            if (!error) setReports(data);
        };
        fetchReports();
    }, []);

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold">Client Reports</h1>
            <table className="w-full mt-4 border">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="p-2 border">Client</th>
                        <th className="p-2 border">Total Income</th>
                        <th className="p-2 border">Total Expense</th>
                        <th className="p-2 border">Net Profit</th>
                    </tr>
                </thead>
                <tbody>
                    {reports.map((r) => (
                        <tr key={r.client_id}>
                            <td className="p-2 border">{r.name}</td>
                            <td className="p-2 border text-green-600">₹{r.total_income}</td>
                            <td className="p-2 border text-red-600">₹{r.total_expense}</td>
                            <td className="p-2 border font-bold">₹{r.net_profit}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
