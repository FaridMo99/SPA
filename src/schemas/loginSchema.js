import { z } from "zod";

const loginSchema = z.object({
  username: z.string().nonempty(),
  password: z.string().min(8).max(20),
});

export default loginSchema;
