import { z } from "zod";

export const User = z.object({
  user_id: z.string(),
  display_name: z.string(),
  full_name: z.string(),
  line_profile_pic: z.string().url("Invalid URL"),
  phone: z.string().regex(/^[0-9]{9,10}$/, "Phone number isn't 9 or 10 digit long"),
  gender: z.enum(["MALE", "FEMALE", "NONBINARY", "OTHERS", "PREFERNOTTOSAY"]),
  photo: z.string(),
  age: z.number().min(0, "Invalid age"),
  occupation: z.string(),
  email: z.string().email("Invalid email format"),
  channel: z.enum(["INSTAGRAM", "FACEBOOK", "TIKTOK", "LINE", "FRIENDS", "POSTER"])
});

