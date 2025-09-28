import { useState } from 'react';
import { Bot, Zap, Fuel, DollarSign, Shield, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { sampleBikes } from '@/data/bikes';

const AIMatchmaker = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const quickFilters = [
    { label: 'सस्ता / Cheap', icon: DollarSign, keywords: ['cheap', 'budget', 'affordable'] },
    { label: 'इलेक्ट्रिक / Electric', icon: Zap, keywords: ['electric', 'battery', 'eco'] },
    { label: 'माइलेज / Mileage', icon: TrendingUp, keywords: ['mileage', 'fuel efficient', 'economy'] },
    { label: 'सुलभ / Accessible', icon: Shield, keywords: ['accessible', 'handicapped', 'disability'] },
  ];

  const handleSearch = async (searchQuery: string) => {
    setIsSearching(true);
    setQuery(searchQuery);

    // Simple keyword-based matching (AI placeholder)
    const filtered = sampleBikes.filter(bike => {
      const searchLower = searchQuery.toLowerCase();
      
      if (searchLower.includes('cheap') || searchLower.includes('budget')) {
        return bike.price < 100000;
      }
      if (searchLower.includes('electric') || searchLower.includes('battery')) {
        return bike.fuelType === 'Electric';
      }
      if (searchLower.includes('mileage') || searchLower.includes('fuel')) {
        return bike.mileage > 50 || bike.range! > 100;
      }
      if (searchLower.includes('accessible') || searchLower.includes('handicapped')) {
        return bike.isAccessible;
      }
      
      return bike.name.toLowerCase().includes(searchLower) || 
             bike.brand.toLowerCase().includes(searchLower);
    });

    setTimeout(() => {
      setResults(filtered.slice(0, 3));
      setIsSearching(false);
    }, 1000);
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bot className="w-6 h-6 text-primary" />
          AI Bike Matchmaker
        </CardTitle>
        <p className="text-muted-foreground">
          Tell us what you need in English or Telugu (हिंदी/తెలుగు)
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Search Input */}
        <div className="flex gap-2">
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="e.g., 'cheap electric bike' or 'सस्ती बाइक'"
            className="text-lg"
            onKeyPress={(e) => e.key === 'Enter' && handleSearch(query)}
          />
          <Button 
            onClick={() => handleSearch(query)} 
            disabled={isSearching}
            size="lg"
          >
            {isSearching ? 'Finding...' : 'Find'}
          </Button>
        </div>

        {/* Quick Filter Buttons */}
        <div className="grid grid-cols-2 gap-2">
          {quickFilters.map(({ label, icon: Icon, keywords }) => (
            <Button
              key={label}
              variant="outline"
              className="justify-start h-auto p-4"
              onClick={() => handleSearch(keywords[0])}
            >
              <Icon className="w-5 h-5 mr-2" />
              <span className="text-sm">{label}</span>
            </Button>
          ))}
        </div>

        {/* Results */}
        {results.length > 0 && (
          <div className="space-y-3">
            <h3 className="font-semibold">Perfect matches for you:</h3>
            {results.map(bike => (
              <div key={bike.id} className="p-3 bg-surface rounded-lg flex items-center justify-between">
                <div>
                  <p className="font-medium">{bike.brand} {bike.name}</p>
                  <div className="flex gap-2 mt-1">
                    <Badge variant="secondary">{bike.fuelType}</Badge>
                    {bike.isAccessible && <Badge variant="outline">Accessible</Badge>}
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-primary">₹{bike.price.toLocaleString()}</p>
                  <Button size="sm" className="mt-1">View</Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AIMatchmaker;