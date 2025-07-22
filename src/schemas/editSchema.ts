import { z } from "zod";

const editSchema = z.object({
  username: z.string().nonempty("Field is required"),
  bio: z.string().optional(),
  avatar: z.string().url("Must be a valid URL").optional().or(z.literal("")),
});

export default editSchema;
