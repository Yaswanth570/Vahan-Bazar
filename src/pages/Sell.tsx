import { useState } from 'react';
import { Upload, Camera, MapPin, Phone, Mail, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';

const Sell = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    brand: '',
    model: '',
    year: '',
    mileage: '',
    price: '',
    location: '',
    condition: '',
    description: '',
    ownerName: '',
    phone: '',
    email: '',
  });

  const [conditionChecklist, setConditionChecklist] = useState({
    engine: false,
    brakes: false,
    tires: false,
    lights: false,
    battery: false,
    body: false,
    documents: false,
  });

  const totalSteps = 4;

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      // In a real app, you'd upload to a server/cloud storage
      const newImages = Array.from(files).map(file => URL.createObjectURL(file));
      setUploadedImages([...uploadedImages, ...newImages].slice(0, 8)); // Max 8 images
    }
  };

  const removeImage = (index: number) => {
    setUploadedImages(uploadedImages.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    // In a real app, this would send data to backend API
    console.log('Submitting form data:', { formData, conditionChecklist, uploadedImages });
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Show success message
    alert('Your bike listing has been submitted successfully! We will contact you within 24 hours.');
    
    // Reset form
    setCurrentStep(1);
    setFormData({
      brand: '',
      model: '',
      year: '',
      mileage: '',
      price: '',
      location: '',
      condition: '',
      description: '',
      ownerName: '',
      phone: '',
      email: '',
    });
    setConditionChecklist({
      engine: false,
      brakes: false,
      tires: false,
      lights: false,
      battery: false,
      body: false,
      documents: false,
    });
    setUploadedImages([]);
  };

  const isStepValid = (step: number) => {
    switch (step) {
      case 1:
        return formData.brand && formData.model && formData.year && formData.mileage;
      case 2:
        return formData.price && formData.location && formData.condition;
      case 3:
        return uploadedImages.length >= 3;
      case 4:
        return formData.ownerName && formData.phone && formData.email;
      default:
        return false;
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">Basic Information</h2>
              <p className="text-muted-foreground">Tell us about your bike</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="brand">Brand *</Label>
                <Select value={formData.brand} onValueChange={(value) => setFormData({...formData, brand: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select brand" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yamaha">Yamaha</SelectItem>
                    <SelectItem value="honda">Honda</SelectItem>
                    <SelectItem value="bajaj">Bajaj</SelectItem>
                    <SelectItem value="tvs">TVS</SelectItem>
                    <SelectItem value="hero">Hero</SelectItem>
                    <SelectItem value="royal-enfield">Royal Enfield</SelectItem>
                    <SelectItem value="ather">Ather</SelectItem>
                    <SelectItem value="ola">Ola</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="model">Model *</Label>
                <Input
                  id="model"
                  value={formData.model}
                  onChange={(e) => setFormData({...formData, model: e.target.value})}
                  placeholder="e.g., MT-15, Activa 6G"
                />
              </div>

              <div>
                <Label htmlFor="year">Year *</Label>
                <Select value={formData.year} onValueChange={(value) => setFormData({...formData, year: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select year" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 15 }, (_, i) => new Date().getFullYear() - i).map(year => (
                      <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="mileage">Odometer Reading (km) *</Label>
                <Input
                  id="mileage"
                  type="number"
                  value={formData.mileage}
                  onChange={(e) => setFormData({...formData, mileage: e.target.value})}
                  placeholder="e.g., 15000"
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">Pricing & Location</h2>
              <p className="text-muted-foreground">Set your asking price and location</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="price">Expected Price (₹) *</Label>
                <Input
                  id="price"
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({...formData, price: e.target.value})}
                  placeholder="e.g., 120000"
                />
                <p className="text-sm text-muted-foreground mt-1">
                  We'll help you get the best price based on market value
                </p>
              </div>

              <div>
                <Label htmlFor="location">Location *</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                  placeholder="e.g., Hyderabad, Telangana"
                />
              </div>

              <div className="md:col-span-2">
                <Label htmlFor="condition">Overall Condition *</Label>
                <Select value={formData.condition} onValueChange={(value) => setFormData({...formData, condition: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select condition" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="excellent">Excellent - Like new, no issues</SelectItem>
                    <SelectItem value="good">Good - Minor wear, well maintained</SelectItem>
                    <SelectItem value="fair">Fair - Some issues, runs well</SelectItem>
                    <SelectItem value="needs-work">Needs Work - Requires repairs</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="md:col-span-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="Describe your bike's condition, any modifications, service history, etc."
                  rows={4}
                />
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">Photos & Condition Check</h2>
              <p className="text-muted-foreground">Upload photos and complete condition checklist</p>
            </div>

            {/* Image Upload */}
            <div>
              <Label>Photos (minimum 3 required) *</Label>
              <div className="mt-2 space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {uploadedImages.map((image, index) => (
                    <div key={index} className="relative aspect-square rounded-lg overflow-hidden bg-surface">
                      <img src={image} alt={`Upload ${index + 1}`} className="w-full h-full object-cover" />
                      <Button
                        variant="destructive"
                        size="sm"
                        className="absolute top-2 right-2"
                        onClick={() => removeImage(index)}
                      >
                        ×
                      </Button>
                    </div>
                  ))}
                  
                  {uploadedImages.length < 8 && (
                    <label className="aspect-square rounded-lg border-2 border-dashed border-border hover:border-primary/50 transition-colors cursor-pointer flex flex-col items-center justify-center">
                      <Upload className="w-8 h-8 text-muted-foreground mb-2" />
                      <span className="text-sm text-muted-foreground">Add Photo</span>
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">
                  Upload clear photos from different angles. Good photos help sell faster!
                </p>
              </div>
            </div>

            {/* Condition Checklist */}
            <div>
              <Label>Condition Checklist</Label>
              <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(conditionChecklist).map(([key, checked]) => (
                  <label key={key} className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-surface transition-colors">
                    <Checkbox
                      checked={checked}
                      onCheckedChange={(isChecked) => 
                        setConditionChecklist({...conditionChecklist, [key]: !!isChecked})
                      }
                    />
                    <div className="flex-1">
                      <span className="font-medium capitalize">
                        {key === 'documents' ? 'All documents available' : `${key} in good condition`}
                      </span>
                    </div>
                    {checked && <CheckCircle className="w-4 h-4 text-green-600" />}
                  </label>
                ))}
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">Contact Information</h2>
              <p className="text-muted-foreground">How interested buyers can reach you</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="ownerName">Your Name *</Label>
                <Input
                  id="ownerName"
                  value={formData.ownerName}
                  onChange={(e) => setFormData({...formData, ownerName: e.target.value})}
                  placeholder="Your full name"
                />
              </div>

              <div>
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  placeholder="+91 9876543210"
                />
              </div>

              <div className="md:col-span-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  placeholder="your.email@example.com"
                />
              </div>
            </div>

            {/* Summary */}
            <Card className="bg-surface">
              <CardHeader>
                <CardTitle>Listing Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Bike:</span>
                    <span className="ml-2 font-medium">{formData.brand} {formData.model} ({formData.year})</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Mileage:</span>
                    <span className="ml-2 font-medium">{formData.mileage} km</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Price:</span>
                    <span className="ml-2 font-medium">₹{formData.price}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Location:</span>
                    <span className="ml-2 font-medium">{formData.location}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Condition:</span>
                    <Badge variant="outline" className="ml-2">{formData.condition}</Badge>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Photos:</span>
                    <span className="ml-2 font-medium">{uploadedImages.length} uploaded</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Sell Your Bike</h1>
          <p className="text-muted-foreground">
            Get the best price for your bike with our simple listing process
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step) => (
              <div key={step} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                    step < currentStep
                      ? 'bg-primary text-primary-foreground'
                      : step === currentStep
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {step < currentStep ? '✓' : step}
                </div>
                {step < totalSteps && (
                  <div
                    className={`flex-1 h-1 mx-4 ${
                      step < currentStep ? 'bg-primary' : 'bg-muted'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2 text-sm text-muted-foreground">
            <span>Basic Info</span>
            <span>Pricing</span>
            <span>Photos</span>
            <span>Contact</span>
          </div>
        </div>

        {/* Form Content */}
        <Card className="mb-8">
          <CardContent className="p-6">
            {renderStepContent()}
          </CardContent>
        </Card>

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
            disabled={currentStep === 1}
          >
            Previous
          </Button>
          
          {currentStep < totalSteps ? (
            <Button
              onClick={() => setCurrentStep(currentStep + 1)}
              disabled={!isStepValid(currentStep)}
            >
              Next
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              disabled={!isStepValid(currentStep)}
              className="bg-primary hover:bg-primary-dark"
            >
              Submit Listing
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sell;