import { NextResponse } from "next/server";
import { db } from "@/server/db";
import { User } from "@/server/validate/user.validate";

export async function PATCH(request: Request): Promise<NextResponse> {
  try {
    const jsonData = await request.json();

    const parsedData = User.safeParse(jsonData);
    if (!parsedData.success) {
      return NextResponse.json({ error: parsedData.error.format() }, { status: 400 });
    }

    const { user_id, ...updateFields } = parsedData.data;

    const existingUser = await db.user.findUnique({ where: { user_id } });
    if (!existingUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const updatedUser = await db.user.update({
      where: { user_id },
      data: { ...updateFields, updated_at: new Date() },
    });

    return NextResponse.json({ message: "User updated successfully", data: updatedUser });
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
