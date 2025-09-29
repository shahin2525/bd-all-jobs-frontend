"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
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
import { protectedRoutes } from "@/constants";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, setIsLoading, setUser } = useUser();
  const [isScrolled, setIsScrolled] = useState(false);

  const handleLogout = () => {
    logout();
    setUser(null);
    setIsLoading(true);
    if (protectedRoutes.some((route) => pathname.match(route))) {
      router.push("/");
    }
    router.refresh();
  };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-all duration-300 ${
        isScrolled ? "shadow-sm" : ""
      }`}
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* ---------- Logo ---------- */}
        <div className="flex items-center">
          <Link
            href="/"
            title="JobPortal Home"
            className="flex items-center space-x-2 text-foreground hover:text-primary"
          >
            <div className="h-8 w-8 bg-primary rounded-md flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">
                J
              </span>
            </div>
            <span className="font-bold text-xl hidden sm:inline-block">
              JobPortal
            </span>
          </Link>
        </div>

        {/* ---------- Center Nav ---------- */}
        <nav
          className="hidden lg:flex items-center gap-6 absolute left-1/2 -translate-x-1/2"
          aria-label="Main navigation"
        >
          {[
            { href: "/", label: "Home" },
            { href: "/jobs", label: "Find Jobs" },
            { href: "/salary-tools", label: "Salary Tools" },
            { href: "/career-advice", label: "Career Advice" },
            { href: "/blog", label: "Blog" },
            { href: "/contact", label: "Contact" },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-foreground hover:text-accent hover:bg-primary transition-colors rounded p-1"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* ---------- Right Section ---------- */}
        <div className="flex items-center gap-4">
          {user?.email ? (
            <>
              {/* Post Job */}
              <Button
                className="hidden sm:flex bg-primary text-primary-foreground hover:bg-accent"
                asChild
              >
                <Link href="/post-job">Post a Job</Link>
              </Button>

              {/* User Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar className="cursor-pointer">
                    <AvatarImage
                      src="https://github.com/shadcn.png"
                      alt={`${user?.name?.firstName || "User"}'s avatar`}
                    />
                    <AvatarFallback>
                      {user?.name?.firstName?.[0] || "U"}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="bg-background border border-border"
                >
                  <DropdownMenuItem asChild>
                    <Link href="/profile">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href={`/dashboard/${user?.role}`}>Dashboard</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/settings">Settings</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="text-destructive focus:text-destructive"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <div className="hidden sm:flex items-center gap-2">
              <Button variant="ghost" size="sm" asChild>
                <Link
                  href="/login"
                  className="text-foreground hover:text-accent"
                >
                  Login
                </Link>
              </Button>
              <span className="text-muted-foreground">or</span>
              <Button
                size="sm"
                className="bg-primary text-primary-foreground hover:bg-accent hover:text-black"
                asChild
              >
                <Link href="/register">Sign Up</Link>
              </Button>
            </div>
          )}

          {/* ---------- Mobile Menu ---------- */}
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden text-foreground hover:text-accent"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-full sm:w-80 bg-background text-foreground border-l border-border"
            >
              <div className="flex flex-col h-full">
                <nav
                  className="flex flex-col space-y-4"
                  aria-label="Mobile navigation"
                >
                  {[
                    { href: "/", label: "Home" },
                    { href: "/find-jobs", label: "Find Jobs" },
                    { href: "/salary-tools", label: "Salary Tools" },
                    { href: "/career-advice", label: "Career Advice" },
                    { href: "/blog", label: "Blog" },
                    { href: "/contact", label: "Contact" },
                  ].map((item) => (
                    <SheetClose asChild key={item.href}>
                      <Link
                        href={item.href}
                        className="text-lg font-medium hover:text-accent py-2"
                      >
                        {item.label}
                      </Link>
                    </SheetClose>
                  ))}
                </nav>

                <div className="mt-auto pt-8 border-t border-border space-y-4">
                  {user?.email ? (
                    <>
                      <SheetClose asChild>
                        <Button
                          className="w-full bg-primary text-primary-foreground hover:bg-accent"
                          asChild
                        >
                          <Link href="/post-job">Post a Job</Link>
                        </Button>
                      </SheetClose>
                      <div className="flex flex-col gap-2">
                        <SheetClose asChild>
                          <Button
                            variant="outline"
                            className="w-full border-border text-foreground hover:text-accent"
                            asChild
                          >
                            <Link href="/profile">Profile</Link>
                          </Button>
                        </SheetClose>
                        <SheetClose asChild>
                          <Button
                            variant="outline"
                            className="w-full border-border text-foreground hover:text-accent"
                            asChild
                          >
                            <Link href={`/dashboard/${user?.role}`}>
                              Dashboard
                            </Link>
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
                        <Button
                          variant="outline"
                          className="flex-1 border-border text-foreground hover:text-accent"
                          asChild
                        >
                          <Link href="/login">Login</Link>
                        </Button>
                      </SheetClose>
                      <span className="self-center text-muted-foreground">
                        or
                      </span>
                      <SheetClose asChild>
                        <Button
                          className="flex-1 bg-primary text-primary-foreground hover:bg-accent"
                          asChild
                        >
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
