import { supabase } from './supabase.js';

export async function cadastrarCliente({ nome, email = null, telefone, endereco = null }) {
  const { data: clienteCriado, error: erroInsert } = await supabase
    .from('clientes')
    .insert({
      nome: nome.trim(),
      email: email?.trim() || null,
      telefone: telefone.trim(),
      endereco: endereco?.trim() || null
    })
    .select('id')
    .single();

  if (erroInsert) throw erroInsert;

  return clienteCriado.id;
}
