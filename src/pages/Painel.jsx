import { useEffect, useState } from 'react';
import { ClipboardList, Truck, Users } from 'lucide-react';
import { supabase } from '../lib/supabase';

const initialData = {
  clientes: [],
  reservas: [],
  pedidos: [],
  totais: {
    clientes: 0,
    reservas: 0,
    pedidos: 0
  }
};

export default function Painel() {
  const [dados, setDados] = useState(initialData);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(false);

  useEffect(() => {
    async function carregarDados() {
      setCarregando(true);
      setErro(false);

      try {
        const [clientesResponse, reservasResponse, pedidosResponse] = await Promise.all([
          supabase
            .from('clientes')
            .select('nome, telefone, email, endereco, criado_em', { count: 'exact' })
            .order('criado_em', { ascending: false })
            .limit(8),
          supabase
            .from('reservas')
            .select(
              'data_reserva, horario, quantidade_pessoas, observacoes, criado_em, clientes(nome, telefone)',
              { count: 'exact' }
            )
            .order('criado_em', { ascending: false })
            .limit(8),
          supabase
            .from('pedidos_delivery')
            .select('prato, quantidade, pagamento, observacoes, criado_em, clientes(nome, telefone)', {
              count: 'exact'
            })
            .order('criado_em', { ascending: false })
            .limit(8)
        ]);

        if (clientesResponse.error || reservasResponse.error || pedidosResponse.error) {
          throw new Error('Erro ao carregar dados do banco.');
        }

        setDados({
          clientes: clientesResponse.data ?? [],
          reservas: formatarReservas(reservasResponse.data ?? []),
          pedidos: formatarPedidos(pedidosResponse.data ?? []),
          totais: {
            clientes: clientesResponse.count ?? 0,
            reservas: reservasResponse.count ?? 0,
            pedidos: pedidosResponse.count ?? 0
          }
        });
      } catch {
        setErro(true);
      } finally {
        setCarregando(false);
      }
    }

    carregarDados();
  }, []);

  const cards = [
    {
      label: 'Total de clientes cadastrados',
      value: dados.totais.clientes,
      icon: <Users size={24} />
    },
    {
      label: 'Total de reservas realizadas',
      value: dados.totais.reservas,
      icon: <ClipboardList size={24} />
    },
    {
      label: 'Total de pedidos de delivery',
      value: dados.totais.pedidos,
      icon: <Truck size={24} />
    }
  ];

  return (
    <section className="page-section">
      <div className="container page-title">
        <p className="eyebrow">Dados do sistema</p>
        <h1>Painel Administrativo</h1>
        <p>
          Consulte os ultimos clientes, reservas e pedidos salvos no Supabase para
          comprovar que o sistema esta conectado ao banco de dados.
        </p>
      </div>

      <div className="container">
        {carregando && <p className="panel-message">Carregando dados...</p>}
        {erro && <p className="panel-message error">Erro ao carregar dados do banco.</p>}

        {!carregando && !erro && (
          <>
            <div className="stats-grid">
              {cards.map((card) => (
                <article className="stat-card" key={card.label}>
                  <span className="icon-pill">{card.icon}</span>
                  <strong>{card.value}</strong>
                  <p>{card.label}</p>
                </article>
              ))}
            </div>

            <PainelTabela
              titulo="Ultimos clientes cadastrados"
              colunas={['Nome', 'Telefone', 'E-mail', 'Endereco']}
              linhas={dados.clientes}
              campos={['nome', 'telefone', 'email', 'endereco']}
            />

            <PainelTabela
              titulo="Ultimas reservas"
              colunas={['Cliente', 'Telefone', 'Data', 'Horario', 'Pessoas', 'Observacoes']}
              linhas={dados.reservas}
              campos={[
                'cliente_nome',
                'cliente_telefone',
                'data_reserva',
                'horario',
                'quantidade_pessoas',
                'observacoes'
              ]}
            />

            <PainelTabela
              titulo="Ultimos pedidos"
              colunas={['Cliente', 'Telefone', 'Prato', 'Quantidade', 'Pagamento', 'Observacoes']}
              linhas={dados.pedidos}
              campos={['cliente_nome', 'cliente_telefone', 'prato', 'quantidade', 'pagamento', 'observacoes']}
            />
          </>
        )}
      </div>
    </section>
  );
}

function formatarReservas(reservas) {
  return reservas.map((reserva) => ({
    ...reserva,
    cliente_nome: reserva.clientes?.nome,
    cliente_telefone: reserva.clientes?.telefone
  }));
}

function formatarPedidos(pedidos) {
  return pedidos.map((pedido) => ({
    ...pedido,
    cliente_nome: pedido.clientes?.nome,
    cliente_telefone: pedido.clientes?.telefone
  }));
}

function PainelTabela({ titulo, colunas, linhas, campos }) {
  return (
    <section className="panel-table-card">
      <h2>{titulo}</h2>
      {linhas.length === 0 ? (
        <p className="empty-state">Nenhum registro encontrado.</p>
      ) : (
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                {colunas.map((coluna) => (
                  <th key={coluna}>{coluna}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {linhas.map((linha, index) => (
                <tr key={`${titulo}-${index}`}>
                  {campos.map((campo) => (
                    <td key={campo}>{linha[campo] || '-'}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
