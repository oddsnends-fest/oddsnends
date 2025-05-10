import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { type LineApiError, type UserProfile } from "./types/apiModel";
import { env } from "@/env";

export async function middleware(request: NextRequest) {
  // Extract the ID token from the Authorization header
  if (env.BYPASS_AUTH) {
    return NextResponse.next();
  }
  const accessToken = request.headers.get("Authorization")?.split("Bearer ")[1];

  if (!accessToken) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    // Check if the LINE_LOGIN_CHANNEL_ID is set
    if (!env.LINE_LOGIN_CHANNEL_ID) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Verify the ID token with LINE Login API
    const response = await fetch("https://api.line.me/v2/profile", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      const errorData = (await response.json()) as LineApiError;
      console.log("Error verifying token:", errorData);
      return NextResponse.json(
        { message: "Unauthorized", error: errorData },
        { status: 401 },
      );
    }

    const responseJson = (await response.json()) as UserProfile;
    const res = NextResponse.next();

    // Set user details in custom headers
    // res.headers.set("X-User-Name", responseJson.displayName);
    // res.headers.set("X-User-Picture", responseJson.pictureUrl);
    res.headers.set("X-User-Id", responseJson.userId);

    return res;
  } catch (error) {
    console.log("Server Error:", error);
    return NextResponse.json(
      { message: "Server Internal Error" },
      { status: 500 },
    );
  }
}

export const config = {
  matcher: ["/api/:path*"],
};
