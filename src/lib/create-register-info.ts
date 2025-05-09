import {
  type Channel,
  type Occupation,
  type WhatBringsUHere,
  type RegisteredInfo,
} from "@prisma/client";

export const createRegisteredInfo = async (
  token: string,
  name: string,
  age_range: string,
  occupation: Occupation,
  whatBringsUHere: WhatBringsUHere,
  channel: Channel,
  user_id?: string,
) => {
  try {
    const response = await fetch("/api/register", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`, // Include the ID token in the header
      },
      body: JSON.stringify({
        user_id,
        name,
        age_range,
        occupation,
        whatBringsUHere,
        channel,
      }),
    });
    if (!response.ok) {
      console.error(
        `Error create RegisteredInfo: ${response.status} - ${response.statusText}`,
      );
      // Handle error (e.g., redirect to an error page, display a message)
      return;
    }
    const jsonResponse = (await response.json()) as { data: RegisteredInfo };
    return jsonResponse.data;
  } catch (error) {
    console.error("Error create RegisteredInfo:", error);
  }
};
