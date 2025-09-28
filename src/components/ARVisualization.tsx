import { useState } from 'react';
import { Glasses, Smartphone, RotateCw, Maximize, Camera, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { sampleBikes } from '@/data/bikes';

const ARVisualization = () => {
  const [selectedBike, setSelectedBike] = useState(sampleBikes[0]);
  const [selectedColor, setSelectedColor] = useState('red');
  const [viewMode, setViewMode] = useState('ar');
  
  const availableColors = ['red', 'blue', 'black', 'white', 'green'];
  
  return (
    <div className="w-full">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* AR View Area */}
        <div className="w-full lg:w-2/3">
          <div className="relative rounded-xl overflow-hidden bg-black/10 border border-border/50 aspect-[4/3]">
            {/* AR/VR View */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-full h-full">
                {/* Simulated AR/VR view */}
                <div className="absolute inset-0 bg-gradient-to-b from-background/5 to-background/20"></div>
                
                {/* Bike image */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <img 
                    src={selectedBike.images[0]} 
                    alt={selectedBike.name}
                    className="max-w-[80%] max-h-[80%] object-contain transform hover:scale-105 transition-transform duration-300"
                    style={{ filter: `hue-rotate(${selectedColor === 'red' ? '0deg' : selectedColor === 'blue' ? '240deg' : selectedColor === 'green' ? '120deg' : selectedColor === 'black' ? '0deg' : '0deg'})` }}
                  />
                </div>
                
                {/* AR grid floor */}
                <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/20 to-transparent perspective-grid"></div>
                
                {/* AR interface elements */}
                {viewMode === 'ar' && (
                  <>
                    <div className="absolute top-4 left-4 bg-background/80 backdrop-blur-sm rounded-lg p-2 text-xs text-muted-foreground">
                      AR Mode Active
                    </div>
                    <div className="absolute bottom-4 right-4 flex gap-2">
                      <Button size="icon" variant="secondary" className="rounded-full w-10 h-10 bg-background/80 backdrop-blur-sm">
                        <Camera className="h-5 w-5" />
                      </Button>
                      <Button size="icon" variant="secondary" className="rounded-full w-10 h-10 bg-background/80 backdrop-blur-sm">
                        <RotateCw className="h-5 w-5" />
                      </Button>
                      <Button size="icon" variant="secondary" className="rounded-full w-10 h-10 bg-background/80 backdrop-blur-sm">
                        <Maximize className="h-5 w-5" />
                      </Button>
                    </div>
                  </>
                )}
                
                {/* VR interface elements */}
                {viewMode === 'vr' && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-full h-full border-4 border-black rounded-[50px] overflow-hidden">
                      <div className="h-full flex">
                        <div className="w-1/2 border-r-2 border-black relative">
                          <div className="absolute inset-0 flex items-center justify-center">
                            <img 
                              src={selectedBike.images[0]} 
                              alt={selectedBike.name}
                              className="max-w-[80%] max-h-[80%] object-contain"
                              style={{ filter: `hue-rotate(${selectedColor === 'red' ? '0deg' : selectedColor === 'blue' ? '240deg' : selectedColor === 'green' ? '120deg' : selectedColor === 'black' ? '0deg' : '0deg'})` }}
                            />
                          </div>
                        </div>
                        <div className="w-1/2 border-l-2 border-black relative">
                          <div className="absolute inset-0 flex items-center justify-center">
                            <img 
                              src={selectedBike.images[0]} 
                              alt={selectedBike.name}
                              className="max-w-[80%] max-h-[80%] object-contain"
                              style={{ filter: `hue-rotate(${selectedColor === 'red' ? '0deg' : selectedColor === 'blue' ? '240deg' : selectedColor === 'green' ? '120deg' : selectedColor === 'black' ? '0deg' : '0deg'})` }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <div className="mt-4 flex justify-between items-center">
            <div className="flex gap-2">
              <Button 
                variant={viewMode === 'ar' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => setViewMode('ar')}
                className="flex items-center gap-1"
              >
                <Smartphone className="h-4 w-4" />
                AR View
              </Button>
              <Button 
                variant={viewMode === 'vr' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => setViewMode('vr')}
                className="flex items-center gap-1"
              >
                <Glasses className="h-4 w-4" />
                VR Mode
              </Button>
            </div>
            
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <Share2 className="h-4 w-4" />
              Share View
            </Button>
          </div>
        </div>
        
        {/* Controls */}
        <div className="w-full lg:w-1/3">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-4">Customize Your View</h3>
              
              <div className="space-y-6">
                {/* Bike Selection */}
                <div className="space-y-3">
                  <h4 className="font-medium">Select Bike</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {sampleBikes.slice(0, 4).map((bike) => (
                      <div 
                        key={bike.id}
                        className={`p-2 border rounded-lg cursor-pointer transition-all ${selectedBike.id === bike.id ? 'border-primary bg-primary/10' : 'border-border hover:border-primary/50'}`}
                        onClick={() => setSelectedBike(bike)}
                      >
                        <div className="aspect-video bg-background/50 rounded flex items-center justify-center mb-2">
                          <img 
                            src={bike.images[0]} 
                            alt={bike.name}
                            className="max-w-[80%] max-h-[80%] object-contain"
                          />
                        </div>
                        <p className="text-xs font-medium truncate">{bike.name}</p>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Color Selection */}
                <div className="space-y-3">
                  <h4 className="font-medium">Choose Color</h4>
                  <div className="flex gap-2">
                    {availableColors.map((color) => (
                      <div 
                        key={color}
                        className={`w-8 h-8 rounded-full cursor-pointer transition-all ${selectedColor === color ? 'ring-2 ring-primary ring-offset-2' : 'hover:scale-110'}`}
                        style={{ backgroundColor: color }}
                        onClick={() => setSelectedColor(color)}
                      />
                    ))}
                  </div>
                </div>
                
                {/* Environment */}
                <div className="space-y-3">
                  <h4 className="font-medium">Environment</h4>
                  <Tabs defaultValue="garage">
                    <TabsList className="grid grid-cols-3 w-full">
                      <TabsTrigger value="garage">Garage</TabsTrigger>
                      <TabsTrigger value="outdoor">Outdoor</TabsTrigger>
                      <TabsTrigger value="showroom">Showroom</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
                
                {/* Actions */}
                <div className="pt-4 space-y-3">
                  <Button className="w-full">Place in Your Space</Button>
                  <Button variant="outline" className="w-full">View in 360°</Button>
                </div>
                
                <p className="text-xs text-muted-foreground">
                  For the full AR experience, use our mobile app to place the bike in your actual environment.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ARVisualization;