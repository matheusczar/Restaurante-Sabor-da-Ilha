import { Link } from 'react-router-dom';
import { CalendarCheck, ChefHat, ShoppingBag, Sprout } from 'lucide-react';

const highlights = [
  {
    icon: <ChefHat />,
    title: 'Receitas autorais',
    text: 'Pratos paraenses com técnica atual e respeito aos ingredientes locais.'
  },
  {
    icon: <Sprout />,
    title: 'Ingredientes regionais',
    text: 'Jambu, tucupi, castanha, peixe fresco e aromas de feira.'
  },
  {
    icon: <ShoppingBag />,
    title: 'Delivery cuidadoso',
    text: 'Embalagens leves, porções bem montadas e chegada com sabor preservado.'
  }
];

const passos = [
  'Cadastre seus dados.',
  'Escolha entre fazer uma reserva ou pedir delivery.',
  'O sistema salva suas informações no banco de dados.',
  'O restaurante pode consultar os pedidos e reservas recebidos.'
];

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">Belém na mesa</p>
            <h1>Sabor da Ilha</h1>
            <p>
              Um restaurante regional paraense feito para quem procura tucupi
              perfumado, peixe fresco, jambu vibrante e atendimento de verdade.
            </p>
            <div className="hero-actions">
              <Link className="btn btn-primary" to="/cardapio">
                Ver cardápio
              </Link>
              <Link className="btn btn-ghost" to="/reservas">
                <CalendarCheck size={18} /> Reservar mesa
              </Link>
            </div>
          </div>

          <div className="hero-panel" aria-label="Prato regional paraense estilizado">
            <div className="plate">
              <span className="leaf leaf-one" />
              <span className="leaf leaf-two" />
              <span className="fish-shape" />
              <span className="sauce" />
            </div>
            <div className="hero-note">
              <strong>Menu do dia</strong>
              <span>Pirarucu grelhado, arroz de jambu e vinagrete de açaí.</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container section-heading">
          <p className="eyebrow">Como funciona?</p>
          <h2>Um fluxo simples para atender melhor.</h2>
        </div>
        <div className="container feature-grid">
          {passos.map((passo, index) => (
            <article className="feature-card" key={passo}>
              <span className="icon-pill">{index + 1}</span>
              <h3>Passo {index + 1}</h3>
              <p>{passo}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="container section-heading">
          <p className="eyebrow">Nossa cozinha</p>
          <h2>Regional, elegante e sem excesso.</h2>
        </div>
        <div className="container feature-grid">
          {highlights.map((item) => (
            <article className="feature-card" key={item.title}>
              <span className="icon-pill">{item.icon}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section split-band">
        <div className="container split-content">
          <div>
            <p className="eyebrow">Experiência</p>
            <h2>Do almoço rápido ao jantar especial.</h2>
          </div>
          <p>
            O salão foi pensado para encontros leves: iluminação quente, serviço ágil
            e pratos que carregam a identidade paraense sem parecerem pesados.
          </p>
        </div>
      </section>
    </>
  );
}
