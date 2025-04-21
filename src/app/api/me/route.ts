import { NextResponse, NextRequest } from "next/server";
import { headers } from 'next/headers';
import { PrismaClient } from "@prisma/client";
import { db } from "@/server/db";

export async function GET() {
    try {
        const User = await headers()
        const id = User.get('X-User-Id'); // Get the user ID from the headers

        if (!id) {
            return NextResponse.json({ error: "Unauthorized - No User ID found" }, { status: 401 });
        }

        const user = await db.user.findUnique({
            where: { user_id: id },
            select: {
                full_name: true,
                hobby: true,
                dob: true,
                spirit_animal: true,
                signature: true,
                photo: true,
            },
        });

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        return NextResponse.json(user, { status: 200 });
    } catch (error) {
        console.error("Error fetching user data:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    } finally {
        await db.$disconnect();
    }
}
