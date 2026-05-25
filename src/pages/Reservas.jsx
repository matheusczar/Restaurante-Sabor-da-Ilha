import { useState } from 'react';
import { CalendarCheck, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase.js';
import { cadastrarCliente } from '../lib/clientes.js';

const initialForm = {
  nome: '',
  telefone: '',
  email: '',
  endereco: '',
  data_reserva: '',
  horario: '',
  quantidade_pessoas: 2,
  observacoes: ''
};

export default function Reservas() {
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
      const clienteId = await cadastrarCliente({
        nome: form.nome,
        email: form.email,
        telefone: form.telefone,
        endereco: form.endereco
      });

      const { error } = await supabase.from('reservas').insert({
        cliente_id: clienteId,
        data_reserva: form.data_reserva,
        horario: form.horario,
        quantidade_pessoas: Number(form.quantidade_pessoas),
        observacoes: form.observacoes
      });

      if (error) throw error;

      setForm(initialForm);
      setStatus({
        type: 'success',
        message: 'Reserva realizada com sucesso! Seus dados foram salvos no sistema.'
      });
      alert('Reserva realizada com sucesso! Seus dados foram salvos no sistema.');
    } catch (error) {
      setStatus({ type: 'error', message: error.message });
      alert(`Erro ao cadastrar reserva: ${error.message}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="page-section">
      <div className="container form-layout">
        <div className="form-intro">
          <p className="eyebrow">Reservas</p>
          <h1>Garanta sua mesa no melhor horário.</h1>
          <p>
            Faça sua reserva informando seus dados e o melhor horário para sua visita.
            O sistema salvará sua reserva vinculada ao seu cadastro de cliente.
          </p>
          <div className="service-box">
            <CalendarCheck size={28} />
            <div>
              <strong>Confirmação no mesmo dia</strong>
              <span>Pedidos enviados após 20h podem ser respondidos no dia seguinte.</span>
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
              Telefone
              <input name="telefone" value={form.telefone} onChange={handleChange} required />
            </label>
            <label>
              E-mail
              <input name="email" type="email" value={form.email} onChange={handleChange} required />
            </label>
          </div>
          <label>
            Endereço
            <input name="endereco" value={form.endereco} onChange={handleChange} />
          </label>
          <div className="form-row">
            <label>
              Data
              <input
                name="data_reserva"
                type="date"
                value={form.data_reserva}
                onChange={handleChange}
                required
              />
            </label>
            <label>
              Horário
              <input name="horario" type="time" value={form.horario} onChange={handleChange} required />
            </label>
          </div>
          <label>
            Número de pessoas
            <input
              min="1"
              max="18"
              name="quantidade_pessoas"
              type="number"
              value={form.quantidade_pessoas}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Observações
            <textarea name="observacoes" value={form.observacoes} onChange={handleChange} rows="4" />
          </label>
          <button className="btn btn-primary" type="submit" disabled={loading}>
            {loading ? <Loader2 className="spin" size={18} /> : <CalendarCheck size={18} />}
            Solicitar reserva
          </button>
          {status.message && <p className={`form-status ${status.type}`}>{status.message}</p>}
        </form>
      </div>
    </section>
  );
}
