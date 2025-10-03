// "use client";

// import { motion } from "framer-motion";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { Search } from "lucide-react";

// export default function HeroSection() {
//   const categories = [
//     { name: "IT Jobs", link: "/jobs?category=it" },
//     { name: "Government Jobs", link: "/jobs?category=government" },
//     { name: "Remote Jobs", link: "/jobs?category=remote" },
//     { name: "Freelance", link: "/jobs?category=freelance" },
//     { name: "Part-Time", link: "/jobs?category=part-time" },
//   ];

//   return (
//     <section className="w-full bg-gradient-to-r from-blue-50 to-indigo-100 py-16 px-4 text-center">
//       <div className="max-w-3xl mx-auto">
//         {/* Animated Headline */}
//         <motion.h1
//           initial={{ opacity: 0, y: -30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8 }}
//           className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
//         >
//           Find Your <span className="text-indigo-600">Dream Job</span> Today
//         </motion.h1>

//         {/* Animated Subtext */}
//         <motion.p
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.3, duration: 0.8 }}
//           className="text-gray-600 mb-8 text-lg"
//         >
//           Search thousands of job opportunities across industries and locations.
//         </motion.p>

//         {/* Animated Search Bar */}
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.6, duration: 0.8 }}
//           className="flex flex-col md:flex-row items-center gap-4 bg-white rounded-2xl shadow-lg p-4"
//         >
//           <Input placeholder="Job title or keyword" className="flex-1" />
//           <Input placeholder="Location" className="flex-1" />
//           <Button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700">
//             <Search className="w-4 h-4" />
//             Search
//           </Button>
//         </motion.div>

//         {/* Ad Placeholder */}
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 1, duration: 0.8 }}
//           className="w-full flex justify-center mt-6"
//         >
//           <div className="ad-container bg-gray-100 rounded-lg shadow-md w-full max-w-3xl h-24 flex items-center justify-center">
//             <span className="text-gray-400 text-sm">
//               Ad Space (Google AdSense)
//             </span>
//           </div>
//         </motion.div>

//         {/* Animated Categories */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 1.2, duration: 0.8 }}
//           className="mt-8 flex flex-wrap justify-center gap-3"
//         >
//           {categories.map((cat) => (
//             <a key={cat.name} href={cat.link}>
//               <Badge
//                 variant="outline"
//                 className="cursor-pointer px-4 py-2 text-sm hover:bg-indigo-100"
//               >
//                 {cat.name}
//               </Badge>
//             </a>
//           ))}
//         </motion.div>
//       </div>
//     </section>
//   );
// }
//
"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, MapPin, Briefcase } from "lucide-react";

