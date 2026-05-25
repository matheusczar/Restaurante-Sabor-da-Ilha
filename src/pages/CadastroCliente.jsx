import { useState } from 'react';
import { Loader2, UserPlus } from 'lucide-react';
import { supabase } from '../lib/supabase.js';

const initialForm = {
  nome: '',
  email: '',
  telefone: '',
  endereco: ''
};

export default function CadastroCliente() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setStatus({ type: '', message: '' });

    try {
      const { error } = await supabase.from('clientes').insert({
        nome: form.nome,
        email: form.email || null,
        telefone: form.telefone,
        endereco: form.endereco || null
      });

      if (error) throw error;

      setForm(initialForm);
      setStatus({
        type: 'success',
        message: 'Cadastro realizado com sucesso! Agora você pode fazer uma reserva ou pedido de delivery.'
      });
      alert('Cadastro realizado com sucesso! Agora você pode fazer uma reserva ou pedido de delivery.');
    } catch (error) {
      setStatus({ type: 'error', message: error.message });
      alert(`Erro ao cadastrar cliente: ${error.message}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="page-section">
      <div className="container form-layout">
        <div className="form-intro">
          <p className="eyebrow">Clientes</p>
          <h1>Entre para a lista de sabores da ilha.</h1>
          <p>
            Cadastre-se para realizar reservas e pedidos pelo nosso restaurante. Seus
            dados serão usados para identificar seus pedidos, confirmar reservas e
            facilitar o atendimento.
          </p>
          <div className="service-box">
            <UserPlus size={28} />
            <div>
              <strong>Cadastro rápido</strong>
              <span>Seus dados ficam organizados no Supabase do restaurante.</span>
            </div>
          </div>
        </div>

        <form className="form-card" onSubmit={handleSubmit}>
          <label>
            Nome completo
            <input name="nome" value={form.nome} onChange={handleChange} required />
          </label>
          <div className="form-row">
            <label>
              E-mail
              <input name="email" type="email" value={form.email} onChange={handleChange} required />
            </label>
            <label>
              Telefone
              <input name="telefone" value={form.telefone} onChange={handleChange} required />
            </label>
          </div>
          <label>
            Endereço
            <input name="endereco" value={form.endereco} onChange={handleChange} />
          </label>
          <button className="btn btn-primary" type="submit" disabled={loading}>
            {loading ? <Loader2 className="spin" size={18} /> : <UserPlus size={18} />}
            Cadastrar cliente
          </button>
          {status.message && <p className={`form-status ${status.type}`}>{status.message}</p>}
        </form>
      </div>
    </section>
  );
}
