import React from 'react';
import { Home, MapPin, Bed, Bath, Square } from 'lucide-react';
import { Property } from '../types';

interface PropertyCardProps {
  property: Property;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform hover:scale-[1.02]">
      <div className="relative h-48">
        <img
          src={property.imageUrl}
          alt={property.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full">
          <span className="font-semibold text-indigo-600">${property.price}/mo</span>
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex items-center mb-2">
          <MapPin className="w-4 h-4 text-gray-500 mr-2" />
          <span className="text-gray-600">{property.location}</span>
        </div>
        
        <h3 className="text-xl font-semibold mb-4">{property.title}</h3>
        
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="flex items-center">
            <Bed className="w-4 h-4 text-gray-500 mr-2" />
            <span>{property.bedrooms} Beds</span>
          </div>
          <div className="flex items-center">
            <Bath className="w-4 h-4 text-gray-500 mr-2" />
            <span>{property.bathrooms} Baths</span>
          </div>
          <div className="flex items-center">
            <Square className="w-4 h-4 text-gray-500 mr-2" />
            <span>{property.area} sqft</span>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {property.amenities.map((amenity, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm"
            >
              {amenity}
            </span>
          ))}
        </div>
        
        <button className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-colors">
          View Details
        </button>
      </div>
    </div>
  );
};