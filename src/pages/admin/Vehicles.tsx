import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { vehicles, dealers, states } from '@/data/mockData';
import { Vehicle } from '@/types';
import { Edit, Trash2, Plus, Search } from 'lucide-react';

const AdminVehicles = () => {
  const { toast } = useToast();
  const [filteredVehicles, setFilteredVehicles] = useState<Vehicle[]>(vehicles);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isAddEditDialogOpen, setIsAddEditDialogOpen] = useState(false);
  
  // New vehicle state
  const [vehicleForm, setVehicleForm] = useState<Partial<Vehicle>>({
    make: '',
    model: '',
    year: new Date().getFullYear(),
    price: 0,
    transmission: 'manual',
    location: {
      state: '',
      city: '',
      region: ''
    },
    color: '',
    mileage: 0,
    fuelType: 'Flex',
    isSold: false,
    dealerId: '',
  });
  
  const [availableCities, setAvailableCities] = useState<string[]>([]);
  const [availableRegions, setAvailableRegions] = useState<string[]>([]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!searchTerm.trim()) {
      setFilteredVehicles(vehicles);
      return;
    }
    
    const term = searchTerm.toLowerCase();
    const filtered = vehicles.filter(
      (vehicle) =>
        vehicle.make.toLowerCase().includes(term) ||
        vehicle.model.toLowerCase().includes(term) ||
        vehicle.year.toString().includes(term)
    );
    
    setFilteredVehicles(filtered);
  };

  const handleDeleteVehicle = () => {
    if (selectedVehicle) {
      // In a real app, send DELETE request to backend
      // For demo, simulate deletion from the list
      const updatedVehicles = filteredVehicles.filter(
        (vehicle) => vehicle.id !== selectedVehicle.id
      );
      setFilteredVehicles(updatedVehicles);
      
      toast({
        title: "Veículo removido",
        description: `${selectedVehicle.make} ${selectedVehicle.model} foi removido com sucesso.`,
      });
      
      setIsDeleteDialogOpen(false);
      setSelectedVehicle(null);
    }
  };

  const handleEditVehicle = (vehicle: Vehicle) => {
    setSelectedVehicle(vehicle);
    setVehicleForm({
      ...vehicle,
      location: { ...vehicle.location }
    });
    
    // Set available cities and regions
    if (vehicle.location.state) {
      const stateData = states.find(state => state.abbreviation === vehicle.location.state);
      if (stateData) {
        const cities = stateData.cities.map(city => city.name);
        setAvailableCities(cities);
        
        if (vehicle.location.city) {
          const cityData = stateData.cities.find(city => city.name === vehicle.location.city);
          if (cityData) {
            setAvailableRegions(cityData.regions);
          }
        }
      }
    }
    
    setIsAddEditDialogOpen(true);
  };

  const handleAddNewVehicle = () => {
    setSelectedVehicle(null);
    setVehicleForm({
      make: '',
      model: '',
      year: new Date().getFullYear(),
      price: 0,
      transmission: 'manual',
      location: {
        state: '',
        city: '',
        region: ''
      },
      color: '',
      mileage: 0,
      fuelType: 'Flex',
      isSold: false,
      dealerId: '',
    });
    setAvailableCities([]);
    setAvailableRegions([]);
    setIsAddEditDialogOpen(true);
  };

  const handleFormChange = (field: string, value: any) => {
    setVehicleForm(prev => {
      if (field.startsWith('location.')) {
        const locationField = field.split('.')[1];
        const location = { ...prev.location, [locationField]: value };
        
        // Update cities when state changes
        if (locationField === 'state') {
          const stateData = states.find(state => state.abbreviation === value);
          if (stateData) {
            const cities = stateData.cities.map(city => city.name);
            setAvailableCities(cities);
            setAvailableRegions([]);
            location.city = '';
            location.region = '';
          }
        }
        
        // Update regions when city changes
        if (locationField === 'city') {
          const stateData = states.find(state => state.abbreviation === prev.location?.state);
          if (stateData) {
            const cityData = stateData.cities.find(city => city.name === value);
            if (cityData) {
              setAvailableRegions(cityData.regions);
              location.region = '';
            }
          }
        }
        
        return { ...prev, location };
      }
      
      return { ...prev, [field]: value };
    });
  };

  const handleSubmitVehicle = () => {
    if (!vehicleForm.make || !vehicleForm.model || !vehicleForm.price) {
      toast({
        title: "Erro no formulário",
        description: "Preencha todos os campos obrigatórios.",
        variant: "destructive",
      });
      return;
    }
    
    // Generate a new ID for a new vehicle
    if (!selectedVehicle) {
      const newId = (Math.max(...vehicles.map(v => parseInt(v.id))) + 1).toString();
      
      const newVehicle = {
        ...vehicleForm,
        id: newId,
        images: ['/images/placeholder.jpg'],
        mainImage: '/images/placeholder.jpg',
        createdAt: new Date().toISOString(),
      } as Vehicle;
      
      // Add the new vehicle to the list (in a real app, send POST request to backend)
      const updatedVehicles = [...filteredVehicles, newVehicle];
      setFilteredVehicles(updatedVehicles);
      
      toast({
        title: "Veículo adicionado",
        description: `${newVehicle.make} ${newVehicle.model} foi adicionado com sucesso.`,
      });
    } else {
      // Update the existing vehicle (in a real app, send PUT request to backend)
      const updatedVehicles = filteredVehicles.map(vehicle => 
        vehicle.id === selectedVehicle.id ? { ...selectedVehicle, ...vehicleForm } : vehicle
      );
      
      setFilteredVehicles(updatedVehicles);
      
      toast({
        title: "Veículo atualizado",
        description: `${vehicleForm.make} ${vehicleForm.model} foi atualizado com sucesso.`,
      });
    }
    
    setIsAddEditDialogOpen(false);
  };
  
  const formatPrice = (price: number) => {
    return price.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Gerenciamento de Veículos</h1>
          <p className="text-muted-foreground">
            Adicione, edite ou remova veículos do catálogo
          </p>
        </div>
        <Button onClick={handleAddNewVehicle}>
          <Plus className="mr-2 h-4 w-4" /> Novo Veículo
        </Button>
      </div>
      
      {/* Search */}
      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input
            placeholder="Buscar por marca, modelo ou ano..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch(e)}
          />
        </div>
        <Button onClick={handleSearch}>Buscar</Button>
      </div>
      
      {/* Vehicles Table */}
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Veículo</TableHead>
              <TableHead className="hidden md:table-cell">Ano</TableHead>
              <TableHead>Preço</TableHead>
              <TableHead className="hidden md:table-cell">Localização</TableHead>
              <TableHead className="hidden md:table-cell">Status</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredVehicles.map((vehicle) => (
              <TableRow key={vehicle.id}>
                <TableCell>
                  <div>
                    <div className="font-medium">
                      {vehicle.make} {vehicle.model}
                    </div>
                    <div className="text-sm text-gray-500 md:hidden">
                      {vehicle.year} • {formatPrice(vehicle.price)}
                    </div>
                    <div className="text-sm text-gray-500 md:hidden">
                      {vehicle.location.city}, {vehicle.location.state}
                    </div>
                  </div>
                </TableCell>
                <TableCell className="hidden md:table-cell">{vehicle.year}</TableCell>
                <TableCell>{formatPrice(vehicle.price)}</TableCell>
                <TableCell className="hidden md:table-cell">
                  {vehicle.location.city}, {vehicle.location.state}
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  <div className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                    vehicle.isSold ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                  }`}>
                    {vehicle.isSold ? 'Vendido' : 'Disponível'}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end space-x-2">
                    <Button variant="ghost" size="sm" onClick={() => handleEditVehicle(vehicle)}>
                      <Edit size={16} />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => {
                        setSelectedVehicle(vehicle);
                        setIsDeleteDialogOpen(true);
                      }}
                    >
                      <Trash2 size={16} className="text-red-500" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            
            {filteredVehicles.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-10">
                  <p className="text-gray-500">Nenhum veículo encontrado</p>
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
              Tem certeza que deseja excluir o veículo{' '}
              <span className="font-semibold">
                {selectedVehicle?.make} {selectedVehicle?.model}
              </span>
              ? Esta ação não pode ser desfeita.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancelar</Button>
            </DialogClose>
            <Button variant="destructive" onClick={handleDeleteVehicle}>
              Excluir
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Add/Edit Vehicle Dialog */}
      <Dialog open={isAddEditDialogOpen} onOpenChange={setIsAddEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {selectedVehicle ? 'Editar Veículo' : 'Adicionar Novo Veículo'}
            </DialogTitle>
            <DialogDescription>
              Preencha os dados do veículo nos campos abaixo.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="make">Marca*</Label>
              <Input
                id="make"
                value={vehicleForm.make || ''}
                onChange={(e) => handleFormChange('make', e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="model">Modelo*</Label>
              <Input
                id="model"
                value={vehicleForm.model || ''}
                onChange={(e) => handleFormChange('model', e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="year">Ano*</Label>
              <Input
                id="year"
                type="number"
                value={vehicleForm.year || ''}
                onChange={(e) => handleFormChange('year', parseInt(e.target.value))}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="price">Preço*</Label>
              <Input
                id="price"
                type="number"
                value={vehicleForm.price || ''}
                onChange={(e) => handleFormChange('price', parseFloat(e.target.value))}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="mileage">Quilometragem</Label>
              <Input
                id="mileage"
                type="number"
                value={vehicleForm.mileage || ''}
                onChange={(e) => handleFormChange('mileage', parseInt(e.target.value))}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="color">Cor</Label>
              <Input
                id="color"
                value={vehicleForm.color || ''}
                onChange={(e) => handleFormChange('color', e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="fuelType">Combustível</Label>
              <Select 
                value={vehicleForm.fuelType || 'Flex'} 
                onValueChange={(value) => handleFormChange('fuelType', value)}
              >
                <SelectTrigger id="fuelType">
                  <SelectValue placeholder="Selecione o combustível" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Flex">Flex</SelectItem>
                  <SelectItem value="Gasolina">Gasolina</SelectItem>
                  <SelectItem value="Etanol">Etanol</SelectItem>
                  <SelectItem value="Diesel">Diesel</SelectItem>
                  <SelectItem value="Elétrico">Elétrico</SelectItem>
                  <SelectItem value="Híbrido">Híbrido</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="transmission">Câmbio</Label>
              <Select 
                value={vehicleForm.transmission || 'manual'} 
                onValueChange={(value: 'manual' | 'automatic') => handleFormChange('transmission', value)}
              >
                <SelectTrigger id="transmission">
                  <SelectValue placeholder="Selecione o tipo de câmbio" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="manual">Manual</SelectItem>
                  <SelectItem value="automatic">Automático</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="state">Estado</Label>
              <Select 
                value={vehicleForm.location?.state || ''} 
                onValueChange={(value) => handleFormChange('location.state', value)}
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
              <Select 
                value={vehicleForm.location?.city || ''} 
                onValueChange={(value) => handleFormChange('location.city', value)}
                disabled={!vehicleForm.location?.state}
              >
                <SelectTrigger id="city">
                  <SelectValue placeholder="Selecione a cidade" />
                </SelectTrigger>
                <SelectContent>
                  {availableCities.map((city) => (
                    <SelectItem key={city} value={city}>
                      {city}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="region">Região</Label>
              <Select 
                value={vehicleForm.location?.region || ''} 
                onValueChange={(value) => handleFormChange('location.region', value)}
                disabled={!vehicleForm.location?.city}
              >
                <SelectTrigger id="region">
                  <SelectValue placeholder="Selecione a região" />
                </SelectTrigger>
                <SelectContent>
                  {availableRegions.map((region) => (
                    <SelectItem key={region} value={region}>
                      {region}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="dealer">Vendedor</Label>
              <Select 
                value={vehicleForm.dealerId || ''} 
                onValueChange={(value) => handleFormChange('dealerId', value)}
              >
                <SelectTrigger id="dealer">
                  <SelectValue placeholder="Selecione o vendedor" />
                </SelectTrigger>
                <SelectContent>
                  {dealers.map((dealer) => (
                    <SelectItem key={dealer.id} value={dealer.id}>
                      {dealer.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="sold"
                checked={!!vehicleForm.isSold}
                onChange={(e) => handleFormChange('isSold', e.target.checked)}
                className="rounded border-gray-300 text-autoproposta-blue focus:ring-autoproposta-blue"
              />
              <Label htmlFor="sold" className="cursor-pointer">Veículo vendido</Label>
            </div>
          </div>
          
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancelar</Button>
            </DialogClose>
            <Button onClick={handleSubmitVehicle}>Salvar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminVehicles;
