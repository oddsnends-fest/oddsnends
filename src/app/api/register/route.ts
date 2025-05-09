import { NextResponse } from "next/server";
import { db } from "@/server/db";
import { RegisteredInfo } from "@/server/validate/registeredInfo.validate";

export async function POST(request: Request): Promise<NextResponse> {
  try {
    // Validate input data
    const parsedData = RegisteredInfo.safeParse(await request.json());
    if (!parsedData.success) {
      return NextResponse.json(
        { error: parsedData.error.format() },
        { status: 400 },
      );
    }

    // Create new user in database
    const newRegisteredInfo = await db.registeredInfo.create({
      data: parsedData.data,
    });

    return NextResponse.json(
      { message: "Register info saved successfully", data: newRegisteredInfo },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error registering user:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
