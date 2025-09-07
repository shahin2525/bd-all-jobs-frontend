// // const PostJobForm = () => {
// //   return (
// //     <div>
// //       <h1>post job form</h1>
// //     </div>
// //   );
// // };

// // export default PostJobForm;
// "use client";

// import { Button } from "@/components/ui/button";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

// import Logo from "@/assets/svgs/Logo";
// import NMImageUploader from "@/components/ui/core/NMImageUploader";
// import { useState } from "react";
// // import ImagePreviewer from "@/components/ui/core/NMImageUploader/ImagePreviewer";

// import { toast } from "sonner";
// import { postJob } from "@/services/job";
// import { Textarea } from "@/components/ui/textarea";
// import ImagePreviewer from "@/components/ui/core/NMImageUploader/ImagePreviewer";

// export default function PostJobForm() {

//   const form = useForm();

//   const {
//     formState: { isSubmitting },
//   } = form;

//   const onSubmit: SubmitHandler<FieldValues> = async (data) => {
//     const servicesOffered = data?.servicesOffered
//       .split(",")
//       .map((service: string) => service.trim())
//       .filter((service: string) => service !== "");

//     const modifiedData = {
//       ...data,
//       servicesOffered: servicesOffered,
//       establishedYear: Number(data?.establishedYear),
//     };

//     try {
//       const formData = new FormData();
//       formData.append("data", JSON.stringify(modifiedData));
//       formData.append("file", imageFiles[0] as File);

//       const res = await postJob(formData);

//       console.log(res);

//       if (res.success) {
//         toast.success(res.message);
//       }
//     } catch (err: any) {
//       console.error(err);
//     }
//   };

//   return (
//     <div className="border-2 border-gray-300 rounded-xl flex-grow max-w-2xl p-5 my-5">
//       <div className="flex items-center space-x-4 mb-5">
//         <Logo />
//         <div>
//           <h1 className="text-xl font-semibold">Create Your Shop</h1>
//           <p className="font-extralight text-sm text-gray-600">
//             Join us today and start your journey!
//           </p>
//         </div>
//       </div>
//       <Form {...form}>
//         <form onSubmit={form.handleSubmit(onSubmit)}>
//           <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
//             <FormField
//               control={form.control}
//               name="shopName"
//               render={({ field }) => (
//                 <FormItem className="mb-3">
//                   <FormLabel>Shop Name</FormLabel>
//                   <FormControl>
//                     <Input {...field} value={field.value || ""} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="businessLicenseNumber"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Business License Number</FormLabel>
//                   <FormControl>
//                     <Input {...field} value={field.value || ""} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             <FormField
//               control={form.control}
//               name="address"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Address</FormLabel>
//                   <FormControl>
//                     <Input {...field} value={field.value || ""} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="contactNumber"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Contact Number</FormLabel>
//                   <FormControl>
//                     <Input {...field} value={field.value || ""} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="website"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Website</FormLabel>
//                   <FormControl>
//                     <Input {...field} value={field.value || ""} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             <FormField
//               control={form.control}
//               name="establishedYear"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Established Year</FormLabel>
//                   <FormControl>
//                     <Input {...field} value={field.value || ""} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="taxIdentificationNumber"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Tax Identification Number</FormLabel>
//                   <FormControl>
//                     <Input {...field} value={field.value || ""} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//             <FormField
//               control={form.control}
//               name="socialMediaLinks.facebook"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Facebook</FormLabel>
//                   <FormControl>
//                     <Input {...field} value={field.value || ""} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="socialMediaLinks.twitter"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Twitter</FormLabel>
//                   <FormControl>
//                     <Input {...field} value={field.value || ""} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="socialMediaLinks.instagram"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Instagram</FormLabel>
//                   <FormControl>
//                     <Input {...field} value={field.value || ""} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4 items-center">
//             <div className="col-span-4 md:col-span-3">
//               <FormField
//                 control={form.control}
//                 name="servicesOffered"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>Services Offered</FormLabel>
//                     <FormControl>
//                       <Textarea
//                         className="h-36"
//                         {...field}
//                         value={field.value || ""}
//                       />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//             </div>

