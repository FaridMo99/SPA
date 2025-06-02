import { z } from "zod";

const signupSchema = z
  .object({
    firstname: z.string().trim().nonempty("Field is required"),
    lastname: z.string().trim().nonempty("Field is required"),
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
    email: z
      .string()
      .email("Invalid email address")
      .nonempty("Field is required"),
    password: z.string().min(8).max(20),

    confirmPassword: z.string().nonempty("Field is required"),
    bio: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export default signupSchema;
