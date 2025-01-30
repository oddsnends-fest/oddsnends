"use client";
import ShareToInstagram from "@/components/CardAndSharewithDownload";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center border border-black bg-gradient-to-b text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 text-black">
        <ShareToInstagram />
      </div>
    </main>
  );
}
