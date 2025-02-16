import { NextResponse } from "next/server";
import { db } from "@/server/db";
import { UserPatch } from "@/server/validate/user.validate";
import { SpiritAnimal } from "@prisma/client";

export async function PATCH(request: Request): Promise<NextResponse> {
  try {
    const data = UserPatch.safeParse(await request.json()); // Use Zod validation
    if (!data.success) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    const { user_id, ...inputData } = data.data; //Destructuring

    const existingUser = await db.user.findUnique({ where: { user_id } });
    if (!existingUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const updateFields = {
      ...inputData,
      spirit_animal: inputData.spirit_animal
        ? inputData.spirit_animal as SpiritAnimal
        : undefined, // Ensure it's either an enum value or undefined
    };

    const updatedUser = await db.user.update({ //Updating
      where: { user_id },
      data: { ...updateFields },
    });

    return NextResponse.json({ message: "User updated successfully", data: updatedUser });
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
