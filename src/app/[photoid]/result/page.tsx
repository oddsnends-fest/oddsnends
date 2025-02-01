"use client";
import ShareToInstagram from "@/components/CardAndSharewithDownload";
import { useParams } from "next/navigation";
export default function HomePage() {
  const { photoid } = useParams<{ photoid: string }>();
  console.log(photoid); // extract the photoid from backend api???

  return (
    <section className="flex-1 border border-black bg-gradient-to-b text-white">
      <div className="container text-black">
        <ShareToInstagram />
      </div>
    </section>
  );
}
