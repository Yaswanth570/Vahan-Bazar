export interface Mechanic {
  id: string;
  name: string;
  specialization: string[];
  experience: number;
  rating: number;
  location: string;
  contact: string;
  avatar?: string;
  bio: string;
  certifications: string[];
  availability: {
    days: string[];
    hours: string;
    emergency: boolean;
  };
  services: string[];
  languages: string[];
  verified: boolean;
}

export interface CustomerCare {
  id: string;
  type: 'phone' | 'email' | 'chat' | 'whatsapp';
  title: string;
  description: string;
  contact: string;
  availability: string;
  responseTime: string;
  icon: string;
}

export const mechanics: Mechanic[] = [
  {
    id: '1',
    name: 'Rajesh Kumar',
    specialization: ['Engine Repair', 'Transmission', 'Electrical Systems'],
    experience: 15,
    rating: 4.9,
    location: 'Begumpet, Hyderabad',
    contact: '+91 98765 43210',
    avatar: '/images/mechanics/rajesh-kumar.jpg',
    bio: 'Senior mechanic with 15+ years of experience in two-wheeler repairs. Specializes in engine diagnostics and transmission work.',
    certifications: ['Automotive Service Excellence', 'Hyundai Certified', 'Honda Master Technician'],
    availability: {
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      hours: '9:00 AM - 7:00 PM',
      emergency: true
    },
    services: ['Engine Repair', 'Transmission Service', 'Electrical Diagnostics', 'Brake Service', 'Oil Change'],
    languages: ['Hindi', 'English', 'Telugu'],
    verified: true
  },
  {
    id: '2',
    name: 'Priya Sharma',
    specialization: ['Electric Vehicles', 'Battery Systems', 'Charging Infrastructure'],
    experience: 8,
    rating: 4.8,
    location: 'Gachibowli, Hyderabad',
    contact: '+91 98765 43211',
    avatar: '/images/mechanics/priya-sharma.jpg',
    bio: 'EV specialist with expertise in electric two-wheeler maintenance, battery management systems, and charging solutions.',
    certifications: ['EV Technician Certified', 'Battery Management Specialist', 'Ola Certified'],
    availability: {
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      hours: '10:00 AM - 6:00 PM',
      emergency: false
    },
    services: ['Battery Diagnostics', 'Motor Repair', 'Charging Port Service', 'Software Updates', 'Range Optimization'],
    languages: ['Hindi', 'English', 'Tamil'],
    verified: true
  },
  {
    id: '3',
    name: 'Amit Patel',
    specialization: ['Suspension', 'Brakes', 'Wheel Alignment'],
    experience: 12,
    rating: 4.7,
    location: 'Secunderabad, Hyderabad',
    contact: '+91 98765 43212',
    avatar: '/images/mechanics/amit-patel.jpg',
    bio: 'Expert in suspension systems and brake maintenance. Known for precision work and attention to detail.',
    certifications: ['Brake Specialist', 'Suspension Expert', 'Safety First Certified'],
    availability: {
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      hours: '8:00 AM - 8:00 PM',
      emergency: true
    },
    services: ['Brake Service', 'Suspension Repair', 'Wheel Alignment', 'Tire Change', 'Safety Inspection'],
    languages: ['Hindi', 'English', 'Gujarati'],
    verified: true
  },
  {
    id: '4',
    name: 'Suresh Reddy',
    specialization: ['General Maintenance', 'Oil Service', 'Chain & Sprocket'],
    experience: 20,
    rating: 4.9,
    location: 'Kukatpally, Hyderabad',
    contact: '+91 98765 43213',
    avatar: '/images/mechanics/suresh-reddy.jpg',
    bio: 'Veteran mechanic with 20 years of experience. Expert in preventive maintenance and regular servicing.',
    certifications: ['Master Mechanic', 'Preventive Maintenance Expert', 'Quality Assurance Certified'],
    availability: {
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      hours: '9:00 AM - 6:00 PM',
      emergency: false
    },
    services: ['Regular Service', 'Oil Change', 'Chain Maintenance', 'Filter Replacement', 'Tune-up'],
    languages: ['Hindi', 'English', 'Telugu'],
    verified: true
  },
  {
    id: '5',
    name: 'Neha Singh',
    specialization: ['Diagnostics', 'Computer Systems', 'Modern Electronics'],
    experience: 6,
    rating: 4.6,
    location: 'Madhapur, Hyderabad',
    contact: '+91 98765 43214',
    avatar: '/images/mechanics/neha-singh.jpg',
    bio: 'Modern diagnostics specialist with expertise in computer-controlled systems and electronic components.',
    certifications: ['Diagnostics Specialist', 'Computer Systems Expert', 'Electronics Technician'],
    availability: {
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      hours: '10:00 AM - 7:00 PM',
      emergency: true
    },
    services: ['Engine Diagnostics', 'ECU Programming', 'Sensor Replacement', 'Dashboard Repair', 'Electrical Troubleshooting'],
    languages: ['Hindi', 'English', 'Punjabi'],
    verified: true
  },
  {
    id: '6',
    name: 'Vikram Joshi',
    specialization: ['Performance Tuning', 'Modifications', 'Custom Builds'],
    experience: 10,
    rating: 4.8,
    location: 'Jubilee Hills, Hyderabad',
    contact: '+91 98765 43215',
    avatar: '/images/mechanics/vikram-joshi.jpg',
    bio: 'Performance specialist and custom modification expert. Creates unique builds and performance upgrades.',
    certifications: ['Performance Tuning Expert', 'Custom Build Specialist', 'Safety Certified'],
    availability: {
      days: ['Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      hours: '11:00 AM - 8:00 PM',
      emergency: false
    },
    services: ['Performance Tuning', 'Custom Modifications', 'Exhaust Systems', 'Air Filter Upgrades', 'ECU Remapping'],
    languages: ['Hindi', 'English', 'Marathi'],
    verified: true
  }
];

export const customerCareOptions: CustomerCare[] = [
  {
    id: '1',
    type: 'phone',
    title: '24/7 Helpline',
    description: 'Immediate assistance for urgent issues and emergency support',
    contact: '+91 1800 123 4567',
    availability: '24/7 Available',
    responseTime: 'Immediate',
    icon: 'Phone'
  },
  {
    id: '2',
    type: 'whatsapp',
    title: 'WhatsApp Support',
    description: 'Quick support via WhatsApp for non-urgent queries and assistance',
    contact: '+91 98765 43216',
    availability: '9 AM - 9 PM',
    responseTime: 'Within 30 minutes',
    icon: 'MessageCircle'
  },
  {
    id: '3',
    type: 'email',
    title: 'Email Support',
    description: 'Detailed assistance and documentation support via email',
    contact: 'support@vahanbazar.com',
    availability: '24/7 Available',
    responseTime: 'Within 4 hours',
    icon: 'Mail'
  },
  {
    id: '4',
    type: 'chat',
    title: 'Live Chat',
    description: 'Real-time chat support during business hours for instant help',
    contact: 'Start Chat',
    availability: '9 AM - 7 PM',
    responseTime: 'Immediate',
    icon: 'MessageSquare'
  }
];

export const getMechanicById = (id: string): Mechanic | undefined => {
  return mechanics.find(mechanic => mechanic.id === id);
};

export const getMechanicsBySpecialization = (specialization: string): Mechanic[] => {
  return mechanics.filter(mechanic => 
    mechanic.specialization.some(spec => 
      spec.toLowerCase().includes(specialization.toLowerCase())
    )
  );
};

export const getVerifiedMechanics = (): Mechanic[] => {
  return mechanics.filter(mechanic => mechanic.verified);
};

export const getEmergencyMechanics = (): Mechanic[] => {
  return mechanics.filter(mechanic => mechanic.availability.emergency);
};
