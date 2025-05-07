"use client";
import Image from "next/image";
import { MapPinned } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function EventInfo() {
    return (
        <>
            {/* Background */}
            <div className="absolute top-0 h-full w-full bg-[url('/images/background/event-info.png')] bg-center bg-cover -z-10" />

            <main className="text-center mt-5 flex flex-col justify-center items-center gap-3">
                <h1 className="text-4xl text-custom-purple font-cooper">10 - 11 May 2025</h1>
                <Image
                    src="/images/event-info/map.png"
                    alt="event-info-map"
                    width={366}
                    height={363}
                    className="w-[366px] h-auto drop-shadow-[0_5px_3px_rgba(0,0,0,0.3)]"
                />
                <div className="flex gap-2 items-center text-custom-yellow font-cooper">
                    <MapPinned size={36} />
                    <h1 className="text-3xl pt-3">
                        GalileOasis
                    </h1>
                </div>
                <Button
                    asChild={true}
                    className="bg-purple-gradient text-white rounded-full px-8 py-6 tracking-wider drop-shadow-[0_5px_3px_rgba(0,0,0,0.3)] text-lg font-medium"
                >
                    <a
                        href="https://maps.app.goo.gl/D936UuP1SzsoyoL88"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        HOW TO GET THERE
                    </a>
                </Button>
            </main>
        </>
    );
};