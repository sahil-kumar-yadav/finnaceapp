"use client";
export default function TopClients({ data }) {
    return (
        <div className="bg-white p-4 rounded shadow">
            <h2 className="text-lg font-semibold mb-2">Top Clients</h2>
            <ul>
                {data.map((c, i) => (
                    <li key={i} className="flex justify-between py-1">
                        <span>{c.client}</span>
                        <span className="font-semibold text-green-600">₹{c.total_income}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}
