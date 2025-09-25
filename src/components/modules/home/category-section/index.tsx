// "use client";

// import Link from "next/link";
// import { Card, CardHeader, CardTitle } from "@/components/ui/card";
// import { Briefcase, Laptop, Globe, Clock, Users } from "lucide-react"; // Icons

// const categories = [
//   { name: "IT Jobs", icon: Laptop, slug: "it" },
//   { name: "Government Jobs", icon: Briefcase, slug: "government" },
//   { name: "Remote Jobs", icon: Globe, slug: "remote" },
//   { name: "Freelance", icon: Users, slug: "freelance" },
//   { name: "Part-Time", icon: Clock, slug: "part-time" },
// ];

// export default function CategorySection() {
//   return (
//     <section className="container mx-auto px-4 py-12">
//       <header className="text-center mb-8" aria-label="Job categories">
//         <h2 className="text-3xl font-bold">Browse Jobs by Category</h2>
//         <p className="text-muted-foreground mt-2">
//           Choose your preferred industry or work style in Bangladesh job market
//         </p>
//       </header>

//       <div
//         role="list"
//         className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5"
//       >
//         {categories.map((cat) => (
//           <div key={cat.slug} role="listitem">
//             <Link
//               href={`/jobs?category=${cat.slug}`}
//               aria-label={`Browse ${cat.name} in Bangladesh`}
//             >
//               <Card className="group cursor-pointer bg-card text-card-foreground hover:bg-primary/5 transition p-6 flex flex-col items-center justify-center text-center h-full min-h-[180px]">
//                 <cat.icon
//                   className="w-8 h-8 text-primary mb-4 group-hover:scale-110 transition"
//                   aria-hidden="true"
//                 />
//                 <CardHeader className="p-0 flex-1 flex items-center justify-center">
//                   <CardTitle className="text-lg font-semibold leading-tight">
//                     {cat.name}
//                   </CardTitle>
//                 </CardHeader>
//               </Card>
//             </Link>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// }
"use client";

import Link from "next/link";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, Laptop, Globe, Clock, Users } from "lucide-react";

const categories = [
  { name: "IT Jobs", icon: Laptop, slug: "it" },
  { name: "Government Jobs", icon: Briefcase, slug: "government" },
  { name: "Remote Jobs", icon: Globe, slug: "remote" },
  { name: "Freelance", icon: Users, slug: "freelance" },
  { name: "Part-Time", icon: Clock, slug: "part-time" },
];

export default function CategorySection() {
  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
      <header
        className="text-center mb-6 sm:mb-8 lg:mb-12"
        aria-label="Job categories"
      >
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
          Browse Jobs by Category
        </h2>
        <p className="text-muted-foreground mt-2 sm:mt-3 text-sm sm:text-base max-w-2xl mx-auto px-4">
          Choose your preferred industry or work style in Bangladesh job market
        </p>
      </header>

      {/* Auto-fit grid for better responsiveness */}
      <div
        role="list"
        className="grid grid-cols-1 min-[400px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6"
        style={{
          gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
        }}
      >
        {categories.map((cat) => (
          <div key={cat.slug} role="listitem" className="flex">
            <Link
              href={`/jobs?category=${cat.slug}`}
              aria-label={`Browse ${cat.name} in Bangladesh`}
              className="flex-1 w-full"
            >
              <Card className="group cursor-pointer bg-card text-card-foreground hover:bg-primary/5 transition-all duration-300 p-4 sm:p-5 flex flex-col items-center justify-center text-center h-full min-h-[120px] w-full hover:shadow-md">
                <cat.icon
                  className="w-6 h-6 sm:w-7 sm:h-7 text-primary mb-3 group-hover:scale-110 transition-transform duration-300"
                  aria-hidden="true"
                />
                <CardHeader className="p-0 w-full">
                  <CardTitle className="text-sm sm:text-base font-semibold leading-tight break-words">
                    {cat.name}
                  </CardTitle>
                </CardHeader>
              </Card>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
