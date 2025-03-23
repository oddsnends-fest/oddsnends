import SocialMediaBar from "@/components/SocialMediaBar/SocialMediaBar";

export default function PhotoIdLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="flex-grow">{children}
            <SocialMediaBar/>
        </div>
        
    )
}
