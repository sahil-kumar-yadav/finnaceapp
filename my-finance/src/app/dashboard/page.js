"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabaseClient";
import { getMonthlySummary, getExpenseByCategory } from "@/lib/charts";
import MonthlyTrendChart from "@/components/MonthlyTrendChart";
import ExpenseCategoryChart from "@/components/ExpenseCategoryChart";

export default function DashboardPage() {
  const [monthlyData, setMonthlyData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setMonthlyData(await getMonthlySummary(user.id));
        setCategoryData(await getExpenseByCategory(user.id));
      }
    };
    fetchData();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Dashboard Insights</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <MonthlyTrendChart data={monthlyData} />
        <ExpenseCategoryChart data={categoryData} />
      </div>
    </div>
  );
}
