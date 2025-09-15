"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function IncomePatterns({ data }) {
  if (!data || data.length === 0) return null;

  // rolling average income for smoother trend
  const smoothed = data.map((d, i, arr) => {
    const window = arr.slice(Math.max(0, i - 2), i + 1);
    const avgIncome = window.reduce((sum, x) => sum + x.income, 0) / window.length;
    return { ...d, avgIncome };
  });

  return (
    <Card className="shadow-lg rounded-2xl">
      <CardContent className="p-4">
        <h2 className="text-lg font-semibold mb-4">Income Patterns</h2>
        <ResponsiveContainer width="100%" height={280}>
          <AreaChart data={smoothed}>
            <defs>
              <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#34d399" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#34d399" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="avgIncome"
              stroke="#34d399"
              fillOpacity={1}
              fill="url(#colorIncome)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
