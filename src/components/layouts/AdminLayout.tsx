
import { ReactNode, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { 
  ChevronDown, 
  LayoutDashboard, 
  Car, 
  UserCircle, 
  MessageSquare, 
  LogOut 
} from 'lucide-react';

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="hidden md:block bg-autoproposta-blue text-white w-64 p-6">
        <div className="mb-8">
          <h1 className="text-2xl font-bold">AutoProposta</h1>
          <p className="text-sm text-gray-300">Painel Administrativo</p>
        </div>
        
        <nav className="space-y-2">
          <Link to="/admin" className="flex items-center space-x-2 p-3 rounded-md hover:bg-blue-800 transition">
            <LayoutDashboard size={20} />
            <span>Dashboard</span>
          </Link>
          <Link to="/admin/vehicles" className="flex items-center space-x-2 p-3 rounded-md hover:bg-blue-800 transition">
            <Car size={20} />
            <span>Veículos</span>
          </Link>
          <Link to="/admin/dealers" className="flex items-center space-x-2 p-3 rounded-md hover:bg-blue-800 transition">
            <UserCircle size={20} />
            <span>Vendedores</span>
          </Link>
          <Link to="/admin/proposals" className="flex items-center space-x-2 p-3 rounded-md hover:bg-blue-800 transition">
            <MessageSquare size={20} />
            <span>Propostas</span>
          </Link>
        </nav>
        
        <div className="absolute bottom-6 left-6">
          <button 
            onClick={handleLogout} 
            className="flex items-center space-x-2 p-3 rounded-md hover:bg-blue-800 transition"
          >
            <LogOut size={20} />
            <span>Sair</span>
          </button>
        </div>
      </aside>
      
      {/* Main Content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Top Bar */}
        <header className="bg-white shadow-sm p-4">
          <div className="flex justify-between items-center">
            <div className="md:hidden">
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
                className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
            
            <div className="md:hidden font-bold">AutoProposta Admin</div>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="flex items-center space-x-2 cursor-pointer">
                  <div className="bg-gray-200 rounded-full w-8 h-8 flex items-center justify-center text-gray-700 font-bold">
                    {user?.name.charAt(0)}
                  </div>
                  <span className="hidden md:inline-block">{user?.name}</span>
                  <ChevronDown size={16} />
                </div>
              </div>
            </div>
          </div>
        </header>
        
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-autoproposta-blue text-white p-4">
            <nav className="space-y-2">
              <Link 
                to="/admin" 
                onClick={() => setIsMobileMenuOpen(false)} 
                className="flex items-center space-x-2 p-3 rounded-md hover:bg-blue-800 transition"
              >
                <LayoutDashboard size={20} />
                <span>Dashboard</span>
              </Link>
              <Link 
                to="/admin/vehicles" 
                onClick={() => setIsMobileMenuOpen(false)} 
                className="flex items-center space-x-2 p-3 rounded-md hover:bg-blue-800 transition"
              >
                <Car size={20} />
                <span>Veículos</span>
              </Link>
              <Link 
                to="/admin/dealers" 
                onClick={() => setIsMobileMenuOpen(false)} 
                className="flex items-center space-x-2 p-3 rounded-md hover:bg-blue-800 transition"
              >
                <UserCircle size={20} />
                <span>Vendedores</span>
              </Link>
              <Link 
                to="/admin/proposals" 
                onClick={() => setIsMobileMenuOpen(false)} 
                className="flex items-center space-x-2 p-3 rounded-md hover:bg-blue-800 transition"
              >
                <MessageSquare size={20} />
                <span>Propostas</span>
              </Link>
              <button 
                onClick={handleLogout} 
                className="flex items-center space-x-2 p-3 rounded-md hover:bg-blue-800 transition w-full text-left"
              >
                <LogOut size={20} />
                <span>Sair</span>
              </button>
            </nav>
          </div>
        )}
        
        {/* Page Content */}
        <div className="flex-1 overflow-auto p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
