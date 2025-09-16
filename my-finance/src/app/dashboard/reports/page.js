import { createClient } from "@/lib/supabaseServer";
import {
  getTopClients,
  getIncomePatterns,
  getBurnRateRunway,
} from "@/lib/insights";
import BurnRate from "@/components/BurnRate";
import ExpenseCategoryChart from "@/components/ExpenseCategoryChart";
import MonthlyTrendChart from "@/components/MonthlyTrendChart";
import TopClients from "@/components/TopClients";
import IncomePatterns from "@/components/IncomePatterns";
import SignOutButton from "@/components/signout-button";

export default async function ReportsPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return <p className="p-6">Not logged in.</p>;
  }

  // Fetch insights using RPC or server queries
  const [topClients, incomePatterns, burnRate] = await Promise.all([
    getTopClients(user.id),
    getIncomePatterns(user.id),
    getBurnRateRunway(user.id),
  ]);

  return (
    <main className="p-6 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Reports & Insights</h1>
        <SignOutButton />
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <BurnRate data={burnRate} />
        <ExpenseCategoryChart data={incomePatterns} />
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <MonthlyTrendChart data={incomePatterns} />
        <TopClients data={topClients} />
      </div>

      <IncomePatterns data={incomePatterns} />
    </main>
  );
}
