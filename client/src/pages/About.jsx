import ExperienceSection from "@/components/About/Experience";
import HardSkills from "@/components/About/HardSkills";
import AboutHeader from "@/components/About/Header";
import SoftSkills from "@/components/About/SoftSkills";
import TimelineSection from "@/components/About/Timeline";

export default function About() {
    return (
        <main>
            <AboutHeader />
            <ExperienceSection />
            <TimelineSection />
            <HardSkills />
            <SoftSkills />
        </main>
    )
}