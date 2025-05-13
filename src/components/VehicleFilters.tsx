
import { useState, useEffect } from 'react';
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, Search } from "lucide-react";
import { states } from '@/data/mockData';
import { VehicleFilters as FilterTypes } from '@/types';

interface VehicleFiltersProps {
  onFilterChange: (filters: FilterTypes) => void;
  makes: string[];
  models: string[];
  priceRange: { min: number; max: number };
  yearRange: { min: number; max: number };
}

const VehicleFilters = ({
  onFilterChange,
  makes,
  models,
  priceRange,
  yearRange,
}: VehicleFiltersProps) => {
  const [filters, setFilters] = useState<FilterTypes>({});
  const [selectedState, setSelectedState] = useState<string>("");
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [selectedRegion, setSelectedRegion] = useState<string>("");
  const [isFilterExpanded, setIsFilterExpanded] = useState(false);
  const [cities, setCities] = useState<string[]>([]);
  const [regions, setRegions] = useState<string[]>([]);
  const [priceValues, setPriceValues] = useState([priceRange.min, priceRange.max]);
  const [yearValues, setYearValues] = useState([yearRange.min, yearRange.max]);
  const [selectedMakes, setSelectedMakes] = useState<string[]>([]);
  const [selectedModels, setSelectedModels] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTransmissions, setSelectedTransmissions] = useState<string[]>([]);

  // Update cities when state is selected
  useEffect(() => {
    if (selectedState) {
      const stateData = states.find((state) => state.abbreviation === selectedState);
      if (stateData) {
        setCities(stateData.cities.map((city) => city.name));
        setSelectedCity("");
        setSelectedRegion("");
        setRegions([]);
      }
    } else {
      setCities([]);
      setRegions([]);
      setSelectedCity("");
      setSelectedRegion("");
    }
  }, [selectedState]);

  // Update regions when city is selected
  useEffect(() => {
    if (selectedState && selectedCity) {
      const stateData = states.find((state) => state.abbreviation === selectedState);
      if (stateData) {
        const cityData = stateData.cities.find((city) => city.name === selectedCity);
        if (cityData) {
          setRegions(cityData.regions);
        }
      }
    } else {
      setRegions([]);
    }
  }, [selectedState, selectedCity]);

  // Apply filters
  useEffect(() => {
    const newFilters: FilterTypes = {};
    
    if (selectedState) newFilters.state = selectedState;
    if (selectedCity) newFilters.city = selectedCity;
    if (selectedRegion) newFilters.region = selectedRegion;
    if (priceValues[0] !== priceRange.min || priceValues[1] !== priceRange.max) {
      newFilters.priceMin = priceValues[0];
      newFilters.priceMax = priceValues[1];
    }
    if (yearValues[0] !== yearRange.min || yearValues[1] !== yearRange.max) {
      newFilters.yearMin = yearValues[0];
      newFilters.yearMax = yearValues[1];
    }
    if (selectedMakes.length > 0) newFilters.make = selectedMakes;
    if (selectedModels.length > 0) newFilters.model = selectedModels;
    if (selectedTransmissions.length > 0) newFilters.transmission = selectedTransmissions;
    if (searchTerm) newFilters.searchTerm = searchTerm;
    
    setFilters(newFilters);
  }, [
    selectedState, 
    selectedCity, 
    selectedRegion, 
    priceValues, 
    yearValues, 
    selectedMakes, 
    selectedModels,
    selectedTransmissions,
    searchTerm,
    priceRange,
    yearRange,
  ]);

  const handleMakeToggle = (make: string) => {
    setSelectedMakes((prev) => 
      prev.includes(make)
        ? prev.filter((m) => m !== make)
        : [...prev, make]
    );
  };

  const handleModelToggle = (model: string) => {
    setSelectedModels((prev) => 
      prev.includes(model)
        ? prev.filter((m) => m !== model)
        : [...prev, model]
    );
  };

  const handleTransmissionToggle = (transmission: string) => {
    setSelectedTransmissions((prev) =>
      prev.includes(transmission)
        ? prev.filter((t) => t !== transmission)
        : [...prev, transmission]
    );
  };

  const handleApplyFilters = () => {
    onFilterChange(filters);
  };

  const handleResetFilters = () => {
    setSelectedState("");
    setSelectedCity("");
    setSelectedRegion("");
    setPriceValues([priceRange.min, priceRange.max]);
    setYearValues([yearRange.min, yearRange.max]);
    setSelectedMakes([]);
    setSelectedModels([]);
    setSelectedTransmissions([]);
    setSearchTerm("");
    onFilterChange({});
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      {/* Quick Search */}
      <div className="mb-6">
        <div className="relative">
          <Input
            placeholder="Buscar por marca ou modelo..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4"
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
        </div>
      </div>

      {/* Mobile Filter Toggle */}
      <div className="md:hidden mb-6">
        <Button
          variant="outline"
          onClick={() => setIsFilterExpanded(!isFilterExpanded)}
          className="w-full flex justify-between items-center"
        >
          <span>Filtros Avançados</span>
          {isFilterExpanded ? (
            <ChevronUp size={18} />
          ) : (
            <ChevronDown size={18} />
          )}
        </Button>
      </div>

      {/* Filter Content - Always visible on desktop, toggleable on mobile */}
      <div className={`${isFilterExpanded || 'hidden md:block'} space-y-6`}>
        {/* Location Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="state">Estado</Label>
            <Select value={selectedState} onValueChange={setSelectedState}>
              <SelectTrigger id="state">
                <SelectValue placeholder="Selecione o estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                {states.map((state) => (
                  <SelectItem key={state.abbreviation} value={state.abbreviation}>
                    {state.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="city">Cidade</Label>
            <Select value={selectedCity} onValueChange={setSelectedCity} disabled={!selectedState}>
              <SelectTrigger id="city">
                <SelectValue placeholder="Selecione a cidade" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas</SelectItem>
                {cities.map((city) => (
                  <SelectItem key={city} value={city}>
                    {city}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="region">Região</Label>
            <Select value={selectedRegion} onValueChange={setSelectedRegion} disabled={!selectedCity}>
              <SelectTrigger id="region">
                <SelectValue placeholder="Selecione a região" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas</SelectItem>
                {regions.map((region) => (
                  <SelectItem key={region} value={region}>
                    {region}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Price Range */}
        <div>
          <div className="flex justify-between mb-2">
            <Label>Faixa de Preço</Label>
            <span className="text-sm text-gray-500">
              R$ {priceValues[0].toLocaleString()} - R$ {priceValues[1].toLocaleString()}
            </span>
          </div>
          <Slider
            value={priceValues}
            min={priceRange.min}
            max={priceRange.max}
            step={1000}
            onValueChange={setPriceValues}
          />
        </div>

        {/* Year Range */}
        <div>
          <div className="flex justify-between mb-2">
            <Label>Ano do Veículo</Label>
            <span className="text-sm text-gray-500">
              {yearValues[0]} - {yearValues[1]}
            </span>
          </div>
          <Slider
            value={yearValues}
            min={yearRange.min}
            max={yearRange.max}
            step={1}
            onValueChange={setYearValues}
          />
        </div>

        {/* Make, Model, Transmission */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Makes */}
          <div>
            <Label className="mb-2 block">Marca</Label>
            <div className="space-y-2 max-h-40 overflow-y-auto pr-2">
              {makes.map((make) => (
                <div key={make} className="flex items-center space-x-2">
                  <Checkbox
                    id={`make-${make}`}
                    checked={selectedMakes.includes(make)}
                    onCheckedChange={() => handleMakeToggle(make)}
                  />
                  <label
                    htmlFor={`make-${make}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {make}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Models */}
          <div>
            <Label className="mb-2 block">Modelo</Label>
            <div className="space-y-2 max-h-40 overflow-y-auto pr-2">
              {models.map((model) => (
                <div key={model} className="flex items-center space-x-2">
                  <Checkbox
                    id={`model-${model}`}
                    checked={selectedModels.includes(model)}
                    onCheckedChange={() => handleModelToggle(model)}
                  />
                  <label
                    htmlFor={`model-${model}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {model}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Transmission */}
          <div>
            <Label className="mb-2 block">Câmbio</Label>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="transmission-manual"
                  checked={selectedTransmissions.includes('manual')}
                  onCheckedChange={() => handleTransmissionToggle('manual')}
                />
                <label
                  htmlFor="transmission-manual"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Manual
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="transmission-automatic"
                  checked={selectedTransmissions.includes('automatic')}
                  onCheckedChange={() => handleTransmissionToggle('automatic')}
                />
                <label
                  htmlFor="transmission-automatic"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Automático
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between pt-2">
          <Button
            variant="outline"
            onClick={handleResetFilters}
          >
            Limpar Filtros
          </Button>
          <Button
            onClick={handleApplyFilters}
            className="bg-autoproposta-orange hover:bg-orange-600"
          >
            Aplicar Filtros
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VehicleFilters;
