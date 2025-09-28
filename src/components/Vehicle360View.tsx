import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  RotateCcw, 
  RotateCw, 
  ZoomIn, 
  ZoomOut, 
  Maximize2, 
  Minimize2, 
  Play, 
  Pause,
  Info,
  X
} from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface Vehicle360ViewProps {
  images: string[];
  vehicleName: string;
  className?: string;
}

const Vehicle360View: React.FC<Vehicle360ViewProps> = ({ 
  images, 
  vehicleName, 
  className = "" 
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [showInfo, setShowInfo] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageCache = useRef<HTMLImageElement[]>([]);
  const dragStartRef = useRef({ x: 0, index: 0 });
  const animationRef = useRef<number>();
  const playIntervalRef = useRef<NodeJS.Timeout>();

  // Generate 360-degree images if not provided (for demo purposes)
  const generate360Images = useCallback(() => {
    if (images.length >= 8) return images;
    
    // For demo, we'll use the first image and create variations
    const baseImage = images[0] || `${import.meta.env.BASE_URL}placeholder.svg`;
    return Array.from({ length: 24 }, (_, i) => {
      // In a real implementation, these would be actual 360-degree photos
      return `${baseImage}?angle=${i * 15}`;
    });
  }, [images]);

  const generatedImages = generate360Images();

  const drawImage = useCallback((image: HTMLImageElement) => {
    const canvas = canvasRef.current;
    
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * window.devicePixelRatio;
    canvas.height = rect.height * window.devicePixelRatio;
    
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    canvas.style.width = rect.width + 'px';
    canvas.style.height = rect.height + 'px';

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width / window.devicePixelRatio, canvas.height / window.devicePixelRatio);

    // Calculate dimensions for centered, zoomed image
    const canvasWidth = rect.width;
    const canvasHeight = rect.height;

    // Compute contain-fit scale so the whole image is visible and centered
    const baseScale = Math.min(
      canvasWidth / image.naturalWidth,
      canvasHeight / image.naturalHeight
    );
    const scaledWidth = image.naturalWidth * baseScale * zoom;
    const scaledHeight = image.naturalHeight * baseScale * zoom;

    const x = (canvasWidth - scaledWidth) / 2;
    const y = (canvasHeight - scaledHeight) / 2;

    // Draw image with smooth scaling
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(image, x, y, scaledWidth, scaledHeight);
  }, [zoom]); // Removed imageRef from dependencies

  // Preload all images when the component mounts
  useEffect(() => {
    setIsLoading(true);
    let loadedCount = 0;
    const totalImages = generatedImages.length;

    generatedImages.forEach((src, index) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        imageCache.current[index] = img;
        loadedCount++;
        setLoadingProgress((loadedCount / totalImages) * 100);

        // Draw first frame ASAP and hide loader
        if (index === 0 && canvasRef.current) {
          setIsLoading(false);
          drawImage(img);
        }

        if (loadedCount === totalImages) {
          // Final ensure draw
          if (canvasRef.current && imageCache.current[0]) {
            drawImage(imageCache.current[0]);
          }
        }
      };
      img.onerror = () => {
        // Handle error, maybe use a placeholder
        loadedCount++;
        setLoadingProgress((loadedCount / totalImages) * 100);
      };
    });
  }, [generatedImages, drawImage]);

  const drawCachedImage = useCallback(() => {
    const cachedImage = imageCache.current[currentIndex];
    if (cachedImage && cachedImage.complete) {
      drawImage(cachedImage);
    }
    // Optional: could add a fallback to load on demand if not in cache
  }, [currentIndex, drawImage]);

  const nextImage = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % generatedImages.length);
  }, [generatedImages.length]);

  const prevImage = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + generatedImages.length) % generatedImages.length);
  }, [generatedImages.length]);

  const togglePlay = useCallback(() => {
    if (isPlaying) {
      setIsPlaying(false);
      if (playIntervalRef.current) {
        clearInterval(playIntervalRef.current);
      }
    } else {
      setIsPlaying(true);
      playIntervalRef.current = setInterval(nextImage, 100); // 10 FPS
    }
  }, [isPlaying, nextImage]);

  const handleZoom = useCallback((direction: 'in' | 'out') => {
    setZoom(prev => {
      const newZoom = direction === 'in' ? prev * 1.2 : prev / 1.2;
      return Math.max(0.5, Math.min(3, newZoom));
    });
  }, []);

  const resetView = useCallback(() => {
    setZoom(1);
    setCurrentIndex(0);
  }, []);
  
  useEffect(() => {
    if (!isLoading) {
      drawCachedImage();
    }
    // This effect should run when the current image index changes.
  }, [currentIndex, isLoading, drawCachedImage]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (playIntervalRef.current) {
        clearInterval(playIntervalRef.current);
      }
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  // Handle window resize
  useEffect(() => {    
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Use ResizeObserver to detect when the canvas is visible and has a size.
    // This is more reliable than a window resize event, especially for elements in tabs or dialogs.
    const resizeObserver = new ResizeObserver(entries => {
      if (entries[0].contentRect.width > 0 && entries[0].contentRect.height > 0) {
        drawCachedImage();
      }
    });

    resizeObserver.observe(canvas);

    return () => {
      resizeObserver.disconnect();
    };
  }, [drawCachedImage, isFullscreen]); // Re-observe when fullscreen changes

  // Mouse/Touch Drag Controls
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || isLoading) return;

    const DRAG_SENSITIVITY = 10; // pixels per frame change

    const handleDragStart = (clientX: number) => {
      setIsDragging(true);
      dragStartRef.current = { x: clientX, index: currentIndex };
      if (playIntervalRef.current) {
        clearInterval(playIntervalRef.current);
        setIsPlaying(false);
      }
    };

    const handleDragMove = (clientX: number) => {
      if (!isDragging) return;
      const deltaX = clientX - dragStartRef.current.x;
      const frameChange = Math.round(deltaX / DRAG_SENSITIVITY);
      const newIndex = (dragStartRef.current.index - frameChange + generatedImages.length) % generatedImages.length;
      setCurrentIndex(newIndex);
    };

    const handleDragEnd = () => {
      setIsDragging(false);
    };

    const onMouseDown = (e: MouseEvent) => handleDragStart(e.clientX);
    const onMouseMove = (e: MouseEvent) => handleDragMove(e.clientX);
    const onMouseUp = () => handleDragEnd();

    const onTouchStart = (e: TouchEvent) => handleDragStart(e.touches[0].clientX);
    const onTouchMove = (e: TouchEvent) => handleDragMove(e.touches[0].clientX);
    const onTouchEnd = () => handleDragEnd();

    canvas.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    canvas.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove);
    window.addEventListener('touchend', onTouchEnd);

    return () => {
      canvas.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      canvas.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
    };
  }, [isLoading, isDragging, currentIndex, generatedImages.length]);

  // Wheel zoom support
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const delta = Math.sign(e.deltaY);
      setZoom(prev => {
        const newZoom = delta > 0 ? prev / 1.1 : prev * 1.1;
        return Math.max(0.5, Math.min(3, newZoom));
      });
    };
    canvas.addEventListener('wheel', onWheel, { passive: false });
    return () => canvas.removeEventListener('wheel', onWheel);
  }, []);

  // Redraw when entering fullscreen
  useEffect(() => {
    if (isFullscreen) {
      setTimeout(() => drawCachedImage(), 0);
    }
  }, [isFullscreen, drawCachedImage]);

  const progress = ((currentIndex + 1) / generatedImages.length) * 100;

  return (
    <>
      <Card className={`card-hover bg-card/80 backdrop-blur-sm border-border/50 ${className}`}>
        <CardContent className="p-4">
          <div className="space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-foreground">360° View</h3>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs">
                  {currentIndex + 1} / {generatedImages.length}
                </Badge>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowInfo(true)}
                  className="bounce-gentle"
                >
                  <Info className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Canvas Container */}
            <div className="relative bg-muted/30 rounded-lg overflow-hidden aspect-video">
              <canvas
                ref={canvasRef}
                className={`w-full h-full ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
                style={{ touchAction: 'none' }}
              />
              
              {/* Loading Overlay */}
              {isLoading && !isFullscreen && (
                <div className="absolute inset-0 bg-background/50 flex items-center justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
                  <p className="text-sm text-foreground">
                    Loading 360° View... {Math.round(loadingProgress)}%
                  </p>
                </div>
              )}

              {/* Navigation Arrows */}
              <Button
                variant="outline"
                size="sm"
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm"
                onClick={prevImage}
                disabled={isLoading}
              >
                <RotateCcw className="w-4 h-4" />
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm"
                onClick={nextImage}
                disabled={isLoading}
              >
                <RotateCw className="w-4 h-4" />
              </Button>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-muted rounded-full h-2">
              <div
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Controls */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={togglePlay}
                  className="bounce-gentle"
                  disabled={isLoading}
                >
                  {isPlaying ? (
                    <Pause className="w-4 h-4" />
                  ) : (
                    <Play className="w-4 h-4" />
                  )}
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={resetView}
                  className="bounce-gentle"
                  disabled={isLoading}
                >
                  <RotateCcw className="w-4 h-4" />
                </Button>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleZoom('out')}
                  className="bounce-gentle"
                  disabled={isLoading}
                >
                  <ZoomOut className="w-4 h-4" />
                </Button>
                
                <span className="text-sm text-muted-foreground min-w-[3rem] text-center">
                  {Math.round(zoom * 100)}%
                </span>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleZoom('in')}
                  className="bounce-gentle"
                  disabled={isLoading}
                >
                  <ZoomIn className="w-4 h-4" />
                </Button>
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsFullscreen(true)}
                className="bounce-gentle"
              >
                <Maximize2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Fullscreen Modal */}
      <Dialog open={isFullscreen} onOpenChange={setIsFullscreen}>
        <DialogContent className="max-w-7xl w-full h-[90vh] p-0">
          <DialogHeader className="p-6 pb-0">
            <DialogTitle className="flex items-center justify-between">
              <span>{vehicleName} - 360° View</span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsFullscreen(false)}
              >
                <X className="w-4 h-4" />
              </Button>
            </DialogTitle>
          </DialogHeader>
          
          <div className="flex-1 p-6 pt-0">
            <div className="relative bg-muted/30 rounded-lg overflow-hidden h-full w-full">
              <canvas
                ref={canvasRef}
                className={`w-full h-full ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
                style={{ touchAction: 'none' }}
              />

              {isLoading && isFullscreen && (
                <div className="absolute inset-0 bg-background/50 flex items-center justify-center flex-col gap-2">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
                  <p className="text-sm text-foreground">
                    Loading 360° View... {Math.round(loadingProgress)}%
                  </p>
                </div>
              )}
              
              {/* Fullscreen Controls */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
                <div className="flex items-center gap-2 bg-background/80 backdrop-blur-sm rounded-lg p-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={prevImage}
                    disabled={isLoading}
                  >
                    <RotateCcw className="w-4 h-4" />
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={togglePlay}
                    disabled={isLoading}
                  >
                    {isPlaying ? (
                      <Pause className="w-4 h-4" />
                    ) : (
                      <Play className="w-4 h-4" />
                    )}
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={nextImage}
                    disabled={isLoading}
                  >
                    <RotateCw className="w-4 h-4" />
                  </Button>
                  
                  <div className="w-px h-6 bg-border mx-2" />
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleZoom('out')}
                    disabled={isLoading}
                  >
                    <ZoomOut className="w-4 h-4" />
                  </Button>
                  
                  <span className="text-sm text-muted-foreground min-w-[3rem] text-center">
                    {Math.round(zoom * 100)}%
                  </span>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleZoom('in')}
                    disabled={isLoading}
                  >
                    <ZoomIn className="w-4 h-4" />
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={resetView}
                    disabled={isLoading}
                  >
                    <RotateCcw className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Info Modal */}
      <Dialog open={showInfo} onOpenChange={setShowInfo}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>360° View Controls</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <strong>Navigation:</strong>
                <ul className="mt-1 space-y-1 text-muted-foreground">
                  <li>• Use arrow buttons to rotate</li>
                  <li>• Click play for auto-rotation</li>
                  <li>• Drag to pan when zoomed</li>
                </ul>
              </div>
              <div>
                <strong>Zoom:</strong>
                <ul className="mt-1 space-y-1 text-muted-foreground">
                  <li>• +/- buttons to zoom</li>
                  <li>• Reset button returns to start</li>
                  <li>• Fullscreen for better view</li>
                </ul>
              </div>
            </div>
            <div className="p-3 bg-muted/50 rounded-lg">
              <p className="text-xs text-muted-foreground">
                <strong>Tip:</strong> This 360° view helps you examine every angle of the vehicle 
                before making your decision. Use the controls to get the perfect view!
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Vehicle360View;
