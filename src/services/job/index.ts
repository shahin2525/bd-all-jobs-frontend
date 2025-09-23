"use server";
import { z } from "zod";
import { cookies } from "next/headers";

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

export async function getAllJobsAction(options: QueryOptions) {
  const parsed = queryOptionsSchema.parse(options);

  // Build query string
  const params = new URLSearchParams();

  if (parsed.search) params.set("search", parsed.search);
  if (parsed.sort) params.set("sort", parsed.sort);
  if (parsed.page) params.set("page", String(parsed.page));
  if (parsed.limit) params.set("limit", String(parsed.limit));

  if (parsed.filters) {
    Object.entries(parsed.filters).forEach(([key, value]) => {
      if (value) params.set(`filters[${key}]`, value);
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
