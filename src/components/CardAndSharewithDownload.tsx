"use client";
import { useRef, useState } from "react";
import useShareToInstagram from "@/hooks/useShareToInstagram";
import { Button } from "./ui/button";
import { Download, Share } from "lucide-react";
import { BellRing, Check } from "lucide-react";
import useSWR from "swr";
import { cn } from "@/lib/utils";
import Image from "next/image";
// import { toJpeg } from "html-to-image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import html2canvas from "html2canvas";
const notifications = [
  {
    title: "Your call has been confirmed.",
    description: "1 hour ago",
  },
  {
    title: "You have a new message!",
    description: "1 hour ago",
  },
  {
    title: "Your subscription is expiring soon!",
    description: "2 hours ago",
  },
];

const fetcher = (url: string) => fetch(url).then((res) => res.json());

type CardProps = React.ComponentProps<typeof Card>;

export default function ShareToInstagram() {
  // const { ticketRef, shareToInstagram } = useShareToInstagram();
  const [step, addStep] = useState(1);

  const cardRef = useRef<HTMLDivElement | null>(null);
  console.log(cardRef.current, "cardref");

  // const { data, error, isLoading } = useSWR(
  //   "https://jsonplaceholder.typicode.com/users/1", // change the path to retrive the data
  //   fetcher,
  // );

  function CardComponent() {
    // mock the ticket component
    return (
      <Card ref={cardRef} className={cn("w-[380px] !rounded-none")}>
        <CardHeader>
          <CardTitle>Notifications</CardTitle>
          <CardDescription>You have 3 unread messages.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="flex items-center space-x-4 rounded-md border p-4">
            <BellRing />
            <div className="flex-1 space-y-1">
              <p className="text-sm font-medium leading-none">
                Push Notifications
              </p>
              <p className="text-sm text-muted-foreground">
                Send notifications to device.
              </p>
            </div>
          </div>
          <div>
            {notifications.map((notification, index) => (
              <div
                key={index}
                className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
              >
                <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {notification.title}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {notification.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full">
            <Check /> Mark all as read
          </Button>
        </CardFooter>
      </Card>
    );
  }

  const { handleRouteToSharePage, handleDownloadFile, urlImage, handleShare } =
    useShareToInstagram();
  return (
    <section>
      {step === 1 && <CardComponent />}
      {step === 2 && (
        <div onClick={handleShare}>
          <Image
            className=""
            src={urlImage}
            width={500}
            height={500}
            alt="image"
          />
        </div>
      )}

      {step === 1 && (
        <div className="flex items-center justify-center gap-3 border border-black p-2">
          <Button
            data-testid="download"
            onClick={() => handleDownloadFile(cardRef)}
          >
            <Download />
          </Button>
          <Button
            data-testid="share"
            onClick={() => handleRouteToSharePage(cardRef, addStep)}
          >
            <Share />
          </Button>
        </div>
      )}
    </section>
  );
}
