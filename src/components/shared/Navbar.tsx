"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

import { Menu, LogOut } from "lucide-react";
import { Button } from "../ui/button";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "../ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useUser } from "@/context/UserContext";
import { logout } from "@/services/AuthServices";

export default function Navbar() {
  const { user, setIsLoading } = useUser();
  const handleLogout = () => {
    logout();
    setIsLoading(true);
  };
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
        {/* Left side - Logo */}
        <div className="flex items-center">
          <Link href="/" className="flex items-center space-x-2">
            <div className="h-8 w-8 bg-primary rounded-md flex items-center justify-center">
              <span className="text-white font-bold text-lg">J</span>
            </div>
            <span className="font-bold text-xl hidden sm:inline-block">
              JobPortal
            </span>
          </Link>
        </div>

        {/* Centered Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 absolute left-1/2 transform -translate-x-1/2">
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
          <Link
            href="/blog"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Blog
          </Link>
          <Link
            href="/contact"
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Contact
          </Link>
        </nav>

        {/* Right side - Conditional Auth links and Post Job button */}
        <div className="flex items-center gap-4">
          {user ? (
            <>
              {/* Post Job button - hidden on mobile */}
              <Button className="hidden sm:flex" asChild>
                <Link href="/post-job">Post a Job</Link>
              </Button>

              {/* User dropdown for authenticated users */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar className="cursor-pointer">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>
                      {user?.name?.firstName?.[0] || "U"}
                    </AvatarFallback>
                  </Avatar>
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
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="text-red-600 cursor-pointer focus:text-red-600"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              {/* Auth links - desktop */}
              <div className="hidden sm:flex items-center gap-2">
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/login">Login</Link>
                </Button>
                <span>or</span>
                <Button size="sm" asChild>
                  <Link href="/register">Sign Up</Link>
                </Button>
              </div>
            </>
          )}

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
                  <SheetClose asChild>
                    <Link
                      href="/blog"
                      className="text-lg font-medium transition-colors hover:text-primary py-2"
                    >
                      Blog
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link
                      href="/contact"
                      className="text-lg font-medium transition-colors hover:text-primary py-2"
                    >
                      Contact
                    </Link>
                  </SheetClose>
                </nav>

                <div className="mt-auto pt-8 border-t space-y-4">
                  {user ? (
                    <>
                      <SheetClose asChild>
                        <Button className="w-full" asChild>
                          <Link href="/post-job">Post a Job</Link>
                        </Button>
                      </SheetClose>
                      <div className="flex flex-col gap-2">
                        <SheetClose asChild>
                          <Button variant="outline" className="w-full" asChild>
                            <Link href="/profile">Profile</Link>
                          </Button>
                        </SheetClose>
                        <SheetClose asChild>
                          <Button variant="outline" className="w-full" asChild>
                            <Link href="/dashboard">Dashboard</Link>
                          </Button>
                        </SheetClose>
                        <Button
                          onClick={handleLogout}
                          variant="destructive"
                          className="w-full"
                        >
                          Logout
                        </Button>
                      </div>
                    </>
                  ) : (
                    <div className="flex gap-2">
                      <SheetClose asChild>
                        <Button variant="outline" className="flex-1" asChild>
                          <Link href="/login">Login</Link>
                        </Button>
                      </SheetClose>
                      <span>or</span>
                      <SheetClose asChild>
                        <Button className="flex-1" asChild>
                          <Link href="/register">Sign Up</Link>
                        </Button>
                      </SheetClose>
                    </div>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
