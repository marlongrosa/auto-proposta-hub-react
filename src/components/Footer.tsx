
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">AutoProposta</h3>
            <p className="text-gray-400 mb-4">
              Encontre o veículo dos seus sonhos com as melhores condições do mercado.
            </p>
            <Link to="/admin/login" className="text-gray-400 hover:text-white transition">
              Área Administrativa
            </Link>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Links Rápidos</h3>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="/" className="hover:text-white transition">Home</Link></li>
              <li><Link to="/" className="hover:text-white transition">Veículos</Link></li>
              <li><Link to="/" className="hover:text-white transition">Sobre</Link></li>
              <li><Link to="/" className="hover:text-white transition">Contato</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contato</h3>
            <address className="not-italic text-gray-400 space-y-2">
              <p>Av. Paulista, 1000</p>
              <p>São Paulo, SP</p>
              <p>Email: contato@autoproposta.com</p>
              <p>Tel: (11) 3000-4000</p>
            </address>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
            <p className="text-gray-400 mb-4">
              Receba as melhores ofertas e novidades.
            </p>
            <form className="flex">
              <input
                type="email"
                placeholder="Seu email"
                className="px-4 py-2 w-full rounded-l text-gray-800 focus:outline-none"
              />
              <button
                type="submit"
                className="bg-autoproposta-orange text-white px-4 py-2 rounded-r hover:bg-orange-600 transition"
              >
                Enviar
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-6 text-center text-gray-500">
          <p>&copy; 2023 AutoProposta. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
