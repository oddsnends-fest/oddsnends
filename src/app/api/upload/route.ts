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
          allowedContentTypes: ["image/jpeg", "image/png", "image/gif"], // Allow only specific content types
          tokenPayload: JSON.stringify({
            userId: "example_user_id", // Pass user info here (e.g., user ID from session or JWT)
          }),
        };
      },
      onUploadCompleted: async ({ blob, tokenPayload }) => {
        // Get notified when the file upload is complete
        console.log("Blob upload completed", blob, tokenPayload);

        try {
          if (!tokenPayload) {
            throw new Error("Token payload is missing");
          }

          // const { userId } = JSON.parse(tokenPayload);

          // Save the blob URL and metadata into your Neon database (adjust table/fields as necessary)
          // await db.user.create({
          // data: {
          //   userId: userId,
          //   blobUrl: blob.url,
          // },
          // });
          console.log("File metadata saved to database");
        } catch (error) {
          console.error("Error saving file metadata", error);
          throw new Error("Could not update user");
        }
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
