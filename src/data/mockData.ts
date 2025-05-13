
import { Vehicle, Dealer, Proposal, State } from '../types';

// Mock vehicle data
export const vehicles: Vehicle[] = [
  {
    id: '1',
    make: 'Toyota',
    model: 'Corolla',
    year: 2021,
    price: 105900,
    images: ['/images/toyota-corolla.jpg', '/images/toyota-corolla-2.jpg'],
    mainImage: '/images/toyota-corolla.jpg',
    transmission: 'automatic',
    location: {
      state: 'SP',
      city: 'São Paulo',
      region: 'Zona Sul'
    },
    color: 'Prata',
    mileage: 35000,
    fuelType: 'Flex',
    isSold: false,
    createdAt: '2023-03-15T10:30:00Z',
    dealerId: '1'
  },
  {
    id: '2',
    make: 'Honda',
    model: 'Civic',
    year: 2022,
    price: 129900,
    images: ['/images/honda-civic.jpg', '/images/honda-civic-2.jpg'],
    mainImage: '/images/honda-civic.jpg',
    transmission: 'automatic',
    location: {
      state: 'RJ',
      city: 'Rio de Janeiro',
      region: 'Zona Norte'
    },
    color: 'Preto',
    mileage: 15000,
    fuelType: 'Flex',
    isSold: false,
    createdAt: '2023-05-20T14:15:00Z',
    dealerId: '2'
  },
  {
    id: '3',
    make: 'Volkswagen',
    model: 'Golf',
    year: 2020,
    price: 89900,
    images: ['/images/vw-golf.jpg'],
    mainImage: '/images/vw-golf.jpg',
    transmission: 'manual',
    location: {
      state: 'SP',
      city: 'Campinas',
      region: 'Centro'
    },
    color: 'Branco',
    mileage: 45000,
    fuelType: 'Flex',
    isSold: true,
    createdAt: '2023-02-10T09:45:00Z',
    dealerId: '1'
  },
  {
    id: '4',
    make: 'Hyundai',
    model: 'HB20',
    year: 2021,
    price: 72900,
    images: ['/images/hyundai-hb20.jpg'],
    mainImage: '/images/hyundai-hb20.jpg',
    transmission: 'manual',
    location: {
      state: 'MG',
      city: 'Belo Horizonte',
      region: 'Centro-Sul'
    },
    color: 'Vermelho',
    mileage: 28000,
    fuelType: 'Flex',
    isSold: false,
    createdAt: '2023-04-05T11:20:00Z',
    dealerId: '3'
  },
  {
    id: '5',
    make: 'Chevrolet',
    model: 'Onix',
    year: 2022,
    price: 79900,
    images: ['/images/chevrolet-onix.jpg'],
    mainImage: '/images/chevrolet-onix.jpg',
    transmission: 'automatic',
    location: {
      state: 'SP',
      city: 'São Paulo',
      region: 'Zona Oeste'
    },
    color: 'Azul',
    mileage: 12000,
    fuelType: 'Flex',
    isSold: false,
    createdAt: '2023-06-12T16:30:00Z',
    dealerId: '2'
  },
  {
    id: '6',
    make: 'Fiat',
    model: 'Argo',
    year: 2021,
    price: 68500,
    images: ['/images/fiat-argo.jpg'],
    mainImage: '/images/fiat-argo.jpg',
    transmission: 'manual',
    location: {
      state: 'RJ',
      city: 'Rio de Janeiro',
      region: 'Zona Sul'
    },
    color: 'Prata',
    mileage: 32000,
    fuelType: 'Flex',
    isSold: false,
    createdAt: '2023-01-25T13:10:00Z',
    dealerId: '3'
  }
];

// Mock dealer data
export const dealers: Dealer[] = [
  {
    id: '1',
    name: 'João Silva',
    email: 'joao@autoproposta.com',
    phone: '(11) 98765-4321',
    city: 'São Paulo',
    state: 'SP',
    createdAt: '2022-06-10T08:30:00Z'
  },
  {
    id: '2',
    name: 'Maria Oliveira',
    email: 'maria@autoproposta.com',
    phone: '(21) 98765-1234',
    city: 'Rio de Janeiro',
    state: 'RJ',
    createdAt: '2022-07-15T10:15:00Z'
  },
  {
    id: '3',
    name: 'Carlos Santos',
    email: 'carlos@autoproposta.com',
    phone: '(31) 99876-5432',
    city: 'Belo Horizonte',
    state: 'MG',
    createdAt: '2022-08-20T14:45:00Z'
  }
];

// Mock proposal data
export const proposals: Proposal[] = [
  {
    id: '1',
    vehicleId: '1',
    customerName: 'Pedro Almeida',
    customerEmail: 'pedro@email.com',
    customerPhone: '(11) 97654-3210',
    message: 'Tenho interesse neste veículo e gostaria de agendar um test drive.',
    status: 'pending',
    createdAt: '2023-07-05T09:30:00Z'
  },
  {
    id: '2',
    vehicleId: '2',
    customerName: 'Ana Costa',
    customerEmail: 'ana@email.com',
    customerPhone: '(21) 98765-4321',
    message: 'Qual a condição para financiamento deste veículo?',
    status: 'contacted',
    createdAt: '2023-07-10T14:20:00Z'
  },
  {
    id: '3',
    vehicleId: '4',
    customerName: 'Lucas Ferreira',
    customerEmail: 'lucas@email.com',
    customerPhone: '(31) 99876-5432',
    message: 'Estou interessado neste carro. Aceita troca como parte do pagamento?',
    status: 'accepted',
    createdAt: '2023-07-15T11:45:00Z'
  },
  {
    id: '4',
    vehicleId: '5',
    customerName: 'Julia Martins',
    customerEmail: 'julia@email.com',
    customerPhone: '(11) 98765-1234',
    message: 'Gostaria de saber se o preço é negociável.',
    status: 'rejected',
    createdAt: '2023-07-20T16:10:00Z'
  }
];

