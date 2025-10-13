import { z } from "zod";

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
        }
      ),
    email: z.string().email("Invalid E-Mail"),
    password: z.string().min(8, "Password must have atleast 8 Characters"),
    confirmPassword: z.string().nonempty("Field is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const loginSchema = z.object({
  email: z.string().email("Invalid E-Mail"),
  password: z.string().min(8, "Password must contain atleast 8 characters").max(20,"Password can contain max 20 characters"),
});

export const editUserSchema = z
  .object({
    username: z.string().nonempty("Field is required"),
    email: z
      .string()
      .email("Invalid E-Mail")
      .nonempty("Field is required"),
    password: z.string().min(8, "Password must have atleast 8 Characters"),
    bio: z.string().nonempty("Field is required"),
    profilePicture: z.instanceof(File),
  })
  .partial();