//             {imagePreview.length > 0 ? (
//               <ImagePreviewer
//                 setImageFiles={setImageFiles}
//                 imagePreview={imagePreview}
//                 setImagePreview={setImagePreview}
//                 className="mt-8"
//               />
//             ) : (
//               <div className="mt-8">
//                 <NMImageUploader
//                   setImageFiles={setImageFiles}
//                   setImagePreview={setImagePreview}
//                   label="Upload Logo"
//                 />
//               </div>
//             )}
//           </div>

//           <Button type="submit" className="mt-5 w-full">
//             {isSubmitting ? "Creating...." : "Create"}
//           </Button>
//         </form>
//       </Form>
//     </div>
//   );
// }
"use client";

import { useState } from "react";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";

// import { jobCreateValidationSchema } from "@/validations/job.validation";
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

export default function PostJobForm() {
  const [skills, setSkills] = useState<string[]>([]);
  const [imageFiles, setImageFiles] = useState<File[] | []>([]);
  const [imagePreview, setImagePreview] = useState<string[] | []>([]);
  const form = useForm({
    // resolver: zodResolver(jobCreateValidationSchema),
    defaultValues: {
      title: "",
      shortDescription: "",
      description: "",
      companyName: "",
      companyWebsite: "",
      location: "",
      employmentType: "",
      salaryMin: "",
      salaryMax: "",
      source: "original",
      applyLink: "",
      sourceName: "",
    },
  });

  const {
    formState: { isSubmitting },
  } = form;

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const payload = {
      ...data,
      skills,
      salaryRange: {
        min: Number(data.salaryMin),
        max: Number(data.salaryMax),
      },
    };

    try {
      const formData = new FormData();
      formData.append("data", JSON.stringify(payload));
      formData.append("file", imageFiles[0] as File);
      const res = await postJob(formData);
      if (res.success) {
        toast.success("Job posted successfully!");
        form.reset();
        setSkills([]);
      }
    } catch (error: any) {
      console.error(error);
      toast.error("Failed to post job!");
    }
  };

  return (
    <div className="border-2 border-gray-300 rounded-xl max-w-3xl p-6 my-5">
      <h1 className="text-2xl font-semibold mb-4">Post a Job</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Job Title</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter job title" />
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
                <FormLabel>Short Description</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Brief summary (max 150 chars)"
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
                <FormLabel>Full Description</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="Enter detailed job description"
                    className="h-32"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="companyName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Company name" />
                  </FormControl>
                  <FormMessage />
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
                    <Input {...field} placeholder="https://example.com" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Job Location</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter job location" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Employment Type */}
          <FormField
            control={form.control}
            name="employmentType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Employment Type</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="full-time">Full-Time</SelectItem>
                    <SelectItem value="part-time">Part-Time</SelectItem>
                    <SelectItem value="contract">Contract</SelectItem>
                    <SelectItem value="remote">Remote</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Salary */}
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="salaryMin"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Min Salary</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="e.g. 20000" />
                  </FormControl>
                  <FormMessage />
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
                    <Input {...field} placeholder="e.g. 50000" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Skills */}
          <div>
            <FormLabel>Skills (comma separated)</FormLabel>
            <Input
              placeholder="e.g. React, TypeScript, Node.js"
              onChange={(e) =>
                setSkills(e.target.value.split(",").map((s) => s.trim()))
              }
            />
          </div>

          {/* Source */}
          <FormField
            control={form.control}
            name="source"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Job Source</FormLabel>
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
                    <SelectItem value="original">Original</SelectItem>
                    <SelectItem value="third-party">Third-Party</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Apply Link & Source Name (for third-party) */}
          {form.watch("source") === "third-party" && (
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="applyLink"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Apply Link</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Enter apply link" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="sourceName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Source Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="e.g. BD Jobs" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}

          <Button type="submit" className="w-full">
            {isSubmitting ? "Posting..." : "Post Job"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
