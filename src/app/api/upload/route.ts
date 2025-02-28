import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { NextResponse } from "next/server";

export async function POST(request: Request): Promise<NextResponse> {
  const body = (await request.json()) as HandleUploadBody;

  try {
    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (pathname, clientPayload) => {
        // Authenticate the user, for example, with a session or JWT token
        // Replace this with your actual authentication logic
        const isAuthenticated = true; // Replace with actual authentication check
        if (!isAuthenticated) {
          throw new Error("User is not authenticated");
        }

        return {
          allowedContentTypes: ["image/jpeg", "image/png", "image/svg+xml"], // Allow only specific content types
          maximumSizeInBytes: 20971520, // Set maximum byte of 20 MB
        };
      },
      onUploadCompleted: async ({ blob, tokenPayload }) => {
        // Get notified when the file upload is complete
        console.log("Blob upload completed", blob, tokenPayload);
      },
    });

    return NextResponse.json(jsonResponse);
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 400 }, // If something goes wrong, respond with a 400 status code
    );
  }
}
