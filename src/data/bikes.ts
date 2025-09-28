export interface Dealer {
  name: string;
  location: string;
  contact: string;
  distance?: number;
  type: 'showroom' | 'used-dealer';
}

export interface Bike {
  id: string;
  name: string;
  brand: string;
  price: number;
  image: string;
  mileage: number;
  // For used bikes: odometer reading (total km travelled)
  odometerKm?: number;
  // For used bikes: observed fuel efficiency (km/l). Optional for new/electric.
  realWorldMileage?: number;
  fuelType: 'Petrol' | 'Electric' | 'Hybrid';
  engineCapacity?: number;
  maxPower: number;
  maxSpeed: number;
  weight: number;
  fuelTankCapacity?: number;
  batteryCapacity?: number;
  chargingTime?: number;
  range?: number;
  isAccessible: boolean;
  ecoScore: number;
  maintenanceCostMonthly: number;
  maintenanceCostYearly: number;
  runningCostPerKm: number;
  features: string[];
  specifications: {
    engine: string;
    transmission: string;
    brakes: string;
    suspension: string;
    tires: string;
  };
  images: string[];
  colors?: string[];
  launchDate?: string;
  isUpcoming: boolean;
  condition: 'new' | 'used';
  dealerInfo: Dealer;
  nearbyDealers?: Dealer[];
}

