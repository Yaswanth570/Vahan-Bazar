import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Accessibility, Type, Moon, Sun, Volume2, ZoomIn } from 'lucide-react';

const AccessibilityWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [fontSize, setFontSize] = useState(100);
  const [contrast, setContrast] = useState(false);
  const [screenReader, setScreenReader] = useState(false);
  const [dyslexicFont, setDyslexicFont] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  const applyAccessibilitySettings = () => {
    // Font size
    document.documentElement.style.fontSize = `${fontSize}%`;
    
    // High contrast
    if (contrast) {
      document.documentElement.classList.add('high-contrast');
      document.body.classList.add('high-contrast');
    } else {
      document.documentElement.classList.remove('high-contrast');
      document.body.classList.remove('high-contrast');
    }
    
    // Screen reader
    if (screenReader) {
      document.documentElement.classList.add('screen-reader-mode');
    } else {
      document.documentElement.classList.remove('screen-reader-mode');
    }
    
    // Dyslexic font
    if (dyslexicFont) {
      document.documentElement.classList.add('dyslexic-font');
    } else {
      document.documentElement.classList.remove('dyslexic-font');
    }
    
    // Reduced motion
    if (reducedMotion) {
      document.documentElement.classList.add('reduced-motion');
    } else {
      document.documentElement.classList.remove('reduced-motion');
    }
  };

  // Apply settings when component mounts
  useEffect(() => {
    // Initial application of settings
    applyAccessibilitySettings();
  }, []);
  
  // Re-apply settings when they change
  useEffect(() => {
    applyAccessibilitySettings();
  }, [fontSize, contrast, dyslexicFont, reducedMotion]);

  return (
    <div className="fixed bottom-[110px] right-6 z-[9998]">
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <div 
            className="h-12 w-12 rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 flex items-center justify-center cursor-pointer"
            aria-label="Accessibility options"
          >
            <Accessibility className="h-6 w-6" />
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-80 p-4" side="top">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Accessibility className="h-5 w-5" />
              Accessibility Options
            </h3>
            
            <div className="space-y-4">
              {/* Font Size */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="flex items-center gap-2">
                    <Type className="h-4 w-4" />
                    Font Size
                  </Label>
                  <span className="text-sm">{fontSize}%</span>
                </div>
                <Slider
                  value={[fontSize]}
                  min={80}
                  max={150}
                  step={10}
                  onValueChange={(value) => {
                    setFontSize(value[0]);
                    applyAccessibilitySettings();
                  }}
                />
              </div>
              
              {/* High Contrast */}
              <div className="flex items-center justify-between">
                <Label htmlFor="contrast-mode" className="flex items-center gap-2 cursor-pointer">
                  <Moon className="h-4 w-4" />
                  High Contrast
                </Label>
                <Switch
                  id="contrast-mode"
                  checked={contrast}
                  onCheckedChange={(checked) => {
                    setContrast(checked);
                    applyAccessibilitySettings();
                  }}
                />
              </div>
              
              {/* Screen Reader */}
              <div className="flex items-center justify-between">
                <Label htmlFor="screen-reader" className="flex items-center gap-2 cursor-pointer">
                  <Volume2 className="h-4 w-4" />
                  Screen Reader Compatible
                </Label>
                <Switch
                  id="screen-reader"
                  checked={screenReader}
                  onCheckedChange={(checked) => {
                    setScreenReader(checked);
                    applyAccessibilitySettings();
                  }}
                />
              </div>
              
              {/* Dyslexic Font */}
              <div className="flex items-center justify-between">
                <Label htmlFor="dyslexic-font" className="flex items-center gap-2 cursor-pointer">
                  <Type className="h-4 w-4" />
                  Dyslexia Friendly Font
                </Label>
                <Switch
                  id="dyslexic-font"
                  checked={dyslexicFont}
                  onCheckedChange={(checked) => {
                    setDyslexicFont(checked);
                    applyAccessibilitySettings();
                  }}
                />
              </div>
              
              {/* Reduced Motion */}
              <div className="flex items-center justify-between">
                <Label htmlFor="reduced-motion" className="flex items-center gap-2 cursor-pointer">
                  <ZoomIn className="h-4 w-4" />
                  Reduced Motion
                </Label>
                <Switch
                  id="reduced-motion"
                  checked={reducedMotion}
                  onCheckedChange={(checked) => {
                    setReducedMotion(checked);
                    applyAccessibilitySettings();
                  }}
                />
              </div>
            </div>
            
            <div className="pt-2">
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full"
                onClick={() => {
                  setFontSize(100);
                  setContrast(false);
                  setScreenReader(false);
                  setDyslexicFont(false);
                  setReducedMotion(false);
                  applyAccessibilitySettings();
                }}
              >
                Reset to Default
              </Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default AccessibilityWidget;