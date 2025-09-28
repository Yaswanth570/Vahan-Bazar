import React from "react";
import { Link } from "react-router-dom";
import {
  LayoutDashboard,
  Menu,
  User as UserIcon,
  Heart,
  ListChecks,
  Bike,
  BarChart2,
  Calculator,
  Users,
  Headphones,
  LogOut,
  ChevronRight,
} from "lucide-react";

import { useAuth } from "@/hooks/use-auth";
import { useLanguage } from "@/contexts/LanguageContext";
import { useCompare } from "@/hooks/use-compare";

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
  useSidebar,
} from "@/components/ui/sidebar";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { sampleBikes } from "@/data/bikes";
import { useWishlist } from "@/hooks/use-wishlist";
import BikeCard from "@/components/BikeCard";

// Sections for the sidebar
type SectionKey =
  | "overview"
  | "profile"
  | "saved"
  | "listings"
  | "testRides"
  | "compare"
  | "emi"
  | "communitySupport";

// Dashboard Top Navbar with language, theme and user menu
function DashboardTopbar({ title }: { title: string }) {
  const { toggleSidebar } = useSidebar();
  const { user, logout } = useAuth();

  const initials = (user?.name || "U")
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="sticky top-0 z-20 flex items-center justify-between gap-3 border-b bg-background/75 backdrop-blur px-4 py-3">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" aria-label="Toggle sidebar" onClick={toggleSidebar}>
          <Menu className="w-5 h-5" />
        </Button>
        <div className="flex items-center gap-2 text-lg font-semibold">
          <LayoutDashboard className="w-5 h-5 text-primary" />
          <span>{title}</span>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <LanguageSwitcher />
        <ThemeToggle />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="gap-2">
              <Avatar className="h-6 w-6">
                <AvatarFallback>{initials}</AvatarFallback>
              </Avatar>
              <span className="hidden sm:inline-block text-sm font-medium">{user?.name ?? "Guest"}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link to="#profile">
                <UserIcon className="w-4 h-4 mr-2" /> Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="#settings">
                <Calculator className="w-4 h-4 mr-2" /> Settings
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={logout} className="text-destructive">
              <LogOut className="w-4 h-4 mr-2" /> Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}

