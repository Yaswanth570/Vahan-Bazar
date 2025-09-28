import { useState, useEffect } from 'react';
import { Brain, ThumbsUp, ThumbsDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { sampleBikes, Bike } from '@/data/bikes';
import { useToast } from '@/hooks/use-toast';

interface RecommendationPreferences {
  budget: [number, number];
  fuelType: string[];
  usage: string;
  terrain: string;
  experience: string;
}

const AIRecommendationEngine = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [recommendations, setRecommendations] = useState<Bike[]>([]);
  const [showPreferences, setShowPreferences] = useState(true);
  const [preferences, setPreferences] = useState<RecommendationPreferences>({
    budget: [50000, 200000],
    fuelType: ['Petrol'],
    usage: 'daily',
    terrain: 'city',
    experience: 'beginner'
  });

  // Simulate AI recommendation algorithm
  const generateRecommendations = () => {
    setIsLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      // Filter bikes based on preferences
      let filteredBikes = sampleBikes.filter(bike => {
        // Budget filter
        const matchesBudget = bike.price >= preferences.budget[0] && bike.price <= preferences.budget[1];
        
        // Fuel type filter
        const matchesFuelType = preferences.fuelType.includes(bike.fuelType);
        
        // Basic match
        return matchesBudget && matchesFuelType;
      });
      
      // Apply advanced filtering based on usage, terrain, and experience
      filteredBikes = filteredBikes.map(bike => {
        let score = 0;
        
        // Score based on usage
        if (preferences.usage === 'daily' && bike.mileage > 40) score += 3;
        if (preferences.usage === 'weekend' && bike.power > 15) score += 3;
        if (preferences.usage === 'touring' && bike.range > 200) score += 3;
        
        // Score based on terrain
        if (preferences.terrain === 'city' && bike.weight < 150) score += 2;
        if (preferences.terrain === 'highway' && bike.topSpeed > 100) score += 2;
        if (preferences.terrain === 'offroad' && bike.groundClearance > 180) score += 2;
        
        // Score based on experience
        if (preferences.experience === 'beginner' && bike.power < 20) score += 2;
        if (preferences.experience === 'intermediate' && bike.power >= 20 && bike.power <= 40) score += 2;
        if (preferences.experience === 'expert' && bike.power > 40) score += 2;
        
        return { ...bike, aiScore: score };
      });
      
      // Sort by AI score and take top 3
      filteredBikes.sort((a, b) => (b.aiScore || 0) - (a.aiScore || 0));
      setRecommendations(filteredBikes.slice(0, 3));
      setIsLoading(false);
      setShowPreferences(false);
      
      toast({
        title: "AI Recommendations Ready",
        description: "We've found the perfect bikes for you based on your preferences!",
      });
    }, 1500);
  };

  const handleFeedback = (liked: boolean) => {
    toast({
      title: liked ? "Thanks for your feedback!" : "We'll improve our recommendations",
      description: liked 
        ? "We'll use this to improve future recommendations" 
        : "Please adjust your preferences for better matches",
    });
    
    if (!liked) {
      setShowPreferences(true);
    }
  };

  return (
    <Card className="w-full shadow-lg border-primary/20 overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-primary/10 to-secondary/10">
        <div className="flex items-center gap-2">
          <Brain className="h-6 w-6 text-primary" />
          <CardTitle>AI Bike Matchmaker</CardTitle>
        </div>
        <CardDescription>
          Our advanced AI analyzes your preferences to find your perfect ride
        </CardDescription>
      </CardHeader>
      
      <CardContent className="pt-6">
        {showPreferences ? (
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label>Budget Range (₹)</Label>
                <span className="text-sm text-muted-foreground">
                  ₹{preferences.budget[0].toLocaleString()} - ₹{preferences.budget[1].toLocaleString()}
                </span>
              </div>
              <Slider 
                defaultValue={preferences.budget} 
                min={10000} 
                max={1000000} 
                step={10000}
                onValueChange={(value) => setPreferences({...preferences, budget: value as [number, number]})}
                className="py-4"
              />
            </div>
            
            <div className="space-y-2">
              <Label>Fuel Type</Label>
              <div className="flex flex-wrap gap-2 pt-2">
                {['Petrol', 'Electric', 'Hybrid'].map(fuel => (
                  <Badge 
                    key={fuel}
                    variant={preferences.fuelType.includes(fuel) ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => {
                      if (preferences.fuelType.includes(fuel)) {
                        setPreferences({
                          ...preferences, 
                          fuelType: preferences.fuelType.filter(f => f !== fuel)
                        });
                      } else {
                        setPreferences({
                          ...preferences, 
                          fuelType: [...preferences.fuelType, fuel]
                        });
                      }
                    }}
                  >
                    {fuel}
                  </Badge>
                ))}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Primary Usage</Label>
                <Select 
                  defaultValue={preferences.usage}
                  onValueChange={(value) => setPreferences({...preferences, usage: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select usage" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Daily Commute</SelectItem>
                    <SelectItem value="weekend">Weekend Rides</SelectItem>
                    <SelectItem value="touring">Long Distance Touring</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>Terrain Type</Label>
                <Select 
                  defaultValue={preferences.terrain}
                  onValueChange={(value) => setPreferences({...preferences, terrain: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select terrain" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="city">City Roads</SelectItem>
                    <SelectItem value="highway">Highways</SelectItem>
                    <SelectItem value="offroad">Off-road/Trails</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>Riding Experience</Label>
                <Select 
                  defaultValue={preferences.experience}
                  onValueChange={(value) => setPreferences({...preferences, experience: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select experience" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beginner">Beginner</SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="expert">Expert</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <Button 
              onClick={generateRecommendations} 
              className="w-full mt-4"
              disabled={isLoading}
            >
              {isLoading ? "Finding your perfect match..." : "Get AI Recommendations"}
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Your Top Matches</h3>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setShowPreferences(true)}
              >
                Adjust Preferences
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {recommendations.map((bike, index) => (
                <Card key={bike.id} className="overflow-hidden hover:shadow-lg transition-all">
                  <div className="aspect-video w-full overflow-hidden">
                    <img 
                      src={bike.images[0]} 
                      alt={bike.name} 
                      className="w-full h-full object-cover transition-transform hover:scale-105"
                    />
                  </div>
                  <CardHeader className="p-4">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-base">{bike.name}</CardTitle>
                      <Badge variant="outline" className="bg-primary/10">
                        {index === 0 ? '98%' : index === 1 ? '95%' : '90%'} Match
                      </Badge>
                    </div>
                    <CardDescription>
                      {bike.brand} • {bike.fuelType} • {bike.engineCapacity}cc
                    </CardDescription>
                  </CardHeader>
                  <CardFooter className="p-4 pt-0 flex justify-between">
                    <span className="font-medium">₹{bike.price.toLocaleString()}</span>
                    <Button size="sm" asChild>
                      <a href={`/bike/${bike.id}`}>View Details</a>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
            
            <div className="flex justify-center gap-4 pt-4">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => handleFeedback(true)}
                className="flex items-center gap-2"
              >
                <ThumbsUp className="h-4 w-4" /> These recommendations are helpful
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => handleFeedback(false)}
                className="flex items-center gap-2"
              >
                <ThumbsDown className="h-4 w-4" /> Improve my recommendations
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AIRecommendationEngine;