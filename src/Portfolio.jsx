import { useEffect, useState } from "react";

import { ACCENT, ACCENT2, BG, LINE } from "./constants/theme";
import { PROJECTS } from "./data";

import { CustomCursor } from "./components/CustomCursor";
import { IntroLoader } from "./components/IntroLoader";
import { Reveal } from "./components/Reveal";
import { TerminalTyping } from "./components/TerminalTyping";
import { GlowCard } from "./components/GlowCard";
import { ProjectCard, ProjectModal } from "./components/ProjectCard";
import { ExpItem, SkillGroup } from "./components/sections";
import { Btn, Cert, NavLink, SectionHeading, SpecRow } from "./components/ui";

export default function Portfolio() {
  const [introDone, setIntroDone] = useState(false);
  const [openProject, setOpenProject] = useState(null);

  useEffect(() => {
    document.body.style.overflow = introDone && !openProject ? "auto" : "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [introDone, openProject]);

  return (
    <div
      className="font-sans antialiased min-h-screen"
      style={{ backgroundColor: BG, color: "#fff" }}
    >
      <CustomCursor />
      {!introDone && <IntroLoader onDone={() => setIntroDone(true)} />}

      {/* Background glow blobs */}
      <div
        className="fixed top-[-20%] left-1/2 -translate-x-1/2 w-[800px] h-[600px] blur-[160px] rounded-full -z-10 pointer-events-none"
        style={{ backgroundColor: ACCENT, opacity: 0.1 }}
      />
      <div
        className="fixed bottom-[-15%] right-[5%] w-[500px] h-[400px] blur-[140px] rounded-full -z-10 pointer-events-none drift"
        style={{ backgroundColor: ACCENT2, opacity: 0.08 }}
      />
      <style>{`
        @keyframes driftMove { 0%,100% { transform: translate(0,0); } 50% { transform: translate(-30px, 20px); } }
        .drift { animation: driftMove 9s ease-in-out infinite; }
      `}</style>

      <div
        className={`transition-all duration-700 ease-out ${
          introDone ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
        }`}
      >
        {/* ── Nav ── */}
        <nav
          className="sticky top-0 z-50 backdrop-blur-md border-b"
          style={{ backgroundColor: "rgba(10,11,13,0.7)", borderColor: LINE }}
        >
          <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
            <span className="font-display font-semibold tracking-tight">RBM</span>
            <div className="hidden md:flex gap-8">
              <NavLink href="#about">About</NavLink>
              <NavLink href="#experience">Experience</NavLink>
              <NavLink href="#skills">Skills</NavLink>
              <NavLink href="#projects">Projects</NavLink>
              <NavLink href="#certs">Certs</NavLink>
            </div>
            <Btn href="#contact">Contact</Btn>
          </div>
        </nav>

        {/* ── Hero ── */}
        <header className="max-w-5xl mx-auto px-6 pt-24 pb-28 grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-14 items-center">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-widest mb-5" style={{ color: ACCENT }}>
              B.Tech CSE · KL University
            </p>
            <h1 className="font-display font-extrabold text-[38px] sm:text-[58px] leading-[1.05] tracking-tight mb-6">
              Rushyendra Baba Mylavarapu
            </h1>
            <p className="text-lg max-w-xl leading-relaxed mb-10" style={{ color: "#cbd5e1" }}>
              Computer science student building across web, cloud, and data —
              with internship experience at Bharat Electronics Limited and IBM.
              Currently looking for software development opportunities.
            </p>
            <div className="flex flex-wrap gap-4">
              <Btn href="#projects" solid>View work</Btn>
              <Btn href="#contact">Get in touch</Btn>
            </div>
          </Reveal>
          <Reveal>
            <TerminalTyping />
          </Reveal>
        </header>

        {/* ── About ── */}
        <section id="about" className="max-w-5xl mx-auto px-6 py-24 border-t" style={{ borderColor: LINE }}>
          <Reveal><SectionHeading index="01" title="About" /></Reveal>
          <Reveal>
            <div className="grid grid-cols-1 md:grid-cols-[1.1fr_0.9fr] gap-12">
              <div className="space-y-5 text-[15.5px] leading-relaxed" style={{ color: "#cbd5e1" }}>
                <p>
                  I&apos;m a computer science student at KL University with
                  hands-on experience spanning hardware and cloud — from
                  processing test data on electronic modules at Bharat
                  Electronics Limited, to deploying applications and managing
                  cloud resources during an IBM Edunet internship.
                </p>
                <p>
                  I like building things that work end to end: web apps with
                  real authentication and data, reports that speed up
                  decisions, systems that hold up under real use. Outside of
                  coursework, I&apos;m active in KL University&apos;s Zero Code
                  Coding Club and CS–IT Club, and have volunteered running
                  coding workshops for high school students.
                </p>
              </div>
              <GlowCard className="p-6">
                <h3 className="text-xs uppercase tracking-widest mb-4" style={{ color: "#928FB0" }}>Quick facts</h3>
                <SpecRow label="Degree" value="B.Tech CSE, pursuing" />
                <SpecRow label="CGPA" value="8.0" />
                <SpecRow label="Location" value="Vijayawada, IN" />
                <SpecRow label="Focus" value="Web · Cloud · Data" />
                <SpecRow label="Status" value="Open to opportunities" ok />
              </GlowCard>
            </div>
          </Reveal>
        </section>

        {/* ── Experience ── */}
        <section id="experience" className="max-w-5xl mx-auto px-6 py-24 border-t" style={{ borderColor: LINE }}>
          <Reveal><SectionHeading index="02" title="Experience" /></Reveal>
          <Reveal>
            <ExpItem
              role="Data Intern"
              date="May – Jun 2025"
              org="Bharat Electronics Limited (BEL)"
              desc="Collected and processed test data from electronic modules with full data accuracy, and generated analysis reports for the Design & Engineering team — cutting decision-making time by roughly 15%."
            />
            <ExpItem
              role="Technical Intern"
              date="Jun – Jul 2025"
              org="IBM Edunet"
              desc="Completed hands-on IBM Cloud training covering application deployment, resource management, and AI service integration through practical, project-based modules."
              last
            />
          </Reveal>
        </section>

        {/* ── Skills ── */}
        <section id="skills" className="max-w-5xl mx-auto px-6 py-24 border-t" style={{ borderColor: LINE }}>
          <Reveal><SectionHeading index="03" title="Skills" /></Reveal>
          <Reveal>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <SkillGroup title="Languages" chips={["Java", "Python", "JavaScript"]} />
              <SkillGroup title="Web development" chips={["HTML", "CSS", "React", "Node.js"]} />
              <SkillGroup title="Database" chips={["MySQL"]} />
              <SkillGroup title="Platforms & CRM" chips={["Git", "GitHub", "ServiceNow", "Salesforce"]} />
            </div>
          </Reveal>
        </section>

        {/* ── Projects ── */}
        <section id="projects" className="max-w-5xl mx-auto px-6 py-24 border-t" style={{ borderColor: LINE }}>
          <Reveal><SectionHeading index="04" title="Projects" /></Reveal>
          <Reveal>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {PROJECTS.map((p) => (
                <ProjectCard key={p.index} {...p} onOpen={() => setOpenProject(p)} />
              ))}
            </div>
          </Reveal>
        </section>

        {openProject && (
          <ProjectModal project={openProject} onClose={() => setOpenProject(null)} />
        )}

        {/* ── Certifications ── */}
        <section id="certs" className="max-w-5xl mx-auto px-6 py-24 border-t" style={{ borderColor: LINE }}>
          <Reveal><SectionHeading index="05" title="Certifications" /></Reveal>
          <Reveal>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Cert>AWS Cloud Practitioner (CP)</Cert>
              <Cert>ServiceNow Certified System Administrator (CSA)</Cert>
              <Cert>Salesforce AI Associate</Cert>
              <Cert>Cambridge Linguaskill Communication Certification</Cert>
            </div>
          </Reveal>
        </section>

        {/* ── Contact / Footer ── */}
        <footer id="contact" className="max-w-5xl mx-auto px-6 py-24 border-t" style={{ borderColor: LINE }}>
          <Reveal>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
              <div>
                <h2 className="font-display font-extrabold text-3xl sm:text-5xl mb-4">
                  Let&apos;s work together.
                </h2>
                <p className="max-w-md" style={{ color: "#cbd5e1" }}>
                  Open to internships and entry-level roles in software
                  development, web, and cloud.
                </p>
              </div>
              <div className="flex flex-col gap-3 font-mono text-sm">
                <a
                  href="mailto:2300031859cseh@gmail.com"
                  data-cursor-hover
                  className="transition-colors"
                  style={{ color: "#e2e8f0" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = ACCENT)}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#e2e8f0")}
                >
                  2300031859cseh@gmail.com
                </a>
                <a
                  href="tel:+919618072569"
                  data-cursor-hover
                  className="transition-colors"
                  style={{ color: "#e2e8f0" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = ACCENT)}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#e2e8f0")}
                >
                  +91 96180 72569
                </a>
                <a
                  href="https://linkedin.com/in/rushyendra-baba-mylavarapu-976245356"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor-hover
                  className="transition-colors"
                  style={{ color: "#e2e8f0" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = ACCENT)}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#e2e8f0")}
                >
                  LinkedIn ↗
                </a>
              </div>
            </div>
            <div className="text-xs mt-16" style={{ color: "#928FB0" }}>
              Vijayawada, Andhra Pradesh, India — built with React + Tailwind CSS.
            </div>
          </Reveal>
        </footer>
      </div>
    </div>
  );
}
