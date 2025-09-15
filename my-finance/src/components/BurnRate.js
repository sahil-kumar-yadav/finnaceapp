"use client";

import { Card, CardContent } from "@/components/ui/card";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

export default function BurnRate({ data }) {
  if (!data) return null;

  const chartData = [
    { name: "Income", value: data.totalIncome },
    { name: "Expenses", value: data.totalExpenses },
  ];

  const COLORS = ["#34d399", "#f87171"]; // green, red

  return (
    <Card className="shadow-lg rounded-2xl">
      <CardContent className="p-4">
        <h2 className="text-lg font-semibold mb-4">Burn Rate</h2>
        <PieChart width={320} height={240}>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, value }) => `${name}: ${value}`}
            outerRadius={80}
            dataKey="value"
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </CardContent>
    </Card>
  );
}
