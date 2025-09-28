import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Zap, Search, Users, Bike, LogOut, User, Home, Accessibility, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Menubar, MenubarMenu, MenubarTrigger, MenubarContent, MenubarItem, MenubarSeparator, MenubarLabel } from '@/components/ui/menubar';
import { ThemeToggle } from '@/components/ThemeToggle';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import BikeLogo from '@/components/BikeLogo';
import { useAuth } from '@/hooks/use-auth';
import { useLanguage } from '@/contexts/LanguageContext';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
    const { user, logout } = useAuth();
  const { t } = useLanguage();

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { path: '/', label: t('home'), icon: Home },
    { path: '/browse', label: t('browse'), icon: Search },
    { path: '/used-bikes', label: t('usedBikes'), icon: Bike },
    { path: '/upcoming', label: t('upcoming'), icon: Zap },
        { path: '/customer-care', label: t('support') },
    { path: '/sell', label: t('sell'), icon: Bike },
    { path: '/community', label: t('community'), icon: Users },
  ];

  
  return (
    <>
      <nav className="bg-background/80 backdrop-blur-md border-b border-border/50 sticky top-0 z-50 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-18">
            {/* Left cluster: dashboard button + logo */}
            <div className="flex items-center gap-2">
              <Link
                to="/dashboard"
                aria-label="Dashboard"
                className="hidden md:flex items-center justify-center w-10 h-10 rounded-xl hover:bg-muted/60 transition-colors"
                title="Dashboard"
              >
                <Menu className="w-5 h-5" />
              </Link>
              <Link to="/" className="flex items-center space-x-3 bounce-gentle">
                <BikeLogo size={40} />
                <span className="text-2xl font-bold bg-gradient-to-br from-sky-500 to-blue-600 bg-clip-text text-transparent dark:from-cyan-300 dark:to-sky-400 tracking-tight">Vahan Bazar</span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-2">
              {navLinks.map(({ path, label, icon: Icon }) => (
                <Link
                  key={path}
                  to={path}
                  className={`px-4 py-3 rounded-xl transition-all duration-300 flex items-center space-x-2 font-medium ${
                    isActive(path)
                      ? 'bg-primary text-primary-foreground shadow-sm'
                      : 'text-foreground hover:bg-muted/60 hover:text-primary'
                  }`}
                >
                  {Icon && <Icon className="w-4 h-4" />}
                  <span className="whitespace-nowrap">{label}</span>
                </Link>
              ))}
            </div>

            {/* Accessibility & Auth Controls */}
            <div className="hidden md:flex items-center space-x-3">
              <LanguageSwitcher />
              <ThemeToggle />

              {/* Menubar with Accessibility and Settings */}
              <Menubar className="bg-transparent border-0">
                <MenubarMenu>
                  <MenubarTrigger className="px-3 py-2 rounded-md hover:bg-muted">Menu</MenubarTrigger>
                  <MenubarContent align="end">
                    <MenubarLabel>Accessibility</MenubarLabel>
                    <MenubarItem onClick={() => { document.documentElement.classList.toggle('text-lg'); localStorage.setItem('vahan-large-text', document.documentElement.classList.contains('text-lg') ? '1' : '0'); }}>Toggle large text</MenubarItem>
                    <MenubarItem onClick={() => { document.documentElement.classList.toggle('contrast-125'); localStorage.setItem('vahan-contrast', document.documentElement.classList.contains('contrast-125') ? 'high' : 'normal'); }}>Toggle high contrast</MenubarItem>
                    <MenubarSeparator />
                    <MenubarLabel>Navigation</MenubarLabel>
                    <MenubarItem asChild>
                      <Link to="/customer-care#accessibility">Accessibility page…</Link>
                    </MenubarItem>
                    <MenubarItem asChild>
                      <Link to="/dashboard?tab=settings">Settings…</Link>
                    </MenubarItem>
                  </MenubarContent>
                </MenubarMenu>
              </Menubar>

              <Link
                to="/customer-care#accessibility"
                className="px-3 py-2 rounded-md hover:bg-muted flex items-center gap-2"
                aria-label="Accessibility settings"
                title="Accessibility settings"
              >
                <Accessibility className="w-4 h-4" />
                <span className="hidden sm:inline">Accessibility</span>
              </Link>
              <Link
                to="/dashboard?tab=settings"
                className="px-3 py-2 rounded-md hover:bg-muted flex items-center gap-2"
                aria-label="App settings"
                title="App settings"
              >
                <Settings className="w-4 h-4" />
                <span className="hidden sm:inline">Settings</span>
              </Link>
                                          {user ? (
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-lg">
                    <User className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium text-primary">{user.name}</span>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={logout}
                    className="bounce-gentle"
                  >
                    <LogOut className="w-4 h-4" />
                  </Button>
                </div>
              ) : (
                <Button variant="secondary" size="sm" className="bounce-gentle" asChild>
                  <Link to="/login">Login</Link>
                </Button>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle menu"
              >
                {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden bg-background border-t border-border">
            <div className="px-4 py-3 space-y-2">
              {navLinks.map(({ path, label, icon: Icon }) => (
                <Link
                  key={path}
                  to={path}
                  onClick={() => setIsOpen(false)}
                  className={`block px-4 py-3 rounded-lg transition-colors flex items-center space-x-2 ${
                    isActive(path)
                      ? 'bg-primary text-primary-foreground'
                      : 'text-foreground hover:bg-muted'
                  }`}
                >
                  {Icon && <Icon className="w-4 h-4" />}
                  <span className="whitespace-nowrap">{label}</span>
                </Link>
              ))}
              
              {/* Mobile Accessibility & Settings */}
              <div className="flex items-center gap-2 px-4 py-2">
                <ThemeToggle />
                <Link to="/customer-care#accessibility" onClick={() => setIsOpen(false)} className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-muted">
                  <Accessibility className="w-4 h-4" />
                  <span>Accessibility</span>
                </Link>
                <Link to="/dashboard?tab=settings" onClick={() => setIsOpen(false)} className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-muted">
                  <Settings className="w-4 h-4" />
                  <span>Settings</span>
                </Link>
              </div>
              
              <div className="px-4 py-2">
                {user ? (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 px-3 py-2 bg-primary/10 rounded-lg">
                      <User className="w-4 h-4 text-primary" />
                      <span className="text-sm font-medium text-primary">{user.name}</span>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={logout}
                      className="w-full"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Logout
                    </Button>
                  </div>
                ) : (
                  <Button variant="secondary" size="sm" className="w-full" asChild>
                    <Link to="/login">Login</Link>
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navigation;