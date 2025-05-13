
import { Navigate, Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import AdminLayout from '@/components/layouts/AdminLayout';
import { supabase } from '@/integrations/supabase/client';

const ProtectedRoute = () => {
  const { isAuthenticated, user } = useAuth();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const checkAdminStatus = async () => {
      if (!user) {
        setIsAdmin(false);
        setLoading(false);
        return;
      }
      
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', user.id)
          .single();
          
        if (error) {
          console.error('Erro ao verificar permissões:', error);
          setIsAdmin(false);
        } else {
          setIsAdmin(data.role === 'admin');
        }
      } catch (error) {
        console.error('Erro:', error);
        setIsAdmin(false);
      } finally {
        setLoading(false);
      }
    };
    
    if (isAuthenticated) {
      checkAdminStatus();
    } else {
      setLoading(false);
    }
  }, [user, isAuthenticated]);
  
  if (loading) {
    return <div className="flex h-screen items-center justify-center">Carregando...</div>;
  }

  if (!isAuthenticated || isAdmin === false) {
    return <Navigate to="/admin/login" replace />;
  }

  return (
    <AdminLayout>
      <Outlet />
    </AdminLayout>
  );
};

export default ProtectedRoute;
