import { Flame, Leaf, Star } from 'lucide-react';

const pratos = [
  {
    nome: 'Tacacá da Casa',
    categoria: 'Entrada',
    preco: 'R$ 28',
    descricao: 'Tucupi amarelo, goma macia, camarão seco e jambu fresco.',
    destaque: 'Mais pedido'
  },
  {
    nome: 'Pato no Tucupi',
    categoria: 'Principal',
    preco: 'R$ 74',
    descricao: 'Pato confitado, tucupi aromático, chicória e arroz branco.',
    destaque: 'Clássico'
  },
  {
    nome: 'Filhote na Brasa',
    categoria: 'Principal',
    preco: 'R$ 82',
    descricao: 'Posta de filhote, farofa de castanha e legumes da estação.',
    destaque: 'Brasa'
  },
  {
    nome: 'Maniçoba Leve',
    categoria: 'Regional',
    preco: 'R$ 59',
    descricao: 'Versão equilibrada, cozida lentamente e servida com arroz e farinha.',
    destaque: 'Regional'
  },
  {
    nome: 'Vatapá Paraense',
    categoria: 'Principal',
    preco: 'R$ 48',
    descricao: 'Creme de camarão, leite de coco, dendê suave e arroz de cheiro-verde.',
    destaque: 'Cremoso'
  },
  {
    nome: 'Mousse de Cupuaçu',
    categoria: 'Sobremesa',
    preco: 'R$ 24',
    descricao: 'Cupuaçu, calda de chocolate amazônico e crocante de castanha.',
    destaque: 'Doce'
  }
];

export default function Cardapio() {
  return (
    <section className="page-section">
      <div className="container page-title">
        <p className="eyebrow">Cardápio</p>
        <h1>Pratos paraenses com apresentação contemporânea.</h1>
        <p>Opções regionais para almoço, jantar, delivery e ocasiões especiais.</p>
      </div>

      <div className="container menu-grid">
        {pratos.map((prato) => (
          <article className="menu-card" key={prato.nome}>
            <div className="menu-card-top">
              <span>{prato.categoria}</span>
              <strong>{prato.preco}</strong>
            </div>
            <h2>{prato.nome}</h2>
            <p>{prato.descricao}</p>
            <div className="tag-row">
              <span>
                {prato.destaque === 'Brasa' ? <Flame size={15} /> : prato.destaque === 'Regional' ? <Leaf size={15} /> : <Star size={15} />}
                {prato.destaque}
              </span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
