import { useState, useEffect } from 'react';
import { Leaf, BarChart, Droplets, Wind } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface EcoImpactResults {
  co2Reduction: number;
  fuelSavings: number;
  treesEquivalent: number;
  ecoScore: number;
}

const EcoImpactCalculator = () => {
  const [vehicleType, setVehicleType] = useState('electric');
  const [distance, setDistance] = useState(30);
  const [years, setYears] = useState(5);
  const [results, setResults] = useState<EcoImpactResults>({
    co2Reduction: 0,
    fuelSavings: 0,
    treesEquivalent: 0,
    ecoScore: 0
  });

  useEffect(() => {
    calculateEcoImpact();
  }, [vehicleType, distance, years]);

  const calculateEcoImpact = () => {
    // Constants for calculations
    const petrolCO2PerKm = 0.12; // kg CO2 per km
    const petrolCostPerLiter = 100; // ₹ per liter
    const petrolEfficiency = 40; // km per liter
    const electricityCO2PerKm = 0.03; // kg CO2 per km (grid mix)
    const electricityCostPerKwh = 8; // ₹ per kWh
    const electricEfficiency = 10; // km per kWh
    const hybridCO2PerKm = 0.07; // kg CO2 per km
    const hybridEfficiency = 25; // km per liter
    const treeAbsorptionPerYear = 22; // kg CO2 per tree per year
    
    // Daily calculations
    const dailyDistance = distance;
    const daysPerYear = 365;
    const totalYears = years;
    const totalDistance = dailyDistance * daysPerYear * totalYears;
    
    let co2Emissions = 0;
    let fuelCost = 0;
    
    // Calculate based on vehicle type
    if (vehicleType === 'petrol') {
      co2Emissions = totalDistance * petrolCO2PerKm;
      fuelCost = (totalDistance / petrolEfficiency) * petrolCostPerLiter;
    } else if (vehicleType === 'electric') {
      co2Emissions = totalDistance * electricityCO2PerKm;
      fuelCost = (totalDistance / electricEfficiency) * electricityCostPerKwh;
    } else if (vehicleType === 'hybrid') {
      co2Emissions = totalDistance * hybridCO2PerKm;
      fuelCost = (totalDistance / hybridEfficiency) * petrolCostPerLiter * 0.7; // 30% savings
    }
    
    // Calculate comparison with petrol vehicle
    const petrolEmissions = totalDistance * petrolCO2PerKm;
    const petrolCost = (totalDistance / petrolEfficiency) * petrolCostPerLiter;
    
    const co2Reduction = petrolEmissions - co2Emissions;
    const fuelSavings = petrolCost - fuelCost;
    const treesEquivalent = co2Reduction / (treeAbsorptionPerYear * totalYears);
    
    // Calculate eco score (0-100)
    let ecoScore = 0;
    if (vehicleType === 'electric') {
      ecoScore = 90;
    } else if (vehicleType === 'hybrid') {
      ecoScore = 70;
    } else {
      ecoScore = 40;
    }
    
    // Adjust score based on usage
    const usageScore = 100 - (distance / 100) * 10; // Lower score for higher usage
    ecoScore = Math.round((ecoScore + usageScore) / 2);
    
    // Ensure score is between 0-100
    ecoScore = Math.max(0, Math.min(100, ecoScore));
    
    setResults({
      co2Reduction: Math.round(co2Reduction),
      fuelSavings: Math.round(fuelSavings),
      treesEquivalent: Math.round(treesEquivalent),
      ecoScore
    });
  };

  const getEcoScoreColor = (score: number) => {
    if (score >= 80) return 'bg-green-500';
    if (score >= 60) return 'bg-lime-500';
    if (score >= 40) return 'bg-yellow-500';
    if (score >= 20) return 'bg-orange-500';
    return 'bg-red-500';
  };

  const getEcoScoreLabel = (score: number) => {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    if (score >= 40) return 'Average';
    if (score >= 20) return 'Poor';
    return 'Very Poor';
  };

  return (
    <Card className="w-full shadow-lg border-green-500/20">
      <CardHeader className="bg-gradient-to-r from-green-500/10 to-blue-500/10">
        <div className="flex items-center gap-2">
          <Leaf className="h-6 w-6 text-green-500" />
          <CardTitle>Eco-Impact Calculator</CardTitle>
        </div>
        <CardDescription>
          Calculate your environmental impact and savings by choosing greener transportation
        </CardDescription>
      </CardHeader>
      
      <CardContent className="pt-6 space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Vehicle Type</Label>
            <Select 
              value={vehicleType}
              onValueChange={setVehicleType}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select vehicle type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="electric">Electric Bike/Scooter</SelectItem>
                <SelectItem value="hybrid">Hybrid Vehicle</SelectItem>
                <SelectItem value="petrol">Petrol Vehicle</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label>Daily Commute Distance (km)</Label>
              <span className="text-sm text-muted-foreground">{distance} km</span>
            </div>
            <Slider 
              value={[distance]} 
              min={5} 
              max={100} 
              step={5}
              onValueChange={(value) => setDistance(value[0])}
              className="py-4"
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label>Ownership Period (years)</Label>
              <span className="text-sm text-muted-foreground">{years} years</span>
            </div>
            <Slider 
              value={[years]} 
              min={1} 
              max={10} 
              step={1}
              onValueChange={(value) => setYears(value[0])}
              className="py-4"
            />
          </div>
        </div>
        
        <div className="pt-4 border-t">
          <h3 className="text-lg font-medium mb-4">Your Environmental Impact</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card className="bg-card/50">
              <CardHeader className="p-4 pb-2">
                <div className="flex items-center gap-2">
                  <Wind className="h-4 w-4 text-blue-500" />
                  <CardTitle className="text-sm font-medium">CO₂ Reduction</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="text-2xl font-bold">{results.co2Reduction.toLocaleString()} kg</div>
                <p className="text-xs text-muted-foreground">CO₂ emissions saved compared to a standard petrol vehicle</p>
              </CardContent>
            </Card>
            
            <Card className="bg-card/50">
              <CardHeader className="p-4 pb-2">
                <div className="flex items-center gap-2">
                  <Droplets className="h-4 w-4 text-blue-500" />
                  <CardTitle className="text-sm font-medium">Fuel Savings</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="text-2xl font-bold">₹{results.fuelSavings.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">Money saved on fuel over the ownership period</p>
              </CardContent>
            </Card>
            
            <Card className="bg-card/50">
              <CardHeader className="p-4 pb-2">
                <div className="flex items-center gap-2">
                  <Leaf className="h-4 w-4 text-green-500" />
                  <CardTitle className="text-sm font-medium">Trees Equivalent</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="text-2xl font-bold">{results.treesEquivalent} trees</div>
                <p className="text-xs text-muted-foreground">Number of trees needed to absorb the same amount of CO₂</p>
              </CardContent>
            </Card>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label>Eco Score</Label>
              <Badge className={`${getEcoScoreColor(results.ecoScore)} text-white`}>
                {getEcoScoreLabel(results.ecoScore)}
              </Badge>
            </div>
            <Progress value={results.ecoScore} className="h-3" />
            <p className="text-xs text-muted-foreground pt-1">
              Your eco score is based on vehicle type, usage patterns, and environmental impact
            </p>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="bg-muted/30 flex justify-between">
        <p className="text-sm text-muted-foreground">
          <span className="font-medium">Pro tip:</span> Electric vehicles have the lowest environmental impact
        </p>
        <Button variant="outline" size="sm" className="text-green-600 border-green-600/30">
          Share Results
        </Button>
      </CardFooter>
    </Card>
  );
};

export default EcoImpactCalculator;