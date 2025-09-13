"use client";
export default function IncomePatterns({ data }) {
    return (
        <div className="bg-white p-4 rounded shadow">
            <h2 className="text-lg font-semibold mb-2">Income Patterns</h2>
            <table className="w-full text-sm">
                <thead>
                    <tr className="border-b">
                        <th className="text-left">Client</th>
                        <th>Months Active</th>
                        <th>Total</th>
                        <th>Recurring?</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, i) => (
                        <tr key={i} className="border-b">
                            <td>{row.client}</td>
                            <td className="text-center">{row.months_active}</td>
                            <td className="text-green-600">₹{row.total_income}</td>
                            <td className="text-center">
                                {row.is_recurring ? "✅" : "❌"}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
