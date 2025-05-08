import { NextResponse } from "next/server";
import { db } from "@/server/db";
import { User } from "@/server/validate/user.validate";

export async function POST(request: Request): Promise<NextResponse> {
  try {
    // Validate input data
    const parsedData = User.safeParse(await request.json());
    if (!parsedData.success) {
      return NextResponse.json(
        { error: parsedData.error.format() },
        { status: 400 },
      );
    }

    const { user_id, ...userData } = parsedData.data;

    // Check if user already exists
    const existingUser = await db.user.findUnique({ where: { user_id } });
    if (existingUser) {
      return NextResponse.json(
        { error: "User already registered" },
        { status: 409 },
      );
    }

    // Create new user in database
    const newUser = await db.user.create({
      data: {
        user_id,
        ...userData, // Spread other fields
        line_profile_pic: userData.line_profile_pic ?? "",
        phone: userData.phone ?? null,
      },
    });

    return NextResponse.json(
      { message: "User registered successfully", data: newUser },
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
