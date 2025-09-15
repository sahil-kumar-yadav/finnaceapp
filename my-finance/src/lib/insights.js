import { createClient } from "./supabaseServer";

export async function getTopClients(userId) {
  const supabase = await createClient(); // ⬅️ await here
  const { data, error } = await supabase.rpc("top_clients", {
    user_id_input: userId,
  });
  if (error) throw error;
  return data;
}

export async function getIncomePatterns(userId) {
  const supabase = await createClient();
  const { data, error } = await supabase.rpc("income_patterns", {
    user_id_input: userId,
  });
  if (error) throw error;
  return data;
}

export async function getBurnRateRunway(userId) {
  const supabase = await createClient();
  const { data, error } = await supabase.rpc("burn_rate_runway", {
    user_id_input: userId,
  });
  if (error) throw error;
  return data[0];
}
