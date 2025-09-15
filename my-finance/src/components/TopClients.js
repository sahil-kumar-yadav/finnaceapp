"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

export default function TopClients({ data }) {
  if (!data || data.length === 0) return null;

  return (
    <Card className="shadow-lg rounded-2xl">
      <CardContent className="p-4">
        <h2 className="text-lg font-semibold mb-4">Top Clients</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="client" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="revenue" fill="#60a5fa" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
