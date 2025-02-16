import { z } from "zod";

export const User = z.object({
  user_id: z.string(),
  display_name: z.string(),
  full_name: z.string(),
  line_profile_pic: z.string().url("Invalid URL").optional(),
  phone: z.string().regex(/^[0-9]{9,10}$/, "Phone number isn't 9 or 10 digits long").optional(),
  gender: z.enum(["MALE", "FEMALE", "NONBINARY", "OTHERS", "PREFERNOTTOSAY"]).optional(),
  photo: z.string().optional(),
  age: z.number().min(0, "Invalid age"),
  occupation: z.string(),
  email: z.string().email("Invalid email format"),
  channel: z.enum(["INSTAGRAM", "FACEBOOK", "TIKTOK", "LINE", "FRIENDS", "POSTER"]),
  photoid_name: z.string(),
  dob: z.coerce.date(),
  spirit_animal: z.string(),
  signature: z.string(),
  hobby: z.string()
});

// zod validation for PATCH req
export const UserPatch = User.partial();


