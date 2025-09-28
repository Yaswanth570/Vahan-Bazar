import { useState } from 'react';
import { MessageCircle, ThumbsUp, Star, Play, User, Calendar, MapPin, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const Community = () => {
  const [activeTab, setActiveTab] = useState('reviews');

  const reviews = [
    {
      id: 1,
      user: { name: 'Raj Kumar', avatar: '/user-1.jpg', location: 'Hyderabad' },
      bike: 'Yamaha MT-15',
      rating: 4.5,
      date: '2024-01-15',
      title: 'Perfect for city commuting',
      content: 'Been using this bike for 6 months now. Great fuel efficiency and smooth ride. The ABS works perfectly and saved me multiple times in traffic.',
      likes: 24,
      replies: 8,
      verified: true
    },
    {
      id: 2,
      user: { name: 'Priya Sharma', avatar: '/user-2.jpg', location: 'Bangalore' },
      bike: 'Ather 450X',
      rating: 5,
      date: '2024-01-10',
      title: 'Amazing electric experience',
      content: 'Switched from petrol to electric and loving it! Super quiet, instant torque, and the touchscreen is intuitive. Charging network is improving too.',
      likes: 31,
      replies: 12,
      verified: true
    },
    {
      id: 3,
      user: { name: 'Arjun Reddy', avatar: '/user-3.jpg', location: 'Chennai' },
      bike: 'Royal Enfield Classic 350',
      rating: 4,
      date: '2024-01-08',
      title: 'Classic charm with modern reliability',
      content: 'The new J-series engine is much more refined than the old UCE. Great for weekend rides and the thump is still there!',
      likes: 18,
      replies: 5,
      verified: false
    }
  ];

  const questions = [
    {
      id: 1,
      user: { name: 'Suresh Babu', avatar: '/user-4.jpg' },
      question: 'Which is better for long rides - MT-15 or Pulsar NS200?',
      answers: 7,
      date: '2024-01-16',
      tags: ['comparison', 'touring']
    },
    {
      id: 2,
      user: { name: 'Meera Singh', avatar: '/user-5.jpg' },
      question: 'Best electric scooter for office commute in 2024?',
      answers: 12,
      date: '2024-01-15',
      tags: ['electric', 'commute', 'scooter']
    },
    {
      id: 3,
      user: { name: 'Vikram Joshi', avatar: '/user-6.jpg' },
      question: 'How to maintain bike during monsoon season?',
      answers: 15,
      date: '2024-01-14',
      tags: ['maintenance', 'monsoon', 'tips']
    }
  ];

  const videos = [
    {
      id: 1,
      title: 'Ather 450X vs Ola S1 Pro - Detailed Comparison',
      creator: 'BikeGuru Reviews',
      views: '125K',
      duration: '12:45',
      thumbnail: '/video-thumb-1.jpg'
    },
    {
      id: 2,
      title: 'Top 5 Accessible Bikes for Differently Abled Riders',
      creator: 'Inclusive Rides',
      views: '89K',
      duration: '8:30',
      thumbnail: '/video-thumb-2.jpg'
    },
    {
      id: 3,
      title: 'Budget Electric Bikes Under ₹1 Lakh',
      creator: 'EV Explorer',
      views: '156K',
      duration: '15:20',
      thumbnail: '/video-thumb-3.jpg'
    }
  ];

  const stories = [
    {
      id: 1,
      user: { name: 'Rahul Patel', avatar: '/user-7.jpg', location: 'Mumbai' },
      bike: 'Honda Activa 6G',
      title: 'My 50,000 km journey',
      excerpt: 'From my first day of college to landing my dream job, my Activa has been my faithful companion through it all...',
      date: '2024-01-12',
      readTime: '5 min read',
      image: '/story-1.jpg'
    },
    {
      id: 2,
      user: { name: 'Anjali Devi', avatar: '/user-8.jpg', location: 'Delhi' },
      bike: 'TVS iQube',
      title: 'Breaking barriers on two wheels',
      excerpt: 'As a woman with mobility challenges, finding the right accessible bike changed my life completely...',
      date: '2024-01-10',
      readTime: '7 min read',
      image: '/story-2.jpg'
    }
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < Math.floor(rating)
            ? 'text-yellow-400 fill-yellow-400'
            : i < rating
            ? 'text-yellow-400 fill-yellow-400/50'
            : 'text-muted-foreground'
        }`}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Community Hub</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Connect with fellow riders, share experiences, and get answers to all your two-wheeler questions
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search reviews, questions, or topics..."
              className="pl-10 h-12"
            />
          </div>
        </div>

        {/* Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
            <TabsTrigger value="questions">Q&A</TabsTrigger>
            <TabsTrigger value="videos">Videos</TabsTrigger>
            <TabsTrigger value="stories">Stories</TabsTrigger>
          </TabsList>

          <TabsContent value="reviews" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">User Reviews</h2>
              <Button>Write a Review</Button>
            </div>

            <div className="space-y-6">
              {reviews.map((review) => (
                <Card key={review.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-4">
                        <Avatar>
                          <AvatarImage src={review.user.avatar} alt={review.user.name} />
                          <AvatarFallback>
                            <User className="w-5 h-5" />
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold">{review.user.name}</h3>
                            {review.verified && (
                              <Badge variant="secondary" className="text-xs">
                                Verified Owner
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              {review.user.location}
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {new Date(review.date).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1 mb-1">
                          {renderStars(review.rating)}
                        </div>
                        <Badge variant="outline">{review.bike}</Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <h4 className="font-semibold mb-2">{review.title}</h4>
                    <p className="text-muted-foreground mb-4">{review.content}</p>
                    <div className="flex items-center gap-4">
                      <Button variant="ghost" size="sm">
                        <ThumbsUp className="w-4 h-4 mr-1" />
                        {review.likes}
                      </Button>
                      <Button variant="ghost" size="sm">
                        <MessageCircle className="w-4 h-4 mr-1" />
                        {review.replies} replies
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="questions" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Questions & Answers</h2>
              <Button>Ask a Question</Button>
            </div>

            <div className="space-y-4">
              {questions.map((q) => (
                <Card key={q.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <Avatar className="w-8 h-8">
                            <AvatarImage src={q.user.avatar} alt={q.user.name} />
                            <AvatarFallback>
                              <User className="w-4 h-4" />
                            </AvatarFallback>
                          </Avatar>
                          <span className="font-medium">{q.user.name}</span>
                          <span className="text-sm text-muted-foreground">{q.date}</span>
                        </div>
                        
                        <h3 className="font-semibold text-lg mb-3">{q.question}</h3>
                        
                        <div className="flex items-center gap-2 mb-3">
                          {q.tags.map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div className="text-center ml-4">
                        <div className="text-2xl font-bold text-primary">{q.answers}</div>
                        <div className="text-xs text-muted-foreground">answers</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="videos" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Video Reviews & Guides</h2>
              <Button variant="outline">Submit Video</Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {videos.map((video) => (
                <Card key={video.id} className="hover:shadow-md transition-shadow">
                  <div className="relative aspect-video">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-full object-cover rounded-t-lg"
                      onError={(e) => {
                        e.currentTarget.src = '/placeholder-video.jpg';
                      }}
                    />
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                      <Button size="lg" className="bg-white/20 hover:bg-white/30 text-white">
                        <Play className="w-6 h-6" />
                      </Button>
                    </div>
                    <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                      {video.duration}
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-2 line-clamp-2">{video.title}</h3>
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>{video.creator}</span>
                      <span>{video.views} views</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="stories" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Ownership Stories</h2>
              <Button>Share Your Story</Button>
            </div>

            <div className="space-y-6">
              {stories.map((story) => (
                <Card key={story.id} className="overflow-hidden hover:shadow-md transition-shadow">
                  <div className="md:flex">
                    <div className="md:w-1/3">
                      <img
                        src={story.image}
                        alt={story.title}
                        className="w-full h-48 md:h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = '/placeholder-story.jpg';
                        }}
                      />
                    </div>
                    <div className="md:w-2/3 p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <Avatar className="w-8 h-8">
                          <AvatarImage src={story.user.avatar} alt={story.user.name} />
                          <AvatarFallback>
                            <User className="w-4 h-4" />
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{story.user.name}</div>
                          <div className="text-sm text-muted-foreground">{story.user.location}</div>
                        </div>
                        <Badge variant="outline">{story.bike}</Badge>
                      </div>
                      
                      <h3 className="text-xl font-bold mb-2">{story.title}</h3>
                      <p className="text-muted-foreground mb-4">{story.excerpt}</p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>{story.date}</span>
                          <span>{story.readTime}</span>
                        </div>
                        <Button variant="outline" size="sm">
                          Read More
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Community;