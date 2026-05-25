import { NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

const links = [
  { to: '/', label: 'Home' },
  { to: '/cardapio', label: 'Cardápio' },
  { to: '/delivery', label: 'Delivery' },
  { to: '/reservas', label: 'Reservas' },
  { to: '/cadastro', label: 'Cadastro' }
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="site-header">
      <nav className="navbar container" aria-label="Navegação principal">
        <NavLink className="brand" to="/" onClick={() => setIsOpen(false)}>
          <span className="brand-mark">SI</span>
          <span>
            <strong>Sabor da Ilha</strong>
            <small>Cozinha paraense</small>
          </span>
        </NavLink>

        <button
          className="nav-toggle"
          type="button"
          aria-label="Abrir menu"
          aria-expanded={isOpen}
          onClick={() => setIsOpen((value) => !value)}
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        <div className={`nav-links ${isOpen ? 'is-open' : ''}`}>
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) => (isActive ? 'active' : undefined)}
            >
              {link.label}
            </NavLink>
          ))}
        </div>
      </nav>
    </header>
  );
}
