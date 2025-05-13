
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ChevronRight, LayoutDashboard, Car, Users, FileText, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Toaster } from '@/components/ui/sonner';
import { useAuth } from '@/contexts/AuthContext';

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  active: boolean;
}

const NavItem = ({ to, icon, label, active }: NavItemProps) => (
  <Link to={to} className="block">
    <div
      className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
        active
          ? 'bg-autoproposta-blue text-white'
          : 'hover:bg-gray-100'
      }`}
    >
      <div className={`mr-3 ${active ? 'text-white' : 'text-gray-500'}`}>{icon}</div>
      <span>{label}</span>
    </div>
  </Link>
);

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();
  
  const isActive = (path: string) => location.pathname === path;
  
  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };
  
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="hidden md:flex md:w-64 flex-col bg-white border-r">
        <div className="p-4 border-b">
          <h1 className="text-xl font-bold text-autoproposta-blue">AutoProposta</h1>
          <div className="flex items-center text-sm text-gray-500 mt-1">
            <span>Admin</span>
            <ChevronRight size={14} className="mx-1" />
            <span>Dashboard</span>
          </div>
        </div>
        
        <div className="flex-1 p-4 space-y-2">
          <NavItem 
            to="/admin" 
            icon={<LayoutDashboard size={20} />} 
            label="Dashboard" 
            active={isActive("/admin")} 
          />
          <NavItem 
            to="/admin/vehicles" 
            icon={<Car size={20} />} 
            label="Veículos" 
            active={isActive("/admin/vehicles")} 
          />
          <NavItem 
            to="/admin/dealers" 
            icon={<Users size={20} />} 
            label="Vendedores" 
            active={isActive("/admin/dealers")} 
          />
          <NavItem 
            to="/admin/proposals" 
            icon={<FileText size={20} />} 
            label="Propostas" 
            active={isActive("/admin/proposals")} 
          />
        </div>
        
        <div className="p-4 border-t">
          <Button 
            variant="ghost" 
            className="w-full flex items-center justify-start text-red-500 hover:bg-red-50 hover:text-red-600"
            onClick={handleLogout}
          >
            <LogOut size={20} className="mr-3" />
            Sair
          </Button>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto p-6">
          {children}
        </div>
      </div>
      
      <Toaster />
    </div>
  );
};

export default AdminLayout;
