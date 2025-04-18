import SlidingBox from "@/components/SlidingBox/SlidingBox";
import SupportersSection from "@/components/SupportersSection/SupportersSection";

export default function AboutUsPage() {
  return (
    <>  
        {/* content */}
        <main className="mt-5 flex flex-col gap-8 bg-purple-200 p-4">
            {/* Title */}
            <div className="text-left text-white">
                <h1>About Us</h1>
                <div>What is Odds & Ends ?</div>
                <div>Odds & Ends is the Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</div>
            </div>
            <div className="text-center text-white">
                <div>&ldquo; Odds & Ends is the Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco. &rdquo;</div>  
            </div>
            <h1 className="text-center text-white">Our Goals</h1>
            <SlidingBox />
            <div className="text-center text-white">&ldquo; Odds & Ends is the Lorem ipsum dolor sit amet, consectetur adipiscing elit. &rdquo;</div> 

            <div className="text-left text-white">
                <h1>Key Theme</h1>
                <div>Odds & Ends is the Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</div>          
            </div>

            <div className="text-left text-purple-900">
                <h1>#OddsnEndsFestival</h1>
                <h1>#OddsnEndsFestival</h1>            
            </div>

            <SupportersSection />
        </main>
    </>
  );
}
