"use client";
import ShareToInstagram from "@/components/CardAndSharewithDownload";
import { useParams } from "next/navigation";
export default function HomePage() {
  const { photoid } = useParams<{ photoid: string }>();
  console.log(photoid); // extract the photoid from backend api???

  return (
    <main className="flex min-h-screen flex-col items-center justify-center border border-black bg-gradient-to-b text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 text-black">
        <ShareToInstagram />
      </div>
    </main>
  );
}
