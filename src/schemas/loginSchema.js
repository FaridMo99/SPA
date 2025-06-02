import { z } from "zod";

const loginSchema = z.object({
  username: z.string().nonempty("Field is required"),
  password: z.string().min(8).max(20),
});

export default loginSchema;
