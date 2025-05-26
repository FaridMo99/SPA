import { z } from "zod";

const signupSchema = z
  .object({
    firstname: z
      .string()
      .trim()
      .nonempty("Field is required")
      .regex(
        /^[A-Z][a-zA-Z'-]*$/,
        "First name must start with an uppercase letter and no Symbols",
      ),
    lastname: z
      .string()
      .trim()
      .nonempty("Field is required")
      .regex(
        /^[A-Z][a-zA-Z'-]*$/,
        "First name must start with an uppercase letter and no Symbols",
      ),
    username: z
      .string()
      .trim()
      .min(5, "Username must be at least 5 characters")
      .nonempty("Field is required")
      .regex(/^\S*$/, "Username must not contain spaces"),
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
    password: z
      .string()
      .nonempty("Field is required")
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must include at least one uppercase letter")
      .regex(/[0-9]/, "Password must include at least one number")
      .regex(
        /[^A-Za-z0-9]/,
        "Password must include at least one special character",
      ),
    confirmPassword: z.string().nonempty("Field is required"),
    bio: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export default signupSchema;
