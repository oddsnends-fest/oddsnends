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

// retrieve response from
import { del, list } from "@vercel/blob"; // Import the list function from Vercel Blob

export async function GET(request: Request): Promise<NextResponse> {
  try {
    // Fetch a list of all uploaded files
    const { blobs } = await list();

    // Return the list of blobs as the response
    return NextResponse.json(blobs);
  } catch (error) {
    // Handle errors and return a 500 status code with the error message
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 },
    );
  }
}

export async function DELETE(request: Request): Promise<NextResponse> {
  try {
    const { blobs } = await list();
    for (const blob of blobs) {
      await del(blob.url);
    }

    return NextResponse.json({ message: "All blobs deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 },
    );
  }
}

/* 
Example request
{
  "pathname": "/uploads/profile-pictures/user-123",
  "clientPayload": {
    "userId": "123",
    "description": "Profile picture for user 123" // there is anything else
  }
}

(didn't put the image response to database postgreSQL??????)

Example response 

{
  "url": "https://example.com/uploads/profile-pictures/user-123/image.jpg",
  "downloadUrl": "https://example.com/downloads/uploads/profile-pictures/user-123/image.jpg",
  "pathname": "/uploads/profile-pictures/user-123/image.jpg",
  "contentType": "image/jpeg",
  "size": 102400
}

wait handleUpload function to be completed before returning the response


*/
