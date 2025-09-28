import React, { useCallback, useEffect, useRef, useState } from 'react';
import useEmblaCarousel, { EmblaOptionsType, EmblaCarouselType } from 'embla-carousel-react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const slides = [
  { src: '/images/ola-s1-pro.jpg', title: 'Ride the Future', subtitle: 'Explore the latest electric scooters and bikes', cta: { label: 'Browse EVs', href: '/browse' } },
  { src: '/images/ather-450x.jpg', title: 'Efficient. Smart. Powerful.', subtitle: 'Find top mileage and performance bikes', cta: { label: 'Find Your Bike', href: '/browse' } },
  { src: '/images/tvs-iqube.jpg', title: 'City Smart', subtitle: 'Practical EVs for your daily commute', cta: { label: 'Discover iQube', href: '/browse' } },
  { src: '/images/royal-enfield-classic.jpg', title: 'Timeless Classics', subtitle: 'Cruisers and roadsters for every journey', cta: { label: 'See Classics', href: '/browse' } },
  { src: '/images/yamaha-mt15.jpg', title: 'Street Dominators', subtitle: 'Sporty, agile, and built for performance', cta: { label: 'Shop Now', href: '/browse' } },
  { src: '/images/bajaj-pulsar.jpg', title: 'Pure Thrill', subtitle: 'Unleash performance with Bajaj Pulsar', cta: { label: 'View Pulsar', href: '/browse' } },
  { src: '/images/hero-splendor.jpg', title: 'Iconic Reliability', subtitle: 'Everyday efficiency and comfort', cta: { label: 'View Splendor', href: '/browse' } },
];

const options: EmblaOptionsType = { loop: true, align: 'start', dragFree: false };

const HeroCarousel: React.FC = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel(options);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const autoplayRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const isHoveringRef = useRef(false);

  const scrollNext = useCallback(() => {
    if (!emblaApi) return;
    if (emblaApi.canScrollNext()) emblaApi.scrollNext();
    else emblaApi.scrollTo(0);
  }, [emblaApi]);

  const startAutoplay = useCallback(() => {
    if (autoplayRef.current) return;
    autoplayRef.current = setInterval(() => {
      if (!isHoveringRef.current) scrollNext();
    }, 4500);
  }, [scrollNext]);

  const stopAutoplay = useCallback(() => {
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current);
      autoplayRef.current = null;
    }
  }, []);

  const onSelect = useCallback((api: EmblaCarouselType) => {
    setSelectedIndex(api.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on('select', onSelect);
    onSelect(emblaApi);
  }, [emblaApi, onSelect]);

  useEffect(() => {
    startAutoplay();
    return () => stopAutoplay();
  }, [startAutoplay, stopAutoplay]);

  return (
    <div
      className="relative w-full overflow-hidden rounded-b-3xl"
      onMouseEnter={() => { isHoveringRef.current = true; }}
      onMouseLeave={() => { isHoveringRef.current = false; }}
    >
      <style>
        {`
          @keyframes kenburns { 0% { transform: scale(1.05); } 100% { transform: scale(1.15); } }
        `}
      </style>
      <div className="embla" ref={emblaRef}>
        <div className="embla__container flex">
          {slides.map((slide, idx) => (
            <div key={idx} className="embla__slide flex-[0_0_100%] min-w-0">
              <div className="relative h-[56vh] md:h-[72vh] w-full">
                <img
                  src={slide.src}
                  alt={slide.title}
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{ animation: 'kenburns 18s ease-in-out infinite alternate' }}
                  onError={(e) => { e.currentTarget.src = `${import.meta.env.BASE_URL}images/placeholder.svg`; }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/30 to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center text-center px-6">
                  <div className="max-w-3xl">
                    <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-foreground drop-shadow-sm">
                      {slide.title}
                    </h2>
                    <p className="mt-3 md:mt-4 text-base md:text-lg text-muted-foreground">
                      {slide.subtitle}
                    </p>
                    <div className="mt-6 flex justify-center">
                      <Button size="lg" className="px-8" asChild>
                        <a href={slide.cta.href}>{slide.cta.label}</a>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-between px-4">
        <Button
          variant="outline"
          size="icon"
          className="pointer-events-auto bg-background/60 backdrop-blur-sm hover:bg-background/80"
          onClick={() => emblaApi?.scrollPrev()}
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-5 h-5" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="pointer-events-auto bg-background/60 backdrop-blur-sm hover:bg-background/80"
          onClick={() => emblaApi?.scrollNext()}
          aria-label="Next slide"
        >
          <ChevronRight className="w-5 h-5" />
        </Button>
      </div>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 bg-background/40 backdrop-blur-sm rounded-full px-3 py-2">
        {slides.map((_, i) => (
          <button
            key={i}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => emblaApi?.scrollTo(i)}
            className={`h-2.5 w-2.5 rounded-full transition-all ${
              i === selectedIndex ? 'bg-primary w-5' : 'bg-border'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;
