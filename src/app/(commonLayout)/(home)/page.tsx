// "use client";
// import FeaturedJob from "@/components/modules/home/featured";
// import HeroSection from "@/components/modules/home/hero-section";
// // import { useUser } from "@/context/UserContext";

// const HomePage = () => {
//   // const user = useUser();
//   // console.log(user);
//   return (
//     <div>
//       <HeroSection />
//       <FeaturedJob />
//     </div>
//   );
// };

// export default HomePage;

import HeroSection from "@/components/modules/home/hero-section";
import FeaturedJob from "@/components/modules/home/featured";

import { Metadata } from "next";
import { getAllJobsAction } from "@/services/job";
import CategorySection from "@/components/modules/home/category-section";
import BlogSection from "@/components/modules/home/blog-section";

// ✅ SEO metadata for Google
export const metadata: Metadata = {
  title: "Find Your Dream Job in Bangladesh | BD Jobs Portal",
  description:
    "Browse thousands of fresh job listings across Bangladesh. Filter by location, sector, salary and apply directly online.",
  openGraph: {
    title: "Find Your Dream Job in Bangladesh | BD Jobs Portal",
    description:
      "Browse thousands of fresh job listings across Bangladesh. Filter by location, sector, salary and apply directly online.",
    type: "website",
    url: "https://your-domain.com",
  },
};

export default async function HomePage() {
  // Fetch 8 featured jobs for homepage
  const jobs = await getAllJobsAction({ page: 1, limit: 8, sort: "recent" });

  return (
    <main>
      <HeroSection />
      {/* Empty block for future Google AdSense */}

      <div className="my-6 w-full flex justify-center">
        {/* Google AdSense code will go here */}
        <div className="w-full max-w-[728px] h-[90px] bg-gray-100 text-gray-400 flex items-center justify-center">
          Google Ad Placeholder
        </div>
      </div>

      <FeaturedJob jobs={jobs.data} />
      <CategorySection />
      <BlogSection />
    </main>
  );
}
