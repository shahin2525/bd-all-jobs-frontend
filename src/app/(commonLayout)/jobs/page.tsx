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
