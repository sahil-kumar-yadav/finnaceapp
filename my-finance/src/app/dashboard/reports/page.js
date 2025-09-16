"use client";
import { useAuth } from "@/components/AuthProvider";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import BurnRate from "@/components/BurnRate";
import ExpenseCategoryChart from "@/components/ExpenseCategoryChart";
import MonthlyTrendChart from "@/components/MonthlyTrendChart";
import TopClients from "@/components/TopClients";
import IncomePatterns from "@/components/IncomePatterns";
import SignOutButton from "@/components/signout-button";

export default function ReportsPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  // Chart data states
  const [burnRate, setBurnRate] = useState(null);
  const [expenseCategories, setExpenseCategories] = useState([]);
  const [monthlyTrends, setMonthlyTrends] = useState([]);
  const [topClients, setTopClients] = useState([]);
  const [incomePatterns, setIncomePatterns] = useState([]);

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
    if (!loading && user) {
      // Fetch all chart data in parallel
      fetchCharts(user.id);
    }
    // eslint-disable-next-line
  }, [user, loading]);

  async function fetchCharts(userId) {
    // 1. Burn Rate (total income vs expenses)
    const { data: incomeData } = await supabase
      .from("transactions")
      .select("amount")
      .eq("user_id", userId)
      .eq("type", "INCOME");
    const { data: expenseData } = await supabase
      .from("transactions")
      .select("amount")
      .eq("user_id", userId)
      .eq("type", "EXPENSE");
    const totalIncome = incomeData?.reduce((sum, t) => sum + Number(t.amount), 0) || 0;
    const totalExpenses = expenseData?.reduce((sum, t) => sum + Number(t.amount), 0) || 0;
    setBurnRate({ totalIncome, totalExpenses });

    // 2. Expense Category Chart
    const { data: expenseCatData } = await supabase
      .from("transactions")
      .select("category, amount")
      .eq("user_id", userId)
      .eq("type", "EXPENSE");
    const catMap = {};
    expenseCatData?.forEach((t) => {
      if (!catMap[t.category]) catMap[t.category] = 0;
      catMap[t.category] += Number(t.amount);
    });
    setExpenseCategories(
      Object.entries(catMap).map(([category, value]) => ({ category, value }))
    );

    // 3. Monthly Trend Chart
    const { data: trendData } = await supabase
      .from("transactions")
      .select("amount, type, transaction_date")
      .eq("user_id", userId);
    const trendMap = {};
    trendData?.forEach((t) => {
      const month = t.transaction_date?.slice(0, 7); // YYYY-MM
      if (!trendMap[month]) trendMap[month] = { income: 0, expense: 0, month };
      if (t.type === "INCOME") trendMap[month].income += Number(t.amount);
      if (t.type === "EXPENSE") trendMap[month].expense += Number(t.amount);
    });
    setMonthlyTrends(Object.values(trendMap).sort((a, b) => a.month.localeCompare(b.month)));

    // 4. Top Clients
    const { data: clientData } = await supabase
      .from("transactions")
      .select("amount, client_id, type")
      .eq("user_id", userId)
      .eq("type", "INCOME");
    // Fetch client names
    const clientIds = [...new Set(clientData?.map((t) => t.client_id).filter(Boolean))];
    let clientNames = {};
    if (clientIds.length) {
      const { data: clients } = await supabase
        .from("clients")
        .select("id, name")
        .in("id", clientIds);
      clients?.forEach((c) => (clientNames[c.id] = c.name));
    }
    const clientMap = {};
    clientData?.forEach((t) => {
      if (!clientMap[t.client_id]) clientMap[t.client_id] = 0;
      clientMap[t.client_id] += Number(t.amount);
    });
    setTopClients(
      Object.entries(clientMap)
        .map(([client, revenue]) => ({
          client: clientNames[client] || "Unknown",
          revenue,
        }))
        .sort((a, b) => b.revenue - a.revenue)
        .slice(0, 5)
    );

    // 5. Income Patterns (example: income by category)
    const { data: incomeCatData } = await supabase
      .from("transactions")
      .select("category, amount")
      .eq("user_id", userId)
      .eq("type", "INCOME");
    const incomeCatMap = {};
    incomeCatData?.forEach((t) => {
      if (!incomeCatMap[t.category]) incomeCatMap[t.category] = 0;
      incomeCatMap[t.category] += Number(t.amount);
    });
    setIncomePatterns(
      Object.entries(incomeCatMap).map(([category, value]) => ({ category, value }))
    );
  }

  if (loading || !user) {
    return <p className="p-6">Loading...</p>;
  }

  return (
    <main className="p-6 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Reports & Insights</h1>
        <SignOutButton />
      </div>
      <div className="grid md:grid-cols-2 gap-8">
        <BurnRate data={burnRate} />
        <ExpenseCategoryChart data={expenseCategories} />
      </div>
      <div className="grid md:grid-cols-2 gap-8">
        <MonthlyTrendChart data={monthlyTrends} />
        <TopClients data={topClients} />
      </div>
      <IncomePatterns data={incomePatterns} />
    </main>
  );
}
