import React, { useState } from 'react';
import { usedBikes, UsedBike } from '../data/usedBikes';
import BikeCard from '../components/BikeCard';

const UsedBikes: React.FC = () => {
  const [filters, setFilters] = useState({
    brand: '',
    category: '',
    priceRange: [0, 200000],
    condition: '',
    year: [0, 2024],
  });

  const [sortBy, setSortBy] = useState('price-low');

  const filteredBikes = usedBikes.filter((bike) => {
    return (
      (filters.brand ? bike.brand === filters.brand : true) &&
      (filters.category ? bike.category === filters.category : true) &&
      bike.price >= filters.priceRange[0] &&
      bike.price <= filters.priceRange[1] &&
      (filters.condition ? bike.condition === filters.condition : true) &&
      bike.year >= filters.year[0] &&
      bike.year <= filters.year[1]
    );
  });

  const sortedBikes = [...filteredBikes].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'year-new':
        return b.year - a.year;
      case 'year-old':
        return a.year - b.year;
      case 'mileage-low':
        return a.mileage - b.mileage;
      case 'mileage-high':
        return b.mileage - a.mileage;
      default:
        return 0;
    }
  });

  const uniqueBrands = Array.from(new Set(usedBikes.map((bike) => bike.brand)));
  const uniqueCategories = Array.from(new Set(usedBikes.map((bike) => bike.category)));
  const conditionOptions = ['Excellent', 'Good', 'Fair', 'Poor'];

  const handleFilterChange = (name: string, value: any) => {
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Used Bikes</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1 bg-card p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Filters</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Brand</label>
              <select
                className="w-full p-2 border rounded-md bg-background"
                value={filters.brand}
                onChange={(e) => handleFilterChange('brand', e.target.value)}
              >
                <option value="">All Brands</option>
                {uniqueBrands.map((brand) => (
                  <option key={brand} value={brand}>
                    {brand}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Category</label>
              <select
                className="w-full p-2 border rounded-md bg-background"
                value={filters.category}
                onChange={(e) => handleFilterChange('category', e.target.value)}
              >
                <option value="">All Categories</option>
                {uniqueCategories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Condition</label>
              <select
                className="w-full p-2 border rounded-md bg-background"
                value={filters.condition}
                onChange={(e) => handleFilterChange('condition', e.target.value)}
              >
                <option value="">Any Condition</option>
                {conditionOptions.map((condition) => (
                  <option key={condition} value={condition}>
                    {condition}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">
                Price Range: ₹{filters.priceRange[0].toLocaleString()} - ₹{filters.priceRange[1].toLocaleString()}
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="range"
                  min="0"
                  max="200000"
                  step="5000"
                  value={filters.priceRange[0]}
                  onChange={(e) => handleFilterChange('priceRange', [parseInt(e.target.value), filters.priceRange[1]])}
                  className="w-full"
                />
                <input
                  type="range"
                  min="0"
                  max="200000"
                  step="5000"
                  value={filters.priceRange[1]}
                  onChange={(e) => handleFilterChange('priceRange', [filters.priceRange[0], parseInt(e.target.value)])}
                  className="w-full"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">
                Year: {filters.year[0]} - {filters.year[1]}
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="range"
                  min="2010"
                  max="2024"
                  step="1"
                  value={filters.year[0]}
                  onChange={(e) => handleFilterChange('year', [parseInt(e.target.value), filters.year[1]])}
                  className="w-full"
                />
                <input
                  type="range"
                  min="2010"
                  max="2024"
                  step="1"
                  value={filters.year[1]}
                  onChange={(e) => handleFilterChange('year', [filters.year[0], parseInt(e.target.value)])}
                  className="w-full"
                />
              </div>
            </div>
            
            <button
              className="w-full bg-primary text-primary-foreground py-2 rounded-md hover:bg-primary/90 transition"
              onClick={() => setFilters({
                brand: '',
                category: '',
                priceRange: [0, 200000],
                condition: '',
                year: [0, 2024],
              })}
            >
              Reset Filters
            </button>
          </div>
        </div>
        
        <div className="lg:col-span-3">
          <div className="flex justify-between items-center mb-4">
            <p className="text-sm">{sortedBikes.length} bikes found</p>
            <div className="flex items-center space-x-2">
              <label className="text-sm font-medium">Sort by:</label>
              <select
                className="p-2 border rounded-md bg-background"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="year-new">Year: Newest First</option>
                <option value="year-old">Year: Oldest First</option>
                <option value="mileage-low">Odometer: Low to High</option>
                <option value="mileage-high">Odometer: High to Low</option>
              </select>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {sortedBikes.map((bike: UsedBike) => (
              <div key={bike.id} className="bg-card rounded-lg shadow overflow-hidden">
                <BikeCard bike={bike} />
                <div className="p-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm whitespace-nowrap">Year</span>
                    <span className="font-medium whitespace-nowrap">{bike.year}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm whitespace-nowrap">Odometer</span>
                    <span className="font-medium whitespace-nowrap">{bike.mileage.toLocaleString()} km</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm whitespace-nowrap">Condition</span>
                    <span className="font-medium whitespace-nowrap">{bike.condition}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm whitespace-nowrap">Owners</span>
                    <span className="font-medium whitespace-nowrap">{bike.previousOwners}</span>
                  </div>
                  <div className="mt-4 flex justify-between items-center">
                    <span className="text-sm text-muted-foreground whitespace-nowrap">Listed on {new Date(bike.listedDate).toLocaleDateString()}</span>
                    <span className="text-sm font-medium whitespace-nowrap">{bike.sellerType}</span>
                  </div>
                  <div className="mt-2">
                    <button className="w-full bg-primary text-primary-foreground py-2 rounded-md hover:bg-primary/90 transition">
                      Contact Seller
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {sortedBikes.length === 0 && (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium">No bikes match your filters</h3>
              <p className="text-muted-foreground mt-2">Try adjusting your filter criteria</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UsedBikes;