'use client'

import Image from "next/image";
import SlidingBox from "@/components/SlidingBox/SlidingBox";
import { useLiff } from "@/providers/liff-provider";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
    name: string;
    picture?: string;
    sub: string;
}

export default function HomePage() {

    const { liff } = useLiff();
    const [userProfile, setUserProfile] = useState<{ displayName: string; pictureUrl?: string; userId: string } | null>(null);
    const [idToken, setIdToken] = useState<String | null>(null);
  
    useEffect(() => {
        console.log("liff:", liff);
        if (liff) {
            if (!liff.isLoggedIn()) {
                console.log("User not logged in, initiating login...");
                liff.login();
            } else {
                console.log("User is already logged in, decoding ID token...");
                const token = liff.getIDToken();
                if (token) {
                    console.log("ID Token:", token);
                    setIdToken(token)
                    try {
                        const decoded: DecodedToken = jwtDecode(token);
                        setUserProfile({
                            displayName: decoded.name,
                            pictureUrl: decoded.picture,
                            userId: decoded.sub,
                        });
                    } catch (err) {
                        console.error("Error decoding ID token:", err);
                    }
                }
            }
        }
    }, [liff]);     

    return (
        <>  
            {/* Background */}
            <div className="absolute top-0 h-full w-full bg-center bg-cover -z-10"
                style={{ backgroundImage: "url('images/background/home.png')"}}
            />
            
            {/* content */}
            <main className="mt-5 flex flex-col justify-center items-center gap-8">
                {/* Title */}
                <div className="text-center text-white drop-shadow-[0px_2px_1px_rgba(0,0,0,0.3)] leading-[1.75]">
                    <h1 className="text-[1.8rem] tracking-[0.1em] font-cooper">Sandbox Space</h1>
                    <div className="font-semibold text-[0.9rem] px-2 tracking-wide">FOR ARTISTS, ENTREPRENEURS, AND BEYOND</div>
                </div>
                
                
                {/* User Profile Section */}
                {userProfile ? (
                    <div className="flex flex-col items-center text-white bg-black/50 p-4 rounded-lg shadow-md">
                        {userProfile.pictureUrl && (
                            <img
                                src={userProfile.pictureUrl}
                                alt="Profile Picture"
                                width={80}
                                height={80}
                                className="rounded-full border border-white"
                            />
                        )}
                        <p className="mt-2 font-semibold text-lg">{userProfile.displayName}</p>
                        <p className="text-sm text-gray-300">User ID: {userProfile.userId}</p>
                    </div>
                ) : (
                    <div className="text-white bg-black/50 p-4 rounded-lg shadow-md">
                        {idToken && <p className="text-sm text-red-400">ID Token: {idToken}</p>}
                    </div>
                )}

                {/* Sliding Box */}
                <SlidingBox />

                {/* Buttons */}
                <div className="relative mb-16 flex flex-col justify-center items-center drop-shadow-[0_0_70px_rgba(218,188,144,1)]">
                    <Image 
                        src="/images/oddie.png"
                        alt="oddie.png"
                        width={90}
                        height={90}
                        className="z-10 drop-shadow-[0_5px_3px_rgba(0,0,0,0.3)]"
                    />
                    <button 
                        type="button"
                        className="absolute top-[75px] py-4 w-64 rounded-full bg-purple-gradient text-white text-xl font-semibold tracking-wider drop-shadow-[0_5px_3px_rgba(0,0,0,0.3)]"
                    >
                        <a
                            href="https://docs.google.com/forms/d/e/1FAIpQLScpRDeY39gJaVQ1WHkfvKt-1vo8xnPYnuBazcNZsO7pV799EA/viewform"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            DIY COOKIE
                        </a>
                    </button>
                </div>
            </main>

            <div className="absolute bottom-0 h-96 w-full bg-black -z-20" />
        </>
    );
}
