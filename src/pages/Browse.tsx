import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Filter, SlidersHorizontal, Grid, List } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import BikeCard from '@/components/BikeCard';
import { sampleBikes, Bike } from '@/data/bikes';

const Browse = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || '');
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [compareList, setCompareList] = useState<Bike[]>([]);
  
  // Filter states
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedFuelTypes, setSelectedFuelTypes] = useState<string[]>([]);
  const [selectedConditions, setSelectedConditions] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500000]);
  const [mileageRange, setMileageRange] = useState<[number, number]>([0, 100]);
  const [showAccessibleOnly, setShowAccessibleOnly] = useState(
    searchParams.get('accessible') === 'true'
  );
  const [sortBy, setSortBy] = useState('popularity');

  const brands = Array.from(new Set(sampleBikes.map(bike => bike.brand))).sort();
  const fuelTypes = Array.from(new Set(sampleBikes.map(bike => bike.fuelType))).sort();
  const conditions = ['new', 'used'];

  // Filter and search logic
  const filteredBikes = useMemo(() => {
    let bikes = sampleBikes.filter(bike => {
      // Search term filter
      const matchesSearch = searchTerm === '' || 
        bike.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        bike.brand.toLowerCase().includes(searchTerm.toLowerCase());

      // Brand filter
      const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(bike.brand);

      // Fuel type filter
      const matchesFuelType = selectedFuelTypes.length === 0 || selectedFuelTypes.includes(bike.fuelType);

      // Condition filter
      const matchesCondition = selectedConditions.length === 0 || selectedConditions.includes(bike.condition);

      // Price range filter
      const matchesPrice = bike.price >= priceRange[0] && bike.price <= priceRange[1];

      // Mileage/Range filter (for electric bikes, use range instead of mileage)
      const mileageValue = bike.fuelType === 'Electric' ? (bike.range || 0) : bike.mileage;
      const matchesMileage = mileageValue >= mileageRange[0] && mileageValue <= mileageRange[1];

      // Accessible filter
      const matchesAccessible = !showAccessibleOnly || bike.isAccessible;

      return matchesSearch && matchesBrand && matchesFuelType && matchesCondition && matchesPrice && matchesMileage && matchesAccessible;
    });

    // Sort bikes
    switch (sortBy) {
      case 'price-low':
        bikes = bikes.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        bikes = bikes.sort((a, b) => b.price - a.price);
        break;
      case 'mileage':
        bikes = bikes.sort((a, b) => {
          const aMileage = a.fuelType === 'Electric' ? (a.range || 0) : a.mileage;
          const bMileage = b.fuelType === 'Electric' ? (b.range || 0) : b.mileage;
          return bMileage - aMileage;
        });
        break;
      case 'eco-score':
        bikes = bikes.sort((a, b) => b.ecoScore - a.ecoScore);
        break;
      default:
        // Keep original order for popularity
        break;
    }

    return bikes;
  }, [searchTerm, selectedBrands, selectedFuelTypes, selectedConditions, priceRange, mileageRange, showAccessibleOnly, sortBy]);

  const handleAddToCompare = (bike: Bike) => {
    if (compareList.find(b => b.id === bike.id)) {
      setCompareList(compareList.filter(b => b.id !== bike.id));
    } else if (compareList.length < 4) {
      setCompareList([...compareList, bike]);
    }
  };

  const clearFilters = () => {
    setSelectedBrands([]);
    setSelectedFuelTypes([]);
    setSelectedConditions([]);
    setPriceRange([0, 500000]);
    setMileageRange([0, 100]);
    setShowAccessibleOnly(false);
    setSearchTerm('');
    setSortBy('popularity');
    setSearchParams({});
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Browse Bikes</h1>
          <p className="text-muted-foreground">
            Find your perfect two-wheeler from our extensive collection
          </p>
        </div>

        {/* Search and Controls */}
        <div className="mb-6 space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search bikes by name or brand..."
              value={searchTerm}
              onChange={(e) => { setSearchTerm(e.target.value); setSearchParams({ q: e.target.value }); }}
              className="pl-10 h-12"
            />
          </div>

          {/* Controls */}
          <div className="flex flex-wrap items-center gap-4">
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2"
            >
              <Filter className="w-4 h-4" />
              Filters
              {(selectedBrands.length > 0 || selectedFuelTypes.length > 0 || selectedConditions.length > 0 || showAccessibleOnly) && (
                <Badge variant="secondary" className="ml-2">
                  {selectedBrands.length + selectedFuelTypes.length + selectedConditions.length + (showAccessibleOnly ? 1 : 0)}
                </Badge>
              )}
            </Button>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="popularity">Most Popular</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="mileage">Best Mileage/Range</SelectItem>
                <SelectItem value="eco-score">Best Eco Score</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                <Grid className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                <List className="w-4 h-4" />
              </Button>
            </div>

            {compareList.length > 0 && (
              <Button variant="secondary" className="ml-auto">
                Compare ({compareList.length})
              </Button>
            )}
          </div>
        </div>

        <div className="flex gap-6">
          {/* Filters Sidebar */}
          {showFilters && (
            <div className="w-80 space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <SlidersHorizontal className="w-5 h-5" />
                      Filters
                    </CardTitle>
                    <Button variant="ghost" size="sm" onClick={clearFilters}>
                      Clear All
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Accessibility Filter */}
                  <div>
                    <label className="flex items-center space-x-2">
                      <Checkbox
                        checked={showAccessibleOnly}
                        onCheckedChange={(checked) => setShowAccessibleOnly(!!checked)}
                      />
                      <span className="text-sm font-medium">Show only accessible bikes</span>
                    </label>
                  </div>

                  {/* Brand Filter */}
                  <div>
                    <h3 className="font-medium mb-3">Brand</h3>
                    <div className="space-y-2 max-h-48 overflow-y-auto">
                      {brands.map(brand => (
                        <label key={brand} className="flex items-center space-x-2">
                          <Checkbox
                            checked={selectedBrands.includes(brand)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setSelectedBrands([...selectedBrands, brand]);
                              } else {
                                setSelectedBrands(selectedBrands.filter(b => b !== brand));
                              }
                            }}
                          />
                          <span className="text-sm whitespace-nowrap">{brand}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Fuel Type Filter */}
                  <div>
                    <h3 className="font-medium mb-3">Fuel Type</h3>
                    <div className="space-y-2">
                      {fuelTypes.map(fuelType => (
                        <label key={fuelType} className="flex items-center space-x-2">
                          <Checkbox
                            checked={selectedFuelTypes.includes(fuelType)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setSelectedFuelTypes([...selectedFuelTypes, fuelType]);
                              } else {
                                setSelectedFuelTypes(selectedFuelTypes.filter(f => f !== fuelType));
                              }
                            }}
                          />
                          <span className="text-sm whitespace-nowrap">{fuelType}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Condition Filter */}
                  <div>
                    <h3 className="font-medium mb-3">Condition</h3>
                    <div className="space-y-2">
                      {conditions.map(condition => (
                        <label key={condition} className="flex items-center space-x-2">
                          <Checkbox
                            checked={selectedConditions.includes(condition)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setSelectedConditions([...selectedConditions, condition]);
                              } else {
                                setSelectedConditions(selectedConditions.filter(c => c !== condition));
                              }
                            }}
                          />
                          <span className="text-sm capitalize whitespace-nowrap">{condition}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Price Range */}
                  <div>
                    <h3 className="font-medium mb-3">Price Range</h3>
                    <Slider
                      value={priceRange}
                      onValueChange={(value) => setPriceRange(value as [number, number])}
                      max={500000}
                      min={0}
                      step={10000}
                      className="mb-2"
                    />
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>₹{priceRange[0].toLocaleString()}</span>
                      <span>₹{priceRange[1].toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Mileage/Range */}
                  <div>
                    <h3 className="font-medium mb-3">Mileage/Range (km/l or km)</h3>
                    <Slider
                      value={mileageRange}
                      onValueChange={(value) => setMileageRange(value as [number, number])}
                      max={200}
                      min={0}
                      step={5}
                      className="mb-2"
                    />
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>{mileageRange[0]}</span>
                      <span>{mileageRange[1]}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Results */}
          <div className="flex-1">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-muted-foreground">
                {filteredBikes.length} bikes found
              </p>
            </div>

            {filteredBikes.length === 0 ? (
              <Card className="p-12 text-center">
                <CardContent>
                  <p className="text-lg text-muted-foreground mb-4">
                    No bikes match your current filters
                  </p>
                  <Button onClick={clearFilters}>Clear Filters</Button>
                </CardContent>
              </Card>
            ) : (
              <div className={`grid gap-6 ${
                viewMode === 'grid' 
                  ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
                  : 'grid-cols-1'
              }`}>
                {filteredBikes.map(bike => (
                  <BikeCard
                    key={bike.id}
                    bike={bike}
                    onAddToCompare={handleAddToCompare}
                    isInComparison={compareList.some(b => b.id === bike.id)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Browse;