export const sampleBikes: Bike[] = [
  {
    id: '1',
    name: 'Yamaha MT-15',
    brand: 'Yamaha',
    price: 165000,
    image: '/images/yamaha-mt15.jpg',
    mileage: 45,
    fuelType: 'Petrol',
    engineCapacity: 155,
    maxPower: 18.4,
    maxSpeed: 131,
    weight: 142,
    fuelTankCapacity: 10,
    isAccessible: false,
    ecoScore: 6.5,
    maintenanceCostMonthly: 2500,
    maintenanceCostYearly: 30000,
    runningCostPerKm: 2.8,
    features: ['ABS', 'LED Headlight', 'Digital Display', 'Liquid Cooling'],
    specifications: {
      engine: '155cc, Single Cylinder, 4-Stroke',
      transmission: '6-Speed Manual',
      brakes: 'Disc (Front & Rear) with ABS',
      suspension: 'Telescopic Fork (Front), Swingarm (Rear)',
      tires: '110/70-17 (Front), 140/70-17 (Rear)'
    },
    images: ['/images/yamaha-mt15.jpg', '/images/yamaha-mt15-red.jpg'],
    colors: ['Cyan Blue', 'Racing Black', 'Ice Fluo-Vermillion'],
    isUpcoming: false,
    condition: 'new',
    dealerInfo: {
      name: 'Yamaha Showroom Hyderabad',
      location: 'Begumpet, Hyderabad',
      contact: '+91 9876543210',
      type: 'showroom'
    },
    nearbyDealers: [
      { name: 'Yamaha Showroom Secunderabad', location: 'Secunderabad, Hyderabad', contact: '+91 9876543220', distance: 3.2, type: 'showroom' },
      { name: 'Yamaha Service Center Kukatpally', location: 'Kukatpally, Hyderabad', contact: '+91 9876543221', distance: 8.5, type: 'showroom' }
    ]
  },
  {
    id: '2',
    name: 'Ather 450X',
    brand: 'Ather',
    price: 130000,
    image: '/images/ather-450x.jpg',
    mileage: 0, // Electric - range instead
    fuelType: 'Electric',
    maxPower: 8.7,
    maxSpeed: 90,
    weight: 108,
    batteryCapacity: 2.9,
    chargingTime: 4.5,
    range: 105,
    isAccessible: true,
    ecoScore: 9.2,
    maintenanceCostMonthly: 650,
    maintenanceCostYearly: 7800,
    runningCostPerKm: 0.7,
    features: ['Touchscreen Dashboard', 'Bluetooth', 'OTA Updates', 'Mobile App', 'Accessible Controls'],
    specifications: {
      engine: 'PMSM Electric Motor',
      transmission: 'Single Speed Automatic',
      brakes: 'Disc (Front & Rear) with CBS',
      suspension: 'Telescopic Fork (Front), Monoshock (Rear)',
      tires: '90/90-12 (Front & Rear)'
    },
    images: ['/images/ather-450x.jpg', '/placeholder-bike-2-2.jpg'],
    colors: ['Space Grey', 'Mint Green', 'White'],
    isUpcoming: false,
    condition: 'used',
    dealerInfo: {
      name: 'Pre-Owned Electric Hub',
      location: 'Jubilee Hills, Hyderabad',
      contact: '+91 9876543211',
      type: 'used-dealer'
    }
  },
  {
    id: '3',
    name: 'Honda Activa 6G',
    brand: 'Honda',
    price: 82000,
    image: '/images/honda-activa.jpg',
    mileage: 60,
    fuelType: 'Petrol',
    engineCapacity: 109.5,
    maxPower: 7.68,
    maxSpeed: 83,
    weight: 107,
    fuelTankCapacity: 5.3,
    isAccessible: true,
    ecoScore: 7.8,
    maintenanceCostMonthly: 1200,
    maintenanceCostYearly: 14400,
    runningCostPerKm: 1.8,
    features: ['LED Headlight', 'Mobile Charging Socket', 'Easy Access', 'Low Seat Height'],
    specifications: {
      engine: '109.5cc, Single Cylinder, 4-Stroke',
      transmission: 'CVT Automatic',
      brakes: 'Drum (Front & Rear) with CBS',
      suspension: 'Telescopic Fork (Front), Spring (Rear)',
      tires: '90/90-10 (Front), 90/90-10 (Rear)'
    },
    images: ['/images/honda-activa.jpg', '/placeholder-bike-3-2.jpg'],
    colors: ['Matte Axis Grey Metallic', 'Pearl Precious White', 'Decent Blue Metallic'],
    isUpcoming: false,
    condition: 'new',
    dealerInfo: {
      name: 'Honda Showroom Secunderabad',
      location: 'Secunderabad, Hyderabad',
      contact: '+91 9876543212',
      type: 'showroom'
    },
    nearbyDealers: [
      { name: 'Honda Showroom Begumpet', location: 'Begumpet, Hyderabad', contact: '+91 9876543222', distance: 2.1, type: 'showroom' },
      { name: 'Honda Service Madhapur', location: 'Madhapur, Hyderabad', contact: '+91 9876543223', distance: 5.7, type: 'showroom' }
    ]
  },
  {
    id: '4',
    name: 'Royal Enfield Classic 350',
    brand: 'Royal Enfield',
    price: 175000,
    image: '/images/royal-enfield-classic.jpg',
    mileage: 41,
    fuelType: 'Petrol',
    engineCapacity: 349,
    maxPower: 20.2,
    maxSpeed: 113,
    weight: 195,
    fuelTankCapacity: 13,
    isAccessible: false,
    ecoScore: 5.8,
    maintenanceCostMonthly: 3200,
    maintenanceCostYearly: 38400,
    runningCostPerKm: 3.0,
    features: ['Retro Design', 'Tripper Navigation', 'LED DRL', 'Dual Channel ABS'],
    specifications: {
      engine: '349cc, Single Cylinder, 4-Stroke',
      transmission: '5-Speed Manual',
      brakes: 'Disc (Front), Drum (Rear) with ABS',
      suspension: 'Telescopic Fork (Front), Twin Shock (Rear)',
      tires: '90/90-19 (Front), 120/80-18 (Rear)'
    },
    images: ['/images/royal-enfield-classic.jpg', '/placeholder-bike-4-2.jpg'],
    colors: ['Redditch Red', 'Halcyon Black', 'Gunmetal Grey'],
    isUpcoming: false,
    condition: 'used',
    dealerInfo: {
      name: 'Premium Used Bikes',
      location: 'Banjara Hills, Hyderabad',
      contact: '+91 9876543213',
      type: 'used-dealer'
    }
  },
  {
    id: '5',
    name: 'TVS iQube Electric',
    brand: 'TVS',
    price: 125000,
    image: '/images/tvs-iqube.jpg',
    mileage: 0,
    fuelType: 'Electric',
    maxPower: 4.4,
    maxSpeed: 78,
    weight: 118,
    batteryCapacity: 2.25,
    chargingTime: 4,
    range: 75,
    isAccessible: true,
    ecoScore: 8.9,
    maintenanceCostMonthly: 600,
    maintenanceCostYearly: 7200,
    runningCostPerKm: 0.6,
    features: ['SmartXonnect', 'Accessible Design', 'Mobile App', 'GPS Navigation', 'Easy Boarding'],
    specifications: {
      engine: 'Hub Mounted Electric Motor',
      transmission: 'Single Speed Automatic',
      brakes: 'Disc (Front), Drum (Rear) with CBS',
      suspension: 'Telescopic Fork (Front), Monoshock (Rear)',
      tires: '90/90-12 (Front & Rear)'
    },
    images: ['/images/tvs-iqube.jpg', '/placeholder-bike-5-2.jpg'],
    colors: ['Titanium Grey', 'Pearl White', 'Mint Blue'],
    isUpcoming: false,
    condition: 'new',
    dealerInfo: {
      name: 'TVS Showroom Hyderabad',
      location: 'Kukatpally, Hyderabad',
      contact: '+91 9876543214',
      type: 'showroom'
    },
    nearbyDealers: [
      { name: 'TVS Service Center Gachibowli', location: 'Gachibowli, Hyderabad', contact: '+91 9876543224', distance: 4.3, type: 'showroom' },
      { name: 'TVS Showroom Miyapur', location: 'Miyapur, Hyderabad', contact: '+91 9876543225', distance: 6.8, type: 'showroom' }
    ]
  },
  {
    id: '6',
    name: 'Bajaj Pulsar NS200',
    brand: 'Bajaj',
    price: 152000,
    image: '/images/bajaj-pulsar.jpg',
    mileage: 35,
    fuelType: 'Petrol',
    engineCapacity: 199.5,
    maxPower: 24.13,
    maxSpeed: 136,
    weight: 154,
    fuelTankCapacity: 12,
    isAccessible: false,
    ecoScore: 6.2,
    maintenanceCostMonthly: 2800,
    maintenanceCostYearly: 33600,
    runningCostPerKm: 3.1,
    features: ['Liquid Cooling', 'LED Tail Light', 'Split Seats', 'Perimeter Frame'],
    specifications: {
      engine: '199.5cc, Single Cylinder, 4-Stroke',
      transmission: '6-Speed Manual',
      brakes: 'Disc (Front), Disc (Rear) with ABS',
      suspension: 'Telescopic Fork (Front), Monoshock (Rear)',
      tires: '100/80-17 (Front), 130/70-17 (Rear)'
    },
    images: ['/images/bajaj-pulsar.jpg', '/placeholder-bike-6-2.jpg'],
    colors: ['Burnt Red', 'Satin Blue', 'Pewter Grey'],
    isUpcoming: false,
    condition: 'new',
    dealerInfo: {
      name: 'Bajaj Showroom Hyderabad',
      location: 'Madhapur, Hyderabad',
      contact: '+91 9876543215',
      type: 'showroom'
    },
    nearbyDealers: [
      { name: 'Bajaj Service Center Ameerpet', location: 'Ameerpet, Hyderabad', contact: '+91 9876543226', distance: 3.9, type: 'showroom' },
      { name: 'Bajaj Showroom Uppal', location: 'Uppal, Hyderabad', contact: '+91 9876543227', distance: 7.2, type: 'showroom' }
    ]
  },
  {
    id: '7',
    name: 'Ola S1 Pro',
    brand: 'Ola',
    price: 140000,
    image: '/images/ola-s1-pro.jpg',
    mileage: 0,
    fuelType: 'Electric',
    maxPower: 8.5,
    maxSpeed: 116,
    weight: 125,
    batteryCapacity: 3.97,
    chargingTime: 6,
    range: 181,
    isAccessible: true,
    ecoScore: 9.0,
    maintenanceCostMonthly: 700,
    maintenanceCostYearly: 8400,
    runningCostPerKm: 0.7,
    features: ['MoveOS', 'Touchscreen', 'Voice Commands', 'Accessible Features', 'Smart Connectivity'],
    specifications: {
      engine: 'Hub Mounted Electric Motor',
      transmission: 'Single Speed Automatic',
      brakes: 'Disc (Front & Rear) with ABS',
      suspension: 'Telescopic Fork (Front), Monoshock (Rear)',
      tires: '90/90-12 (Front & Rear)'
    },
    images: ['/images/ola-s1-pro.jpg', '/placeholder-bike-7-2.jpg'],
    colors: ['Jet Black', 'Porcelain White', 'Liquid Silver'],
    isUpcoming: false,
    condition: 'new',
    dealerInfo: {
      name: 'Ola Electric Store',
      location: 'Gachibowli, Hyderabad',
      contact: '+91 9876543216',
      type: 'showroom'
    },
    nearbyDealers: [
      { name: 'Ola Service Center Kondapur', location: 'Kondapur, Hyderabad', contact: '+91 9876543228', distance: 2.5, type: 'showroom' },
      { name: 'Ola Experience Center Jubilee Hills', location: 'Jubilee Hills, Hyderabad', contact: '+91 9876543229', distance: 6.1, type: 'showroom' }
    ]
  },
  {
    id: '8',
    name: 'Hero Splendor Plus',
    brand: 'Hero',
    price: 72000,
    image: '/images/hero-splendor.jpg',
    mileage: 70,
    fuelType: 'Petrol',
    engineCapacity: 97.2,
    maxPower: 8.02,
    maxSpeed: 80,
    weight: 112,
    fuelTankCapacity: 9.8,
    isAccessible: true,
    ecoScore: 8.5,
    maintenanceCostMonthly: 1000,
    maintenanceCostYearly: 12000,
    runningCostPerKm: 1.5,
    features: ['i3S Technology', 'LED DRL', 'Easy Start', 'Low Maintenance', 'Comfortable Seating'],
    specifications: {
      engine: '97.2cc, Single Cylinder, 4-Stroke',
      transmission: '4-Speed Manual',
      brakes: 'Drum (Front & Rear) with CBS',
      suspension: 'Telescopic Fork (Front), Swingarm (Rear)',
      tires: '2.75-18 (Front), 2.75-18 (Rear)'
    },
    images: ['/images/hero-splendor.jpg', '/placeholder-bike-8-2.jpg'],
    colors: ['Black with Silver', 'Heavy Grey with Green', 'Black with Purple'],
    isUpcoming: false,
    condition: 'new',
    dealerInfo: {
      name: 'Hero MotoCorp Showroom',
      location: 'LB Nagar, Hyderabad',
      contact: '+91 9876543217',
      type: 'showroom'
    },
    nearbyDealers: [
      { name: 'Hero Showroom Dilsukhnagar', location: 'Dilsukhnagar, Hyderabad', contact: '+91 9876543230', distance: 1.8, type: 'showroom' },
      { name: 'Hero Service Center Kothapet', location: 'Kothapet, Hyderabad', contact: '+91 9876543231', distance: 3.4, type: 'showroom' }
    ]
  },
  {
    id: '9',
    name: 'Suzuki Access 125',
    brand: 'Suzuki',
    price: 78000,
    image: '/images/suzuki-access.jpg',
    mileage: 64,
    fuelType: 'Petrol',
    engineCapacity: 124,
    maxPower: 8.7,
    maxSpeed: 85,
    weight: 102,
    fuelTankCapacity: 5.6,
    isAccessible: true,
    ecoScore: 7.9,
    maintenanceCostMonthly: 1100,
    maintenanceCostYearly: 13200,
    runningCostPerKm: 1.7,
    features: ['Bluetooth Connectivity', 'LED Headlight', 'Large Storage', 'Accessible Design'],
    specifications: {
      engine: '124cc, Single Cylinder, 4-Stroke',
      transmission: 'CVT Automatic',
      brakes: 'Disc (Front), Drum (Rear) with CBS',
      suspension: 'Telescopic Fork (Front), Swingarm (Rear)',
      tires: '90/90-10 (Front), 90/90-10 (Rear)'
    },
    images: ['/images/suzuki-access.jpg', '/placeholder-bike-9-2.jpg'],
    colors: ['Metallic Matte Platinum Silver', 'Pearl Mirage White', 'Glossy Grey'],
    isUpcoming: false,
    condition: 'used',
    dealerInfo: {
      name: 'Quality Used Scooters',
      location: 'Somajiguda, Hyderabad',
      contact: '+91 9876543218',
      type: 'used-dealer'
    }
  },
  {
    id: '10',
    name: 'Future Electric Pro',
    brand: 'FutureMotors',
    price: 190000,
    image: '/images/future-electric-pro.jpg',
    mileage: 0,
    fuelType: 'Electric',
    maxPower: 15,
    maxSpeed: 120,
    weight: 95,
    batteryCapacity: 5.0,
    chargingTime: 3,
    range: 200,
    isAccessible: true,
    ecoScore: 9.8,
    maintenanceCostMonthly: 500,
    maintenanceCostYearly: 6000,
    runningCostPerKm: 0.5,
    features: ['AI Assistant', 'Advanced Accessibility', 'Voice Control', 'Auto-Balance', 'Smart Sensors'],
    specifications: {
      engine: 'Advanced Hub Motor with AI',
      transmission: 'Single Speed Automatic',
      brakes: 'Regenerative + Disc with ABS',
      suspension: 'Adaptive Smart Suspension',
      tires: '100/80-14 (Front & Rear)'
    },
    images: ['/images/future-electric-pro.jpg', '/placeholder-bike-10-2.jpg'],
    colors: ['Galaxy Black', 'Cosmic Blue', 'Stardust Silver'],
    launchDate: '2024-12-15',
    isUpcoming: true,
    condition: 'new',
    dealerInfo: {
      name: 'FutureMotors Experience Center',
      location: 'HITEC City, Hyderabad',
      contact: '+91 9876543219',
      type: 'showroom'
    },
    nearbyDealers: [
      { name: 'FutureMotors Service Hub', location: 'Madhapur, Hyderabad', contact: '+91 9876543232', distance: 4.7, type: 'showroom' }
    ]
  }
];

