
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!email || !password) {
      setError('Por favor, preencha todos os campos.');
      return;
    }
    
    setIsLoading(true);
    
    try {
      const success = await login(email, password);
      
      if (success) {
        toast({
          title: 'Login bem-sucedido',
          description: 'Bem-vindo ao painel administrativo.',
        });
        navigate('/admin');
      } else {
        setError('Credenciais inválidas ou você não tem permissão para acessar o painel.');
      }
    } catch (error) {
      setError('Ocorreu um erro durante o login. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  // Criar usuário admin
  const createAdminUser = async () => {
    setIsLoading(true);
    try {
      // Verificar se já existe um admin
      const { data: existingAdmin } = await supabase
        .from('profiles')
        .select('*')
        .eq('role', 'admin')
        .limit(1);

      if (existingAdmin && existingAdmin.length > 0) {
        toast({
          title: 'Administrador já existe',
          description: 'Um usuário administrador já está cadastrado no sistema.'
        });
        setIsLoading(false);
        return;
      }

      // Criar o usuário admin
      const adminEmail = 'admin@autoproposta.com';
      const adminPassword = 'admin123';

      const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email: adminEmail,
        password: adminPassword,
        options: {
          data: {
            name: 'Administrador',
          }
        }
      });

      if (signUpError) {
        toast({
          title: 'Erro ao criar administrador',
          description: signUpError.message,
          variant: 'destructive'
        });
        setIsLoading(false);
        return;
      }

      const { error: updateError } = await supabase
        .from('profiles')
        .update({ role: 'admin' })
        .eq('id', signUpData.user?.id);

      if (updateError) {
        toast({
          title: 'Erro ao definir permissões',
          description: updateError.message,
          variant: 'destructive'
        });
      } else {
        toast({
          title: 'Administrador criado com sucesso',
          description: `Email: ${adminEmail}, Senha: ${adminPassword}`,
        });
        
        // Preencher os campos
        setEmail(adminEmail);
        setPassword(adminPassword);
      }
    } catch (error) {
      console.error('Erro:', error);
      toast({
        title: 'Erro desconhecido',
        description: 'Ocorreu um erro ao criar o usuário administrador.',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Criar dados fictícios
  const createDemoData = async () => {
    setIsLoading(true);
    try {
      // Verificar se já existem dados
      const { count: vehicleCount, error: countError } = await supabase
        .from('vehicles')
        .select('*', { count: 'exact', head: true });

      if (countError) {
        throw countError;
      }

      if (vehicleCount && vehicleCount > 0) {
        toast({
          title: 'Dados já existem',
          description: 'Já existem dados no sistema.'
        });
        setIsLoading(false);
        return;
      }

      // Obter o ID do administrador
      const { data: adminData } = await supabase
        .from('profiles')
        .select('*')
        .eq('role', 'admin')
        .limit(1);

      if (!adminData || adminData.length === 0) {
        toast({
          title: 'Administrador não encontrado',
          description: 'Crie um administrador primeiro.',
          variant: 'destructive'
        });
        setIsLoading(false);
        return;
      }

      const adminId = adminData[0].id;

      // Criar vendedores
      const dealers = [
        { name: 'João Silva', email: 'joao.silva@exemplo.com', phone: '(11) 98765-4321', city: 'São Paulo', state: 'SP' },
        { name: 'Maria Souza', email: 'maria.souza@exemplo.com', phone: '(21) 98765-4321', city: 'Rio de Janeiro', state: 'RJ' },
        { name: 'Pedro Oliveira', email: 'pedro.oliveira@exemplo.com', phone: '(31) 98765-4321', city: 'Belo Horizonte', state: 'MG' }
      ];

      // Criar usuários para os vendedores
      const dealerIds = [];
      for (const dealer of dealers) {
        const { data: userData, error: userError } = await supabase.auth.signUp({
          email: dealer.email,
          password: 'senha123',
          options: {
            data: {
              name: dealer.name,
            }
          }
        });

        if (userError) {
          console.error('Erro ao criar vendedor:', userError);
          continue;
        }

        if (userData.user) {
          dealerIds.push(userData.user.id);
        }
      }

      if (dealerIds.length === 0) {
        throw new Error('Não foi possível criar vendedores');
      }

      // Criar veículos
      const vehicles = [
        {
          make: 'Toyota', model: 'Corolla', year: 2022, price: 120000, 
          transmission: 'automatic', state: 'SP', city: 'São Paulo', region: 'Zona Sul',
          color: 'Prata', mileage: 15000, fuel_type: 'Flex', dealer_id: dealerIds[0]
        },
        {
          make: 'Honda', model: 'Civic', year: 2021, price: 110000, 
          transmission: 'automatic', state: 'SP', city: 'São Paulo', region: 'Zona Norte',
          color: 'Preto', mileage: 25000, fuel_type: 'Flex', dealer_id: dealerIds[0]
        },
        {
          make: 'Volkswagen', model: 'Golf', year: 2020, price: 90000, 
          transmission: 'manual', state: 'RJ', city: 'Rio de Janeiro', region: 'Zona Sul',
          color: 'Branco', mileage: 35000, fuel_type: 'Flex', dealer_id: dealerIds[1]
        },
        {
          make: 'Fiat', model: 'Pulse', year: 2023, price: 95000, 
          transmission: 'automatic', state: 'MG', city: 'Belo Horizonte', region: 'Centro',
          color: 'Vermelho', mileage: 5000, fuel_type: 'Flex', dealer_id: dealerIds[2]
        },
        {
          make: 'Jeep', model: 'Renegade', year: 2022, price: 130000, 
          transmission: 'automatic', state: 'SP', city: 'Campinas', region: 'Centro',
          color: 'Azul', mileage: 18000, fuel_type: 'Flex', dealer_id: dealerIds[0]
        },
      ];

      const { error: vehiclesError } = await supabase
        .from('vehicles')
        .insert(vehicles);

      if (vehiclesError) {
        throw vehiclesError;
      }

      // Buscar veículos criados para criar propostas
      const { data: vehicleData } = await supabase
        .from('vehicles')
        .select('id')
        .limit(3);

      if (vehicleData) {
        // Criar propostas
        const proposals = [
          {
            vehicle_id: vehicleData[0].id,
            customer_name: 'Ana Oliveira',
            customer_email: 'ana.oliveira@exemplo.com',
            customer_phone: '(11) 91234-5678',
            message: 'Tenho interesse neste veículo. Posso agendar um test drive?',
            status: 'pending'
          },
          {
            vehicle_id: vehicleData[1].id,
            customer_name: 'Carlos Santos',
            customer_email: 'carlos.santos@exemplo.com',
            customer_phone: '(21) 92345-6789',
            message: 'Gostaria de informações sobre condições de financiamento.',
            status: 'contacted'
          },
          {
            vehicle_id: vehicleData[2].id,
            customer_name: 'Mariana Lima',
            customer_email: 'mariana.lima@exemplo.com',
            customer_phone: '(31) 93456-7890',
            message: 'Aceita troca por um carro de valor inferior?',
            status: 'pending'
          }
        ];

        const { error: proposalsError } = await supabase
          .from('proposals')
          .insert(proposals);

        if (proposalsError) {
          throw proposalsError;
        }
      }

      toast({
        title: 'Dados de demonstração criados',
        description: 'Veículos, vendedores e propostas foram adicionados ao sistema.'
      });

    } catch (error: any) {
      console.error('Erro ao criar dados demo:', error);
      toast({
        title: 'Erro ao criar dados de demonstração',
        description: error.message || 'Ocorreu um erro desconhecido.',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-autoproposta-blue">AutoProposta</h1>
          <p className="text-gray-600">Painel Administrativo</p>
        </div>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
              />
            </div>
            
            <Button
              type="submit"
              className="w-full bg-autoproposta-blue hover:bg-blue-800"
              disabled={isLoading}
            >
              {isLoading ? 'Entrando...' : 'Entrar'}
            </Button>
          </div>
        </form>
        
        <div className="mt-6">
          <div className="border-t border-gray-300 pt-4">
            <p className="text-sm text-gray-600 mb-2">Primeira vez aqui?</p>
            <div className="space-y-2">
              <Button 
                onClick={createAdminUser} 
                className="w-full" 
                variant="outline"
                disabled={isLoading}
              >
                Criar usuário administrador
              </Button>
              <Button 
                onClick={createDemoData} 
                className="w-full" 
                variant="outline"
                disabled={isLoading}
              >
                Inserir dados de demonstração
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
