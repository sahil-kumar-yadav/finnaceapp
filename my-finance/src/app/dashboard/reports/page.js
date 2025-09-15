"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import BurnRate from "@/components/BurnRate";
import ExpenseCategoryChart from "@/components/ExpenseCategoryChart";
import MonthlyTrendChart from "@/components/MonthlyTrendChart";
import TopClients from "@/components/TopClients";
import IncomePatterns from "@/components/IncomePatterns";
import SignOutButton from "@/components/signout-button";
import { getBurnRateRunway, getIncomePatterns, getTopClients } from "@/lib/insights";


export default function ReportsPage() {
  const [insights, setInsights] = useState(null);

  useEffect(() => {
    const fetchInsights = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      try {
        const [topClients, incomePatterns, burnRate, categories, monthlyTrend] =
          await Promise.all([
            getTopClients(user.id),
            getIncomePatterns(user.id),
            getBurnRateRunway(user.id),
            getExpenseCategories(user.id),
            getMonthlyTrend(user.id),
          ]);

        setInsights({
          topClients,
          incomePatterns,
          burnRate,
          categories,
          monthlyTrend,
        });
      } catch (err) {
        console.error("Failed to fetch insights:", err);
      }
    };

    fetchInsights();
  }, []);

  if (!insights) return <p className="p-6">Loading reports...</p>;

  return (
    <main className="p-6 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Reports & Insights</h1>
        <SignOutButton />
      </div>

      {/* Burn rate + Expense categories */}
      <div className="grid md:grid-cols-2 gap-8">
        <BurnRate data={insights.burnRate} />
        <ExpenseCategoryChart data={insights.categories} />
      </div>

      {/* Monthly trend + Top clients */}
      <div className="grid md:grid-cols-2 gap-8">
        <MonthlyTrendChart data={insights.monthlyTrend} />
        <TopClients data={insights.topClients} />
      </div>

      {/* Income patterns */}
      <IncomePatterns data={insights.incomePatterns} />
    </main>
  );
}
