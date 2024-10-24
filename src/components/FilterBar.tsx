import React from 'react';
import { Search, DollarSign, Home } from 'lucide-react';
import { FilterOptions } from '../types';

interface FilterBarProps {
  filters: FilterOptions;
  onFilterChange: (filters: FilterOptions) => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({ filters, onFilterChange }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Location"
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={filters.location || ''}
            onChange={(e) => onFilterChange({ ...filters, location: e.target.value })}
          />
        </div>
        
        <div className="relative">
          <DollarSign className="absolute left-3 top-3 text-gray-400" />
          <input
            type="number"
            placeholder="Min Price"
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={filters.minPrice || ''}
            onChange={(e) => onFilterChange({ ...filters, minPrice: Number(e.target.value) })}
          />
        </div>
        
        <div className="relative">
          <DollarSign className="absolute left-3 top-3 text-gray-400" />
          <input
            type="number"
            placeholder="Max Price"
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={filters.maxPrice || ''}
            onChange={(e) => onFilterChange({ ...filters, maxPrice: Number(e.target.value) })}
          />
        </div>
        
        <div className="relative">
          <Home className="absolute left-3 top-3 text-gray-400" />
          <select
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={filters.bedrooms || ''}
            onChange={(e) => onFilterChange({ ...filters, bedrooms: Number(e.target.value) })}
          >
            <option value="">Bedrooms</option>
            <option value="1">1+</option>
            <option value="2">2+</option>
            <option value="3">3+</option>
            <option value="4">4+</option>
          </select>
        </div>
      </div>
    </div>
  );
};