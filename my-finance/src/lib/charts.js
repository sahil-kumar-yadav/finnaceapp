import { createClient } from "./supabaseServer";

// ✅ Monthly income vs expense
export async function getMonthlySummary(userId) {
  const supabase = createClient();
  const { data, error } = await supabase.rpc("monthly_summary", { user_id_input: userId });
  if (error) throw error;
  return data;
}

// ✅ Expense by category
export async function getExpenseByCategory(userId) {
  const supabase = createClient();
  const { data, error } = await supabase.rpc("expense_by_category", { user_id_input: userId });
  if (error) throw error;
  return data;
}
