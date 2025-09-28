import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Zap, ArrowRight, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import BikeCard from '@/components/BikeCard';
import { getUpcomingBikes } from '@/data/bikes';

const Upcoming = () => {
  const [timeLeft, setTimeLeft] = useState<{ [key: string]: string }>({});
  const upcomingBikes = getUpcomingBikes();

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const newTimeLeft: { [key: string]: string } = {};

      upcomingBikes.forEach(bike => {
        if (bike.launchDate) {
          const launchTime = new Date(bike.launchDate).getTime();
          const difference = launchTime - now;

          if (difference > 0) {
            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((difference % (1000 * 60)) / 1000);

            newTimeLeft[bike.id] = `${days}d ${hours}h ${minutes}m ${seconds}s`;
          } else {
            newTimeLeft[bike.id] = 'Launched!';
          }
        }
      });

      setTimeLeft(newTimeLeft);
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [upcomingBikes]);

  const formatLaunchDate = (dateString?: string) => {
    if (!dateString) return 'TBA';
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Zap className="w-8 h-8 text-warning mr-3" />
            <h1 className="text-3xl sm:text-4xl font-bold">Upcoming Launches</h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Get ready for the future of two-wheelers. These exciting new models are coming soon!
          </p>
        </div>

        {upcomingBikes.length === 0 ? (
          /* Empty State */
          <Card className="p-12 text-center">
            <CardContent>
              <Calendar className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">No Upcoming Launches</h2>
              <p className="text-muted-foreground mb-6">
                Stay tuned for announcements about exciting new bike launches
              </p>
              <Button asChild>
                <Link to="/browse">
                  Browse Available Bikes
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <>
            {/* Featured Upcoming Launch */}
            {upcomingBikes[0] && (
              <section className="mb-16">
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary to-secondary p-8 text-white">
                  <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                    <div className="space-y-6">
                      <div>
                        <Badge className="bg-white/20 text-white border-white/30 mb-4">
                          <Calendar className="w-3 h-3 mr-1" />
                          Featured Launch
                        </Badge>
                        <h2 className="text-4xl font-bold mb-2">{upcomingBikes[0].name}</h2>
                        <p className="text-xl text-white/90">{upcomingBikes[0].brand}</p>
                      </div>

                      {/* Countdown */}
                      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                        <p className="text-sm text-white/80 mb-2">Launching in</p>
                        <div className="text-3xl font-bold font-mono">
                          {timeLeft[upcomingBikes[0].id] || 'Calculating...'}
                        </div>
                        <p className="text-sm text-white/80 mt-2">
                          Expected: {formatLaunchDate(upcomingBikes[0].launchDate)}
                        </p>
                      </div>

                      {/* Key Features */}
                      <div>
                        <h3 className="font-semibold mb-3">Key Highlights</h3>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-white/80">Max Speed</p>
                            <p className="font-semibold">{upcomingBikes[0].maxSpeed} km/h</p>
                          </div>
                          <div>
                            <p className="text-white/80">Range</p>
                            <p className="font-semibold">{upcomingBikes[0].range} km</p>
                          </div>
                          <div>
                            <p className="text-white/80">Eco Score</p>
                            <p className="font-semibold">{upcomingBikes[0].ecoScore}/10</p>
                          </div>
                          <div>
                            <p className="text-white/80">Expected Price</p>
                            <p className="font-semibold">₹{upcomingBikes[0].price.toLocaleString()}</p>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-4">
                        <Button variant="secondary" size="lg">
                          <Bell className="w-4 h-4 mr-2" />
                          Notify Me
                        </Button>
                        <Button asChild variant="outline" size="lg" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                          <Link to={`/bike/${upcomingBikes[0].id}`}>
                            View Details
                          </Link>
                        </Button>
                      </div>
                    </div>

                    <div className="relative">
                      <div className="aspect-video relative overflow-hidden rounded-lg">
                        <img
                          src={upcomingBikes[0].image}
                          alt={`${upcomingBikes[0].brand} ${upcomingBikes[0].name}`}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.src = '/placeholder-bike.jpg';
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* All Upcoming Bikes */}
            <section>
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold">All Upcoming Launches</h2>
                <Badge variant="outline">
                  {upcomingBikes.length} bikes coming soon
                </Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {upcomingBikes.map((bike) => (
                  <div key={bike.id} className="relative">
                    <BikeCard bike={bike} />
                    
                    {/* Countdown Overlay */}
                    {bike.launchDate && (
                      <div className="absolute top-4 left-4 right-4 z-10">
                        <Card className="bg-background/95 backdrop-blur-sm">
                          <CardContent className="p-3">
                            <div className="text-center">
                              <p className="text-xs text-muted-foreground mb-1">Launches in</p>
                              <p className="text-sm font-bold font-mono">
                                {timeLeft[bike.id] || 'Calculating...'}
                              </p>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* Newsletter Signup */}
            <section className="mt-16">
              <Card className="bg-surface">
                <CardContent className="p-8 text-center">
                  <Bell className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h2 className="text-2xl font-bold mb-2">Never Miss a Launch</h2>
                  <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                    Get notified about new bike launches, exclusive previews, and early booking opportunities
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="flex-1 px-4 py-2 rounded-lg border border-border bg-background"
                    />
                    <Button>
                      Subscribe
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </section>
          </>
        )}
      </div>
    </div>
  );
};

export default Upcoming;