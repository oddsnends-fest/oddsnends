import SocialMediaLink from "./SocialMediaLink/SocialMediaLink"; // Social media Link component

function SocialMediaBar() {
    return (
        <>
            <footer className="bg-gray-200 text-black w-full px-4 py-4 sticky bottom-0">
                <div className="flex items-center justify-around w-full">
                    <div className="flex items-center justify-center gap-2">
                        <SocialMediaLink
                            href="https://www.instagram.com/oddsnends.fest/"
                            src="/images/instagram.png"
                            alt="Instagram"
                            title="Instagram"
                            label="oddsnends.fest"
                        />
                    </div>
                    <div className="flex items-center justify-center gap-2">
                        <SocialMediaLink
                            href="https://www.tiktok.com/@oddsnends.fest"
                            src="/images/tik-tok.png"
                            alt="TikTok"
                            title="TikTok"
                            label="oddsnends.fest"
                        />
                    </div>
                </div>
            </footer>
        </>
    )
}

export default SocialMediaBar;