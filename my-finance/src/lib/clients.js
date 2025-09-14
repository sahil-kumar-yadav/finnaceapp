// import { createClient } from "./supabaseServer";

/**
 * Get all clients for the logged-in user
 */
export async function getClients(userId) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("clients")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data;
}

/**
 * Get single client by ID
 */
export async function getClientById(clientId) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("clients")
    .select("*")
    .eq("id", clientId)
    .single();

  if (error) throw error;
  return data;
}

/**
 * Create new client
 */
export async function createClient(userId, { name, email, phone, notes }) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("clients")
    .insert([{ user_id: userId, name, email, phone, notes }])
    .select()
    .single();

  if (error) throw error;
  return data;
}

/**
 * Update client
 */
export async function updateClient(clientId, updates) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("clients")
    .update(updates)
    .eq("id", clientId)
    .select()
    .single();

  if (error) throw error;
  return data;
}

/**
 * Delete client
 */
export async function deleteClient(clientId) {
  const supabase = createClient();
  const { error } = await supabase.from("clients").delete().eq("id", clientId);
  if (error) throw error;
  return true;
}
