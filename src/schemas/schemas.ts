import { z } from "zod";

const maxSize = 5 * 1024 * 1024;
const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

export const imageSchema = z
  .instanceof(File, {
    message: "Only JPEG, JPG, PNG, and WebP images are allowed",
  })
  .refine((file) => file.size <= maxSize, {
    message: "File size must be less than 5 MB",
  })
  .refine((file) => allowedTypes.includes(file.type), {
    message: "Only JPEG, JPG, PNG, and WebP images are allowed",
  })
  .refine((file) => file.name.length <= 255, {
    message: "File name is too long",
  });

const emailSchema = z.string().email("Invalid E-Mail");
const password = z
  .string()
  .min(8, "Password must have atleast 8 Characters")
  .max(20, "Password can contain max 20 characters");

export const changePasswordSchema = z
  .object({
    password,
    confirmPassword: password,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const forgotPasswordSchema = z.object({
  email: emailSchema,
});

export const signupSchema = z
  .object({
    username: z.string().nonempty("Field is required"),
    birthdate: z
      .string()
      .nonempty("Field is required")
      .refine(
        (val) => {
          const date = new Date(val);
          const ageDifMs = Date.now() - date.getTime();
          const ageDate = new Date(ageDifMs);
          const age = Math.abs(ageDate.getUTCFullYear() - 1970);
          return age >= 18;
        },
        {
          message: "You must be at least 18 years old",
        },
      ),
    email: emailSchema,
    password,
    confirmPassword: password,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const loginSchema = z.object({
  email: emailSchema,
  password,
});

export const editUserSchema = z
  .object({
    username: z.string().nonempty("Field is required"),
    bio: z.string(),
    profilePicture: imageSchema.optional(),
  })
  .partial();
