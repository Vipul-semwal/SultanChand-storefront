import { z } from "zod";
export const contactSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  message: z.string().min(10, { message: "Message must be at least 10 characters" }),
});

export type ContactFormData = z.infer<typeof contactSchema>;


  export const specimenRequestSchema = z.object({
    categoryName: z.string().min(1, "Category Name is required"),
    schoolName: z.string().min(1, "School/College/Coaching Name is required"),
    state: z.string().min(1, "State is required"),
    residenceAddress: z.string().min(1, "Residence Address is required"),
    phoneNumber: z.string().min(10, "Phone Number must be at least 10 digits"),
    email: z.string().email("Invalid email format"),
    titleName: z.string().min(1, "Title Name is required"),
    strength: z.string().min(1, "Strength is required"),
    name: z.string().min(1, "Name is required"),
    schoolAddress: z.string().min(1, "School Address is required"),
    city: z.string(),
    pinCode: z.string().min(1, "Pin Code is required"),
    mobileNumber: z.string().min(10, "Mobile Number must be at least 10 digits"),
    titleCategory: z.string().min(1, "Title Category is required"),
    letterHead: z.any(), 
    photoID: z.any(),
  });

export type specimenFormData = z.infer<typeof specimenRequestSchema>;

  export const publishWithUsSchema = z.object({
    authorName: z.string().min(2, "Author name must be at least 2 characters"),
    instituteName: z.string().min(2, "Institute name must be at least 2 characters"),
    email: z.string().email("Invalid email format"),
    city: z.string().min(2, "City must be at least 2 characters"),
    country: z.string().min(2, "Country must be at least 2 characters"),
    contactNumber: z.string().regex(/^\d{10}$/, "Contact number must be 10 digits"),
    discipline: z.string().min(2, "Discipline must be at least 2 characters"),
    synopsis: z.string().min(10, "Synopsis must be at least 10 characters"),
    aboutAuthor: z.string().min(10, "About author must be at least 10 characters"),
    authorAffiliation: z.string().min(2, "Author affiliation must be at least 2 characters"),
    address: z.string().min(5, "Address must be at least 5 characters"),
    state: z.string().min(2, "State must be at least 2 characters"),
    pinZip: z.string().regex(/^\d{5,6}$/, "Pin/Zip must be 5 or 6 digits"),
    titleOfBook: z.string().min(2, "Title must be at least 2 characters"),
    subject: z.string().min(2, "Subject must be at least 2 characters"),
    statusOfBook: z.enum(["Draft", "Published", "Under Review"]),
  });

export type PublishWithUsFormData = z.infer<typeof publishWithUsSchema>;