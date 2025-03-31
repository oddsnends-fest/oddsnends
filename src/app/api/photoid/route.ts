import { NextResponse } from "next/server";
import { db } from "@/server/db";
import { UserPatch } from "@/server/validate/user.validate";

export async function PATCH(request: Request): Promise<NextResponse> {
  try {
    // console.log(request.json(), "request json");

    const data = UserPatch.safeParse(await request.json()); // Use Zod validation

    console.log(data);

    if (!data.success) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    const { user_id, ...updateFields } = data.data; //Destructuring

    console.log(user_id);
    console.log(updateFields);

    const existingUser = await db.user.findUnique({ where: { user_id } }); // can mock user

    console.log(existingUser, "existinguser");
    if (!existingUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const updatedUser = await db.user.update({
      //Updating
      where: { user_id },
      data: { ...updateFields },
    });

    return NextResponse.json({
      message: "User updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}

export async function GET(): Promise<NextResponse> {
  try {
    // Fetch all users from the database
    const users = await db.user.findMany();

    // Return the list of users
    return NextResponse.json({
      message: "Users retrieved successfully",
      data: users,
    });
  } catch (error) {
    console.error("Error retrieving users:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
