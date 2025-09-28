import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { 
  Phone, 
  Mail, 
  MessageCircle, 
  MessageSquare, 
  Clock, 
  Shield, 
  HelpCircle,
  Send,
  CheckCircle,
  AlertCircle,
  Headphones,
  FileText,
  MessageCircle as ChatIcon,
  ExternalLink
} from 'lucide-react';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { customerCareOptions, CustomerCare } from '@/data/mechanics';

const CustomerCare: React.FC = () => {
  const [selectedSupportType, setSelectedSupportType] = useState<string>('');
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    category: '',
    message: '',
    priority: 'medium'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const supportCategories = [
    'General Inquiry',
    'Technical Support',
    'Billing & Payment',
    'Vehicle Information',
    'Service Booking',
    'Complaint',
    'Feedback',
    'Partnership Inquiry'
  ];

  const priorityLevels = [
    { value: 'low', label: 'Low', color: 'text-green-600', bg: 'bg-green-50' },
    { value: 'medium', label: 'Medium', color: 'text-yellow-600', bg: 'bg-yellow-50' },
    { value: 'high', label: 'High', color: 'text-orange-600', bg: 'bg-orange-50' },
    { value: 'urgent', label: 'Urgent', color: 'text-red-600', bg: 'bg-red-50' }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setContactForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Reset form
      setContactForm({
        name: '',
        email: '',
        phone: '',
        subject: '',
        category: '',
        message: '',
        priority: 'medium'
      });
      
      setSubmitStatus('success');
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getIcon = (iconName: string) => {
    const icons: { [key: string]: React.ReactNode } = {
      Phone: <Phone className="w-6 h-6" />,
      MessageCircle: <MessageCircle className="w-6 h-6" />,
      Mail: <Mail className="w-6 h-6" />,
      MessageSquare: <MessageSquare className="w-6 h-6" />
    };
    return icons[iconName] || <HelpCircle className="w-6 h-6" />;
  };

  const getSupportTypeColor = (type: string) => {
    const colors = {
      phone: 'bg-green-500',
      whatsapp: 'bg-green-600',
      email: 'bg-blue-500',
      chat: 'bg-purple-500'
    };
    return colors[type as keyof typeof colors] || 'bg-gray-500';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-surface to-primary-light/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Customer <span className="text-primary">Care</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We're here to help! Choose the best way to reach us for quick and efficient support.
          </p>
        </div>

        {/* Support Options Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {customerCareOptions.map((option, index) => (
            <Card 
              key={option.id} 
              className="card-hover bg-card/80 backdrop-blur-sm border-border/50 fade-in cursor-pointer bounce-gentle"
              style={{animationDelay: `${index * 0.1}s`}}
              onClick={() => setSelectedSupportType(option.type)}
            >
              <CardContent className="p-6 text-center">
                <div className={`w-16 h-16 ${getSupportTypeColor(option.type)} rounded-full flex items-center justify-center text-white mx-auto mb-4`}>
                  {getIcon(option.icon)}
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{option.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{option.description}</p>
                
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-center gap-2 text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <span>{option.availability}</span>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-muted-foreground">
                    <Shield className="w-4 h-4" />
                    <span>{option.responseTime}</span>
                  </div>
                </div>

                <Button 
                  className="w-full mt-4 bounce-gentle"
                  variant={selectedSupportType === option.type ? "default" : "outline"}
                >
                  {option.type === 'phone' ? 'Call Now' : 
                   option.type === 'whatsapp' ? 'WhatsApp' :
                   option.type === 'email' ? 'Send Email' : 'Start Chat'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <Card className="card-hover bg-card/80 backdrop-blur-sm border-border/50 mb-12">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Headphones className="w-5 h-5 text-primary" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button 
                variant="outline" 
                className="h-auto p-4 flex flex-col items-center gap-2 bounce-gentle"
                asChild
              >
                <a href="/faq">
                  <HelpCircle className="w-6 h-6" />
                  <div className="text-center">
                    <div className="font-medium">FAQ</div>
                    <div className="text-sm text-muted-foreground">Find quick answers</div>
                  </div>
                </a>
              </Button>
              
              <Button 
                variant="outline" 
                className="h-auto p-4 flex flex-col items-center gap-2 bounce-gentle"
                asChild
              >
                <a href="/documentation">
                  <FileText className="w-6 h-6" />
                  <div className="text-center">
                    <div className="font-medium">Documentation</div>
                    <div className="text-sm text-muted-foreground">User guides & manuals</div>
                  </div>
                </a>
              </Button>
              
              <Button 
                variant="outline" 
                className="h-auto p-4 flex flex-col items-center gap-2 bounce-gentle"
                asChild
              >
                <a href="/live-chat">
                  <ChatIcon className="w-6 h-6" />
                  <div className="text-center">
                    <div className="font-medium">Live Chat</div>
                    <div className="text-sm text-muted-foreground">Instant support</div>
                  </div>
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Contact Form */}
        <Card className="card-hover bg-card/80 backdrop-blur-sm border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-primary" />
              Send us a Message
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Status Messages */}
              {submitStatus === 'success' && (
                <Alert className="bg-green-50 border-green-200">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <AlertDescription className="text-green-800">
                    Your message has been sent successfully! We'll get back to you soon.
                  </AlertDescription>
                </Alert>
              )}
              
              {submitStatus === 'error' && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    There was an error sending your message. Please try again.
                  </AlertDescription>
                </Alert>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    name="name"
                    value={contactForm.name}
                    onChange={handleInputChange}
                    required
                    className="focus-ring mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={contactForm.email}
                    onChange={handleInputChange}
                    required
                    className="focus-ring mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={contactForm.phone}
                    onChange={handleInputChange}
                    className="focus-ring mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="priority">Priority Level</Label>
                  <Select 
                    value={contactForm.priority} 
                    onValueChange={(value) => setContactForm(prev => ({ ...prev, priority: value }))}
                  >
                    <SelectTrigger className="focus-ring mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {priorityLevels.map((priority) => (
                        <SelectItem key={priority.value} value={priority.value}>
                          <div className="flex items-center gap-2">
                            <div className={`w-2 h-2 rounded-full ${priority.bg}`}></div>
                            {priority.label}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="category">Category *</Label>
                <Select 
                  value={contactForm.category} 
                  onValueChange={(value) => setContactForm(prev => ({ ...prev, category: value }))}
                >
                  <SelectTrigger className="focus-ring mt-1">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {supportCategories.map((category) => (
                      <SelectItem key={category} value={category.toLowerCase()}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="subject">Subject *</Label>
                <Input
                  id="subject"
                  name="subject"
                  value={contactForm.subject}
                  onChange={handleInputChange}
                  required
                  className="focus-ring mt-1"
                />
              </div>

              <div>
                <Label htmlFor="message">Message *</Label>
                <Textarea
                  id="message"
                  name="message"
                  value={contactForm.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className="focus-ring mt-1"
                  placeholder="Please describe your inquiry in detail..."
                />
              </div>

              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full btn-glow bounce-gentle"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Send Message
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Emergency Contact */}
        <Card className="card-hover bg-gradient-to-r from-red-50 to-orange-50 border-red-200 mt-8">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center">
                <Phone className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-red-800">Emergency Support</h3>
                <p className="text-red-700">For urgent vehicle issues or roadside assistance</p>
              </div>
              <Button 
                variant="destructive" 
                size="lg"
                className="bounce-gentle"
                asChild
              >
                <a href="tel:+91-1800-123-4567">
                  <Phone className="w-4 h-4 mr-2" />
                  Call Emergency
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Additional Resources */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="card-hover bg-card/80 backdrop-blur-sm border-border/50">
            <CardHeader>
              <CardTitle>Business Hours</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Monday - Friday</span>
                  <span>9:00 AM - 7:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday</span>
                  <span>9:00 AM - 5:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday</span>
                  <span>Emergency Only</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="card-hover bg-card/80 backdrop-blur-sm border-border/50">
            <CardHeader>
              <CardTitle>Response Times</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Phone Support</span>
                  <Badge variant="outline">Immediate</Badge>
                </div>
                <div className="flex justify-between">
                  <span>Live Chat</span>
                  <Badge variant="outline">Within 2 minutes</Badge>
                </div>
                <div className="flex justify-between">
                  <span>Email Support</span>
                  <Badge variant="outline">Within 4 hours</Badge>
                </div>
                <div className="flex justify-between">
                  <span>WhatsApp</span>
                  <Badge variant="outline">Within 30 minutes</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CustomerCare;
