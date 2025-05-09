import { type User } from "@prisma/client";

export const fetchUserData = async (token: string) => {
  try {
    const response = await fetch("/api/me", {
      headers: {
        Authorization: `Bearer ${token}`, // Include the ID token in the header
      },
    });
    if (!response.ok) {
      console.error(
        `Error fetching user data: ${response.status} - ${response.statusText}`,
      );
      // Handle error (e.g., redirect to an error page, display a message)
      return;
    }
    const data = (await response.json()) as User;
    return data;
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
};
