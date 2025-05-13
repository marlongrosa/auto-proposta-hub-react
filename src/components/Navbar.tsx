
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { SearchIcon, MenuIcon, X } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle search functionality - in a real app, this would navigate to results page
    console.log('Search for:', searchQuery);
  };

  return (
    <header className="bg-autoproposta-blue text-white shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold">AutoProposta</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6 items-center">
            <Link to="/" className="hover:text-autoproposta-orange transition">Home</Link>
            <Link to="/" className="hover:text-autoproposta-orange transition">Veículos</Link>
            <Link to="/" className="hover:text-autoproposta-orange transition">Sobre</Link>
            <Link to="/" className="hover:text-autoproposta-orange transition">Contato</Link>
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Buscar veículos..."
                className="pl-3 pr-10 py-2 rounded-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-autoproposta-orange"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit" className="absolute right-3 top-2.5 text-gray-500">
                <SearchIcon size={18} />
              </button>
            </form>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white focus:outline-none"
          >
            {isMenuOpen ? <X size={24} /> : <MenuIcon size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 animate-fade-in">
            <form onSubmit={handleSearch} className="mb-4 relative">
              <input
                type="text"
                placeholder="Buscar veículos..."
                className="w-full pl-3 pr-10 py-2 rounded-full text-gray-800 focus:outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit" className="absolute right-3 top-2.5 text-gray-500">
                <SearchIcon size={18} />
              </button>
            </form>
            <nav className="flex flex-col space-y-3">
              <Link to="/" className="hover:text-autoproposta-orange transition py-2">Home</Link>
              <Link to="/" className="hover:text-autoproposta-orange transition py-2">Veículos</Link>
              <Link to="/" className="hover:text-autoproposta-orange transition py-2">Sobre</Link>
              <Link to="/" className="hover:text-autoproposta-orange transition py-2">Contato</Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
