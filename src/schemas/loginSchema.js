import { z } from "zod";

const loginSchema = z.object({
  username: z
    .string()
    .trim()
    .min(5)
    .nonempty()
    .regex(/^\S*$/),
  password: z
    .string()
    .nonempty()
    .min(8)
    .regex(/[A-Z]/)
    .regex(/[0-9]/)
    .regex(
      /[^A-Za-z0-9]/),
});

export default loginSchema;
