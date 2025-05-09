import { type UserProfile } from "@/providers/liff-provider";
import { type User } from "@prisma/client";

export const createUser = async (idToken: string, user: UserProfile) => {
  try {
    const response = await fetch("/api/user", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${idToken}`, // Include the ID token in the header
      },
      body: JSON.stringify({
        user_id: user.userId,
        display_name: user.displayName,
        line_profile_pic: user.pictureUrl,
      }),
    });
    if (!response.ok) {
      console.error(
        `Error create user: ${response.status} - ${response.statusText}`,
      );
      // Handle error (e.g., redirect to an error page, display a message)
      return;
    }
    const jsonResponse = (await response.json()) as { data: User };
    return jsonResponse.data;
  } catch (error) {
    console.error("Error create user:", error);
  }
};
