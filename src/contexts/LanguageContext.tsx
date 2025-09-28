import React, { createContext, useState, useContext, ReactNode } from 'react';

// Define available languages
export const languages = {
  en: {
    name: 'English',
    translations: {
      // Navigation
      home: 'Home',
      browse: 'Browse',
      dealers: 'Dealers',
      upcoming: 'Upcoming',
      testRide: 'Test Ride',
      usedBikes: 'Used Bikes',
      showrooms: 'Showrooms',
      mechanics: 'Mechanics',
      support: 'Support',
      community: 'Community',
      dashboard: 'Dashboard',
      
      // Home page
      heroTitle: 'Find Your Perfect Ride',
      heroSubtitle: 'Explore the best two-wheelers in India',
      search: 'Search bikes, brands, or models...',
      electricFirst: 'Electric First',
      testRideFeature: 'Test Ride',
      smartCompare: 'Smart Compare',
      
      // Award-winning features
      awardWinningFeatures: 'Award-Winning Features',
      aiRecommendations: 'AI Recommendations',
      ecoImpactCalculator: 'Eco-Impact Calculator',
      arExperience: 'AR Experience',
      
      // AI Recommendations
      whatBikeForYou: 'What bike is right for you?',
      budget: 'Budget',
      fuelType: 'Fuel Type',
      usage: 'Usage',
      terrain: 'Terrain',
      experience: 'Experience',
      getRecommendations: 'Get Recommendations',
      
      // Eco-Impact Calculator
      calculateImpact: 'Calculate Your Environmental Impact',
      vehicleType: 'Vehicle Type',
      dailyDistance: 'Daily Distance (km)',
      ownershipPeriod: 'Ownership Period (years)',
      calculate: 'Calculate',
      co2Reduction: 'CO2 Reduction',
      fuelSavings: 'Fuel Savings',
      treesEquivalent: 'Trees Equivalent',
      ecoScore: 'Eco Score',
      
      // Accessibility
      accessibility: 'Accessibility',
      fontSize: 'Font Size',
      contrast: 'Contrast',
      screenReader: 'Screen Reader',
      dyslexicFont: 'Dyslexic Font',
      reducedMotion: 'Reduced Motion',
      
      // Common actions
      apply: 'Apply',
      reset: 'Reset',
      close: 'Close',
      viewDetails: 'View Details',
      compare: 'Compare',
      book: 'Book',
      buy: 'Buy',
      sell: 'Sell',
    }
  },
  hi: {
    name: 'हिन्दी',
    translations: {
      // Navigation
      home: 'होम',
      browse: 'ब्राउज़',
      dealers: 'डीलर्स',
      upcoming: 'आगामी',
      testRide: 'टेस्ट राइड',
      usedBikes: 'इस्तेमाल की गई बाइक',
      showrooms: 'शोरूम',
      mechanics: 'मैकेनिक्स',
      support: 'सहायता',
      community: 'समुदाय',
      dashboard: 'डैशबोर्ड',
      
      // Home page
      heroTitle: 'अपनी परफेक्ट सवारी खोजें',
      heroSubtitle: 'भारत की सर्वश्रेष्ठ दोपहिया वाहनों का अन्वेषण करें',
      search: 'बाइक, ब्रांड, या मॉडल खोजें...',
      electricFirst: 'इलेक्ट्रिक फर्स्ट',
      testRideFeature: 'टेस्ट राइड',
      smartCompare: 'स्मार्ट कंपेयर',
      
      // Award-winning features
      awardWinningFeatures: 'पुरस्कार विजेता विशेषताएं',
      aiRecommendations: 'एआई अनुशंसाएँ',
      ecoImpactCalculator: 'इको-इम्पैक्ट कैलकुलेटर',
      arExperience: 'एआर अनुभव',
      
      // AI Recommendations
      whatBikeForYou: 'आपके लिए कौन सी बाइक सही है?',
      budget: 'बजट',
      fuelType: 'ईंधन प्रकार',
      usage: 'उपयोग',
      terrain: 'इलाका',
      experience: 'अनुभव',
      getRecommendations: 'अनुशंसाएँ प्राप्त करें',
      
      // Eco-Impact Calculator
      calculateImpact: 'अपना पर्यावरणीय प्रभाव गणना करें',
      vehicleType: 'वाहन प्रकार',
      dailyDistance: 'दैनिक दूरी (किमी)',
      ownershipPeriod: 'स्वामित्व अवधि (वर्ष)',
      calculate: 'गणना करें',
      co2Reduction: 'CO2 कमी',
      fuelSavings: 'ईंधन बचत',
      treesEquivalent: 'पेड़ों के बराबर',
      ecoScore: 'इको स्कोर',
      
      // Accessibility
      accessibility: 'पहुंच',
      fontSize: 'फ़ॉन्ट आकार',
      contrast: 'कंट्रास्ट',
      screenReader: 'स्क्रीन रीडर',
      dyslexicFont: 'डिस्लेक्सिक फॉन्ट',
      reducedMotion: 'कम मोशन',
      
      // Common actions
      apply: 'लागू करें',
      reset: 'रीसेट',
      close: 'बंद करें',
      viewDetails: 'विवरण देखें',
      compare: 'तुलना करें',
      book: 'बुक करें',
      buy: 'खरीदें',
      sell: 'बेचें',
    }
  },
  te: {
    name: 'తెలుగు',
    translations: {
      // Navigation
      home: 'హోమ్',
      browse: 'బ్రౌజ్',
      dealers: 'డీలర్లు',
      upcoming: 'రాబోయే',
      testRide: 'టెస్ట్ రైడ్',
      usedBikes: 'ఉపయోగించిన బైక్‌లు',
      showrooms: 'షోరూమ్‌లు',
      mechanics: 'మెకానిక్స్',
      support: 'సపోర్ట్',
      community: 'కమ్యూనిటీ',
      dashboard: 'డాష్‌బోర్డ్',
      
      // Home page
      heroTitle: 'మీ పర్ఫెక్ట్ రైడ్‌ని కనుగొనండి',
      heroSubtitle: 'భారతదేశంలోని ఉత్తమ ద్విచక్ర వాహనాలను అన్వేషించండి',
      search: 'బైక్‌లు, బ్రాండ్‌లు లేదా మోడల్‌లను శోధించండి...',
      electricFirst: 'ఎలక్ట్రిక్ ఫస్ట్',
      testRideFeature: 'టెస్ట్ రైడ్',
      smartCompare: 'స్మార్ట్ కంపేర్',
      
      // Award-winning features
      awardWinningFeatures: 'అవార్డు గెలుచుకున్న ఫీచర్లు',
      aiRecommendations: 'AI సిఫార్సులు',
      ecoImpactCalculator: 'ఎకో-ఇంపాక్ట్ కాల్క్యులేటర్',
      arExperience: 'AR అనుభవం',
      
      // Common actions
      apply: 'వర్తించు',
      reset: 'రీసెట్',
      close: 'మూసివేయి',
      viewDetails: 'వివరాలను చూడండి',
      compare: 'పోల్చండి',
      book: 'బుక్ చేయండి',
      buy: 'కొనుగోలు చేయండి',
      sell: 'విక్రయించండి',
    }
  },
  ta: {
    name: 'தமிழ்',
    translations: {
      // Navigation
      home: 'முகப்பு',
      browse: 'உலாவு',
      dealers: 'விற்பனையாளர்கள்',
      upcoming: 'வரவிருக்கும்',
      testRide: 'சோதனை சவாரி',
      usedBikes: 'பயன்படுத்தப்பட்ட பைக்குகள்',
      showrooms: 'காட்சியறைகள்',
      mechanics: 'மெக்கானிக்ஸ்',
      support: 'ஆதரவு',
      community: 'சமூகம்',
      dashboard: 'டாஷ்போர்டு',
      
      // Home page
      heroTitle: 'உங்கள் சரியான சவாரியைக் கண்டறியுங்கள்',
      heroSubtitle: 'இந்தியாவின் சிறந்த இருசக்கர வாகனங்களை ஆராயுங்கள்',
      search: 'பைக்குகள், பிராண்டுகள் அல்லது மாடல்களைத் தேடுங்கள்...',
      electricFirst: 'மின்சாரம் முதலில்',
      testRideFeature: 'சோதனை சவாரி',
      smartCompare: 'ஸ்மார்ட் ஒப்பீடு',
      
      // Award-winning features
      awardWinningFeatures: 'விருது பெற்ற அம்சங்கள்',
      aiRecommendations: 'AI பரிந்துரைகள்',
      ecoImpactCalculator: 'சுற்றுச்சூழல் தாக்க கணிப்பான்',
      arExperience: 'AR அனுபவம்',
      
      // Common actions
      apply: 'பயன்படுத்து',
      reset: 'மீட்டமை',
      close: 'மூடு',
      viewDetails: 'விவரங்களைக் காண்க',
      compare: 'ஒப்பிடு',
      book: 'முன்பதிவு செய்',
      buy: 'வாங்கு',
      sell: 'விற்க',
    }
  }
};

type LanguageContextType = {
  currentLanguage: string;
  setLanguage: (lang: string) => void;
  t: (key: string) => string;
};

const LanguageContext = createContext<LanguageContextType>({
  currentLanguage: 'en',
  setLanguage: () => {},
  t: (key: string) => key,
});

export const LanguageProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState(() => {
    // Get saved language from localStorage or default to 'en'
    const savedLanguage = localStorage.getItem('vahan-language') || 'en';
    return savedLanguage;
  });

  const setLanguage = (lang: string) => {
    if (languages[lang as keyof typeof languages]) {
      setCurrentLanguage(lang);
      document.documentElement.lang = lang;
      // Save language preference to localStorage
      localStorage.setItem('vahan-language', lang);
    }
  };

  const t = (key: string): string => {
    const langObj = languages[currentLanguage as keyof typeof languages];
    return langObj?.translations[key as keyof typeof langObj.translations] || key;
  };

  return (
    <LanguageContext.Provider value={{ currentLanguage, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);

// We don't need to export the context directly as we're using the useLanguage hook
// export default LanguageContext;