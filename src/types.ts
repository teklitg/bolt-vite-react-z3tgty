export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  imageUrl: string;
  amenities: string[];
}

export interface FilterOptions {
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number;
  location?: string;
}