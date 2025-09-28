import { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Heart, Share2, Zap, Fuel, Shield, Phone, MapPin, Calendar, Calculator, Wrench, GitCompare, X, Plus } from 'lucide-react';
import { useCompare } from '@/hooks/use-compare';
import { Button } from "@/components/ui/button";
import SocialShare from "@/components/SocialShare";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { getBikeById, getNearbyDealers, Bike, Dealer } from '@/data/bikes';
import Vehicle360View from '@/components/Vehicle360View';
import { colorImages } from '@/data/colorImages';
import { useAuth } from '@/hooks/use-auth';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { toast } from 'sonner';

const BikeDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addBikeToCompare, isBikeInCompare } = useCompare();
  const [bike, setBike] = useState<Bike | null>(null);
  const [nearbyDealers, setNearbyDealers] = useState<Dealer[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [heroSrc, setHeroSrc] = useState<string | null>(null);
  const [heroLoaded, setHeroLoaded] = useState(false);
  const [emiAmount, setEmiAmount] = useState(0);
  const [loanAmount, setLoanAmount] = useState(0);
  const [loanTenure, setLoanTenure] = useState(24);
  const [interestRate, setInterestRate] = useState(9.5);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [colorGallery, setColorGallery] = useState<string[]>([]);
  const [generatedGalleries, setGeneratedGalleries] = useState<Record<string, string[]>>({});
  const [showComparisonSection, setShowComparisonSection] = useState(false);
  const [openTestRide, setOpenTestRide] = useState(false);
  const [testRideDate, setTestRideDate] = useState<string>(() => {
    const d = new Date(Date.now() + 24*60*60*1000);
    d.setMinutes(0,0,0);
    return d.toISOString().slice(0,16);
  });
  const { user } = useAuth();
  const apiBase = (import.meta.env.VITE_API_URL as string) || 'http://localhost:5000';

  const handleBookTestRide = async () => {
    try {
      if (!user) {
        navigate('/login');
        return;
      }
      if (!bike) return;
      const ensureUserRes = await fetch(`${apiBase}/api/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: user.name || 'User', email: user.email, avatar: '' })
      });
      const backendUser = await ensureUserRes.json();
      const res = await fetch(`${apiBase}/api/users/${backendUser._id}/test-rides`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-User-Id': backendUser._id },
        body: JSON.stringify({ bikeId: bike.id, date: new Date(testRideDate).toISOString() })
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || 'Failed to book test ride');
      }
      toast.success('Test ride booked');
      setOpenTestRide(false);
    } catch (e: any) {
      toast.error(e.message || 'Booking failed');
    }
  };
  
  // Map color names to actual CSS color values
  const colorMap: {[key: string]: string} = {
    'Cyan Blue': '#00FFFF',
    'Racing Black': '#0F0F0F',
    'Ice Fluo-Vermillion': '#FF3300',
    'Space Grey': '#8A8A8A',
    'Mint Green': '#98FB98',
    'White': '#FFFFFF',
    'Matte Axis Grey Metallic': '#707070',
    'Pearl Precious White': '#F5F5F5',
    'Decent Blue Metallic': '#4682B4',
    'Redditch Red': '#C41E3A',
    'Halcyon Black': '#000000',
    'Gunmetal Grey': '#2A3439',
    'Titanium Grey': '#878681',
    'Pearl White': '#FAFAFA',
    'Mint Blue': '#429E9D',
    'Burnt Red': '#8C1C13',
    'Satin Blue': '#355C7D',
    'Pewter Grey': '#899499',
    'Jet Black': '#343434',
    'Porcelain White': '#F8F4E3',
    'Liquid Silver': '#D3D3D3',
    'Black with Silver': '#333333',
    'Heavy Grey with Green': '#5D5D5D',
    'Black with Purple': '#2D2D2D',
    'Metallic Matte Platinum Silver': '#C0C0C0',
    'Pearl Mirage White': '#F0F0F0',
    'Glossy Grey': '#808080',
    'Galaxy Black': '#171717',
    'Cosmic Blue': '#1F4788',
    'Stardust Silver': '#E8E8E8'
  };

  // Visual tint filters per color to simulate distinct variants even when image source is same
  const colorTints: Record<string, string> = {
    'Cyan Blue': 'hue-rotate(200deg) saturate(1.2)',
    'Racing Black': 'saturate(0) brightness(0.6)',
    'Ice Fluo-Vermillion': 'hue-rotate(-20deg) saturate(1.4) brightness(1.05)',
    'Cosmic Blue': 'hue-rotate(210deg) saturate(1.1)',
    'Space Grey': 'saturate(0) brightness(0.8)',
    'Mint Green': 'hue-rotate(110deg) saturate(1.3)',
    'White': 'brightness(1.1) saturate(0.9)',
    'Jet Black': 'saturate(0) brightness(0.55)',
    'Matte Axis Grey Metallic': 'saturate(0) brightness(0.85)',
    'Pearl Precious White': 'brightness(1.12) saturate(0.95)',
    'Decent Blue Metallic': 'hue-rotate(200deg) saturate(1.15)',
    'Redditch Red': 'hue-rotate(-10deg) saturate(1.4) brightness(1.05)',
    'Halcyon Black': 'saturate(0) brightness(0.6)',
    'Gunmetal Grey': 'saturate(0) brightness(0.8) contrast(1.05)',
    'Titanium Grey': 'saturate(0) brightness(0.9)',
    'Pearl White': 'brightness(1.1)',
    'Mint Blue': 'hue-rotate(190deg) saturate(1.25)',
    'Burnt Red': 'hue-rotate(-15deg) saturate(1.5) brightness(0.98)',
    'Satin Blue': 'hue-rotate(215deg) saturate(1.2)',
    'Pewter Grey': 'saturate(0) brightness(0.85)',
    'Porcelain White': 'brightness(1.08)',
    'Liquid Silver': 'saturate(0) brightness(1.0)',
    'Black with Silver': 'saturate(0) brightness(0.8)',
    'Heavy Grey with Green': 'hue-rotate(90deg) saturate(0.9) brightness(0.95)',
    'Black with Purple': 'hue-rotate(290deg) saturate(1.2) brightness(0.9)',
    'Metallic Matte Platinum Silver': 'saturate(0) brightness(1.05)',
    'Glossy Grey': 'saturate(0.2) brightness(0.95)',
    'Galaxy Black': 'saturate(0) brightness(0.55)',
    'Stardust Silver': 'saturate(0) brightness(1.0)',
  };

  useEffect(() => {
    if (id) {
      const bikeData = getBikeById(id);
      setBike(bikeData || null);
      if (bikeData) {
        setLoanAmount(bikeData.price * 0.9); // 90% financing
        // Get nearby dealers based on bike condition
        const dealers = getNearbyDealers(id, bikeData.condition);
        setNearbyDealers(dealers);
        // Set the first color as selected by default if colors are available
        if (bikeData.colors && bikeData.colors.length > 0) {
          setSelectedColor(bikeData.colors[0]);
        }
        // Initialize color gallery if mapping exists
        const cg = colorImages?.[id];
        if (cg && bikeData.colors && bikeData.colors.length > 0) {
          const initial = cg[bikeData.colors[0]] || [];
          setColorGallery(initial);
        } else {
          setColorGallery([]);
        }
      }
    }
  }, [id]);

  useEffect(() => {
    if (loanAmount && loanTenure && interestRate) {
      // EMI calculation formula
      const monthlyRate = interestRate / 12 / 100;
      const emi = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, loanTenure)) / 
                  (Math.pow(1 + monthlyRate, loanTenure) - 1);
      setEmiAmount(Math.round(emi));
    }
  }, [loanAmount, loanTenure, interestRate]);

  // Generate tinted gallery via Canvas if no explicit images exist for the selected color
  const generateTintedGallery = async (baseSrc: string, color: string, fallback?: string): Promise<string[]> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        if (!ctx) return resolve([fallback || baseSrc]);
        // Apply the tint filter and draw
        ctx.filter = colorTints[color] || 'none';
        ctx.drawImage(img, 0, 0);
        const url = canvas.toDataURL('image/jpeg', 0.9);
        resolve([url, url, url]);
      };
      img.onerror = () => resolve([fallback || baseSrc]);
      img.src = baseSrc;
    });
  };

  useEffect(() => {
    if (!bike || !selectedColor) return;
    const cg = colorImages?.[bike.id];
    const provided = cg?.[selectedColor];

    // If generated exists for this color, use it immediately
    if (generatedGalleries[selectedColor]) {
      setColorGallery(generatedGalleries[selectedColor]);
      setCurrentImageIndex(0);
      return;
    }

    if (provided && provided.length) {
      // If provided images are effectively identical (same path repeated), generate tinted gallery
      const unique = Array.from(new Set(provided));
      if (unique.length === 1) {
        const baseFallback = bike.image || bike.images?.[0] || unique[0];
        generateTintedGallery(unique[0], selectedColor, baseFallback).then((urls) => {
          setGeneratedGalleries((prev) => ({ ...prev, [selectedColor]: urls }));
          const sanitized = (urls || []).filter(Boolean);
          setColorGallery(sanitized.length ? sanitized : [baseFallback].filter(Boolean) as string[]);
          setCurrentImageIndex(0);
        });
      } else {
        {
          const sanitized = (provided || []).filter(Boolean);
          setColorGallery(sanitized.length ? sanitized : [bike.image].filter(Boolean) as string[]);
          setCurrentImageIndex(0);
        }
      }
    } else {
      // No provided images: generate from base
      const base = bike.image || bike.images?.[0];
      if (base) {
        generateTintedGallery(base, selectedColor, base).then((urls) => {
          setGeneratedGalleries((prev) => ({ ...prev, [selectedColor]: urls }));
          const sanitized = (urls || []).filter(Boolean);
          setColorGallery(sanitized.length ? sanitized : [base].filter(Boolean) as string[]);
          setCurrentImageIndex(0);
        });
      } else {
        setColorGallery([]);
      }
    }
  }, [selectedColor, bike, generatedGalleries]);

  // Update heroSrc smoothly when selection changes
  useEffect(() => {
    if (!bike) return;
    const desired = (colorGallery[currentImageIndex] || bike.images[currentImageIndex]) || bike.image;
    if (!desired) return;
    setHeroLoaded(false);
    const img = new Image();
    img.decoding = 'async';
    img.onload = () => {
      setHeroSrc(desired);
      setHeroLoaded(true);
    };
    img.onerror = () => {
      setHeroSrc(`${import.meta.env.BASE_URL}images/placeholder.svg`);
      setHeroLoaded(true);
    };
    img.src = desired;

    // Preload others in background to reduce flicker when switching
    (colorGallery.length ? colorGallery : bike.images).forEach((src) => {
      const preload = new Image();
      preload.src = src;
    });
  }, [bike, colorGallery, currentImageIndex]);

  // Ensure hero has a valid initial image immediately to avoid broken image icon
  useEffect(() => {
    if (!bike) return;
    const initial = (colorGallery[0]) || (bike.images && bike.images[0]) || bike.image;
    if (initial) {
      setHeroSrc(initial);
      setHeroLoaded(true);
    }
  }, [bike]);

  if (!bike) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Bike not found</h1>
          <Button asChild>
            <Link to="/browse">Browse All Bikes</Link>
          </Button>
        </div>
      </div>
    );
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const getFuelIcon = (fuelType: string) => {
    return fuelType === 'Electric' ? <Zap className="w-5 h-5" /> : <Fuel className="w-5 h-5" />;
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Button variant="ghost" asChild className="mb-6">
          <Link to="/browse">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Browse
          </Link>
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="aspect-video relative overflow-hidden rounded-lg bg-surface">
              {/* Keep previous image visible until new one finishes loading to avoid flicker */}
              {heroSrc && (
                <img
                  src={heroSrc}
                  alt={`${bike.brand} ${bike.name}`}
                  className="w-full h-full object-cover"
                  decoding="async"
                  loading="eager"
                  fetchpriority="high"
                  style={{ opacity: heroLoaded ? 1 : 0, transition: 'opacity .2s ease-out' }}
                  draggable={false}
                />
              )}
              {!heroLoaded && (
                <div className="absolute inset-0 animate-pulse bg-muted/30" aria-hidden />
              )}
              
              {/* 360° Placeholder */}
              <div className="absolute bottom-4 right-4">
                <Badge variant="outline" className="bg-background/80">
                  360° View Available
                </Badge>
              </div>
            </div>
            
            {/* Thumbnail Images */}
            <div className="flex gap-2 overflow-x-auto">
              {(colorGallery.length ? colorGallery : bike.images).map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 ${
                    currentImageIndex === index ? 'border-primary' : 'border-border'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${bike.name} view ${index + 1}`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = `${import.meta.env.BASE_URL}images/placeholder.svg`;
                    }}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Bike Info */}
          <div className="space-y-6">
            {/* Header */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge className="bg-secondary text-secondary-foreground">
                  <div className="flex items-center gap-1">
                    {getFuelIcon(bike.fuelType)}
                    <span className="whitespace-nowrap">{bike.fuelType}</span>
                  </div>
                </Badge>
                
                {bike.isAccessible && (
                  <Badge variant="outline">
                    <Shield className="w-3 h-3 mr-1" />
                    Accessible
                  </Badge>
                )}
                
                {bike.isUpcoming && (
                  <Badge className="bg-warning text-warning-foreground">
                    Coming Soon
                  </Badge>
                )}
                
                <Badge variant={bike.condition === 'new' ? 'default' : 'secondary'}>
                  {bike.condition === 'new' ? 'New' : 'Used'}
                </Badge>
              </div>
              
              <p className="text-muted-foreground">{bike.brand}</p>
              <h1 className="text-3xl font-bold">{bike.name}</h1>
            </div>

            {/* Price & Actions */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-3xl font-bold text-primary">{formatPrice(bike.price)}</p>
                <p className="text-sm text-muted-foreground">Ex-showroom price</p>
              </div>
              
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Heart className="w-4 h-4" />
                </Button>
                <Button 
                  variant={isBikeInCompare(bike.id) ? "default" : "outline"} 
                  size="sm"
                  onClick={() => {
                    if (bike) {
                      addBikeToCompare(bike);
                      navigate('/compare');
                    }
                  }}
                >
                  <GitCompare className="w-4 h-4" />
                </Button>
                <SocialShare title={`Check out the ${bike?.name} on Vahan Bazar!`} size="sm" />
              </div>
            </div>

            {/* Key Specs */}
            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardContent className="p-4 text-center">
                  <p className="text-2xl font-bold text-primary">
                    {bike.condition === 'used'
                      ? `${(bike.mileage ?? 0).toLocaleString()} km`
                      : (bike.fuelType === 'Electric'
                          ? `${(bike.range ?? 0).toLocaleString()} km`
                          : `${(bike.mileage ?? 0).toLocaleString()} km/l`)}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {bike.condition === 'used'
                      ? 'Odometer'
                      : (bike.fuelType === 'Electric' ? 'Range' : 'Mileage')}
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4 text-center">
                  <p className="text-2xl font-bold text-primary">{bike.maxSpeed} km/h</p>
                  <p className="text-sm text-muted-foreground">Max Speed</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4 text-center">
                  <p className="text-2xl font-bold text-accent">{bike.ecoScore}/10</p>
                  <p className="text-sm text-muted-foreground">Eco Score</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4 text-center">
                  <p className="text-2xl font-bold text-primary">{bike.weight} kg</p>
                  <p className="text-sm text-muted-foreground">Weight</p>
                </CardContent>
              </Card>
            </div>

            {/* Available Colors */}
            {bike.colors && bike.colors.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-2">Available Colors</h3>
                <div className="flex flex-wrap gap-3">
                  {bike.colors.map((color, index) => {
                    const cssColor = colorMap[color] || color;
                    
                    return (
                      <div 
                        key={index} 
                        className={`flex items-center gap-2 border rounded-md px-3 py-2 cursor-pointer transition-all ${selectedColor === color ? 'border-primary bg-primary/10 shadow-sm' : 'border-border hover:border-primary/50'}`}
                        onClick={() => {
                          setSelectedColor(color);
                          // Change the bike image when color is selected
                          // switch to first image of the selected color
                          setCurrentImageIndex(0);
                        }}
                      >
                        <div
                          className={`w-6 h-6 rounded-full border-2 ${selectedColor === color ? 'border-primary ring-2 ring-primary/20' : 'border-border'}`}
                          style={{ backgroundColor: cssColor }}
                        ></div>
                        <span className={selectedColor === color ? 'font-medium' : ''}>{color}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* CTA Buttons */}
            <div className="flex gap-4">
              <Dialog open={openTestRide} onOpenChange={setOpenTestRide}>
                <DialogTrigger asChild>
                  <Button size="lg" className="flex-1">Book Test Ride</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Book Test Ride</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="tr-date">Choose date & time</Label>
                      <Input id="tr-date" type="datetime-local" value={testRideDate} onChange={(e) => setTestRideDate(e.target.value)} min={new Date().toISOString().slice(0,16)} className="mt-1" />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setOpenTestRide(false)}>Cancel</Button>
                    <Button onClick={handleBookTestRide}>Confirm Booking</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              <Button variant="outline" size="lg" className="flex-1">
                Get Best Price
              </Button>
              <Button 
                variant={isBikeInCompare(bike.id) ? "default" : "outline"} 
                size="lg"
                onClick={() => {
                  if (!isBikeInCompare(bike.id)) {
                    addBikeToCompare(bike);
                  }
                  setShowComparisonSection(!showComparisonSection);
                }}
              >
                <GitCompare className="w-4 h-4 mr-2" />
                Compare
              </Button>
            </div>
          </div>
        </div>

        {/* Detailed Information Tabs */}
        <Tabs defaultValue="360view" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="360view">360° View</TabsTrigger>
            <TabsTrigger value="specifications">Specifications</TabsTrigger>
            <TabsTrigger value="features">Features</TabsTrigger>
            <TabsTrigger value="costs">Costs</TabsTrigger>
            <TabsTrigger value="emi">EMI Calculator</TabsTrigger>
            <TabsTrigger value="dealer">Dealer</TabsTrigger>
          </TabsList>

          <TabsContent value="360view">
            <Vehicle360View 
              images={bike.images} 
              vehicleName={`${bike.brand} ${bike.name}`}
              className="mb-6"
            />
          </TabsContent>

          <TabsContent value="specifications">
            <Card>
              <CardHeader>
                <CardTitle>Complete Specifications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg">Engine & Performance</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Engine</span>
                        <span>{bike.specifications.engine}</span>
                      </div>
                      {bike.engineCapacity && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Displacement</span>
                          <span>{bike.engineCapacity}cc</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Max Power</span>
                        <span>{bike.maxPower} bhp</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Max Speed</span>
                        <span>{bike.maxSpeed} km/h</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Transmission</span>
                        <span>{bike.specifications.transmission}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg">Dimensions & Capacity</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Kerb Weight</span>
                        <span>{bike.weight} kg</span>
                      </div>
                      {bike.fuelTankCapacity && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Fuel Tank</span>
                          <span>{bike.fuelTankCapacity} liters</span>
                        </div>
                      )}
                      {bike.batteryCapacity && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Battery</span>
                          <span>{bike.batteryCapacity} kWh</span>
                        </div>
                      )}
                      {bike.chargingTime && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Charging Time</span>
                          <span>{bike.chargingTime} hours</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg">Suspension & Brakes</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Suspension</span>
                        <span>{bike.specifications.suspension}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Brakes</span>
                        <span>{bike.specifications.brakes}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Tires</span>
                        <span>{bike.specifications.tires}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="features">
            <Card>
              <CardHeader>
                <CardTitle>Key Features</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {bike.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-surface rounded-lg">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="costs">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Running Costs */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calculator className="w-5 h-5" />
                    Running Costs
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Cost per km</span>
                    <span className="text-xl font-bold">₹{bike.runningCostPerKm}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Monthly (1000 km)</span>
                    <span className="text-lg font-semibold">₹{(bike.runningCostPerKm * 1000).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Yearly (12000 km)</span>
                    <span className="text-lg font-semibold">₹{(bike.runningCostPerKm * 12000).toLocaleString()}</span>
                  </div>
                </CardContent>
              </Card>

              {/* Maintenance Costs */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Wrench className="w-5 h-5" />
                    Maintenance Costs
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Monthly</span>
                    <span className="text-xl font-bold">₹{bike.maintenanceCostMonthly.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Yearly</span>
                    <span className="text-lg font-semibold">₹{bike.maintenanceCostYearly.toLocaleString()}</span>
                  </div>
                  <div className="p-4 bg-accent/10 rounded-lg">
                    <p className="text-sm text-accent-dark">
                      {bike.fuelType === 'Electric' 
                        ? 'Electric bikes typically have 60-70% lower maintenance costs'
                        : 'Regular servicing recommended every 3000-4000 km'
                      }
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="emi">
            <Card>
              <CardHeader>
                <CardTitle>EMI Calculator</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="loanAmount">Loan Amount</Label>
                      <Input
                        id="loanAmount"
                        type="number"
                        value={loanAmount}
                        onChange={(e) => setLoanAmount(Number(e.target.value))}
                        className="mt-1"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="tenure">Loan Tenure (months)</Label>
                      <Input
                        id="tenure"
                        type="number"
                        value={loanTenure}
                        onChange={(e) => setLoanTenure(Number(e.target.value))}
                        className="mt-1"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="interest">Interest Rate (%)</Label>
                      <Input
                        id="interest"
                        type="number"
                        step="0.1"
                        value={interestRate}
                        onChange={(e) => setInterestRate(Number(e.target.value))}
                        className="mt-1"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="p-6 bg-primary/10 rounded-lg text-center">
                      <p className="text-sm text-muted-foreground mb-2">Monthly EMI</p>
                      <p className="text-3xl font-bold text-primary">₹{emiAmount.toLocaleString()}</p>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Principal</span>
                        <span>₹{loanAmount.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Total Interest</span>
                        <span>₹{((emiAmount * loanTenure) - loanAmount).toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between font-semibold">
                        <span>Total Amount</span>
                        <span>₹{(emiAmount * loanTenure).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="dealer">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>
                    {bike.condition === 'new' ? 'Authorized Showroom' : 'Used Bike Dealer'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-lg">{bike.dealerInfo.name}</h3>
                      <div className="flex items-center gap-2 text-muted-foreground mt-1">
                        <MapPin className="w-4 h-4" />
                        <span>{bike.dealerInfo.location}</span>
                      </div>
                      {bike.dealerInfo.distance && (
                        <p className="text-sm text-muted-foreground mt-1">
                          {bike.dealerInfo.distance} km away
                        </p>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <Button>
                        <Phone className="w-4 h-4 mr-2" />
                        Call {bike.condition === 'new' ? 'Showroom' : 'Dealer'}
                      </Button>
                      <Button variant="outline">
                        Get Directions
                      </Button>
                    </div>
                    
                    <div className="p-4 bg-surface rounded-lg">
                      <p className="text-sm text-muted-foreground">
                        {bike.condition === 'new' 
                          ? 'Contact this authorized showroom for test rides, best prices, and financing options.'
                          : 'Contact this trusted dealer for vehicle inspection, documentation, and best used bike deals.'
                        }
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Nearby Dealers */}
              {nearbyDealers.length > 1 && (
                <Card>
                  <CardHeader>
                    <CardTitle>
                      {bike.condition === 'new' ? 'Nearby Showrooms' : 'Other Used Bike Dealers'}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {nearbyDealers.slice(1).map((dealer, index) => (
                        <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                          <div>
                            <h4 className="font-medium">{dealer.name}</h4>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <MapPin className="w-3 h-3" />
                              <span>{dealer.location}</span>
                              {dealer.distance && (
                                <span className="ml-2">• {dealer.distance} km away</span>
                              )}
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              <Phone className="w-3 h-3 mr-1" />
                              Call
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>
        </Tabs>

        {/* Comparison Section */}
        {showComparisonSection && (
          <div className="mt-8 bg-card rounded-lg border p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Compare with Other Bikes</h2>
              <Button variant="ghost" size="sm" onClick={() => setShowComparisonSection(false)}>
                <X className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Current Bike Card */}
              <Card className="relative">
                <CardContent className="p-4">
                  <div className="aspect-video relative overflow-hidden rounded-lg mb-4">
                    <img
                      src={bike?.image}
                      alt={`${bike?.brand} ${bike?.name}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex flex-wrap gap-1">
                      <Badge variant="secondary">{bike?.fuelType}</Badge>
                      {bike?.isAccessible && (
                        <Badge variant="outline">Accessible</Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{bike?.brand}</p>
                    <h3 className="font-semibold">{bike?.name}</h3>
                    <p className="text-lg font-bold text-primary">
                      {new Intl.NumberFormat('en-IN', {
                        style: 'currency',
                        currency: 'INR',
                        maximumFractionDigits: 0,
                      }).format(bike?.price || 0)}
                    </p>
                  </div>
                </CardContent>
              </Card>
              
              {/* Other Bikes from Compare Context */}
              {useCompare().bikesToCompare
                .filter(b => b.id !== bike?.id)
                .slice(0, 3)
                .map((compareBike) => (
                  <Card key={compareBike.id} className="relative">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute top-2 right-2 z-10"
                      onClick={() => useCompare().removeBikeFromCompare(compareBike.id)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                    
                    <CardContent className="p-4">
                      <div className="aspect-video relative overflow-hidden rounded-lg mb-4">
                        <img
                          src={compareBike.image}
                          alt={`${compareBike.brand} ${compareBike.name}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex flex-wrap gap-1">
                          <Badge variant="secondary">{compareBike.fuelType}</Badge>
                          {compareBike.isAccessible && (
                            <Badge variant="outline">Accessible</Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">{compareBike.brand}</p>
                        <h3 className="font-semibold">{compareBike.name}</h3>
                        <p className="text-lg font-bold text-primary">
                          {new Intl.NumberFormat('en-IN', {
                            style: 'currency',
                            currency: 'INR',
                            maximumFractionDigits: 0,
                          }).format(compareBike.price)}
                        </p>
                      </div>
                      
                      <Button asChild className="w-full mt-4" size="sm">
                        <Link to={`/bike/${compareBike.id}`}>View Details</Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              
              {/* Add Bike Card */}
              {useCompare().bikesToCompare.filter(b => b.id !== bike?.id).length < 3 && (
                <Card className="border-dashed border-2 border-border hover:border-primary/50 transition-colors">
                  <CardContent className="p-4 h-full flex items-center justify-center">
                    <Button
                      variant="ghost"
                      className="h-full w-full flex flex-col items-center gap-2"
                      onClick={() => navigate('/browse')}
                    >
                      <Plus className="w-8 h-8 text-muted-foreground" />
                      <span className="text-muted-foreground">Add Bike</span>
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
            
            {/* Comparison Table */}
            {useCompare().bikesToCompare.filter(b => b.id !== bike?.id).length > 0 && (
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Specifications Comparison</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <tbody>
                        {[
                          { label: 'Price', key: 'price', format: (value: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(value) },
                          { label: 'Brand', key: 'brand' },
                          { label: 'Fuel Type', key: 'fuelType' },
                          { label: 'Mileage/Range', key: 'mileage', format: (value: number, bike: Bike) => bike.fuelType === 'Electric' ? `${bike.range} km` : `${value} km/l` },
                          { label: 'Max Power', key: 'maxPower', format: (value: number) => `${value} bhp` },
                          { label: 'Max Speed', key: 'maxSpeed', format: (value: number) => `${value} km/h` },
                          { label: 'Weight', key: 'weight', format: (value: number) => `${value} kg` },
                          { label: 'Eco Score', key: 'ecoScore', format: (value: number) => `${value}/10` },
                          { label: 'Running Cost/km', key: 'runningCostPerKm', format: (value: number) => `₹${value}` },
                        ].map((row) => (
                          <tr key={row.key} className="border-b border-border">
                            <td className="py-3 px-4 font-medium">{row.label}</td>
                            <td className="py-3 px-4">
                              {row.format 
                                ? row.format(bike?.[row.key as keyof Bike] as number, bike as Bike)
                                : bike?.[row.key as keyof Bike]}
                            </td>
                            {useCompare().bikesToCompare
                              .filter(b => b.id !== bike?.id)
                              .map((compareBike) => (
                                <td key={compareBike.id} className="py-3 px-4">
                                  {row.format 
                                    ? row.format(compareBike[row.key as keyof Bike] as number, compareBike)
                                    : compareBike[row.key as keyof Bike]}
                                </td>
                              ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default BikeDetail;