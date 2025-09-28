import React, { createContext, useContext, useState, useEffect } from 'react';
import { Bike } from '@/data/bikes';

interface CompareContextType {
  bikesToCompare: Bike[];
  addBikeToCompare: (bike: Bike) => void;
  removeBikeFromCompare: (bikeId: string) => void;
  clearBikesToCompare: () => void;
  isBikeInCompare: (bikeId: string) => boolean;
}

const CompareContext = createContext<CompareContextType | undefined>(undefined);

export const CompareProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [bikesToCompare, setBikesToCompare] = useState<Bike[]>([]);

  // Load bikes from localStorage on initial render
  useEffect(() => {
    const savedBikes = localStorage.getItem('bikesToCompare');
    if (savedBikes) {
      try {
        setBikesToCompare(JSON.parse(savedBikes));
      } catch (error) {
        console.error('Failed to parse saved bikes:', error);
        localStorage.removeItem('bikesToCompare');
      }
    }
  }, []);

  // Save bikes to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('bikesToCompare', JSON.stringify(bikesToCompare));
  }, [bikesToCompare]);

  const addBikeToCompare = (bike: Bike) => {
    if (bikesToCompare.length < 4 && !bikesToCompare.find(b => b.id === bike.id)) {
      setBikesToCompare([...bikesToCompare, bike]);
    }
  };

  const removeBikeFromCompare = (bikeId: string) => {
    setBikesToCompare(bikesToCompare.filter(bike => bike.id !== bikeId));
  };

  const clearBikesToCompare = () => {
    setBikesToCompare([]);
  };

  const isBikeInCompare = (bikeId: string) => {
    return bikesToCompare.some(bike => bike.id === bikeId);
  };

  return (
    <CompareContext.Provider
      value={{
        bikesToCompare,
        addBikeToCompare,
        removeBikeFromCompare,
        clearBikesToCompare,
        isBikeInCompare
      }}
    >
      {children}
    </CompareContext.Provider>
  );
};

export const useCompare = (): CompareContextType => {
  const context = useContext(CompareContext);
  if (context === undefined) {
    throw new Error('useCompare must be used within a CompareProvider');
  }
  return context;
};