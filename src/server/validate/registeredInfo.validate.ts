import { z } from "zod";

export const RegisteredInfo = z.object({
  user_id: z.string().optional(),
  name: z.string(),
  age_range: z.string(),
  occupation: z.enum([
    "STUDENT",
    "UNI_STUDENT",
    "EMPLOYEE",
    "BUSINESS_OWNER",
    "FREELANCER",
    "OTHERS",
  ]),
  whatBringsUHere: z.enum([
    "EXPLORING",
    "WORKSHOP",
    "MUSIC",
    "FRIENDS",
    "OTHERS",
  ]),
  channel: z.enum([
    "SOCIAL_MEDIA",
    "WEBSITE",
    "FRIENDS",
    "INFLUENCER",
    "OTHERS",
  ]),
});
