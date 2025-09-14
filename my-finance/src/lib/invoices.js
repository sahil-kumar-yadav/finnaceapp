import { createClient } from "./supabaseServer";

/**
 * Fetch all invoices for a user
 */
export async function getInvoices(userId) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("invoices")
    .select("*, clients(name, email)")
    .eq("user_id", userId)
    .order("issue_date", { ascending: false });

  if (error) throw error;
  return data;
}

/**
 * Create invoice
 */
export async function createInvoice(userId, { client_id, issue_date, due_date, amount, notes }) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("invoices")
    .insert([{ user_id: userId, client_id, issue_date, due_date, amount, notes }])
    .select()
    .single();

  if (error) throw error;
  return data;
}

/**
 * Update invoice
 */
export async function updateInvoice(invoiceId, updates) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("invoices")
    .update(updates)
    .eq("id", invoiceId)
    .select()
    .single();

  if (error) throw error;
  return data;
}

/**
 * Delete invoice
 */
export async function deleteInvoice(invoiceId) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("invoices")
    .delete()
    .eq("id", invoiceId);

  if (error) throw error;
  return true;
}

/**
 * Outstanding balance (total unpaid)
 */
export async function getOutstandingBalance(userId) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("invoices")
    .select("amount, status")
    .eq("user_id", userId)
    .in("status", ["sent", "overdue"]);

  if (error) throw error;

  return data.reduce((sum, inv) => sum + Number(inv.amount), 0);
}
