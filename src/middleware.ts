import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { LineApiError, VerifiedToken } from './types/apiModel';
import { env } from "@/env";

export async function middleware(request: NextRequest) {

    // Extract the ID token from the Authorization header
    const idtoken = request.headers.get('Authorization')?.split('Bearer ')[1];

    if (!idtoken) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    try {

        // Check if the LINE_LOGIN_CHANNEL_ID is set
        if (!env.LINE_LOGIN_CHANNEL_ID) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        // Verify the ID token with LINE Login API
        const response = await fetch('https://api.line.me/oauth2/v2.1/verify', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                id_token: idtoken,
                client_id: env.LINE_LOGIN_CHANNEL_ID,
            }),
        });
        
        if (!response.ok) {
            const errorData = (await response.json()) as LineApiError;
            console.log("Error verifying token:", errorData);
            return NextResponse.json({ message: "Unauthorized", error: errorData }, { status: 401 });
        }

        const responseJson = (await response.json()) as VerifiedToken;
        const res = NextResponse.next();

        // Set user details in custom headers
        res.headers.set("X-User-Name", responseJson.name);
        res.headers.set("X-User-Picture", responseJson.picture);
        res.headers.set("X-User-Email", responseJson.email);
        res.headers.set("X-User-Id", responseJson.sub);


        return res;
    }
    catch (error) {
        console.log("Server Error:", error);
        return NextResponse.json({ message: "Server Internal Error" }, { status: 500 });
    }
}

export const config = {
    matcher: ['/api/:path*'],
};
