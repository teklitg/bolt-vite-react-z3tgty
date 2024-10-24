import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { FilterBar } from './components/FilterBar';
import { PropertyCard } from './components/PropertyCard';
import { Property, FilterOptions } from './types';

const MOCK_PROPERTIES: Property[] = [
  {
    id: '1',
    title: 'Modern Downtown Apartment',
    description: 'Luxurious apartment with city views',
    price: 2500,
    location: 'Downtown, New York',
    bedrooms: 2,
    bathrooms: 2,
    area: 1200,
    imageUrl: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1000&q=80',
    amenities: ['Parking', 'Gym', 'Pool']
  },
  {
    id: '2',
    title: 'Cozy Suburban House',
    description: 'Family-friendly home with garden',
    price: 3200,
    location: 'Brooklyn, New York',
    bedrooms: 3,
    bathrooms: 2.5,
    area: 2000,
    imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1000&q=80',
    amenities: ['Garden', 'Garage', 'Fireplace']
  },
  {
    id: '3',
    title: 'Luxury Penthouse Suite',
    description: 'Stunning penthouse with panoramic views',
    price: 5000,
    location: 'Manhattan, New York',
    bedrooms: 4,
    bathrooms: 3,
    area: 2500,
    imageUrl: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=1000&q=80',
    amenities: ['Terrace', 'Concierge', 'Smart Home']
  }
];

function App() {
  const [filters, setFilters] = useState<FilterOptions>({});
  
  const filteredProperties = MOCK_PROPERTIES.filter(property => {
    if (filters.minPrice && property.price < filters.minPrice) return false;
    if (filters.maxPrice && property.price > filters.maxPrice) return false;
    if (filters.bedrooms && property.bedrooms < filters.bedrooms) return false;
    if (filters.location && !property.location.toLowerCase().includes(filters.location.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Find Your Perfect Home
          </h1>
          <p className="text-xl text-gray-600">
            Discover the best rental properties in your area
          </p>
        </div>
        
        <FilterBar filters={filters} onFilterChange={setFilters} />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProperties.map(property => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
        
        {filteredProperties.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No properties found matching your criteria</p>
          </div>
        )}
      </main>
      
      <footer className="bg-gray-800 text-white py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">About RentHub</h3>
              <p className="text-gray-400">
                Find your perfect rental property with our comprehensive listing platform.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Home</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Listings</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">About</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
              <p className="text-gray-400">
                Email: info@renthub.com<br />
                Phone: (555) 123-4567<br />
                Address: 123 Main St, New York, NY
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;