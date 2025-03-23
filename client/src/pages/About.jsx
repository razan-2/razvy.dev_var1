import HardSkills from "@/components/About/HardSkills";
import SoftSkills from "@/components/About/SoftSkills";
import TimelineSection from "@/components/About/Timeline";

export default function About() {
    return (
        <main>
            <TimelineSection />
            <HardSkills />
            <SoftSkills />
        </main>
    )
}