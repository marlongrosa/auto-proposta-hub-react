
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { dealers, states } from '@/data/mockData';
import { Dealer } from '@/types';
import { Edit, Trash2, Plus, Search } from 'lucide-react';

const AdminDealers = () => {
  const { toast } = useToast();
  const [filteredDealers, setFilteredDealers] = useState<Dealer[]>(dealers);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDealer, setSelectedDealer] = useState<Dealer | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isAddEditDialogOpen, setIsAddEditDialogOpen] = useState(false);
  
  // New dealer state
  const [dealerForm, setDealerForm] = useState<Partial<Dealer>>({
    name: '',
    email: '',
    phone: '',
    city: '',
    state: '',
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!searchTerm.trim()) {
      setFilteredDealers(dealers);
      return;
    }
    
    const term = searchTerm.toLowerCase();
    const filtered = dealers.filter(
      (dealer) =>
        dealer.name.toLowerCase().includes(term) ||
        dealer.email.toLowerCase().includes(term) ||
        dealer.phone.includes(term) ||
        dealer.city.toLowerCase().includes(term) ||
        dealer.state.toLowerCase().includes(term)
    );
    
    setFilteredDealers(filtered);
  };

  const handleDeleteDealer = () => {
    if (selectedDealer) {
      // In a real app, send DELETE request to backend
      // For demo, simulate deletion from the list
      const updatedDealers = filteredDealers.filter(
        (dealer) => dealer.id !== selectedDealer.id
      );
      setFilteredDealers(updatedDealers);
      
      toast({
        title: "Vendedor removido",
        description: `${selectedDealer.name} foi removido com sucesso.`,
      });
      
      setIsDeleteDialogOpen(false);
      setSelectedDealer(null);
    }
  };

  const handleEditDealer = (dealer: Dealer) => {
    setSelectedDealer(dealer);
    setDealerForm({ ...dealer });
    setIsAddEditDialogOpen(true);
  };

  const handleAddNewDealer = () => {
    setSelectedDealer(null);
    setDealerForm({
      name: '',
      email: '',
      phone: '',
      city: '',
      state: '',
    });
    setIsAddEditDialogOpen(true);
  };

  const handleFormChange = (field: string, value: string) => {
    setDealerForm(prev => ({ ...prev, [field]: value }));
  };

  const validateForm = (): boolean => {
    const { name, email, phone } = dealerForm;
    
    if (!name || !email || !phone) {
      toast({
        title: "Erro no formulário",
        description: "Preencha todos os campos obrigatórios.",
        variant: "destructive",
      });
      return false;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast({
        title: "Email inválido",
        description: "Por favor, insira um endereço de email válido.",
        variant: "destructive",
      });
      return false;
    }
    
    return true;
  };

  const handleSubmitDealer = () => {
    if (!validateForm()) {
      return;
    }
    
    if (!selectedDealer) {
      // Add new dealer
      const newId = (Math.max(...dealers.map(d => parseInt(d.id))) + 1).toString();
      
      const newDealer: Dealer = {
        id: newId,
        name: dealerForm.name!,
        email: dealerForm.email!,
        phone: dealerForm.phone!,
        city: dealerForm.city || '',
        state: dealerForm.state || '',
        createdAt: new Date().toISOString(),
      };
      
      // Add the new dealer to the list (in a real app, send POST request to backend)
      const updatedDealers = [...filteredDealers, newDealer];
      setFilteredDealers(updatedDealers);
      
      toast({
        title: "Vendedor adicionado",
        description: `${newDealer.name} foi adicionado com sucesso.`,
      });
    } else {
      // Update the existing dealer (in a real app, send PUT request to backend)
      const updatedDealers = filteredDealers.map(dealer => 
        dealer.id === selectedDealer.id ? { ...dealer, ...dealerForm } : dealer
      );
      
      setFilteredDealers(updatedDealers);
      
      toast({
        title: "Vendedor atualizado",
        description: `${dealerForm.name} foi atualizado com sucesso.`,
      });
    }
    
    setIsAddEditDialogOpen(false);
  };
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Gerenciamento de Vendedores</h1>
          <p className="text-muted-foreground">
            Adicione, edite ou remova vendedores
          </p>
        </div>
        <Button onClick={handleAddNewDealer}>
          <Plus className="mr-2 h-4 w-4" /> Novo Vendedor
        </Button>
      </div>
      
      {/* Search */}
      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input
            placeholder="Buscar por nome, email ou telefone..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch(e)}
          />
        </div>
        <Button onClick={handleSearch}>Buscar</Button>
      </div>
      
      {/* Dealers Table */}
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead className="hidden md:table-cell">Email</TableHead>
              <TableHead>Telefone</TableHead>
              <TableHead className="hidden md:table-cell">Localização</TableHead>
              <TableHead className="hidden md:table-cell">Data de Cadastro</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredDealers.map((dealer) => (
              <TableRow key={dealer.id}>
                <TableCell>
                  <div>
                    <div className="font-medium">{dealer.name}</div>
                    <div className="text-sm text-gray-500 md:hidden">
                      {dealer.email} • {dealer.phone}
                    </div>
                  </div>
                </TableCell>
                <TableCell className="hidden md:table-cell">{dealer.email}</TableCell>
                <TableCell>{dealer.phone}</TableCell>
                <TableCell className="hidden md:table-cell">
                  {dealer.city}, {dealer.state}
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {formatDate(dealer.createdAt)}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end space-x-2">
                    <Button variant="ghost" size="sm" onClick={() => handleEditDealer(dealer)}>
                      <Edit size={16} />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => {
                        setSelectedDealer(dealer);
                        setIsDeleteDialogOpen(true);
                      }}
                    >
                      <Trash2 size={16} className="text-red-500" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            
            {filteredDealers.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-10">
                  <p className="text-gray-500">Nenhum vendedor encontrado</p>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      
      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar exclusão</DialogTitle>
            <DialogDescription>
              Tem certeza que deseja excluir o vendedor{' '}
              <span className="font-semibold">
                {selectedDealer?.name}
              </span>
              ? Esta ação não pode ser desfeita.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancelar</Button>
            </DialogClose>
            <Button variant="destructive" onClick={handleDeleteDealer}>
              Excluir
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Add/Edit Dealer Dialog */}
      <Dialog open={isAddEditDialogOpen} onOpenChange={setIsAddEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {selectedDealer ? 'Editar Vendedor' : 'Adicionar Novo Vendedor'}
            </DialogTitle>
            <DialogDescription>
              Preencha os dados do vendedor nos campos abaixo.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome*</Label>
              <Input
                id="name"
                value={dealerForm.name || ''}
                onChange={(e) => handleFormChange('name', e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email*</Label>
              <Input
                id="email"
                type="email"
                value={dealerForm.email || ''}
                onChange={(e) => handleFormChange('email', e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone">Telefone*</Label>
              <Input
                id="phone"
                value={dealerForm.phone || ''}
                onChange={(e) => handleFormChange('phone', e.target.value)}
                required
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="state">Estado</Label>
                <Select 
                  value={dealerForm.state || ''} 
                  onValueChange={(value) => handleFormChange('state', value)}
                >
                  <SelectTrigger id="state">
                    <SelectValue placeholder="Selecione o estado" />
                  </SelectTrigger>
                  <SelectContent>
                    {states.map((state) => (
                      <SelectItem key={state.abbreviation} value={state.abbreviation}>
                        {state.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="city">Cidade</Label>
                <Input
                  id="city"
                  value={dealerForm.city || ''}
                  onChange={(e) => handleFormChange('city', e.target.value)}
                />
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancelar</Button>
            </DialogClose>
            <Button onClick={handleSubmitDealer}>Salvar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminDealers;
