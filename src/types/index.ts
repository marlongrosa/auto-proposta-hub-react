
// Vehicle types
export interface Vehicle {
  id: string;
  make: string;
  model: string;
  year: number;
  price: number;
  images: string[];
  mainImage: string;
  transmission: 'manual' | 'automatic';
  location: {
    state: string;
    city: string;
    region: string;
  };
  color: string;
  mileage: number;
  fuelType: string;
  isSold: boolean;
  createdAt: string;
  dealerId: string;
}

// Dealer types
export interface Dealer {
  id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  state: string;
  createdAt: string;
}

// Proposal types
export interface Proposal {
  id: string;
  vehicleId: string;
  vehicle?: Vehicle;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  message: string;
  status: 'pending' | 'contacted' | 'accepted' | 'rejected';
  createdAt: string;
}

// Filter types
export interface VehicleFilters {
  state?: string;
  city?: string;
  region?: string;
  priceMin?: number;
  priceMax?: number;
  yearMin?: number;
  yearMax?: number;
  make?: string[];
  model?: string[];
  transmission?: string[];
  searchTerm?: string;
}

// Location types
export interface State {
  name: string;
  abbreviation: string;
  cities: City[];
}

export interface City {
  name: string;
  regions: string[];
}

// Stats types
export interface DashboardStats {
  totalVehicles: number;
  soldVehicles: number;
  totalProposals: number;
  recentProposals: Proposal[];
}

// Chart data types
export interface ChartData {
  name: string;
  value: number;
}
