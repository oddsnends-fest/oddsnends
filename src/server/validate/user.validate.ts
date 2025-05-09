import { z } from "zod";

export const User = z.object({
  user_id: z.string(),
  display_name: z.string(),
  full_name: z.string().optional(),
  line_profile_pic: z.string().url("Invalid URL"),
  phone: z
    .string()
    .regex(/^[0-9]{9,10}$/, "Phone number isn't 9 or 10 digits long")
    .optional(),
  gender: z
    .enum(["MALE", "FEMALE", "NONBINARY", "OTHERS", "PREFERNOTTOSAY"])
    .optional(),
  photo: z.string().optional(),
  occupation: z.string().optional(),
  channel: z
    .enum(["SOCIAL_MEDIA", "WEBSITE", "FRIENDS", "INFLUENCER", "OTHERS"])
    .optional(),
  photoid_name: z.string().optional(),
  dob: z.coerce.date().optional(),
  spirit_animal: z
    .enum([
      "CAT",
      "BUTTERFLY",
      "FISH",
      "DUCK",
      "SQUIRREL",
      "WATER_MONITOR",
      "SWAN",
      "DOG",
      "OTTER",
    ])
    .optional(),
  signature: z.string().optional(),
  hobby: z
    .enum([
      "READING",
      "PAINTING",
      "GAMING",
      "COOKING",
      "PHOTOGRAPHY",
      "TRAVELING",
      "GARDENING",
      "FISHING",
      "WRITING",
    ])
    .optional(),
});

// zod validation for PATCH req
export const UserPatch = User.partial();
