"use client";
export default function BurnRate({ data }) {
  if (!data) return null;
  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-lg font-semibold mb-2">Burn Rate & Runway</h2>
      <p>💸 Avg Monthly Expense: <span className="font-semibold text-red-600">₹{data.avg_expense}</span></p>
      <p>💼 Total Balance: <span className="font-semibold text-yellow-600">₹{data.total_balance}</span></p>
      <p>⏳ Runway: <span className="font-semibold text-blue-600">{data.runway_months ?? "∞"} months</span></p>
    </div>
  );
}
