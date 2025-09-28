import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Zap, Bike, Layers, ArrowRight, Leaf, Glasses } from "lucide-react";

import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { sampleBikes } from "@/data/bikes";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AIRecommendationEngine from "@/components/AIRecommendationEngine";
import EcoImpactCalculator from "@/components/EcoImpactCalculator";
import ARVisualization from "@/components/ARVisualization";
import HeroCarousel from "@/components/HeroCarousel";
import { AppStoreButton, PlayStoreButton } from "@/components/StoreButtons";

export default function HomePage() {
  const [activeTab, setActiveTab] = useState("browse");
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [city, setCity] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  type Suggestion = { type: "Brand" | "Model"; value: string };

  const suggestions: Suggestion[] = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();

    const brands = Array.from(new Set(sampleBikes.map(b => b.brand)))
      .filter(b => b.toLowerCase().includes(q))
      .map(value => ({ type: "Brand" as const, value }));

    const models = sampleBikes
      .map(b => b.name)
      .filter((name, idx, arr) => arr.indexOf(name) === idx)
      .filter(n => n.toLowerCase().includes(q))
      .map(value => ({ type: "Model" as const, value }));

    // Prioritize startsWith matches
    const score = (s: Suggestion) => (s.value.toLowerCase().startsWith(q) ? 0 : 1);
    return [...brands, ...models].sort((a, b) => score(a) - score(b)).slice(0, 8);
  }, [query]);

  const selectSuggestion = (value: string) => {
    setQuery(value);
    setShowSuggestions(false);
    navigate(`/browse?q=${encodeURIComponent(value)}`);
  };

  const doSearch = () => {
    const q = query.trim();
    if (!q) return;
    setShowSuggestions(false);
    navigate(`/browse?q=${encodeURIComponent(q)}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showSuggestions && suggestions.length > 0 && (e.key === "ArrowDown" || e.key === "ArrowUp")) {
      setShowSuggestions(true);
      return;
    }
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setHighlightedIndex(i => Math.min(i + 1, suggestions.length - 1));
        break;
      case "ArrowUp":
        e.preventDefault();
        setHighlightedIndex(i => Math.max(i - 1, 0));
        break;
      case "Enter":
        if (highlightedIndex >= 0 && highlightedIndex < suggestions.length) {
          e.preventDefault();
          selectSuggestion(suggestions[highlightedIndex].value);
        } else {
          doSearch();
        }
        break;
      case "Escape":
        setShowSuggestions(false);
        break;
    }
  };
  
  return (
    <div className="min-h-screen">
      
            
      {/* Hero Carousel Section */}
      <section className="relative z-10">
        <HeroCarousel />
      </section>

      {/* Search Section */}
      <section className="relative z-20 container mx-auto px-4 py-12 -mt-20 bg-background/80 backdrop-blur-md rounded-t-3xl shadow-lg">
        <div className="fade-in">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 gradient-text tracking-tight text-center">
            Vahan Bazar
          </h1>
        </div>

        {/* Search Bar */}
        <div className="mt-12 scale-in">
          <div className="flex flex-col sm:flex-row w-full max-w-3xl mx-auto bg-card/80 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg border border-border/50 hover:shadow-hover transition-all duration-300">
            <div className="flex-1 p-4 relative">
              <Input
                value={query}
                onChange={(e) => { setQuery(e.target.value); setShowSuggestions(true); setHighlightedIndex(-1); }}
                onFocus={() => setShowSuggestions(true)}
                onKeyDown={handleKeyDown}
                placeholder="Search by brand, model, or type..."
                aria-autocomplete="list"
                aria-expanded={showSuggestions}
                aria-controls="search-suggestions"
                className="border-none bg-transparent text-foreground placeholder:text-muted-foreground focus:ring-0 text-lg"
              />
              {showSuggestions && suggestions.length > 0 && (
                <div id="search-suggestions" className="absolute left-4 right-4 mt-2 bg-card/95 backdrop-blur-sm border border-border/50 rounded-xl shadow-lg max-h-60 overflow-auto z-50">
                  {suggestions.map((s, idx) => (
                    <button
                      key={`${s.type}-${s.value}`}
                      type="button"
                      role="option"
                      aria-selected={idx === highlightedIndex}
                      onMouseDown={() => selectSuggestion(s.value)}
                      className={`w-full text-left px-3 py-2 flex items-center gap-2 hover:bg-muted ${idx === highlightedIndex ? 'bg-muted' : ''}`}
                    >
                      <span className="text-xs uppercase tracking-wide text-muted-foreground w-16">{s.type}</span>
                      <span className="text-sm font-medium text-foreground">{s.value}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
            <div className="flex-1 p-4 border-l border-border/30">
              <Input
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Your city"
                className="border-none bg-transparent text-foreground placeholder:text-muted-foreground focus:ring-0 text-lg"
              />
            </div>
            <Button 
              onClick={doSearch}
              className="bg-primary hover:bg-primary-dark text-primary-foreground font-semibold flex items-center gap-2 px-8 py-4 rounded-none"
            >
              <Search size={20} /> Search
            </Button>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl w-full mx-auto">
          {[
            { 
              icon: Zap, 
              title: "Electric First", 
              desc: "Explore modern EV models with eco-friendly technology",
              delay: "0.1s"
            },
            { 
              icon: Bike, 
              title: "Test Ride", 
              desc: "Book test rides instantly with verified dealers",
              delay: "0.2s"
            },
            { 
              icon: Layers, 
              title: "Smart Compare", 
              desc: "AI-powered side-by-side comparisons",
              delay: "0.3s"
            }
          ].map((feature, idx) => (
            <div
              key={idx}
              className="fade-in spacious-card bg-card/60 backdrop-blur-sm rounded-2xl shadow-card border border-border/50 hover:shadow-hover transition-all duration-500 hover:scale-105 group"
              style={{animationDelay: feature.delay}}
            >
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors duration-300">
                <feature.icon className="text-primary" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 fade-in" style={{animationDelay: '0.6s'}}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-primary hover:bg-primary-dark text-primary-foreground px-8 py-3 bounce-gentle" asChild>
              <a href="/browse">Browse Vehicles</a>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Award-Winning Features Section */}
      <section className="py-20 bg-gradient-to-b from-background to-background/90">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Award-Winning Features</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Experience the future of two-wheeler shopping with our innovative tools
            </p>
          </div>
          
          <Tabs defaultValue="ai" className="w-full max-w-6xl mx-auto">
            <TabsList className="grid w-full grid-cols-3 mb-12">
              <TabsTrigger value="ai" className="text-lg py-3">
                <div className="flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                  <span>AI Recommendations</span>
                </div>
              </TabsTrigger>
              <TabsTrigger value="eco" className="text-lg py-3">
                <div className="flex items-center gap-2">
                  <Leaf className="h-5 w-5" />
                  <span>Eco-Impact Calculator</span>
                </div>
              </TabsTrigger>
              <TabsTrigger value="ar" className="text-lg py-3">
                <div className="flex items-center gap-2">
                  <Glasses className="h-5 w-5" />
                  <span>AR Experience</span>
                </div>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="ai" className="mt-6 fade-in">
              <div className="bg-card/40 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-border/50">
                <AIRecommendationEngine />
              </div>
            </TabsContent>
            
            <TabsContent value="eco" className="mt-6 fade-in">
              <div className="bg-card/40 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-border/50">
                <EcoImpactCalculator />
              </div>
            </TabsContent>
            
            <TabsContent value="ar" className="mt-6 fade-in">
              <div className="bg-card/40 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-border/50">
                <ARVisualization />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-card/80 border-t border-border/30 pt-10 pb-6 relative">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* About Section */}
            <div className="md:pr-4">
              <h3 className="text-lg font-semibold mb-4">ABOUT VAHAN BAZAR</h3>
              <ul className="space-y-2.5">
                <li><a href="/about" className="text-muted-foreground hover:text-primary transition-colors">About</a></li>
                <li><a href="/careers" className="text-muted-foreground hover:text-primary transition-colors">Careers With Us</a></li>
                <li><a href="/terms" className="text-muted-foreground hover:text-primary transition-colors">Terms & Conditions</a></li>
                <li><a href="/privacy" className="text-muted-foreground hover:text-primary transition-colors">Privacy Policy</a></li>
              </ul>
            </div>

            {/* Connect Section */}
            <div className="md:pr-4">
              <h3 className="text-lg font-semibold mb-4">CONNECT WITH US</h3>
              <ul className="space-y-2.5">
                <li><a href="/feedback" className="text-muted-foreground hover:text-primary transition-colors">Feedback</a></li>
                <li><a href="/contact" className="text-muted-foreground hover:text-primary transition-colors">Contact Us</a></li>
                <li><a href="/advertise" className="text-muted-foreground hover:text-primary transition-colors">Advertise with Us</a></li>
              </ul>
            </div>

            {/* Others Section */}
            <div className="md:pr-4">
              <h3 className="text-lg font-semibold mb-4">OTHERS</h3>
              <ul className="space-y-2.5">
                <li><a href="/trusted-dealers" className="text-muted-foreground hover:text-primary transition-colors">Trusted Dealers</a></li>
                <li><a href="/service-centers" className="text-muted-foreground hover:text-primary transition-colors">Service Centers</a></li>
                <li><a href="/parts" className="text-muted-foreground hover:text-primary transition-colors">Bike Parts</a></li>
                <li><a href="/vision" className="text-muted-foreground hover:text-primary transition-colors">Green Vision Fund</a></li>
              </ul>
            </div>

            {/* App Download Section */}
            <div className="z-20 relative">
              <h3 className="text-lg font-semibold mb-4">EXPERIENCE VAHAN BAZAR APP</h3>
              <div className="flex space-x-4 mb-8">
                {/* Theme-proof vector store buttons */}
                {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                {/* @ts-ignore */}
                <AppStoreButton href="#" />
                {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                {/* @ts-ignore */}
                <PlayStoreButton href="#" />
              </div>
              
              <h3 className="text-lg font-semibold mb-4">VAHAN GROUP VENTURES</h3>
              <div className="grid grid-cols-2 gap-6">
                <a href="#" className="block bg-background/50 p-2 rounded-md hover:bg-background/80 transition-colors">
                  <img src={`${import.meta.env.BASE_URL}images/logo-placeholder.svg`} alt="Venture 1" className="h-8" />
                </a>
                <a href="#" className="block bg-background/50 p-2 rounded-md hover:bg-background/80 transition-colors">
                  <img src={`${import.meta.env.BASE_URL}images/logo-placeholder.svg`} alt="Venture 2" className="h-8" />
                </a>
              </div>
            </div>
          </div>

          {/* Copyright and Social Media */}
          <div className="border-t border-border/30 pt-6 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">© 2023 Vahan Software Pvt. Ltd.</p>
            <div className="flex space-x-5 mt-4 md:mt-0 items-center">
              <p className="text-sm text-muted-foreground">Connect:</p>
              <a href="#" className="text-foreground hover:text-primary p-1.5 hover:bg-background/50 rounded-full transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-facebook"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
              <a href="#" className="text-foreground hover:text-primary p-1.5 hover:bg-background/50 rounded-full transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-twitter"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
              </a>
              <a href="#" className="text-foreground hover:text-primary p-1.5 hover:bg-background/50 rounded-full transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-youtube"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/><path d="m10 15 5-3-5-3z"/></svg>
              </a>
              <a href="#" className="text-foreground hover:text-primary p-1.5 hover:bg-background/50 rounded-full transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-instagram"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
