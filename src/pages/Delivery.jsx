import { useMemo, useState } from 'react';
import { Bike, CheckCircle2, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase.js';
import { cadastrarCliente } from '../lib/clientes.js';

const itens = [
  { nome: 'Tacacá da Casa', preco: 28 },
  { nome: 'Pato no Tucupi', preco: 74 },
  { nome: 'Filhote na Brasa', preco: 82 },
  { nome: 'Vatapá Paraense', preco: 48 },
  { nome: 'Mousse de Cupuaçu', preco: 24 }
];

const initialForm = {
  nome: '',
  email: '',
  telefone: '',
  endereco: '',
  prato: 'Tacacá da Casa',
  quantidade: 1,
  pagamento: 'Pix',
  observacoes: ''
};

export default function Delivery() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);

  const total = useMemo(() => {
    const selecionado = itens.find((item) => item.nome === form.prato);
    return (selecionado?.preco ?? 0) * Number(form.quantidade || 1);
  }, [form.prato, form.quantidade]);

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

      const { error } = await supabase.from('pedidos_delivery').insert({
        cliente_id: clienteId,
        prato: form.prato,
        quantidade: Number(form.quantidade),
        pagamento: form.pagamento,
        observacoes: form.observacoes
      });

      if (error) throw error;

      setForm(initialForm);
      setStatus({
        type: 'success',
        message: 'Pedido realizado com sucesso! O restaurante recebeu suas informações para entrega.'
      });
      alert('Pedido realizado com sucesso! O restaurante recebeu suas informações para entrega.');
    } catch (error) {
      setStatus({ type: 'error', message: error.message });
      alert(`Erro ao cadastrar pedido: ${error.message}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="page-section">
      <div className="container form-layout">
        <div className="form-intro">
          <p className="eyebrow">Delivery</p>
          <h1>Peça sua comida paraense sem perder o ponto.</h1>
          <p>
            Faça seu pedido para entrega informando seus dados, endereço e forma de
            pagamento. O pedido ficará vinculado ao seu cadastro de cliente.
          </p>
          <div className="service-box">
            <Bike size={28} />
            <div>
              <strong>Entrega média: 35 a 55 min</strong>
              <span>Taxa calculada na confirmação do pedido.</span>
            </div>
          </div>
        </div>

        <form className="form-card" onSubmit={handleSubmit}>
          <label>
            Nome completo
            <input name="nome" value={form.nome} onChange={handleChange} required />
          </label>
          <label>
            E-mail
            <input name="email" type="email" value={form.email} onChange={handleChange} />
          </label>
          <label>
            Telefone
            <input name="telefone" value={form.telefone} onChange={handleChange} required />
          </label>
          <label>
            Endereço de entrega
            <input name="endereco" value={form.endereco} onChange={handleChange} required />
          </label>
          <div className="form-row">
            <label>
              Prato
              <select name="prato" value={form.prato} onChange={handleChange}>
                {itens.map((item) => (
                  <option key={item.nome} value={item.nome}>
                    {item.nome} - R$ {item.preco}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Quantidade
              <input
                min="1"
                name="quantidade"
                type="number"
                value={form.quantidade}
                onChange={handleChange}
                required
              />
            </label>
          </div>
          <label>
            Forma de pagamento
            <select name="pagamento" value={form.pagamento} onChange={handleChange} required>
              <option value="Pix">Pix</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
              <option value="Dinheiro">Dinheiro</option>
            </select>
          </label>
          <label>
            Observações
            <textarea name="observacoes" value={form.observacoes} onChange={handleChange} rows="4" />
          </label>
          <div className="total-line">
            <span>Total estimado</span>
            <strong>R$ {total.toFixed(2).replace('.', ',')}</strong>
          </div>
          <button className="btn btn-primary" type="submit" disabled={loading}>
            {loading ? <Loader2 className="spin" size={18} /> : <CheckCircle2 size={18} />}
            Enviar pedido
          </button>
          {status.message && <p className={`form-status ${status.type}`}>{status.message}</p>}
        </form>
      </div>
    </section>
  );
}
