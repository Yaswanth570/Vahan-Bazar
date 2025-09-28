# Vahan Bazar - Two Wheeler Marketplace

A comprehensive, accessible-first two-wheeler marketplace built with React, TypeScript, and Tailwind CSS.

## 🚀 Features

### Core Features
- **Homepage** with hero section and featured bikes
- **Browse & Search** with advanced filters (brand, price, mileage, fuel type, accessibility)
- **Bike Comparison Tool** - compare up to 4 bikes side by side
- **Detailed Bike Pages** with 360° view, specs, EMI calculator, and maintenance costs
- **Upcoming Launches** with countdown timers
- **Sell Used Bike** form with image upload and condition checklist
- **Dealer Dashboard** with inventory management and analytics
- **Community Hub** with reviews, Q&A, videos, and ownership stories
- **AI Bike Matchmaker** with bilingual support (EN/TE/HI)

### Accessibility Features
- High contrast mode toggle
- Large text mode
- ARIA labels and keyboard navigation
- Special "Accessible Bikes" category
- Screen reader friendly design
- Quick accessibility buttons in navigation

### Technology Stack
- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: shadcn/ui
- **Routing**: React Router v6
- **State Management**: React Query (TanStack Query)
- **Icons**: Lucide React

## 🎨 Design System

The app uses a comprehensive design system with:
- **Primary Blue** (#0066ff) - Trust & reliability
- **Secondary Orange** (#ff6b35) - Energy & speed
- **Accent Green** (#22c55e) - Eco-friendly & electric
- **Rich gradients** and smooth animations
- **Mobile-first** responsive design
- **Semantic color tokens** for consistent theming

## 📱 Pages & Components

### Pages
- `/` - Homepage with hero section
- `/browse` - Browse bikes with filters
- `/bike/:id` - Detailed bike page
- `/compare` - Bike comparison tool
- `/upcoming` - Upcoming launches
- `/sell` - Sell used bike form
- `/community` - Community hub
- `/dealer` - Dealer dashboard

### Key Components
- `BikeCard` - Reusable bike display card
- `Navigation` - Responsive nav with accessibility controls
- `AIMatchmaker` - AI-powered bike recommendation

## 🖼️ Hero Image Setup

**IMPORTANT**: Place your hero image at `public/assets/hero.jpg` for the homepage to display correctly.

The homepage will show a fallback design if the hero image is not found, but for the best experience, add your hero image to:
```
public/
  assets/
    hero.jpg  ← Place your hero image here
```

## 🚀 Getting Started

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Add hero image** (optional but recommended)
   ```bash
   # Create the directory if it doesn't exist
   mkdir -p public/assets
   # Add your hero image as hero.jpg
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

## 📊 Sample Data

The app includes comprehensive sample data with:
- **10 bikes** including petrol, electric, and accessible options
- **Complete specifications** and pricing
- **Dealer information** and contact details
- **User reviews** and community content
- **Upcoming launches** with countdown timers

## 🌐 Accessibility

Built with accessibility as a priority:
- ♿ **Wheelchair accessible** bike filtering
- 🔍 **High contrast mode** for visual impairments
- 📝 **Large text mode** for readability
- ⌨️ **Full keyboard navigation**
- 🗣️ **Screen reader support**
- 🌍 **Bilingual support** (English/Telugu/Hindi)

## 🔮 Future Enhancements

- Backend API integration with Supabase
- User authentication (buyer/seller/dealer/admin)
- Real-time chat with dealers
- Payment gateway integration
- Advanced analytics dashboard
- Push notifications for new launches
- GPS-based dealer locator
- Virtual test rides with AR/VR

## 📝 Development Notes

- All colors use HSL format in the design system
- Components follow shadcn/ui patterns
- TypeScript strict mode enabled
- Mobile-first responsive design
- Semantic HTML for better SEO
- Performance optimized with lazy loading

## 🤝 Contributing

This is a demo project showcasing a modern two-wheeler marketplace. The focus is on accessibility, beautiful design, and comprehensive features for the Indian two-wheeler market.

----

**Built with ❤️ for the Indian two-wheeler community**