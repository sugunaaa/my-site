import { Playfair_Display } from "next/font/google";
import { Dancing_Script} from "next/font/google";
import { Pacifico } from "next/font/google";
import { FiMail, FiLinkedin, FiGithub } from "react-icons/fi";
import Link from "next/link";

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"], // choose what you need
});

const dancingScript = Dancing_Script({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"], // choose what you need
});

const pacifico = Pacifico({
  subsets: ["latin"],
  weight: ["400"], // choose what you need
});

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#f2f3f1] overflow-x-hidden">

      {/* Background Left Blocks */}
      <div className="absolute left-0 top-0 w-[350px] h-[250px] bg-black" />
      <div className="absolute left-0 bottom-0 w-[350px] h-[250px] bg-black" />

      <div className="absolute left-0 bottom-0 w-[350px] h-[250px] bg-black z-10">
        <nav className="pt-8 pl-30 flex flex-col gap-4">
          <Link href="/about" className={`text-white text-xl font-semibold hover:text-white/70 transition ${playfairDisplay.className}`}>
            About
          </Link>
          <Link href="/projects" className={`text-white text-xl font-semibold hover:text-white/70 transition ${playfairDisplay.className}`}>
            Projects
          </Link>
          <Link href="/resume" className={`text-white text-xl font-semibold hover:text-white/70 transition ${playfairDisplay.className}`}>
            Resume
          </Link>
          <Link href="/contact" className={`text-white text-xl font-semibold hover:text-white/70 transition ${playfairDisplay.className}`}>
            Contact
          </Link>
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

      </section>

      {/* Footer */}
      <footer className="absolute bottom-6 right-6 z-10">
        <div className="flex items-center gap-4 text-gray-600">

          {/* Email */}
          <a
            href="mailto:suguna.3029@gmail.com"
            className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-500 transition transform hover:scale-110 hover:bg-gray-200"
          >
            <FiMail size={18} />
          </a>

          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/in/suguna-shekar-29100a194/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-500 transition transform hover:scale-110 hover:bg-gray-200"
          >
            <FiLinkedin size={18} />
          </a>

          {/* GitHub */}
          <a
            href="https://github.com/sugunaaa"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-500 transition transform hover:scale-110 hover:bg-gray-200"
          >
            <FiGithub size={18} />
          </a>

        </div>
      </footer>
    </main>
  );
}
