
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { proposals, vehicles } from '@/data/mockData';
import { Proposal } from '@/types';
import { Eye, MessageSquare, Search, Trash2 } from 'lucide-react';

const AdminProposals = () => {
  const { toast } = useToast();
  const [filteredProposals, setFilteredProposals] = useState<Proposal[]>(proposals);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedProposal, setSelectedProposal] = useState<Proposal | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isUpdateStatusDialogOpen, setIsUpdateStatusDialogOpen] = useState(false);
  const [newStatus, setNewStatus] = useState<string>('');

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

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    filterProposals();
  };

  const filterProposals = () => {
    let filtered = proposals;
    
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (proposal) =>
          proposal.customerName.toLowerCase().includes(term) ||
          proposal.customerEmail.toLowerCase().includes(term) ||
          proposal.message.toLowerCase().includes(term)
      );
    }
    
    if (selectedStatus !== 'all') {
      filtered = filtered.filter((proposal) => proposal.status === selectedStatus);
    }
    
    setFilteredProposals(filtered);
  };

  const handleViewProposal = (proposal: Proposal) => {
    // Find the vehicle associated with this proposal
    const vehicle = vehicles.find(v => v.id === proposal.vehicleId);
    setSelectedProposal({ ...proposal, vehicle });
    setIsViewDialogOpen(true);
  };

  const handleDeleteProposal = () => {
    if (selectedProposal) {
      // In a real app, send DELETE request to backend
      const updatedProposals = filteredProposals.filter(
        (proposal) => proposal.id !== selectedProposal.id
      );
      setFilteredProposals(updatedProposals);
      
      toast({
        title: "Proposta removida",
        description: `Proposta de ${selectedProposal.customerName} foi removida com sucesso.`,
      });
      
      setIsDeleteDialogOpen(false);
      setSelectedProposal(null);
    }
  };

  const handleOpenUpdateStatus = (proposal: Proposal) => {
    setSelectedProposal(proposal);
    setNewStatus(proposal.status);
    setIsUpdateStatusDialogOpen(true);
  };

  const handleUpdateStatus = () => {
    if (selectedProposal && newStatus) {
      // In a real app, send PUT request to backend
      const updatedProposals = filteredProposals.map(proposal => 
        proposal.id === selectedProposal.id 
          ? { ...proposal, status: newStatus as 'pending' | 'contacted' | 'accepted' | 'rejected' } 
          : proposal
      );
      
      setFilteredProposals(updatedProposals);
      
      toast({
        title: "Status atualizado",
        description: `Status da proposta atualizado para ${getStatusText(newStatus)}.`,
      });
      
      setIsUpdateStatusDialogOpen(false);
      setSelectedProposal(null);
    }
  };
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Gerenciamento de Propostas</h1>
        <p className="text-muted-foreground">
          Visualize e gerencie propostas recebidas para seus veículos
        </p>
      </div>
      
      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input
            placeholder="Buscar por cliente ou mensagem..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch(e)}
          />
        </div>
        
        <div>
          <Select value={selectedStatus} onValueChange={(value) => {
            setSelectedStatus(value);
            setTimeout(filterProposals, 0);
          }}>
            <SelectTrigger>
              <SelectValue placeholder="Filtrar por status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os Status</SelectItem>
              <SelectItem value="pending">Pendente</SelectItem>
              <SelectItem value="contacted">Contatado</SelectItem>
              <SelectItem value="accepted">Aceito</SelectItem>
              <SelectItem value="rejected">Rejeitado</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {/* Proposals Table */}
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Cliente</TableHead>
              <TableHead className="hidden md:table-cell">Data</TableHead>
              <TableHead className="hidden md:table-cell">Veículo</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProposals.map((proposal) => {
              const vehicle = vehicles.find(v => v.id === proposal.vehicleId);
              return (
                <TableRow key={proposal.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{proposal.customerName}</div>
                      <div className="text-sm text-gray-500">{proposal.customerEmail}</div>
                      <div className="text-sm text-gray-500 md:hidden">
                        {formatDate(proposal.createdAt)}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">{formatDate(proposal.createdAt)}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    {vehicle ? `${vehicle.make} ${vehicle.model} (${vehicle.year})` : 'N/A'}
                  </TableCell>
                  <TableCell>
                    <div className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeClass(proposal.status)}`}>
                      {getStatusText(proposal.status)}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Button variant="ghost" size="sm" onClick={() => handleViewProposal(proposal)}>
                        <Eye size={16} />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleOpenUpdateStatus(proposal)}>
                        <MessageSquare size={16} className="text-blue-500" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => {
                          setSelectedProposal(proposal);
                          setIsDeleteDialogOpen(true);
                        }}
                      >
                        <Trash2 size={16} className="text-red-500" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
            
            {filteredProposals.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-10">
                  <p className="text-gray-500">Nenhuma proposta encontrada</p>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      
      {/* View Proposal Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Detalhes da Proposta</DialogTitle>
            <DialogDescription>
              Proposta recebida em {selectedProposal && formatDate(selectedProposal.createdAt)}
            </DialogDescription>
          </DialogHeader>
          
          {selectedProposal && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2 md:col-span-2">
                  <h3 className="text-sm font-medium text-gray-500">Cliente</h3>
                  <p className="font-medium">{selectedProposal.customerName}</p>
                  <p>{selectedProposal.customerEmail}</p>
                  <p>{selectedProposal.customerPhone}</p>
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-gray-500">Status</h3>
                  <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getStatusBadgeClass(selectedProposal.status)}`}>
                    {getStatusText(selectedProposal.status)}
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-gray-500">Veículo</h3>
                {selectedProposal.vehicle && (
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="w-full md:w-1/3 aspect-[4/3] bg-gray-200 rounded-md flex items-center justify-center">
                      <p className="text-gray-500 text-sm">Imagem do Veículo</p>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-lg">
                        {selectedProposal.vehicle.make} {selectedProposal.vehicle.model}
                      </h4>
                      <p className="text-gray-600">Ano: {selectedProposal.vehicle.year}</p>
                      <p className="text-gray-600">Preço: {selectedProposal.vehicle.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                      <p className="text-gray-600">
                        Local: {selectedProposal.vehicle.location.city}, {selectedProposal.vehicle.location.state}
                      </p>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-gray-500">Mensagem</h3>
                <div className="bg-gray-50 p-4 rounded-md">
                  <p>{selectedProposal.message || "Nenhuma mensagem adicional."}</p>
                </div>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button 
              onClick={() => {
                setIsViewDialogOpen(false);
                handleOpenUpdateStatus(selectedProposal!);
              }}
            >
              Atualizar Status
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar exclusão</DialogTitle>
            <DialogDescription>
              Tem certeza que deseja excluir a proposta de{' '}
              <span className="font-semibold">
                {selectedProposal?.customerName}
              </span>
              ? Esta ação não pode ser desfeita.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancelar</Button>
            </DialogClose>
            <Button variant="destructive" onClick={handleDeleteProposal}>
              Excluir
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Update Status Dialog */}
      <Dialog open={isUpdateStatusDialogOpen} onOpenChange={setIsUpdateStatusDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Atualizar Status da Proposta</DialogTitle>
            <DialogDescription>
              Atualize o status da proposta de {selectedProposal?.customerName}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <Select value={newStatus} onValueChange={setNewStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o novo status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pending">Pendente</SelectItem>
                <SelectItem value="contacted">Contatado</SelectItem>
                <SelectItem value="accepted">Aceito</SelectItem>
                <SelectItem value="rejected">Rejeitado</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancelar</Button>
            </DialogClose>
            <Button onClick={handleUpdateStatus}>Atualizar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminProposals;
