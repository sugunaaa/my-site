"use client";
import { Playfair_Display } from "next/font/google";
import { Dancing_Script} from "next/font/google";
import { Pacifico } from "next/font/google";
import { FiMail, FiLinkedin, FiGithub } from "react-icons/fi";
import { useEffect, useState } from "react";

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
});

const dancingScript = Dancing_Script({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const pacifico = Pacifico({
  subsets: ["latin"],
  weight: ["400"],
});

export default function Home() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > window.innerHeight * 0.2);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <main className="relative min-h-screen bg-[#f2f3f1] overflow-x-hidden">

      {/* Background Left Blocks */}
      <div className="absolute left-0 top-0 w-[350px] h-[250px] bg-black" />
      <div className="absolute left-0 bottom-0 w-[350px] h-[250px] bg-black" />

     {/* HERO-FOOTER NAV*/}
      <div
        className={`fixed left-0 bottom-0 w-[350px] h-[250px] z-50 transition-all duration-500 ${
          scrolled ? "bg-black/40" : "bg-black"
        }`}
      >
        <nav className="pt-8 pl-30 flex flex-col gap-4">
          {["about", "projects", "resume", "contact"].map((item) => (
            <a
              key={item}
              href={`#${item}`}
              className={`text-xl font-semibold transition-colors duration-500 ${
                scrolled ? "text-black" : "text-white"
              } ${playfairDisplay.className}`}
            >
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </a>
          ))}
        </nav>
      </div>

      {/* Background Sunburst */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.12]">
        <div className="absolute top-[-20%] right-[-20%] w-[800px] h-[800px] bg-[conic-gradient(from_300deg_at_80%_20%,rgba(0,0,0,0.15)_0deg,transparent_20deg,rgba(0,0,0,0.15)_40deg,transparent_60deg,rgba(0,0,0,0.15)_80deg,transparent_100deg)]" />
      </div>
      {/* Content */}
      <section className="relative z-10 flex flex-col items-center justify-center text-center min-h-screen px-6">
        {/* Top Line */}
        <div className={`flex items-center gap-6 text-gray-600 font-semibold tracking-widest text-[clamp(20px,1.5vw,30px)] ${playfairDisplay.className}`}>
          <span className="w-28 h-[2px] bg-gray-600" />
          Suguna Chandrasekar
          <span className="w-28 h-[2px] bg-gray-600" />
        </div>

        {/* Title */}
        <h1
          className={`text-[clamp(56px,9vw,110px)] text-black tracking-widest my-6 text-shadow-[2px_2px_0_rgba(0,0,0,0.3)] ${dancingScript.className} font-bold`}
          data-text="PORTFOLIO"
        >
          Portfolio
        </h1>

        {/* Bottom Line */}
        <div className={`flex items-center gap-6 text-gray-600 text-lg font-semibold tracking-wide ${playfairDisplay.className}`}>
          <span className="w-28 h-[2px] bg-gray-600" />
          MSCS Student, UC Davis
          <span className="w-28 h-[2px] bg-gray-600" />
        </div>

        {/* Hero-only bottom-right icons */}
        <div className="absolute bottom-6 right-6 z-20">
          <div className="flex items-center gap-4 text-gray-600 pointer-events-auto">
            <a
              href="mailto:suguna.3029@gmail.com"
              className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-500 transition-transform hover:scale-110 hover:bg-gray-200"
              aria-label="Email"
            >
              <FiMail size={18} />
            </a>

            <a
              href="https://www.linkedin.com/in/suguna-shekar-29100a194/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-500 transition-transform hover:scale-110 hover:bg-gray-200"
              aria-label="LinkedIn"
            >
              <FiLinkedin size={18} />
            </a>

            <a
              href="https://github.com/sugunaaa"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-500 transition-transform hover:scale-110 hover:bg-gray-200"
              aria-label="GitHub"
            >
              <FiGithub size={18} />
            </a>
          </div>
        </div>
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-black/40 to-transparent opacity-100" />
      </section>

      {/* SECTIONS */}
      <div className="relative z-10">
        <section id="about" className="scroll-mt-24 px-6 py-20">
          <div className="mx-auto max-w-3xl">
            <h2 className={`text-6xl font-bold tracking-tight text-black text-shadow-[2px_2px_0_rgba(0,0,0,0.3)] ${playfairDisplay.className}`}>About</h2>
            <p className={`mt-10 text-gray-700 leading-relaxed text-xl ${playfairDisplay.className}`}>
              I’m Suguna, a Computer Science student focused on building reliable, production-ready software.
              I’m particularly interested in backend engineering, security-aware systems, and clean interface design.
            </p>
            <p className={`mt-4 text-gray-700 leading-relaxed text-xl ${playfairDisplay.className}`}>
              I enjoy projects with real-world constraints: performance, correctness, debugging, and system architecture.
            </p>
          </div>
          <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-black/40 to-transparent opacity-100" />
        </section>

        <section id="projects" className="scroll-mt-24 px-6 py-20">
          <div className="mx-auto max-w-4xl pl-12">
            <h2 className={`text-6xl font-bold tracking-tight text-black text-shadow-[2px_2px_0_rgba(0,0,0,0.3)] ${playfairDisplay.className}`}>Projects</h2>

            <div className="mt-10 grid gap-6">
              <article className="rounded-2xl border border-black/10 bg-white/50 p-6">
                <h3 className={`text-3xl font-semibold text-black ${playfairDisplay.className}`}>Project Title 1</h3>
                <p className={`mt-2 text-gray-700  text-lg ${playfairDisplay.className}`}>One line: problem → solution.</p>
                <p className="mt-3  text-lg text-gray-600">
                  <span className={`font-semibold text-gray-700 ${playfairDisplay.className}`}>Stack:</span> Next.js • TypeScript • Tailwind
                </p>
                <p className="mt-2 text-lg text-gray-600">
                  <span className={`font-semibold text-gray-700 ${playfairDisplay.className}`}>Impact:</span> Add a concrete outcome/metric.
                </p>
              </article>

              <article className="rounded-2xl border border-black/10 bg-white/50 p-6">
                <h3 className={`text-3xl font-semibold text-black ${playfairDisplay.className}`}>Project Title 2</h3>
                <p className={`mt-2 text-gray-700  text-lg ${playfairDisplay.className}`}>One line: what it does + why it matters.</p>
                <p className="mt-3  text-lg text-gray-600">
                  <span className={`font-semibold text-gray-700 ${playfairDisplay.className}`}>Stack:</span> Python • Flask • PostgreSQL
                </p>
                <p className="mt-2  text-lg text-gray-600">
                  <span className={`font-semibold text-gray-700 ${playfairDisplay.className}`}>Impact:</span> Add a concrete outcome/metric.
                </p>
              </article>
            </div>
          </div>
          <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-black/40 to-transparent opacity-100" />
        </section>

        <section id="resume" className="scroll-mt-24 px-6 py-20">
          <div className="mx-auto max-w-3xl">
            <h2 className={`text-6xl font-bold tracking-tight text-black text-shadow-[2px_2px_0_rgba(0,0,0,0.3)] ${playfairDisplay.className}`}>Resume</h2>
            <p className={`mt-10 text-gray-700 text-xl ${playfairDisplay.className}`}>
              View or download my resume:
            </p>

            <a
              href="/resume.pdf"
              target="_blank"
              rel="noreferrer"
              className={`mt-8 inline-flex items-center justify-center rounded-full bg-black px-6 py-3 text-sm font-semibold text-white hover:bg-black/80 transition`}
            >
              Open Resume
            </a>
          </div>
          <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-black/40 to-transparent opacity-100" />
        </section>

        <section id="contact" className="scroll-mt-24 px-6 py-24">
          <div className="mx-auto max-w-3xl">
            <h2 className={`text-6xl font-bold tracking-tight text-black text-shadow-[2px_2px_0_rgba(0,0,0,0.3)] ${playfairDisplay.className}`}>Contact</h2>
            <p className={`mt-10 text-gray-700 text-xl ${playfairDisplay.className}`}>
              Reach me here:
            </p>

            <div className={`mt-8 flex flex-col gap-3 font-semibold text-gray-700 ${playfairDisplay.className}`}>
              <a className="underline hover:text-black" href="mailto:suguna.3029@gmail.com">Email</a>
              <a className="underline hover:text-black" href="https://www.linkedin.com/in/suguna-shekar-29100a194/" target="_blank" rel="noreferrer">
                LinkedIn
              </a>
              <a className="underline hover:text-black" href="https://github.com/sugunaaa" target="_blank" rel="noreferrer">
                GitHub
              </a>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
