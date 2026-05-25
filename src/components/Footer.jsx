import { Clock, MapPin, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <h2>Sabor da Ilha</h2>
          <p>
            Restaurante regional paraense com receitas de mercado, rio e floresta em
            uma experiência leve, acolhedora e contemporânea.
          </p>
        </div>

        <address>
          <span>
            <MapPin size={18} /> Belém, Pará
          </span>
          <span>
            <Phone size={18} /> (91) 99999-2026
          </span>
          <span>
            <Clock size={18} /> Ter a dom, 11h às 23h
          </span>
        </address>
      </div>
      <div className="footer-bottom">
        <small>© 2026 Sabor da Ilha. Todos os direitos reservados.</small>
      </div>
    </footer>
  );
}