// Sidebar specific to user dashboard
function DashboardSidebar({ active, onChange }: { active: SectionKey; onChange: (s: SectionKey) => void }) {
  const items: { id: SectionKey; label: string; icon: React.ComponentType<any> }[] = [
    { id: "profile", label: "Profile", icon: UserIcon },
    { id: "saved", label: "Saved Bikes", icon: Heart },
    { id: "listings", label: "My Listings", icon: ListChecks },
    { id: "testRides", label: "Test Rides", icon: Bike },
    { id: "compare", label: "Compare", icon: BarChart2 },
    { id: "emi", label: "EMI Tools", icon: Calculator },
    { id: "communitySupport", label: "Community & Support", icon: Headphones },
  ];

  return (
    <Sidebar className="bg-sidebar text-sidebar-foreground" collapsible="offcanvas">
      <SidebarHeader>
        <div className="flex items-center gap-2 p-2">
          <div className="w-8 h-8 bg-gradient-primary rounded-md flex items-center justify-center">
            <Bike className="w-4 h-4 text-primary-foreground" />
          </div>
          <span className="font-semibold">My Dashboard</span>
        </div>
      </SidebarHeader>
      <SidebarSeparator />

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map(({ id, label, icon: Icon }) => (
                <SidebarMenuItem key={id}>
                  <SidebarMenuButton
                    isActive={active === id}
                    onClick={() => onChange(id)}
                    className="cursor-pointer"
                  >
                    <Icon className="w-4 h-4" />
                    <span>{label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <p className="text-xs text-sidebar-foreground/70 px-2">Tip: Press Ctrl/Cmd + B to toggle</p>
      </SidebarFooter>
    </Sidebar>
  );
}

// Reusable card
function DashboardCard({ title, children, action }: { title: string; children?: React.ReactNode; action?: React.ReactNode }) {
  return (
    <Card className="h-full hover:shadow-md transition-shadow">
      <CardHeader className="flex-row items-center justify-between space-y-0">
        <CardTitle className="text-base font-semibold">{title}</CardTitle>
        {action}
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}

// Overview content
function Overview() {
  const { bikesToCompare } = useCompare();

  const recent = sampleBikes.slice(0, 3);
  const { ids } = useWishlist();
  const favorites = sampleBikes.filter((b) => ids.includes(b.id)).slice(0, 3);
  const upcoming = sampleBikes.slice(6, 9);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Recently Viewed */}
      <DashboardCard title="Recently Viewed Bikes" action={<Link to="/browse" className="text-sm text-primary hover:underline">See all</Link>}>
        <div className="space-y-3">
          {recent.map((b) => (
            <div key={b.id} className="flex items-center justify-between rounded-lg border p-3 hover:bg-muted/40">
              <div className="min-w-0">
                <p className="font-medium truncate">{b.name}</p>
                <p className="text-xs text-muted-foreground">{b.brand}</p>
              </div>
              <Button asChild variant="ghost" size="sm" className="gap-1">
                <Link to={`/bike/${b.id}`}>
                  View <ChevronRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          ))}
        </div>
      </DashboardCard>

      {/* Saved Favorites */}
      <DashboardCard title="Saved Favorites" action={<Link to="/browse" className="text-sm text-primary hover:underline">Manage</Link>}>
        <div className="space-y-3">
          {favorites.map((b) => (
            <div key={b.id} className="flex items-center justify-between rounded-lg border p-3 hover:bg-muted/40">
              <div className="min-w-0">
                <p className="font-medium truncate">{b.name}</p>
                <p className="text-xs text-muted-foreground">{b.brand}</p>
              </div>
              <Heart className="w-4 h-4 text-primary" />
            </div>
          ))}
          {favorites.length === 0 && (
            <p className="text-sm text-muted-foreground">No favorites yet.</p>
          )}
        </div>
      </DashboardCard>

      {/* Upcoming Test Rides */}
      <DashboardCard title="Upcoming Test Rides" action={<Link to="#" className="text-sm text-primary hover:underline">Schedule</Link>}>
        {upcoming.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Model</TableHead>
                <TableHead>Brand</TableHead>
                <TableHead className="text-right">Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {upcoming.map((b, idx) => (
                <TableRow key={b.id}>
                  <TableCell className="font-medium">{b.name}</TableCell>
                  <TableCell>{b.brand}</TableCell>
                  <TableCell className="text-right">{new Date(Date.now() + (idx + 1) * 86400000).toLocaleDateString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <p className="text-sm text-muted-foreground">No test rides scheduled.</p>
        )}
      </DashboardCard>

      {/* Quick Tools - span full width on large */}
      <div className="lg:col-span-3">
        <DashboardCard title="Quick Tools">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Button asChild variant="secondary" className="h-12">
              <Link to="/compare" className="flex items-center gap-2">
                <BarChart2 className="w-4 h-4" /> Compare ({bikesToCompare.length})
              </Link>
            </Button>
            <Button asChild variant="outline" className="h-12">
              <Link to="#emi" className="flex items-center gap-2">
                <Calculator className="w-4 h-4" /> EMI Calculator
              </Link>
            </Button>
            <Button asChild className="h-12">
              <Link to="/sell" className="flex items-center gap-2">
                <ListChecks className="w-4 h-4" /> Sell Bike
              </Link>
            </Button>
          </div>
        </DashboardCard>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const { user } = useAuth();
  const { t } = useLanguage();
  const { ids: wishlistIds } = useWishlist();

  const [active, setActive] = React.useState<SectionKey>("overview");

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto py-12">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LayoutDashboard className="w-5 h-5 text-primary" />
              <span>{t("dashboard")}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-6">
              Please log in to access your personalized dashboard, saved preferences, and activity.
            </p>
            <Button asChild>
              <Link to="/login">Go to Login</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const renderSection = () => {
    switch (active) {
      case "overview":
        return <Overview />;
      case "profile":
        return <DashboardCard title="Profile"><p className="text-sm text-muted-foreground">Profile settings coming soon.</p></DashboardCard>;
      case "saved": {
        const savedBikes = sampleBikes.filter((b) => wishlistIds.includes(b.id));
        if (savedBikes.length === 0) {
          return (
            <DashboardCard title="Saved Bikes">
              <p className="text-sm text-muted-foreground">Your favorites will appear here.</p>
            </DashboardCard>
          );
        }
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedBikes.map((b) => (
              <BikeCard key={b.id} bike={b} />
            ))}
          </div>
        );
      }
      case "listings":
        return <DashboardCard title="My Listings"><p className="text-sm text-muted-foreground">Manage your bike listings.</p></DashboardCard>;
      case "testRides":
        return <DashboardCard title="Test Rides"><p className="text-sm text-muted-foreground">View and schedule your test rides.</p></DashboardCard>;
      case "compare":
        return (
          <DashboardCard title="Compare">
            <p className="text-sm text-muted-foreground mb-4">Go to the compare page to evaluate selections.</p>
            <Button asChild>
              <Link to="/compare">Open Compare</Link>
            </Button>
          </DashboardCard>
        );
      case "emi":
        return <DashboardCard title="EMI Tools"><p className="text-sm text-muted-foreground">EMI calculators and finance tools.</p></DashboardCard>;
      case "communitySupport":
        return (
          <DashboardCard title="Community & Support">
            <div className="grid sm:grid-cols-2 gap-3">
              <Button asChild variant="secondary">
                <Link to="/community">
                  <Users className="w-4 h-4 mr-2" /> Community
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/customer-care">
                  <Headphones className="w-4 h-4 mr-2" /> Support
                </Link>
              </Button>
            </div>
          </DashboardCard>
        );
      default:
        return null;
    }
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-[calc(100vh-4rem)]">
        <DashboardSidebar active={active} onChange={setActive} />
        <SidebarInset>
          <DashboardTopbar title={t("dashboard")} />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {renderSection()}
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
