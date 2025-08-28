"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import {
//   Sheet,
//   SheetContent,
//   SheetTrigger,
//   SheetClose,
// } from "@/components/ui/sheet";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
import { Menu, Search, User, ChevronDown } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "../ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-all duration-300 ${
        isScrolled ? "shadow-sm" : ""
      }`}
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Left side - Logo and navigation links */}
        <div className="flex items-center gap-6">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="h-8 w-8 bg-primary rounded-md flex items-center justify-center">
              <span className="text-white font-bold text-lg">J</span>
            </div>
            <span className="font-bold text-xl hidden sm:inline-block">
              JobPortal
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6">
            <Link
              href="/"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Home
            </Link>
            <Link
              href="/find-jobs"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Find Jobs
            </Link>
            <Link
              href="/salary-tools"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Salary Tools
            </Link>
            <Link
              href="/career-advice"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Career Advice
            </Link>
          </nav>
        </div>

        {/* Middle - Search bar (desktop only) */}
        <div className="hidden md:flex flex-1 max-w-md mx-8">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              type="search"
              placeholder="Search jobs, companies, or keywords..."
              className="pl-10 pr-4 py-2 w-full"
            />
          </div>
        </div>

        {/* Right side - Auth links and Post Job button */}
        <div className="flex items-center gap-4">
          {/* Post Job button - hidden on mobile */}
          <Button className="hidden sm:flex" asChild>
            <Link href="/post-job">Post a Job</Link>
          </Button>

          {/* Auth links - desktop */}
          <div className="hidden sm:flex items-center gap-2">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/login">Login</Link>
            </Button>
            <Button size="sm" asChild>
              <Link href="/register">Sign Up</Link>
            </Button>
          </div>

          {/* Mobile menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full sm:w-80">
              <div className="flex flex-col h-full">
                {/* Mobile search */}
                <div className="relative mb-6 md:hidden">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    type="search"
                    placeholder="Search jobs..."
                    className="pl-10 pr-4 py-2 w-full"
                  />
                </div>

                {/* Mobile navigation */}
                <nav className="flex flex-col space-y-4">
                  <SheetClose asChild>
                    <Link
                      href="/"
                      className="text-lg font-medium transition-colors hover:text-primary py-2"
                    >
                      Home
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link
                      href="/find-jobs"
                      className="text-lg font-medium transition-colors hover:text-primary py-2"
                    >
                      Find Jobs
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link
                      href="/salary-tools"
                      className="text-lg font-medium transition-colors hover:text-primary py-2"
                    >
                      Salary Tools
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link
                      href="/career-advice"
                      className="text-lg font-medium transition-colors hover:text-primary py-2"
                    >
                      Career Advice
                    </Link>
                  </SheetClose>
                </nav>

                <div className="mt-auto pt-8 border-t space-y-4">
                  <SheetClose asChild>
                    <Button className="w-full" asChild>
                      <Link href="/post-job">Post a Job</Link>
                    </Button>
                  </SheetClose>
                  <div className="flex gap-2">
                    <SheetClose asChild>
                      <Button variant="outline" className="flex-1" asChild>
                        <Link href="/login">Login</Link>
                      </Button>
                    </SheetClose>
                    <SheetClose asChild>
                      <Button className="flex-1" asChild>
                        <Link href="/register">Sign Up</Link>
                      </Button>
                    </SheetClose>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>

          {/* User dropdown for authenticated state - can be implemented later */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full h-8 w-8 hidden sm:flex"
              >
                <User className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link href="/profile">Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/dashboard">Dashboard</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/settings">Settings</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
