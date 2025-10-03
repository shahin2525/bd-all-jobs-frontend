// import React from "react";

// const FeaturedJob = () => {
//   return (
//     <div>
//       <h1>Featured Job</h1>
//     </div>
//   );
// };

// export default FeaturedJob;
interface FeaturedJobProps {
  jobs: IJob[]; // Or whatever type your jobs are
}
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IJob } from "@/interface";
import Link from "next/link";

// type Job = {
//   _id: string;
//   title: string;
//   companyName: string;
//   location: string;
//   salaryRange: { min: number; max: number; currency: string };
//   sourceName?: string;
// };

export default function FeaturedJob({ jobs }: FeaturedJobProps) {
  return (
    <section className="container mx-auto px-4 py-10">
      <header className="mb-8 text-center">
        <h2 className="text-3xl font-bold">Featured Jobs</h2>
        <p className="text-muted-foreground mt-2">
          Handpicked opportunities for you
        </p>
      </header>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {jobs.map((job) => (
          <article key={job._id}>
            {/* <Card className="h-full flex flex-col justify-between">
              <CardHeader>
                <CardTitle className="text-lg font-semibold line-clamp-2">
                  {job.title}
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  {job.companyName}
                </p>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <p>
                  <span className="font-medium">Location:</span> {job.location}
                </p>
                <p>
                  <span className="font-medium">Salary:</span>{" "}
                  {job?.salaryRange?.min}–{job?.salaryRange?.max}{" "}
                  {job?.salaryRange?.currency}
                </p>
                {job.sourceName && (
                  <p className="text-xs text-muted-foreground">
                    Source: {job.sourceName}
                  </p>
                )}
                <Link
                  href={`/jobs/${job._id}`}
                  className="inline-block mt-3 rounded-md bg-primary px-4 py-2 text-white text-center text-sm hover:bg-primary/90 transition"
                >
                  Apply Now
                </Link>
              </CardContent>
            </Card> */}
            <Card className="h-full flex flex-col justify-between bg-card text-card-foreground">
              <CardHeader>
                <CardTitle className="text-lg font-semibold line-clamp-2">
                  {job.title}
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  {job.companyName}
                </p>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <p>
                  <span className="font-medium">Location:</span> {job.location}
                </p>
                <p>
                  <span className="font-medium">Salary:</span>{" "}
                  {job?.salaryRange?.min}–{job?.salaryRange?.max}{" "}
                  {job?.salaryRange?.currency}
                </p>
                {job?.sourceName && (
                  <p className="text-xs text-muted-foreground">
                    Source: {job.sourceName}
                  </p>
                )}
                <Link
                  href={`/jobs/${job._id}`}
                  className="inline-block mt-3 rounded-md bg-primary text-primary-foreground px-4 py-2 text-center text-sm hover:bg-primary/90 transition"
                >
                  Apply Now
                </Link>
              </CardContent>
            </Card>
          </article>
        ))}
      </div>
    </section>
  );
}
