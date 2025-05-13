
import { useState, useEffect } from 'react';
import MainLayout from '@/components/layouts/MainLayout';
import VehicleCard from '@/components/VehicleCard';
import VehicleFilters from '@/components/VehicleFilters';
import { Button } from '@/components/ui/button';
import { vehicles, getUniqueMakes, getUniqueModels, getPriceRange, getYearRange, filterVehicles } from '@/data/mockData';
import { Vehicle, VehicleFilters as FilterTypes } from '@/types';

const HomePage = () => {
  const [filteredVehicles, setFilteredVehicles] = useState<Vehicle[]>([]);
  const [filters, setFilters] = useState<FilterTypes>({});
  const [displayCount, setDisplayCount] = useState(6);

  const makes = getUniqueMakes();
  const models = getUniqueModels();
  const priceRange = getPriceRange();
  const yearRange = getYearRange();

  // Apply filters when they change
  useEffect(() => {
    const filtered = filterVehicles(filters);
    setFilteredVehicles(filtered);
    setDisplayCount(6); // Reset display count when filters change
  }, [filters]);

  // Initial load with no filters
  useEffect(() => {
    setFilteredVehicles(vehicles);
  }, []);

  const handleFilterChange = (newFilters: FilterTypes) => {
    setFilters(newFilters);
  };

  const handleLoadMore = () => {
    setDisplayCount((prev) => Math.min(prev + 6, filteredVehicles.length));
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="bg-autoproposta-blue text-white p-8 rounded-lg mb-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-4">
              Encontre o veículo perfeito para você
            </h1>
            <p className="text-lg mb-6">
              Os melhores veículos do mercado com condições especiais para você.
              Filtre por modelo, ano, preço e muito mais!
            </p>
          </div>
        </section>

        {/* Filters */}
        <section className="mb-8">
          <VehicleFilters
            onFilterChange={handleFilterChange}
            makes={makes}
            models={models}
            priceRange={priceRange}
            yearRange={yearRange}
          />
        </section>

        {/* Results */}
        <section>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">
              Veículos Disponíveis ({filteredVehicles.length})
            </h2>
          </div>

          {filteredVehicles.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredVehicles.slice(0, displayCount).map((vehicle) => (
                  <VehicleCard key={vehicle.id} vehicle={vehicle} />
                ))}
              </div>
              
              {displayCount < filteredVehicles.length && (
                <div className="mt-8 text-center">
                  <Button 
                    onClick={handleLoadMore} 
                    variant="outline"
                    className="px-8"
                  >
                    Carregar Mais
                  </Button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-16">
              <h3 className="text-xl font-semibold text-gray-700 mb-2">Nenhum veículo encontrado</h3>
              <p className="text-gray-500">
                Tente ajustar seus filtros para ver mais resultados.
              </p>
            </div>
          )}
        </section>
      </div>
    </MainLayout>
  );
};

export default HomePage;
