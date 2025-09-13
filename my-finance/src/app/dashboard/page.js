"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabaseClient";
import { getTopClients, getIncomePatterns, getBurnRateRunway } from "@/lib/insights";
import TopClients from "@/components/TopClients";
import IncomePatterns from "@/components/IncomePatterns";
import BurnRate from "@/components/BurnRate";

export default function DashboardPage() {
  const [clients, setClients] = useState([]);
  const [patterns, setPatterns] = useState([]);
  const [burnData, setBurnData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setClients(await getTopClients(user.id));
        setPatterns(await getIncomePatterns(user.id));
        setBurnData(await getBurnRateRunway(user.id));
      }
    };
    fetchData();
  }, []);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-xl font-bold">Advanced Insights</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <TopClients data={clients} />
        <BurnRate data={burnData} />
      </div>
      <IncomePatterns data={patterns} />
    </div>
  );
}
