// "use client";

// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Search } from "lucide-react";

// export default function HeroSection() {
//   return (
//     <section className="w-full bg-gradient-to-r from-blue-50 to-indigo-100 py-16 px-4 text-center">
//       <div className="max-w-3xl mx-auto">
//         {/* Headline */}
//         <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
//           Find Your <span className="text-indigo-600">Dream Job</span> Today
//         </h1>

//         {/* Subtext */}
//         <p className="text-gray-600 mb-8 text-lg">
//           Search thousands of job opportunities across industries and locations.
//         </p>

//         {/* Search Bar */}
//         <div className="flex flex-col md:flex-row items-center gap-4 bg-white rounded-2xl shadow-lg p-4">
//           <Input
//             placeholder="Job title or keyword"
//             className="flex-1 border-gray-300"
//           />
//           <Input placeholder="Location" className="flex-1 border-gray-300" />
//           <Button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700">
//             <Search className="w-4 h-4" />
//             Search
//           </Button>
//         </div>

//         {/* CTA Buttons */}
//         <div className="flex justify-center gap-4 mt-6">
//           <Button variant="outline" className="rounded-full">
//             Browse Jobs
//           </Button>
//           <Button className="rounded-full bg-indigo-600 hover:bg-indigo-700">
//             Post a Job
//           </Button>
//         </div>
//       </div>
//     </section>
//   );
// }
"use client";

import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";

export default function HeroSection() {
  const categories = [
    { name: "IT Jobs", link: "/jobs?category=it" },
    { name: "Government Jobs", link: "/jobs?category=government" },
    { name: "Remote Jobs", link: "/jobs?category=remote" },
    { name: "Freelance", link: "/jobs?category=freelance" },
    { name: "Part-Time", link: "/jobs?category=part-time" },
  ];

  return (
    <section className="w-full bg-gradient-to-r from-blue-50 to-indigo-100 py-16 px-4 text-center">
      <div className="max-w-3xl mx-auto">
        {/* Animated Headline */}
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
        >
          Find Your <span className="text-indigo-600">Dream Job</span> Today
        </motion.h1>

        {/* Animated Subtext */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-gray-600 mb-8 text-lg"
        >
          Search thousands of job opportunities across industries and locations.
        </motion.p>

        {/* Animated Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="flex flex-col md:flex-row items-center gap-4 bg-white rounded-2xl shadow-lg p-4"
        >
          <Input placeholder="Job title or keyword" className="flex-1" />
          <Input placeholder="Location" className="flex-1" />
          <Button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700">
            <Search className="w-4 h-4" />
            Search
          </Button>
        </motion.div>

        {/* Ad Placeholder */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="w-full flex justify-center mt-6"
        >
          <div className="ad-container bg-gray-100 rounded-lg shadow-md w-full max-w-3xl h-24 flex items-center justify-center">
            <span className="text-gray-400 text-sm">
              Ad Space (Google AdSense)
            </span>
          </div>
        </motion.div>

        {/* Animated Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mt-8 flex flex-wrap justify-center gap-3"
        >
          {categories.map((cat) => (
            <a key={cat.name} href={cat.link}>
              <Badge
                variant="outline"
                className="cursor-pointer px-4 py-2 text-sm hover:bg-indigo-100"
              >
                {cat.name}
              </Badge>
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
