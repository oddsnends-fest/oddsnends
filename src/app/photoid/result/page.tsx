"use client";
import ShareToInstagram from "@/components/CardAndSharewithDownload";
import { useParams } from "next/navigation";
export default function HomePage() {
  const { photoid } = useParams<{ photoid: string }>();
  console.log(photoid); // extract the photoid from backend api???

  return <ShareToInstagram />;
}
