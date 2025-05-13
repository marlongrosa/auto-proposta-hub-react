
import { useState } from 'react';
import { Car, DollarSign, ShoppingBag, Users, ChartBarIcon } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import StatCard from '@/components/StatCard';
import { 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  getDashboardStats, 
  getSalesByMake, 
  getProposalsByModel, 
  proposals 
} from '@/data/mockData';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

const AdminDashboard = () => {
  const [timeRange, setTimeRange] = useState("month");
  const stats = getDashboardStats();
  
  const salesByMake = getSalesByMake();
  const proposalsByModel = getProposalsByModel();
  
  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'contacted':
        return 'bg-blue-100 text-blue-800';
      case 'accepted':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending':
        return 'Pendente';
      case 'contacted':
        return 'Contatado';
      case 'accepted':
        return 'Aceito';
      case 'rejected':
        return 'Rejeitado';
      default:
        return status;
    }
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Visão geral e estatísticas do seu negócio
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total de Veículos"
          value={stats.totalVehicles}
          icon={<Car className="h-5 w-5 text-autoproposta-blue" />}
        />
        <StatCard
          title="Veículos Vendidos"
          value={stats.soldVehicles}
          icon={<ShoppingBag className="h-5 w-5 text-green-500" />}
        />
        <StatCard
          title="Propostas Recebidas"
          value={stats.totalProposals}
          icon={<DollarSign className="h-5 w-5 text-autoproposta-orange" />}
        />
        <StatCard
          title="Vendedores Ativos"
          value="3"
          icon={<Users className="h-5 w-5 text-purple-500" />}
        />
      </div>

      <Tabs defaultValue="charts" className="space-y-4">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="charts">Gráficos</TabsTrigger>
          <TabsTrigger value="recent">Propostas Recentes</TabsTrigger>
        </TabsList>
        
        <TabsContent value="charts" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Veículos Vendidos por Marca</CardTitle>
                <CardDescription>
                  Comparativo de vendas por fabricante
                </CardDescription>
                <div className="flex space-x-2 text-xs">
                  <button 
                    className={`px-2 py-1 rounded-md ${timeRange === 'month' ? 'bg-autoproposta-blue text-white' : 'bg-gray-100'}`}
                    onClick={() => setTimeRange('month')}
                  >
                    Mensal
                  </button>
                  <button 
                    className={`px-2 py-1 rounded-md ${timeRange === 'year' ? 'bg-autoproposta-blue text-white' : 'bg-gray-100'}`}
                    onClick={() => setTimeRange('year')}
                  >
                    Anual
                  </button>
                </div>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={salesByMake}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value" fill="#4299e1" name="Veículos Vendidos" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Propostas por Modelo</CardTitle>
                <CardDescription>
                  Modelos mais procurados pelos clientes
                </CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={proposalsByModel}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {proposalsByModel.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="recent">
          <Card>
            <CardHeader>
              <CardTitle>Propostas Recentes</CardTitle>
              <CardDescription>
                As últimas propostas recebidas para veículos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Cliente</TableHead>
                    <TableHead>Data</TableHead>
                    <TableHead className="hidden md:table-cell">Contato</TableHead>
                    <TableHead className="text-right">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {proposals.map((proposal) => (
                    <TableRow key={proposal.id}>
                      <TableCell className="font-medium">{proposal.customerName}</TableCell>
                      <TableCell>{formatDate(proposal.createdAt)}</TableCell>
                      <TableCell className="hidden md:table-cell">{proposal.customerPhone}</TableCell>
                      <TableCell className="text-right">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeClass(proposal.status)}`}>
                          {getStatusText(proposal.status)}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
