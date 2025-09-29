// "use client";

// import React, { useEffect, useState } from "react";
// import Head from "next/head";
// // import { getAllJobsAction } from "@/actions/getAllJobsAction"; // adjust path if needed
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { motion } from "framer-motion";
// import { getAllJobsAction } from "@/services/job";

// // ✅ Strong typing for Job item (replace fields with your real DB shape)
// interface Job {
//   _id: string;
//   title: string;
//   company: string;
//   location: string;
//   salary?: string;
//   employmentType?: string;
//   createdAt: string;
// }

// export default function FindJobPage() {
//   const [jobs, setJobs] = useState<Job[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [search, setSearch] = useState("");
//   const [sort, setSort] = useState<string | undefined>("recent");

//   useEffect(() => {
//     async function fetchJobs() {
//       try {
//         setLoading(true);
//         const res = await getAllJobsAction({
//           search,
//           sort: sort as any,
//           page: 1,
//           limit: 12,
//         });
//         setJobs(res.data);
//       } catch (err) {
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     }
//     fetchJobs();
//   }, [search, sort]);

//   return (
//     <>
//       {/* ✅ SEO Meta Tags */}
//       <Head>
//         <title>Find Jobs | Your Job Portal</title>
//         <meta
//           name="description"
//           content="Search and find your dream job. Browse the latest job openings across industries."
//         />
//       </Head>

//       <main className="max-w-7xl mx-auto px-4 py-10">
//         <motion.h1
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//           className="text-3xl font-bold text-center mb-8"
//         >
//           Find Your Next Job
//         </motion.h1>

//         {/* 🔎 Search & Sort Controls */}
//         <div className="flex flex-col sm:flex-row gap-4 mb-8">
//           <Input
//             placeholder="Search by title, company or keyword..."
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             className="sm:flex-1"
//           />
//           <Select onValueChange={(v) => setSort(v)} defaultValue="recent">
//             <SelectTrigger className="sm:w-48">
//               <SelectValue placeholder="Sort by" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectItem value="recent">Most Recent</SelectItem>
//               <SelectItem value="salary-asc">Salary: Low to High</SelectItem>
//               <SelectItem value="salary-desc">Salary: High to Low</SelectItem>
//             </SelectContent>
//           </Select>
//         </div>

//         {/* 🟩 Google AdSense Placeholder */}
//         <div className="my-6 flex justify-center">
//           {/* Replace data-ad-client & data-ad-slot with your AdSense info after approval */}
//           <div className="bg-gray-100 border border-dashed border-gray-300 w-full sm:w-2/3 h-28 flex items-center justify-center text-gray-500 text-sm">
//             Google AdSense Banner Placeholder
//           </div>
//         </div>

//         {/* 📋 Job Listings */}
//         {loading ? (
//           <p className="text-center text-gray-500">Loading jobs...</p>
//         ) : jobs.length === 0 ? (
//           <p className="text-center text-gray-500">No jobs found.</p>
//         ) : (
//           <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
//             {jobs.map((job) => (
//               <motion.div
//                 key={job._id}
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.3 }}
//               >
//                 <Card className="hover:shadow-lg transition">
//                   <CardHeader>
//                     <CardTitle className="line-clamp-1">{job.title}</CardTitle>
//                   </CardHeader>
//                   <CardContent className="space-y-2">
//                     <p className="text-sm text-gray-600 font-medium">
//                       {job.company}
//                     </p>
//                     <p className="text-sm text-gray-500">{job.location}</p>
//                     {job.salary && (
//                       <p className="text-sm text-gray-500">💰 {job.salary}</p>
//                     )}
//                     {job.employmentType && (
//                       <p className="text-xs text-gray-400">
//                         {job.employmentType}
//                       </p>
//                     )}
//                     <p className="text-xs text-gray-400">
//                       Posted: {new Date(job.createdAt).toLocaleDateString()}
//                     </p>
//                     <Button asChild className="w-full mt-2" variant="default">
//                       <a href={`/jobs/${job._id}`}>View Details</a>
//                     </Button>
//                   </CardContent>
//                 </Card>
//               </motion.div>
//             ))}
//           </div>
//         )}
//       </main>
//     </>
//   );
// }
import React from "react";
import Head from "next/head";
import JobBrowser from "@/components/modules/job/find-jobs";
// 👈 our new client component

export const metadata = {
  title: "Find Jobs | Your Job Portal",
  description:
    "Search and find your dream job. Browse the latest job openings across industries.",
};

export default function FindJobPage() {
  // 🔹 This is a Server Component by default (no "use client")
  //    You can even fetch some static SEO data here if needed.
  return (
    <>
      <Head>
        <title>Find Jobs | Your Job Portal</title>
      </Head>
      <main className="max-w-7xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold text-center mb-8">
          Find Your Next Job
        </h1>

        {/* 👇 All client-side interactivity lives in JobBrowser */}
        <JobBrowser />
      </main>
    </>
  );
}
