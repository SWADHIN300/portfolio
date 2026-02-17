import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
import BackToTop from "@/components/BackToTop";
import SectionDivider from "@/components/SectionDivider";

export default function Home() {
    return (
        <main className="relative">
            <Navigation />
            <Hero />
            <SectionDivider />
            <About />
            <SectionDivider />
            <Projects />
            <SectionDivider />
            <Skills />
            <SectionDivider />
            <Contact />
            <BackToTop />
        </main>
    );
}
