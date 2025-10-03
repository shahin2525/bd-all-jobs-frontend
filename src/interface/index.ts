export interface IJob {
  // Core Info
  _id: string;
  title: string;
  slug: string;
  shortDescription?: string;
  description: string;

  // Company Information
  companyName: string;
  companyWebsite?: string;
  companyLogo?: string;
  companyIndustry?: string;

  // Sector Info
  sector: "government" | "non-government" | "ngo" | "public-sector";

  // Location
  location: string;
  jobLocation: {
    addressCountry: string;
    addressRegion?: string;
    addressLocality: string;
    postalCode?: string;
    streetAddress?: string;
    latitude?: number;
    longitude?: number;
  };

  // Salary
  salaryRange?: {
    min: number;
    max: number;
    currency: string;
    unitText: "MONTH" | "HOUR" | "YEAR" | "DAY";
  };
  benefits?: string[];

  // Job Details
  employmentType:
    | "FULL-TIME"
    | "PART-TIME"
    | "CONTRACTOR"
    | "TEMPORARY"
    | "INTERN"
    | "VOLUNTEER"
    | "PER-DIEM"
    | "OTHER"
    | "remote"
    | "internship"
    | "freelance";
  isRemoteAvailable: boolean;

  // Job Source
  source: "own" | "third-party";
  applyLink?: string;
  sourceName?: string;

  // Recruiter Info
  postedBy?: string;

  // Metadata
  experienceLevel?:
    | "ENTRY_LEVEL"
    | "MID_LEVEL"
    | "SENIOR_LEVEL"
    | "DIRECTOR"
    | "EXECUTIVE";
  educationRequired?: string[];
  skillsRequired?: string[];
  requirements?: string[];
  responsibilities?: string[];
  niceToHave?: string[];

  // Application Settings
  applicationDeadline?: string; // Date as ISO string
  applicationMethod: "internal" | "external";
  applyEmail?: string;
  applicationInstructions?: string;
  expectedResponseTime?: string;
  interviewProcess?: string[];

  // EEO Compliance
  equalOpportunityStatement?: string;
  visaSponsorshipAvailable?: boolean;

  // Tracking
  applicants?: string[];
  savedBy?: string[];
  viewsCount?: number;
  clicksCount?: number;

  // Visibility & Monetization
  status: "active" | "expired" | "draft" | "pending" | "rejected";
  isFeatured?: boolean;
  boostLevel?: "normal" | "featured" | "sponsored";
  premiumUntil?: string; // Date as ISO string
  autoRenew?: boolean;

  // SEO
  metaTitle?: string;
  metaDescription?: string;
  canonicalUrl?: string;
  tags?: string[];
  category?: string;
  subcategory?: string;
  featuredImage?: string;
  ogImage?: string;
  structuredData?: Record<string, unknown>;

  // Timestamps
  postedAt: string; // Date as ISO string
  expiresAt: string; // Date as ISO string
  lastUpdatedAt?: string; // Date as ISO string

  // Frontend specific fields
  isSaved?: boolean; // Whether current user has saved this job
  hasApplied?: boolean; // Whether current user has applied
  isExpired?: boolean; // Computed field for frontend
  daysLeft?: number; // Computed field for expiration
}
