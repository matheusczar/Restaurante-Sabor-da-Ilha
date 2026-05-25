import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import Cardapio from './pages/Cardapio.jsx';
import Delivery from './pages/Delivery.jsx';
import Reservas from './pages/Reservas.jsx';
import CadastroCliente from './pages/CadastroCliente.jsx';
import Painel from './pages/Painel.jsx';

export default function App() {
  return (
    <div className="app-shell">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cardapio" element={<Cardapio />} />
          <Route path="/delivery" element={<Delivery />} />
          <Route path="/reservas" element={<Reservas />} />
          <Route path="/cadastro" element={<CadastroCliente />} />
          <Route path="/painel" element={<Painel />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
