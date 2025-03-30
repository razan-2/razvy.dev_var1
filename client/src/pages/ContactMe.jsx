import SocialMediaSection from "@/components/Contact/SocialMedia";
import WorthIt from "@/components/Contact/WorthIt";
import MessageMe from "@/components/MessageForm/MessageMe";

const ContactMe = () => {
    return (  
        <main className="bg-black pb-10">
            <WorthIt />
            <div className="flex justify-center w-full">
                <SocialMediaSection />
            </div>
            <MessageMe />
        </main>
    );
}
 
export default ContactMe;