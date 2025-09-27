"use client";
import React from "react";
// data/staticBlogs.ts
export const staticBlogs = [
  {
    id: 1,
    title: "5 Powerful Resume Writing Tips",
    category: "Resume",
    thumbnail: "/images/resume-tips.jpg",
    excerpt:
      "Learn how to craft a job-winning resume with these expert guidelines.",
    slug: "resume-writing-tips",
  },
  {
    id: 2,
    title: "Top 10 Interview Questions & How to Answer",
    category: "Interview",
    thumbnail: "/images/interview-questions.jpg",
    excerpt:
      "Be prepared for your next interview with these common questions and answers.",
    slug: "interview-questions",
  },
  {
    id: 3,
    title: "How to Negotiate Your Salary Like a Pro",
    category: "Career",
    thumbnail: "/images/salary-negotiate.jpg",
    excerpt: "Practical strategies to secure a better compensation package.",
    slug: "salary-negotiation",
  },
];

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

// const BlogSection = () => {
//   return (
//     <section className="py-12 bg-gray-50">
//       <div className="container mx-auto px-4">
//         <div className="mb-8 text-center">
//           <h2 className="text-3xl font-bold">Career Tips & Insights</h2>
//           <p className="text-muted-foreground mt-2">
//             Helpful articles to guide your job search
//           </p>
//         </div>

//         <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
//           {staticBlogs.map((post) => (
//             <Card key={post.id} className="overflow-hidden hover:shadow-lg">
//               <Image
//                 src={post.thumbnail}
//                 alt={post.title}
//                 width={600}
//                 height={400}
//                 className="h-48 w-full object-cover"
//               />
//               <CardHeader>
//                 <span className="text-xs uppercase text-primary">
//                   {post.category}
//                 </span>
//                 <CardTitle className="mt-2 line-clamp-2">
//                   <Link href={`/blog/${post.slug}`}>{post.title}</Link>
//                 </CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <p className="text-sm text-muted-foreground line-clamp-3">
//                   {post.excerpt}
//                 </p>
//               </CardContent>
//             </Card>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default BlogSection;
const BlogSection = () => {
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold">Career Tips & Insights</h2>
          <p className="text-muted-foreground mt-2">
            Helpful articles to guide your job search
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {staticBlogs.map((post) => (
            <article key={post.id}>
              <Card className="overflow-hidden hover:shadow-lg">
                <Image
                  src={post.thumbnail}
                  alt={post.title}
                  width={600}
                  height={400}
                  className="h-48 w-full object-cover"
                  loading="lazy"
                />
                <CardHeader>
                  <span className="text-xs uppercase text-primary">
                    {post.category}
                  </span>
                  <CardTitle>
                    <h3 className="mt-2 line-clamp-2">
                      <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                    </h3>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {post.excerpt}
                  </p>
                </CardContent>
              </Card>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
