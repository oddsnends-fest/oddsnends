import { NextResponse, NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";
import { db } from "@/server/db";

interface Params {
    id: string;
}

export async function GET(request: Request, { params }: { params: { id: string } }) {
    try {
        const userId = params.id; // Get user ID from the dynamic route

        if (!userId) {
            return NextResponse.json({ error: "User ID is required" }, { status: 400 });
        }

        const user = await db.user.findUnique({
            where: { user_id: userId },
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
    }
}
