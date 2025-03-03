import SponsorSection from "../SponsorSection/SponsorSection";
import SocialMediaLink from "./SocialMediaLink/SocialMediaLink"; // Social media Link component

function SocialMediaBar() {
  return (
    <>
      <SponsorSection />
      <footer className="bottom-0 z-10 w-full bg-gray-200 px-4 py-4 text-black">
        <div className="flex w-full items-center justify-around">
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
  );
}

export default SocialMediaBar;
