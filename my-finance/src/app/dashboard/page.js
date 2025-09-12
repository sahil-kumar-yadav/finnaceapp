// app/dashboard/page.js (server component)
import { supabase } from "@/lib/supabaseClient"; // careful: client lib can be used server-side with anon key

export default async function DashboardPage() {
  // server-side: you can fetch public data, but to fetch user-specific data server-side with auth,
  // use createServerComponentClient from @supabase/auth-helpers-nextjs or pass session cookie.
  const { data } = await supabase.from("transactions").select("*").order("transaction_date", { ascending: false }).limit(50);
  return (
    <div>
      {data?.map(t => (
        <div key={t.id}>{t.transaction_date} — {t.type} — {t.amount}</div>
      ))}
    </div>
  );
}
