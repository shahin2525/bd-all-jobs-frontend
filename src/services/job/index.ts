"use server";
import { z } from "zod";
import { cookies } from "next/headers";
import { IJob } from "@/interface";

export const postJob = async (data: FormData) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/jobs`, {
      method: "POST",
      headers: {
        Authorization: (await cookies()).get("accessToken")!.value,
      },
      body: data,
    });

    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};

// 🟢 Define the shape of the query options
const queryOptionsSchema = z.object({
  search: z.string().optional(),
  sort: z.enum(["salary-asc", "salary-desc", "recent"]).optional(),
  page: z.number().min(1).optional(),
  limit: z.number().min(1).optional(),
  filters: z
    .object({
      sector: z.string().optional(),
      employmentType: z.string().optional(),
      location: z.string().optional(),
      status: z.string().optional(),
    })
    .optional(),
});

// 🟢 Type for strong typing
type QueryOptions = z.infer<typeof queryOptionsSchema>;

// 🟢 Replace with your backend base URL (env recommended)
// const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export async function getAllJobsAction2(options: QueryOptions) {
  const parsed = queryOptionsSchema.parse(options);

  // Build query string
  const params = new URLSearchParams();

  if (parsed.search) params.set("search", parsed.search);
  if (parsed.sort) params.set("sort", parsed.sort);
  if (parsed.page) params.set("page", String(parsed.page));
  if (parsed.limit) params.set("limit", String(parsed.limit));

  if (parsed.filters) {
    Object.entries(parsed.filters).forEach(([key, value]) => {
      if (value) params.set(`filters[${key}]`, value as string);
    });
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_API}/jobs?${params.toString()}`,
    {
      method: "GET",
      cache: "no-store", // ensure fresh data on every request
    }
  );

  if (!res.ok) {
    throw new Error(`Failed to fetch jobs: ${res.statusText}`);
  }

  const result = await res.json();
  return result as {
    data: any[]; // ideally replace with your Job interface
    meta: {
      total: number;
      page: number;
      limit: number;
      totalPages: number;
    };
  };
}

//
// 🟢 Define the shape of the query options
const queryOptionsSchema3 = z.object({
  search: z.string().optional(),
  sort: z.enum(["salary-asc", "salary-desc", "recent", "featured"]).optional(),
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(100).default(10),
  filters: z
    .object({
      sector: z
        .enum(["government", "non-government", "ngo", "public-sector"])
        .optional(),
      employmentType: z
        .enum([
          "FULL-TIME",
          "PART-TIME",
          "CONTRACTOR",
          "TEMPORARY",
          "INTERN",
          "VOLUNTEER",
          "PER-DIEM",
          "OTHER",
          "remote",
          "internship",
          "freelance",
        ])
        .optional(),
      location: z.string().optional(),
      status: z
        .enum(["active", "expired", "draft", "pending", "rejected"])
        .optional(),
      isRemoteAvailable: z.boolean().optional(),
    })
    .optional(),
});

// 🟢 Type for strong typing
export type QueryOptions3 = z.infer<typeof queryOptionsSchema3>;

// 🟢 Response type
export type JobsResponse = {
  data: IJob[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
};

/**
 * Server action to fetch jobs with filtering, sorting, and pagination
 */
export async function getAllJobsAction3(
  options: QueryOptions3
): Promise<JobsResponse> {
  try {
    // Validate input
    const parsed = queryOptionsSchema3.parse(options);

    // Build query string
    const params = new URLSearchParams();

    // Add main query parameters
    if (parsed.search) params.set("search", parsed.search);
    if (parsed.sort) params.set("sort", parsed.sort);
    if (parsed.page) params.set("page", parsed.page.toString());
    if (parsed.limit) params.set("limit", parsed.limit.toString());

    // Add filters
    if (parsed.filters) {
      Object.entries(parsed.filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
          params.set(`filters[${key}]`, value.toString());
        }
      });
    }

    const apiUrl = `${
      process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"
    }/api/jobs?${params.toString()}`;

    const res = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      next: {
        tags: ["jobs"], // For revalidation
        revalidate: 60, // Cache for 60 seconds
      },
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error(`API Error (${res.status}):`, errorText);
      throw new Error(`Failed to fetch jobs: ${res.status} ${res.statusText}`);
    }

    const result = await res.json();

    // Validate response structure
    if (!result.data || !result.meta) {
      throw new Error("Invalid API response structure");
    }

    return result as JobsResponse;
  } catch (error) {
    console.error("Error in getAllJobsAction:", error);

    if (error instanceof z.ZodError) {
      throw new Error(
        `Invalid query parameters: ${error.issues
          .map((e) => e.message)
          .join(", ")}`
      );
    }

    throw error instanceof Error ? error : new Error("Unknown error occurred");
  }
}

/**
 * Server action to get featured jobs for homepage
 */
export async function getFeaturedJobsAction(
  limit: number = 6
): Promise<IJob[]> {
  try {
    const options: QueryOptions3 = {
      filters: {
        status: "active",
        isRemoteAvailable: true,
      },
      sort: "featured",
      limit,
      page: 1,
    };

    const response = await getAllJobsAction3(options);
    return response.data;
  } catch (error) {
    console.error("Error fetching featured jobs:", error);
    return [];
  }
}

/**
 * Server action to get jobs by category
 */
export async function getJobsByCategoryAction(
  category: string,
  limit: number = 10
): Promise<JobsResponse> {
  try {
    const options: QueryOptions3 = {
      filters: {
        sector: category as any, // Type will be validated by schema
        status: "active",
      },
      limit,
      page: 1,
    };

    return await getAllJobsAction3(options);
  } catch (error) {
    console.error(`Error fetching ${category} jobs:`, error);
    throw error;
  }
}