// States and cities data
export const states: State[] = [
  {
    name: 'São Paulo',
    abbreviation: 'SP',
    cities: [
      {
        name: 'São Paulo',
        regions: ['Zona Norte', 'Zona Sul', 'Zona Leste', 'Zona Oeste', 'Centro']
      },
      {
        name: 'Campinas',
        regions: ['Centro', 'Barão Geraldo', 'Cambui', 'Taquaral']
      },
      {
        name: 'Santos',
        regions: ['Centro', 'Gonzaga', 'Ponta da Praia', 'Boqueirão']
      }
    ]
  },
  {
    name: 'Rio de Janeiro',
    abbreviation: 'RJ',
    cities: [
      {
        name: 'Rio de Janeiro',
        regions: ['Zona Norte', 'Zona Sul', 'Zona Oeste', 'Centro']
      },
      {
        name: 'Niterói',
        regions: ['Centro', 'Icaraí', 'São Francisco', 'Ingá']
      },
      {
        name: 'Petrópolis',
        regions: ['Centro', 'Itaipava', 'Cascatinha', 'Quitandinha']
      }
    ]
  },
  {
    name: 'Minas Gerais',
    abbreviation: 'MG',
    cities: [
      {
        name: 'Belo Horizonte',
        regions: ['Centro-Sul', 'Pampulha', 'Barreiro', 'Venda Nova']
      },
      {
        name: 'Uberlândia',
        regions: ['Centro', 'Santa Mônica', 'Umuarama', 'Jardim Karaíba']
      },
      {
        name: 'Juiz de Fora',
        regions: ['Centro', 'São Mateus', 'Benfica', 'Cascatinha']
      }
    ]
  }
];

// Get all unique makes
export const getUniqueMakes = (): string[] => {
  return [...new Set(vehicles.map(vehicle => vehicle.make))];
};

// Get all unique models
export const getUniqueModels = (): string[] => {
  return [...new Set(vehicles.map(vehicle => vehicle.model))];
};

// Get all unique years
export const getUniqueYears = (): number[] => {
  return [...new Set(vehicles.map(vehicle => vehicle.year))].sort((a, b) => a - b);
};

// Get min and max price
export const getPriceRange = () => {
  const prices = vehicles.map(vehicle => vehicle.price);
  return {
    min: Math.min(...prices),
    max: Math.max(...prices)
  };
};

// Get min and max year
export const getYearRange = () => {
  const years = vehicles.map(vehicle => vehicle.year);
  return {
    min: Math.min(...years),
    max: Math.max(...years)
  };
};

// Get dashboard stats
export const getDashboardStats = () => {
  return {
    totalVehicles: vehicles.length,
    soldVehicles: vehicles.filter(vehicle => vehicle.isSold).length,
    totalProposals: proposals.length,
    recentProposals: proposals.slice(0, 5)
  };
};

// Get sales by make
export const getSalesByMake = () => {
  const makeCount: Record<string, number> = {};
  
  vehicles.forEach(vehicle => {
    if (vehicle.isSold) {
      makeCount[vehicle.make] = (makeCount[vehicle.make] || 0) + 1;
    }
  });
  
  return Object.entries(makeCount).map(([name, value]) => ({ name, value }));
};

// Get proposals by model
export const getProposalsByModel = () => {
  const modelCount: Record<string, number> = {};
  
  proposals.forEach(proposal => {
    const vehicle = vehicles.find(v => v.id === proposal.vehicleId);
    if (vehicle) {
      modelCount[vehicle.model] = (modelCount[vehicle.model] || 0) + 1;
    }
  });
  
  return Object.entries(modelCount).map(([name, value]) => ({ name, value }));
};

// Filter vehicles by criteria
export const filterVehicles = (filters: any) => {
  return vehicles.filter(vehicle => {
    let match = true;
    
    if (filters.state && filters.state !== 'all' && vehicle.location.state !== filters.state) {
      match = false;
    }
    
    if (filters.city && filters.city !== 'all' && vehicle.location.city !== filters.city) {
      match = false;
    }
    
    if (filters.region && filters.region !== 'all' && vehicle.location.region !== filters.region) {
      match = false;
    }
    
    if (filters.priceMin && vehicle.price < filters.priceMin) {
      match = false;
    }
    
    if (filters.priceMax && vehicle.price > filters.priceMax) {
      match = false;
    }
    
    if (filters.yearMin && vehicle.year < filters.yearMin) {
      match = false;
    }
    
    if (filters.yearMax && vehicle.year > filters.yearMax) {
      match = false;
    }
    
    if (filters.make && filters.make.length > 0 && !filters.make.includes(vehicle.make)) {
      match = false;
    }
    
    if (filters.model && filters.model.length > 0 && !filters.model.includes(vehicle.model)) {
      match = false;
    }
    
    if (filters.transmission && filters.transmission.length > 0 && !filters.transmission.includes(vehicle.transmission)) {
      match = false;
    }
    
    if (filters.searchTerm) {
      const searchLower = filters.searchTerm.toLowerCase();
      if (
        !vehicle.make.toLowerCase().includes(searchLower) &&
        !vehicle.model.toLowerCase().includes(searchLower)
      ) {
        match = false;
      }
    }
    
    return match;
  });
};
