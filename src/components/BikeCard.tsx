import { Link } from 'react-router-dom';
import { Heart, Zap, Fuel, Shield, GitCompare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Bike } from '@/data/bikes';
import { useWishlist } from '@/hooks/use-wishlist';

interface BikeCardProps {
  bike: Bike;
  onAddToCompare?: (bike: Bike) => void;
  isInComparison?: boolean;
  showAccessibilityBadge?: boolean;
}

const BikeCard = ({ bike, onAddToCompare, isInComparison, showAccessibilityBadge = true }: BikeCardProps) => {
  const { isSaved, toggle } = useWishlist();
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const getFuelIcon = (fuelType: string) => {
    return fuelType === 'Electric' ? <Zap className="w-4 h-4" /> : <Fuel className="w-4 h-4" />;
  };

  const getFuelColor = (fuelType: string) => {
    switch (fuelType) {
      case 'Electric':
        return 'bg-accent text-accent-foreground';
      case 'Hybrid':
        return 'bg-warning text-warning-foreground';
      default:
        return 'bg-secondary text-secondary-foreground';
    }
  };

  return (
    <Card className="card-hover group overflow-hidden bg-card/80 backdrop-blur-sm border-border/50">
      <CardHeader className="relative p-0">
        <div className="aspect-video relative overflow-hidden rounded-t-lg">
          <Link to={`/bike/${bike.id}`}>
            <img
              src={bike.image}
              alt={`${bike.brand} ${bike.name}`}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out cursor-pointer"
              onError={(e) => {
                e.currentTarget.src = `${import.meta.env.BASE_URL}images/placeholder.svg`;
              }}
            />
          </Link>
          
          {/* Badges */}
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            <Badge className={`${getFuelColor(bike.fuelType)} backdrop-blur-sm border-0 shadow-sm`}>
              <div className="flex items-center gap-1">
                {getFuelIcon(bike.fuelType)}
                <span className="font-medium">{bike.fuelType}</span>
              </div>
            </Badge>
            
            {bike.isAccessible && showAccessibilityBadge && (
              <Badge variant="outline" className="bg-background/90 backdrop-blur-sm border-border/50 text-foreground">
                <Shield className="w-3 h-3 mr-1" />
                Accessible
              </Badge>
            )}
            
            {bike.isUpcoming && (
              <Badge className="bg-warning/90 text-warning-foreground backdrop-blur-sm border-0 shadow-sm">
                Coming Soon
              </Badge>
            )}
          </div>

          {/* Condition Badge */}
          <div className="absolute top-4 right-4">
            <Badge 
              variant={bike.condition === 'new' ? 'default' : 'secondary'}
              className="bg-background/90 backdrop-blur-sm border-border/50 text-foreground shadow-sm"
            >
              {bike.condition === 'new' ? 'New' : 'Used'}
            </Badge>
          </div>

          {/* Wishlist Button */}
          <Button
            variant={isSaved(bike.id) ? "secondary" : "ghost"}
            size="sm"
            onClick={() => toggle(bike)}
            className="absolute top-4 right-20 bg-background/80 hover:bg-background/90 backdrop-blur-sm border border-border/30 shadow-sm hover:scale-110 transition-all duration-300"
            aria-label={isSaved(bike.id) ? "Remove from wishlist" : "Add to wishlist"}
          >
            <Heart className={`w-4 h-4 ${isSaved(bike.id) ? 'text-primary' : ''}`} />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="p-6">
        <div className="space-y-4">
          {/* Brand & Name */}
          <div>
            <p className="text-sm text-muted-foreground font-medium">{bike.brand}</p>
            <h3 className="font-semibold text-xl leading-tight text-foreground mt-1">{bike.name}</h3>
          </div>

          {/* Price */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-primary">{formatPrice(bike.price)}</p>
              <p className="text-sm text-muted-foreground">Ex-showroom price</p>
            </div>
            
            {/* Eco Score */}
            <div className="text-center">
              <div className="w-14 h-14 rounded-full bg-accent/15 flex items-center justify-center shadow-sm border border-accent/20">
                <span className="text-lg font-bold text-accent">{bike.ecoScore}</span>
              </div>
              <p className="text-xs text-muted-foreground mt-2 font-medium">Eco Score</p>
            </div>
          </div>

          {/* Key Specs */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="bg-surface/50 p-3 rounded-lg">
              <p className="text-muted-foreground font-medium">
                {bike.condition === 'used' ? 'Odometer' : (bike.fuelType === 'Electric' ? 'Range' : 'Mileage')}
              </p>
              <p className="font-semibold text-foreground mt-1">
                {bike.condition === 'used'
                  ? `${(bike.mileage ?? 0).toLocaleString()} km`
                  : (bike.fuelType === 'Electric'
                      ? `${(bike.range ?? 0).toLocaleString()} km`
                      : `${(bike.mileage ?? 0).toLocaleString()} km/l`)}
              </p>
            </div>
            <div className="bg-surface/50 p-3 rounded-lg">
              <p className="text-muted-foreground font-medium">Max Speed</p>
              <p className="font-semibold text-foreground mt-1">{bike.maxSpeed} km/h</p>
            </div>
          </div>

          {/* Running Cost */}
          <div className="bg-gradient-to-r from-primary/5 to-accent/5 p-4 rounded-xl border border-border/30">
            <p className="text-sm text-muted-foreground font-medium mb-2">Running Cost</p>
            <div className="flex items-center justify-between">
              <span className="font-semibold text-foreground">₹{bike.runningCostPerKm}/km</span>
              <span className="text-sm text-muted-foreground">
                ₹{bike.maintenanceCostMonthly}/month
              </span>
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-6 pt-0 flex gap-3">
        <Button asChild variant="default" className="flex-1 btn-glow bounce-gentle">
          <Link to={`/bike/${bike.id}`}>
            View Details
          </Link>
        </Button>
        
        {onAddToCompare && (
          <Button
            variant={isInComparison ? "secondary" : "outline"}
            size="sm"
            onClick={() => onAddToCompare(bike)}
            aria-label={isInComparison ? "Remove from comparison" : "Add to comparison"}
            className="bounce-gentle"
          >
            <GitCompare className="w-4 h-4" />
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default BikeCard;