export default function HeroSection() {
  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // Categories that match your backend filters
  const categories = [
    {
      name: "Government Jobs",
      filter: "sector",
      value: "government",
      icon: "🏛️",
    },
    { name: "NGO Jobs", filter: "sector", value: "ngo", icon: "🤝" },
    {
      name: "Remote Jobs",
      filter: "employmentType",
      value: "remote",
      icon: "🏠",
    },
    {
      name: "Full-Time",
      filter: "employmentType",
      value: "FULL-TIME",
      icon: "💼",
    },
    {
      name: "Part-Time",
      filter: "employmentType",
      value: "PART-TIME",
      icon: "⏱️",
    },
    {
      name: "Freelance",
      filter: "employmentType",
      value: "freelance",
      icon: "🎨",
    },
  ];

  // const handleSearch = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setIsLoading(true);

  //   try {
  //     const params = new URLSearchParams();

  //     if (searchTerm) params.set("search", searchTerm);
  //     if (location) params.set("filters[location]", location);

  //     // Redirect to jobs page with search parameters
  //     router.push(`/jobs?${params.toString()}`);
  //   } catch (error) {
  //     console.error("Search error:", error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const params = new URLSearchParams();

      if (searchTerm) params.set("search", searchTerm);
      if (location) params.set("location", location);

      // ✅ Add active status filter by default
      params.set("status", "active");

      // Redirect to jobs page with search parameters
      router.push(`/jobs?${params.toString()}`);
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setIsLoading(false);
    }
  };
  const handleCategoryClick = (filter: string, value: string) => {
    const params = new URLSearchParams();
    params.set(`filters[${filter}]`, value);
    router.push(`/jobs?${params.toString()}`);
  };

  return (
    <section className="w-full bg-gradient-to-r from-blue-50 to-indigo-100 py-16 px-4 text-center">
      <div className="max-w-4xl mx-auto">
        {/* Animated Headline */}
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-bold text-gray-900 mb-6"
        >
          Find Your <span className="text-indigo-600">Dream Job</span> Today
        </motion.h1>

        {/* Animated Subtext */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-gray-600 mb-8 text-lg md:text-xl"
        >
          Discover thousands of job opportunities across top companies and
          industries.
        </motion.p>

        {/* Animated Search Bar */}
        <motion.form
          onSubmit={handleSearch}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="flex flex-col md:flex-row items-center gap-4 bg-white rounded-2xl shadow-lg p-4 md:p-6 mb-6"
        >
          <div className="flex-1 w-full relative">
            <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Job title, keywords, or company"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 py-6 border-0 focus:ring-0 text-lg"
            />
          </div>

          <div className="flex-1 w-full relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="City, state, or remote"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="pl-10 py-6 border-0 focus:ring-0 text-lg"
            />
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white py-6 px-8 text-lg font-semibold transition-all duration-200 disabled:opacity-50"
          >
            <Search className="w-5 h-5" />
            {isLoading ? "Searching..." : "Search Jobs"}
          </Button>
        </motion.form>

        {/* Quick Search Suggestions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mb-8"
        >
          <p className="text-gray-500 text-sm mb-3">
            Try: <span className="text-indigo-600 font-medium">Developer</span>,{" "}
            <span className="text-indigo-600 font-medium">Designer</span>,{" "}
            <span className="text-indigo-600 font-medium">Marketing</span>,{" "}
            <span className="text-indigo-600 font-medium">Sales</span>
          </p>
        </motion.div>

        {/* Ad Placeholder */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="w-full flex justify-center mb-8"
        >
          <div className="ad-container bg-gray-100 rounded-lg shadow-md w-full max-w-2xl h-20 flex items-center justify-center border-2 border-dashed border-gray-300">
            <span className="text-gray-400 text-sm">
              Ad Space (728 × 90) - Google AdSense Compatible
            </span>
          </div>
        </motion.div>

        {/* Animated Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mt-8"
        >
          <h3 className="text-gray-700 font-semibold mb-4 text-lg">
            Popular Categories
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((cat) => (
              <Badge
                key={cat.value}
                onClick={() => handleCategoryClick(cat.filter, cat.value)}
                variant="outline"
                className="cursor-pointer px-4 py-3 text-sm hover:bg-indigo-100 hover:text-indigo-700 transition-all duration-200 border-indigo-200 bg-white shadow-sm"
              >
                <span className="mr-2">{cat.icon}</span>
                {cat.name}
              </Badge>
            ))}
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-center"
        >
          <div className="bg-white/50 backdrop-blur-sm rounded-lg p-4 shadow-sm">
            <div className="text-2xl font-bold text-indigo-600">10K+</div>
            <div className="text-gray-600 text-sm">Active Jobs</div>
          </div>
          <div className="bg-white/50 backdrop-blur-sm rounded-lg p-4 shadow-sm">
            <div className="text-2xl font-bold text-indigo-600">500+</div>
            <div className="text-gray-600 text-sm">Companies</div>
          </div>
          <div className="bg-white/50 backdrop-blur-sm rounded-lg p-4 shadow-sm">
            <div className="text-2xl font-bold text-indigo-600">50+</div>
            <div className="text-gray-600 text-sm">Categories</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
