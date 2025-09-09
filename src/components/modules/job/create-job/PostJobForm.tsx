"use client";

import { useState } from "react";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { postJob } from "@/services/job";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import NMImageUploader from "@/components/ui/core/NMImageUploader";
import ImagePreviewer from "@/components/ui/core/NMImageUploader/ImagePreviewer";
import { Checkbox } from "@/components/ui/checkbox";
import { useUser } from "@/context/UserContext";

export default function PostJobForm() {
  const { user } = useUser();
  console.log("user", user);
  const [skills, setSkills] = useState<string[]>([]);
  const [educationRequired, setEducationRequired] = useState<string[]>([]);
  const [requirements, setRequirements] = useState<string[]>([]);
  const [responsibilities, setResponsibilities] = useState<string[]>([]);
  const [niceToHave, setNiceToHave] = useState<string[]>([]);
  const [benefits, setBenefits] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [interviewProcess, setInterviewProcess] = useState<string[]>([]);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagePreview, setImagePreview] = useState<string[]>([]);

  const form = useForm({
    defaultValues: {
      // title: "",
      // slug: "",
      // shortDescription: "",
      // description: "",
      // companyName: "",
      // companyWebsite: "",
      // companyLogo: "",
      // companyIndustry: "",
      // sector: "",
      // location: "",
      // addressCountry: "",
      // addressRegion: "",
      // addressLocality: "",
      // postalCode: "",
      // streetAddress: "",
      // latitude: "",
      // longitude: "",
      // salaryMin: "",
      // salaryMax: "",
      // salaryCurrency: "BDT",
      // salaryUnit: "MONTH",
      // employmentType: "",
      // isRemoteAvailable: false,
      // source: "own",
      // applyLink: "",
      // sourceName: "",
      // postedBy: user?.userId,
      // experienceLevel: "",
      // applicationDeadline: "",
      // applicationMethod: "internal",
      // applyEmail: "",
      // applicationInstructions: "",
      // expectedResponseTime: "",
      // equalOpportunityStatement: "",
      // visaSponsorshipAvailable: false,
      // status: "draft",
      // isFeatured: false,
      // boostLevel: "normal",
      // premiumUntil: "",
      // autoRenew: false,
      // metaTitle: "",
      // metaDescription: "",
      // canonicalUrl: "",
      // category: "",
      // subcategory: "",
      // featuredImage: "",
      // ogImage: "",

      title: "Senior Software Engineer",
      slug: "senior-software-engineer",
      shortDescription: "Join our dynamic team as a Senior Software Engineer.",
      description:
        "We are looking for a talented Senior Software Engineer to build scalable applications and lead projects. You will work with modern technologies and a passionate team.",
      companyName: "Tech Innovators Ltd.",
      companyWebsite: "https://www.techinnovators.com",
      companyLogo: "",
      //https://www.techinnovators.com/logo.png
      companyIndustry: "Information Technology",
      sector: "non-government",
      location: "Dhaka, Bangladesh",
      addressCountry: "Bangladesh",
      addressRegion: "Dhaka Division",
      addressLocality: "Dhaka",
      postalCode: "1207",
      streetAddress: "123, Gulshan Avenue",
      latitude: "23.7806",
      longitude: "90.4074",
      salaryMin: "60000",
      salaryMax: "120000",
      salaryCurrency: "BDT",
      salaryUnit: "MONTH",
      employmentType: "FULL-TIME",
      isRemoteAvailable: true,
      source: "own",
      applyLink: "https://www.techinnovators.com/careers/apply",
      sourceName: "Tech Innovators Careers",
      postedBy: user?.userId, // Example ObjectId
      experienceLevel: "MID_LEVEL",
      applicationDeadline: "2025-12-31",
      applicationMethod: "internal",
      applyEmail: "hr@techinnovators.com",
      applicationInstructions:
        "Submit your resume and cover letter via our website.",
      expectedResponseTime: "Within 7 business days",
      equalOpportunityStatement:
        "We are an equal opportunity employer and value diversity at our company.",
      visaSponsorshipAvailable: true,
      status: "active",
      isFeatured: true,
      boostLevel: "featured",
      premiumUntil: "2025-12-31",
      autoRenew: true,
      metaTitle: "Senior Software Engineer Job in Dhaka | Tech Innovators Ltd.",
      metaDescription:
        "Apply for Senior Software Engineer position at Tech Innovators Ltd. Competitive salary and career growth opportunities in Dhaka, Bangladesh.",
      canonicalUrl:
        "https://www.techinnovators.com/jobs/senior-software-engineer",
      category: "Software Development",
      subcategory: "Backend Development",
      featuredImage:
        "https://www.techinnovators.com/jobs/images/software-engineer.jpg",
      ogImage:
        "https://www.techinnovators.com/jobs/images/og-software-engineer.jpg",

      postedAt: new Date().toISOString().split("T")[0],
      expiresAt: "",
    },
  });

  const {
    formState: { isSubmitting },
  } = form;

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const payload = {
      ...data,
      skillsRequired: skills,
      educationRequired: educationRequired,
      requirements: requirements,
      responsibilities: responsibilities,
      niceToHave: niceToHave,
      benefits: benefits,
      tags: tags,
      interviewProcess: interviewProcess,
      jobLocation: {
        addressCountry: data.addressCountry,
        addressRegion: data.addressRegion,
        addressLocality: data.addressLocality,
        postalCode: data.postalCode,
        streetAddress: data.streetAddress,
        latitude: data.latitude ? Number(data.latitude) : undefined,
        longitude: data.longitude ? Number(data.longitude) : undefined,
      },
      salaryRange:
        data.salaryMin && data.salaryMax
          ? {
              min: Number(data.salaryMin),
              max: Number(data.salaryMax),
              currency: data.salaryCurrency,
              unitText: data.salaryUnit,
            }
          : undefined,
      postedAt: new Date(data.postedAt || Date.now()),
      expiresAt: new Date(data.expiresAt || Date.now()),
      applicationDeadline: data.applicationDeadline
        ? new Date(data.applicationDeadline)
        : undefined,
      premiumUntil: data.premiumUntil ? new Date(data.premiumUntil) : undefined,
    };
    console.log("payload", payload);
    try {
      const formData = new FormData();
      formData.append("data", JSON.stringify(payload));
      if (imageFiles[0]) {
        formData.append("file", imageFiles[0]);
      }
      console.log("form data", formData);
      const res = await postJob(formData);

      console.log("res", res);
      if (res.success) {
        toast.success("Job posted successfully!");
        form.reset();
        setSkills([]);
        setEducationRequired([]);
        setRequirements([]);
        setResponsibilities([]);
        setNiceToHave([]);
        setBenefits([]);
        setTags([]);
        setInterviewProcess([]);
        setImageFiles([]);
        setImagePreview([]);
      }
    } catch (error: any) {
      console.error(error);
      toast.error("Failed to post job!");
    }
  };

  return (
    <div className="border-2 border-gray-300 rounded-xl max-w-4xl mx-auto p-4 sm:p-6 my-5 w-full">
      <h1 className="text-xl sm:text-2xl font-semibold mb-4 text-center">
        Post a Job
      </h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 w-full"
        >
          {/* Core Information Section */}
          <div className="border-b pb-4">
            <h2 className="text-lg font-medium mb-4">Core Information</h2>
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job Title *</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Enter job title"
                        className="w-full"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="slug"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Slug *</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="SEO-friendly URL slug"
                        className="w-full"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="shortDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Short Description (Max 150 characters)
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Brief description for previews"
                        className="w-full"
                        maxLength={150}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Description *</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        className="h-32 w-full"
                        placeholder="Detailed job description"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Company Information Section */}
          <div className="border-b pb-4">
            <h2 className="text-lg font-medium mb-4">Company Information</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="companyName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company Name *</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Company name"
                        className="w-full"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="companyWebsite"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company Website</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="https://example.com"
                        className="w-full"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="companyIndustry"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company Industry</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Industry sector"
                        className="w-full"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              {/* Sector */}
              <FormField
                control={form.control}
                name="sector"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sector *</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select sector" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="government">Government</SelectItem>
                        <SelectItem value="non-government">
                          Non-Government
                        </SelectItem>
                        <SelectItem value="ngo">NGO</SelectItem>
                        <SelectItem value="public-sector">
                          Public Sector
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Location Information Section */}
          <div className="border-b pb-4">
            <h2 className="text-lg font-medium mb-4">Location Information</h2>
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location Display Text *</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="e.g. Dhaka, Bangladesh"
                      className="w-full"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              <FormField
                control={form.control}
                name="addressCountry"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Country *</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="e.g. Bangladesh"
                        className="w-full"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="addressLocality"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City/Locality *</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="e.g. Dhaka"
                        className="w-full"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="addressRegion"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Region/State</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="e.g. Dhaka Division"
                        className="w-full"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="postalCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Postal Code</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="e.g. 1200"
                        className="w-full"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="streetAddress"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Street Address</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Full street address"
                        className="w-full"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="latitude"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Latitude</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="e.g. 23.8103"
                          type="number"
                          step="any"
                          className="w-full"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="longitude"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Longitude</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="e.g. 90.4125"
                          type="number"
                          step="any"
                          className="w-full"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <FormField
              control={form.control}
              name="isRemoteAvailable"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 mt-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Remote work available</FormLabel>
                  </div>
                </FormItem>
              )}
            />
          </div>

          {/* Job Details Section */}
          <div className="border-b pb-4">
            <h2 className="text-lg font-medium mb-4">Job Details</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="employmentType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Employment Type *</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select employment type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="FULL-TIME">Full Time</SelectItem>
                        <SelectItem value="PART-TIME">Part Time</SelectItem>
                        <SelectItem value="CONTRACTOR">Contractor</SelectItem>
                        <SelectItem value="TEMPORARY">Temporary</SelectItem>
                        <SelectItem value="INTERN">Intern</SelectItem>
                        <SelectItem value="VOLUNTEER">Volunteer</SelectItem>
                        <SelectItem value="PER-DIEM">Per Diem</SelectItem>
                        <SelectItem value="OTHER">Other</SelectItem>
                        <SelectItem value="remote">Remote</SelectItem>
                        <SelectItem value="internship">Internship</SelectItem>
                        <SelectItem value="freelance">Freelance</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="experienceLevel"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Experience Level</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select experience level" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="ENTRY_LEVEL">Entry Level</SelectItem>
                        <SelectItem value="MID_LEVEL">Mid Level</SelectItem>
                        <SelectItem value="SENIOR_LEVEL">
                          Senior Level
                        </SelectItem>
                        <SelectItem value="DIRECTOR">Director</SelectItem>
                        <SelectItem value="EXECUTIVE">Executive</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
            </div>

            {/* Salary Information */}
            <div className="mt-4">
              <h3 className="font-medium mb-2">Salary Information</h3>
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <FormField
                  control={form.control}
                  name="salaryMin"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Min Salary</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="e.g. 20000"
                          type="number"
                          className="w-full"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="salaryMax"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Max Salary</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="e.g. 50000"
                          type="number"
                          className="w-full"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="salaryCurrency"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Currency</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="e.g. BDT"
                          className="w-full"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="salaryUnit"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Unit</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select unit" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="MONTH">Per Month</SelectItem>
                          <SelectItem value="YEAR">Per Year</SelectItem>
                          <SelectItem value="HOUR">Per Hour</SelectItem>
                          <SelectItem value="DAY">Per Day</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Skills and Requirements */}
            <div className="mt-4 space-y-4">
              <div>
                <FormLabel>Skills Required (comma separated)</FormLabel>
                <Input
                  placeholder="React, TypeScript, Node.js"
                  className="w-full"
                  onChange={(e) =>
                    setSkills(e.target.value.split(",").map((s) => s.trim()))
                  }
                />
              </div>

              <div>
                <FormLabel>Education Required (comma separated)</FormLabel>
                <Input
                  placeholder="Bachelor's Degree, Master's Degree"
                  className="w-full"
                  onChange={(e) =>
                    setEducationRequired(
                      e.target.value.split(",").map((s) => s.trim())
                    )
                  }
                />
              </div>

              <div>
                <FormLabel>Requirements (one per line)</FormLabel>
                <Textarea
                  placeholder="List each requirement on a new line"
                  className="w-full h-20"
                  onChange={(e) =>
                    setRequirements(
                      e.target.value
                        .split("\n")
                        .filter((line) => line.trim() !== "")
                    )
                  }
                />
              </div>

              <div>
                <FormLabel>Responsibilities (one per line)</FormLabel>
                <Textarea
                  placeholder="List each responsibility on a new line"
                  className="w-full h-20"
                  onChange={(e) =>
                    setResponsibilities(
                      e.target.value
                        .split("\n")
                        .filter((line) => line.trim() !== "")
                    )
                  }
                />
              </div>

              <div>
                <FormLabel>Nice to Have (one per line)</FormLabel>
                <Textarea
                  placeholder="List each nice-to-have qualification on a new line"
                  className="w-full h-20"
                  onChange={(e) =>
                    setNiceToHave(
                      e.target.value
                        .split("\n")
                        .filter((line) => line.trim() !== "")
                    )
                  }
                />
              </div>

              <div>
                <FormLabel>Benefits (comma separated)</FormLabel>
                <Input
                  placeholder="Health insurance, Flexible hours, Remote work"
                  className="w-full"
                  onChange={(e) =>
                    setBenefits(e.target.value.split(",").map((s) => s.trim()))
                  }
                />
              </div>
            </div>
          </div>

          {/* Application Information Section */}
          <div className="border-b pb-4">
            <h2 className="text-lg font-medium mb-4">
              Application Information
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="source"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job Source *</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select source" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="own">Own</SelectItem>
                        <SelectItem value="third-party">Third Party</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="applicationMethod"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Application Method *</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select method" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="internal">Internal</SelectItem>
                        <SelectItem value="external">External</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              <FormField
                control={form.control}
                name="applyLink"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Application Link</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="https://example.com/apply"
                        className="w-full"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="applyEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Application Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="jobs@example.com"
                        type="email"
                        className="w-full"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="sourceName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Source Name (if third-party)</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Source platform name"
                        className="w-full"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="expectedResponseTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Expected Response Time</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="e.g. 1-2 weeks"
                        className="w-full"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="applicationInstructions"
              render={({ field }) => (
                <FormItem className="mt-4">
                  <FormLabel>Application Instructions</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      className="h-20 w-full"
                      placeholder="Detailed instructions for applicants"
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <div className="mt-4">
              <FormLabel>Interview Process (one step per line)</FormLabel>
              <Textarea
                placeholder="List each interview stage on a new line"
                className="w-full h-20"
                onChange={(e) =>
                  setInterviewProcess(
                    e.target.value
                      .split("\n")
                      .filter((line) => line.trim() !== "")
                  )
                }
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              <FormField
                control={form.control}
                name="applicationDeadline"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Application Deadline</FormLabel>
                    <FormControl>
                      <Input {...field} type="date" className="w-full" />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="visaSponsorshipAvailable"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 mt-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Visa Sponsorship Available</FormLabel>
                    </div>
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="equalOpportunityStatement"
              render={({ field }) => (
                <FormItem className="mt-4">
                  <FormLabel>Equal Opportunity Statement</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      className="h-20 w-full"
                      placeholder="EEO compliance statement"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          {/* SEO & Metadata Section */}
          <div className="border-b pb-4">
            <h2 className="text-lg font-medium mb-4">SEO & Metadata</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="metaTitle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Meta Title</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="SEO meta title"
                        className="w-full"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="canonicalUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Canonical URL</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="https://example.com/job-url"
                        className="w-full"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="metaDescription"
              render={({ field }) => (
                <FormItem className="mt-4">
                  <FormLabel>Meta Description</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      className="h-20 w-full"
                      placeholder="SEO meta description"
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Job category"
                        className="w-full"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="subcategory"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Subcategory</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Job subcategory"
                        className="w-full"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <div className="mt-4">
              <FormLabel>Tags (comma separated)</FormLabel>
              <Input
                placeholder="tag1, tag2, tag3"
                className="w-full"
                onChange={(e) =>
                  setTags(e.target.value.split(",").map((s) => s.trim()))
                }
              />
            </div>
          </div>

          {/* Visibility & Settings Section */}
          <div className="border-b pb-4">
            <h2 className="text-lg font-medium mb-4">Visibility & Settings</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status *</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="draft">Draft</SelectItem>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="expired">Expired</SelectItem>
                        <SelectItem value="rejected">Rejected</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="boostLevel"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Boost Level</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select boost level" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="normal">Normal</SelectItem>
                        <SelectItem value="featured">Featured</SelectItem>
                        <SelectItem value="sponsored">Sponsored</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              <FormField
                control={form.control}
                name="postedAt"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Posted Date *</FormLabel>
                    <FormControl>
                      <Input {...field} type="date" className="w-full" />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="expiresAt"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Expiry Date *</FormLabel>
                    <FormControl>
                      <Input {...field} type="date" className="w-full" />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              <FormField
                control={form.control}
                name="premiumUntil"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Premium Until</FormLabel>
                    <FormControl>
                      <Input {...field} type="date" className="w-full" />
                    </FormControl>
                  </FormItem>
                )}
              />

              <div className="flex items-center space-x-4 mt-6">
                <FormField
                  control={form.control}
                  name="isFeatured"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Featured Job</FormLabel>
                      </div>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="autoRenew"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Auto Renew</FormLabel>
                      </div>
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>

          {/* Image Upload */}
          <div>
            <h2 className="text-lg font-medium mb-4">Company Logo</h2>
            {imagePreview.length > 0 ? (
              <ImagePreviewer
                setImageFiles={setImageFiles}
                imagePreview={imagePreview}
                setImagePreview={setImagePreview}
                className="mt-4"
              />
            ) : (
              <NMImageUploader
                setImageFiles={setImageFiles}
                setImagePreview={setImagePreview}
                label="Upload Company Logo"
              />
            )}
          </div>

          <Button
            type="submit"
            className="w-full py-3 text-lg mt-6"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Posting..." : "Post Job"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
