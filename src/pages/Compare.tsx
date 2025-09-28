import { useState } from 'react';
import { Link } from 'react-router-dom';
import { X, Plus, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { sampleBikes, Bike } from '@/data/bikes';
import { useCompare } from '@/hooks/use-compare';

const Compare = () => {
  const { bikesToCompare, addBikeToCompare, removeBikeFromCompare } = useCompare();
  const [showBikeSelector, setShowBikeSelector] = useState(false);

  const addBike = (bike: Bike) => {
    addBikeToCompare(bike);
    setShowBikeSelector(false);
  };

  const removeBike = (bikeId: string) => {
    removeBikeFromCompare(bikeId);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const comparisonRows = [
    { label: 'Price', key: 'price', format: formatPrice },
    { label: 'Brand', key: 'brand' },
    { label: 'Fuel Type', key: 'fuelType' },
    { label: 'Range/Odometer/Mileage', key: 'mileage', format: (value: number, bike: Bike) => {
        if (bike.condition === 'used') return `${(bike.mileage ?? 0).toLocaleString()} km`; // odometer reading
        if (bike.fuelType === 'Electric') return `${(bike.range ?? 0).toLocaleString()} km`;
        return `${(bike.mileage ?? 0).toLocaleString()} km/l`;
      }
    },
    { label: 'Max Power', key: 'maxPower', format: (value: number) => `${value} bhp` },
    { label: 'Max Speed', key: 'maxSpeed', format: (value: number) => `${value} km/h` },
    { label: 'Weight', key: 'weight', format: (value: number) => `${value} kg` },
    { label: 'Eco Score', key: 'ecoScore', format: (value: number) => `${value}/10` },
    { label: 'Running Cost/km', key: 'runningCostPerKm', format: (value: number) => `₹${value}` },
    { label: 'Monthly Maintenance', key: 'maintenanceCostMonthly', format: (value: number) => `₹${value.toLocaleString()}` },
    { label: 'Yearly Maintenance', key: 'maintenanceCostYearly', format: (value: number) => `₹${value.toLocaleString()}` },
  ];

  // Use bikesToCompare instead of selectedBikes throughout the component
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-6">
          <Button variant="ghost" asChild className="mb-4">
            <Link to="/browse">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Browse
            </Link>
          </Button>
          
          <h1 className="text-3xl font-bold mb-2">Compare Bikes</h1>
          <p className="text-muted-foreground">
            Compare up to 4 bikes side by side to make the best choice
          </p>
        </div>

        {bikesToCompare.length === 0 ? (
          /* Empty State */
          <Card className="p-12 text-center">
            <CardContent>
              <h2 className="text-2xl font-bold mb-4">Start Comparing Bikes</h2>
              <p className="text-muted-foreground mb-6">
                Select bikes to compare their specifications, pricing, and features side by side
              </p>
              <Button onClick={() => setShowBikeSelector(true)} size="lg">
                <Plus className="w-5 h-5 mr-2" />
                Add First Bike
              </Button>
            </CardContent>
          </Card>
        ) : (
          /* Comparison Table */
          <div className="space-y-6">
            {/* Bike Cards Header */}
            <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${bikesToCompare.length + 1}, 1fr)` }}>
              <div></div> {/* Empty cell for row labels */}
              {bikesToCompare.map((bike) => (
                <Card key={bike.id} className="relative">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-2 right-2 z-10"
                    onClick={() => removeBike(bike.id)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                  
                  <CardContent className="p-4">
                    <div className="aspect-video relative overflow-hidden rounded-lg mb-4">
                      <img
                        src={bike.image}
                        alt={`${bike.brand} ${bike.name}`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = '/placeholder-bike.jpg';
                        }}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex flex-wrap gap-1">
                        <Badge variant="secondary">{bike.fuelType}</Badge>
                        {bike.isAccessible && (
                          <Badge variant="outline">Accessible</Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground">{bike.brand}</p>
                      <h3 className="font-semibold">{bike.name}</h3>
                      <p className="text-lg font-bold text-primary">{formatPrice(bike.price)}</p>
                    </div>
                    
                    <Button asChild className="w-full mt-4" size="sm">
                      <Link to={`/bike/${bike.id}`}>View Details</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
              
              {/* Add Bike Card */}
              {bikesToCompare.length < 4 && (
                <Card className="border-dashed border-2 border-border hover:border-primary/50 transition-colors">
                  <CardContent className="p-4 h-full flex items-center justify-center">
                    <Button
                      variant="ghost"
                      className="h-full w-full flex flex-col items-center gap-2"
                      onClick={() => setShowBikeSelector(true)}
                    >
                      <Plus className="w-8 h-8 text-muted-foreground" />
                      <span className="text-muted-foreground">Add Bike</span>
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Comparison Table */}
            <Card>
              <CardHeader>
                <CardTitle>Specifications Comparison</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-3 font-medium">Specification</th>
                        {bikesToCompare.map((bike) => (
                          <th key={bike.id} className="text-center p-3 font-medium min-w-32">
                            {bike.name}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {comparisonRows.map((row) => (
                        <tr key={row.key} className="border-b hover:bg-muted/50">
                          <td className="p-3 font-medium text-muted-foreground">
                            {row.label}
                          </td>
                          {bikesToCompare.map((bike) => {
                            const value = bike[row.key as keyof Bike] as any;
                            const formattedValue = row.format 
                              ? row.format(value, bike) 
                              : value?.toString() || 'N/A';
                            
                            return (
                              <td key={bike.id} className="p-3 text-center">
                                {formattedValue}
                              </td>
                            );
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* Features Comparison */}
            <Card>
              <CardHeader>
                <CardTitle>Features Comparison</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {bikesToCompare.map((bike, index) => (
                    <div key={bike.id}>
                      <h4 className="font-medium mb-2">{bike.name}</h4>
                      <div className="flex flex-wrap gap-2">
                        {bike.features.map((feature, featureIndex) => (
                          <Badge key={featureIndex} variant="outline">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                      {index < bikesToCompare.length - 1 && <hr className="mt-4" />}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Bike Selector Modal */}
        {showBikeSelector && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <Card className="max-w-4xl w-full max-h-[80vh] overflow-y-auto">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Select a Bike to Compare</CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowBikeSelector(false)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {sampleBikes
                    .filter(bike => !bikesToCompare.find(selected => selected.id === bike.id))
                    .map((bike) => (
                      <Card 
                        key={bike.id} 
                        className="cursor-pointer hover:shadow-md transition-shadow"
                        onClick={() => addBike(bike)}
                      >
                        <CardContent className="p-4">
                          <div className="aspect-video relative overflow-hidden rounded-lg mb-3">
                            <img
                              src={bike.image}
                              alt={`${bike.brand} ${bike.name}`}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.currentTarget.src = '/placeholder-bike.jpg';
                              }}
                            />
                          </div>
                          <div className="space-y-1">
                            <div className="flex gap-1">
                              <Badge variant="secondary" className="text-xs">
                                {bike.fuelType}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">{bike.brand}</p>
                            <h4 className="font-medium">{bike.name}</h4>
                            <p className="text-primary font-semibold">{formatPrice(bike.price)}</p>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default Compare;