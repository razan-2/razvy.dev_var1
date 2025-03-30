import Testimonials from "@/components/HomePage/Testimonials";
import HeroSection from "../components/HomePage/HeroSection";
import MessageMe from "@/components/MessageForm/MessageMe";
import WhoAmISection from "@/components/HomePage/WhoAmI.jsx";

const Home = () => {
    return (  
        <main className="min-h-screen bg-black p-4 md:p-8">
            <HeroSection />
            <WhoAmISection />
            <div className="max-w-6xl mx-auto">
                <h1 className="text-4xl md:text-6xl font-mono font-bold text-white mb-8 glitch-text" data-text="TESTIMONIALS_">
                TESTIMONIALS_
                </h1>
                <div className="mb-12">
                    <Testimonials />
                </div>
            </div>
            <MessageMe />
        </main>
    );
}
 
export default Home;