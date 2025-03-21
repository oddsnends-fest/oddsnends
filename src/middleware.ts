import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { VerifiedToken } from './types/apiModel';

export async function middleware(request: NextRequest) {

    // Extract the ID token from the Authorization header
    const idtoken = request.headers.get('Authorization')?.split('Bearer ')[1];
    
    if (!idtoken) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    try {

        // Check if the LINE_LOGIN_CHANNEL_ID is set
        if (!process.env.LINE_LOGIN_CHANNEL_ID) {
            return NextResponse.json({ message: "Unauthorized - LINE_LOGIN_CHANNEL_ID is not set in the environment variables." }, { status: 401 });
        }

        // Verify the ID token with LINE Login API
        const response = await fetch('https://api.line.me/oauth2/v2.1/verify', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                id_token: idtoken,
                client_id: process.env.LINE_LOGIN_CHANNEL_ID,
            }),
        });
        
        if (!response.ok) {
            const errorData = await response.json();
            console.log("Error verifying token:", errorData);
            return NextResponse.json({ message: "Unauthorized", error: errorData }, { status: 401 });
        }

        const responseJson: VerifiedToken = await response.json();
        const res = NextResponse.next();

        // Set user details in custom headers
        res.headers.set("X-User-Name", responseJson.name);
        res.headers.set("X-User-Picture", responseJson.picture);
        res.headers.set("X-User-Email", responseJson.email);

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
