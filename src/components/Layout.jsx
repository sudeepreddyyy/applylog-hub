
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BriefcaseIcon, CalendarIcon, PlusIcon, HomeIcon, BarChartIcon, LogInIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const Navigation = () => {
  const location = useLocation();
  
  const navItems = [
    { name: 'Dashboard', href: '/', icon: HomeIcon },
    { name: 'Applications', href: '/applications', icon: BriefcaseIcon },
    { name: 'Interviews', href: '/interviews', icon: CalendarIcon },
    { name: 'Analytics', href: '/analytics', icon: BarChartIcon },
  ];

  return (
    <nav className="glass fixed bottom-5 left-1/2 transform -translate-x-1/2 z-50 rounded-full px-4 py-2 shadow-lg md:left-8 md:top-1/2 md:-translate-y-1/2 md:translate-x-0 md:flex-col md:rounded-2xl md:py-8">
      <ul className="flex items-center space-x-1 md:space-x-0 md:space-y-4 md:px-2">
        {navItems.map((item) => (
          <li key={item.name}>
            <Link
              to={item.href}
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-full transition-all hover:bg-accent",
                location.pathname === item.href 
                  ? "bg-primary text-primary-foreground" 
                  : "text-muted-foreground hover:text-foreground"
              )}
              aria-label={item.name}
            >
              <item.icon className="h-5 w-5" />
              <span className="sr-only">{item.name}</span>
            </Link>
          </li>
        ))}
        <li className="md:mt-6">
          <button 
            className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-white transition-all hover:bg-gray-800"
            aria-label="Add new"
          >
            <PlusIcon className="h-5 w-5" />
            <span className="sr-only">Add New</span>
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default function Layout({ children }) {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-white to-accent">
      <header className="glass sticky top-0 z-40 border-b">
        <div className="container flex h-16 items-center px-4 md:px-6">
          <div className="flex items-center w-8 absolute">
            <BriefcaseIcon className="h-6 w-6 text-primary" />
          </div>
          <div className="flex-1 flex justify-center items-center">
            <div className="text-center">
              <h1 className="text-xl font-semibold tracking-tight">ApplyLog</h1>
              <p className="text-xs text-muted-foreground">by SudeepAngamgari</p>
            </div>
          </div>
          <div className="w-8 flex justify-end">
            <Button variant="ghost" size="icon" className="rounded-full">
              <LogInIcon className="h-5 w-5" />
              <span className="sr-only">Login / Signup</span>
            </Button>
          </div>
        </div>
      </header>
      <main className="container mx-auto px-4 py-6 md:px-6 md:py-8">
        <div className="animate-fade-up">
          {children}
        </div>
      </main>
      <Navigation />
    </div>
  );
}
