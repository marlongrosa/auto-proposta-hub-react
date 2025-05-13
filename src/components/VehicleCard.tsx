
import { useState } from 'react';
import { Vehicle } from '@/types';
import { useToast } from '@/hooks/use-toast';
import ProposalModal from './ProposalModal';

interface VehicleCardProps {
  vehicle: Vehicle;
}

const VehicleCard = ({ vehicle }: VehicleCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { toast } = useToast();
  
  const formatPrice = (price: number) => {
    return price.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleProposalSubmit = (data: any) => {
    // In a real app, this would send the data to the backend
    console.log('Proposal submitted:', data);
    toast({
      title: "Proposta enviada com sucesso!",
      description: "Entraremos em contato em breve.",
    });
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-md overflow-hidden card-hover">
        {/* Vehicle Image */}
        <div className="relative h-48 overflow-hidden">
          <img
            src={`https://placehold.co/600x400/e2e8f0/1a365d?text=${vehicle.make}+${vehicle.model}`}
            alt={`${vehicle.make} ${vehicle.model}`}
            className="w-full h-full object-cover"
          />
          {vehicle.isSold && (
            <div className="absolute top-0 right-0 bg-red-500 text-white px-3 py-1 m-2 rounded-md font-semibold">
              Vendido
            </div>
          )}
        </div>

        {/* Vehicle Details */}
        <div className="p-4">
          <h3 className="text-xl font-semibold">
            {vehicle.make} {vehicle.model}
          </h3>
          
          <div className="flex justify-between items-center mt-2">
            <span className="text-lg font-bold text-autoproposta-blue">
              {formatPrice(vehicle.price)}
            </span>
            <span className="text-gray-600">{vehicle.year}</span>
          </div>
          
          <div className="grid grid-cols-2 gap-2 mt-4">
            <div className="text-sm text-gray-600">
              <span className="font-medium">Câmbio:</span>{' '}
              {vehicle.transmission === 'automatic' ? 'Automático' : 'Manual'}
            </div>
            <div className="text-sm text-gray-600">
              <span className="font-medium">Km:</span> {vehicle.mileage.toLocaleString()}
            </div>
            <div className="text-sm text-gray-600">
              <span className="font-medium">Combustível:</span> {vehicle.fuelType}
            </div>
            <div className="text-sm text-gray-600">
              <span className="font-medium">Cor:</span> {vehicle.color}
            </div>
          </div>
          
          <div className="mt-3 text-sm text-gray-600">
            <span className="font-medium">Localização:</span>{' '}
            {vehicle.location.city}, {vehicle.location.state} - {vehicle.location.region}
          </div>
          
          <button
            onClick={handleOpenModal}
            disabled={vehicle.isSold}
            className={`mt-4 w-full py-2 px-4 rounded font-medium ${
              vehicle.isSold
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-autoproposta-orange text-white hover:bg-orange-600 transition'
            }`}
          >
            {vehicle.isSold ? 'Indisponível' : 'Enviar Proposta'}
          </button>
        </div>
      </div>

      {/* Proposal Modal */}
      <ProposalModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleProposalSubmit}
        vehicle={vehicle}
      />
    </>
  );
};

export default VehicleCard;
