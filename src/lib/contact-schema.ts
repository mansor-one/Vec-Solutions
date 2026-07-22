import { z } from "zod";
export const contactSchema = z.object({
  name: z.string().trim().min(2).max(100),
  organization: z.string().trim().max(150).optional().default(""),
  email: z.email().max(200),
  phone: z.string().trim().max(30).optional().default(""),
  service: z.string().trim().max(120).optional().default(""),
  message: z.string().trim().min(10).max(5000),
  consent: z.literal("true"),
  website: z.string().max(0).optional().default(""),
});
export type ContactInput = z.infer<typeof contactSchema>;
