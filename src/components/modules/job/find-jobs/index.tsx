"use client";

import React, { useEffect, useState } from "react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { motion } from "framer-motion";
import { getAllJobsAction } from "@/services/job";

interface Job {
  _id: string;
  title: string;
  company: string;
  location: string;
  salary?: string;
  employmentType?: string;
  createdAt: string;
  category: string;
}

export default function JobBrowser() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<string | undefined>("recent");
  // console.log(jobs);
  const task = jobs.map((job) => console.log(job));

  useEffect(() => {
    async function fetchJobs() {
      try {
        setLoading(true);
        const res = await getAllJobsAction({
          search,
          sort: sort as any,
          page: 1,
          limit: 12,
        });
        setJobs(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchJobs();
  }, [search, sort]);

  return (
    <>
      {/* Search & Sort Controls */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <Input
          placeholder="Search jobs..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="sm:flex-1"
        />
        <Select onValueChange={(v) => setSort(v)} defaultValue="recent">
          <SelectTrigger className="sm:w-48">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="recent">Most Recent</SelectItem>
            <SelectItem value="salary-asc">Salary: Low to High</SelectItem>
            <SelectItem value="salary-desc">Salary: High to Low</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Google AdSense Placeholder */}
      <div className="my-6 flex justify-center">
        <div className="bg-gray-100 border border-dashed border-gray-300 w-full sm:w-2/3 h-28 flex items-center justify-center text-gray-500 text-sm">
          Google AdSense Banner Placeholder
        </div>
      </div>

      {/* Job Listings */}
      {loading ? (
        <p className="text-center text-gray-500">Loading jobs...</p>
      ) : jobs.length === 0 ? (
        <p className="text-center text-gray-500">No jobs found.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {jobs.map((job) => (
            <motion.div
              key={job._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="hover:shadow-lg transition">
                <CardHeader>
                  <CardTitle className="line-clamp-1">{job.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="text-sm text-gray-600 font-medium">
                    {job.company}
                  </p>
                  <p className="text-sm text-gray-500">{job.location}</p>
                  {job.salary && (
                    <p className="text-sm text-gray-500">💰 {job.salary}</p>
                  )}
                  {job.category && (
                    <p className="text-sm text-gray-500">💰 {job.category}</p>
                  )}
                  {job.employmentType && (
                    <p className="text-xs text-gray-400">
                      {job.employmentType}
                    </p>
                  )}
                  <p className="text-xs text-gray-400">
                    Posted: {new Date(job.createdAt).toLocaleDateString()}
                  </p>
                  <Button asChild className="w-full mt-2">
                    <a href={`/jobs/${job._id}`}>View Details</a>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </>
  );
}