export const getBikeById = (id: string): Bike | undefined => {
  return sampleBikes.find(bike => bike.id === id);
};

export const getAccessibleBikes = (): Bike[] => {
  return sampleBikes.filter(bike => bike.isAccessible);
};

export const getUpcomingBikes = (): Bike[] => {
  return sampleBikes.filter(bike => bike.isUpcoming);
};

export const getBikesByFuelType = (fuelType: string): Bike[] => {
  return sampleBikes.filter(bike => bike.fuelType.toLowerCase() === fuelType.toLowerCase());
};

export const getBikesByCondition = (condition: 'new' | 'used'): Bike[] => {
  return sampleBikes.filter(bike => bike.condition === condition);
};

export const getNearbyDealers = (bikeId: string, condition: 'new' | 'used'): Dealer[] => {
  const bike = getBikeById(bikeId);
  if (!bike) return [];
  
  if (condition === 'new' && bike.nearbyDealers) {
    return [bike.dealerInfo, ...bike.nearbyDealers].filter(dealer => dealer.type === 'showroom');
  }
  
  if (condition === 'used') {
    // Return used bike dealers in the area
    const usedDealers: Dealer[] = [
      { name: 'City Pre-Owned Bikes', location: 'Ameerpet, Hyderabad', contact: '+91 9876543240', distance: 2.3, type: 'used-dealer' },
      { name: 'Trusted Used Vehicles', location: 'Kukatpally, Hyderabad', contact: '+91 9876543241', distance: 5.1, type: 'used-dealer' },
      { name: 'Premium Second Hand Motors', location: 'Dilsukhnagar, Hyderabad', contact: '+91 9876543242', distance: 7.8, type: 'used-dealer' }
    ];
    return [bike.dealerInfo, ...usedDealers].filter(dealer => dealer.type === 'used-dealer');
  }
  
  return [bike.dealerInfo];
};