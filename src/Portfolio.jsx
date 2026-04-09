import { useState, useEffect, useRef, useCallback } from "react";

/* ════════════════════════════════════════════
   DATA — Suguna Chandrasekar's Resume
   ════════════════════════════════════════════ */
const PROFILE = {
  name: "Suguna Chandrasekar",
  tagline: "Software Developer · Data Enthusiast · MS CS @ UC Davis",
  bio: "A girl who fell in love with code. From building network orchestrators to detecting heart disease with ML — this is my story.",
};
const EDUCATION = [
  { year: "2025–2027", title: "M.S. Computer Science", place: "University of California, Davis", desc: "GPA: 4.0/4.0 — Security, systems, and software engineering.", thought: "Perfect GPA and a fresh chapter in California! 🎓" },
  { year: "2019–2023", title: "B.E. Electronics & Communication Engineering", place: "BNM Institute of Technology, Bangalore", desc: "GPA: 8.45/10 — Built the foundation in signals, systems, and software.", thought: "Where it all began — my first 'Hello World' moment! 💖" },
];
const EXPERIENCE = [
  { year: "2023–2025", title: "Associate Software Developer", place: "Extreme Networks, Bangalore", desc: "Integrated network OS with cloud orchestration across switch platforms. Architected reusable Go libraries that cut dev cycles by 30%. Built SQL-backed REST APIs for large-scale device orchestration. Resolved 20+ high-impact production incidents. Built an end-to-end UI for a Network Visualization Orchestrator from scratch.", thought: "Go libraries, production fires, and an entire product UI — shipped it all! 🚀" },
  { year: "Feb–Jul 2023", title: "Data Analyst Intern", place: "Definitive Healthcare, Bangalore", desc: "Built Snowflake data pipelines for large advertising datasets. Developed statistical models that improved prediction accuracy by 15%. Designed data transformation workflows reducing downstream query latency.", thought: "Turning messy data into actionable insights ☕📊" },
  { year: "Aug–Sep 2022", title: "Web Development Intern", place: "Cubera — Adtech & Big Data, Bangalore", desc: "Built the company website with React JS for cross-device responsive design. Developed analytical visualization features and supported production deployments.", thought: "First taste of shipping real code to real users! 💪" },
];
const PROJECTS = [
  { ep: "EP.01", title: "Congenital Heart Disease Detection", desc: "End-to-end ML pipeline for audio classification achieving 97.12% accuracy on medical signal data. Published in IEEE Xplore.", tech: ["Python", "CNN", "ML Pipeline"], color: "#f472b6" },
  { ep: "EP.02", title: "Geospatial Risk Analysis System", desc: "Multi-hazard analysis pipeline using GeoPandas and raster data for flood, wildfire, earthquake & storm risk scoring with ML and retrieval-based explanations.", tech: ["Python", "GeoPandas", "ML"], color: "#a78bfa" },
  { ep: "EP.03", title: "Attacking OpenSource SDN", desc: "Built an SDN testbed with Mininet & Ryu to analyze control-plane saturation under malicious traffic. Automated experiments with Bash & Python.", tech: ["Python", "Mininet", "Ryu", "Bash"], color: "#67e8f9" },
  { ep: "EP.04", title: "This Portfolio", desc: "A comic-strip visual novel portfolio with code rain, interactive terminal, SVG art, cursor sparkles, and a Konami code easter egg.", tech: ["React", "Canvas", "CSS Art"], color: "#fbbf24" },
];
const PUBLICATIONS = [
  { title: "Congenital Heart Disease Detection using CNN", venue: "IEEE Xplore, May 2023", thought: "Published at 21 — seeing my name in IEEE was surreal! 🌟" },
];
const TERMINAL_LINES = [
  { cmd: "whoami", out: "suguna chandrasekar — software developer, researcher, builder of things" },
  { cmd: "cat skills.txt", out: "Go · Python · Java · C · SQL · React · JavaScript · Docker · Kubernetes · REST APIs · Linux · Bash · SDN" },
  { cmd: "ls achievements/", out: "ms_cs_ucdavis/  ieee_publication/  extreme_networks/  30%_faster_dev_cycles/  20+_incidents_resolved/  97%_ml_accuracy/" },
  { cmd: "echo $MOTTO", out: "\"Build things that matter. Break things that don't. Learn from both.\"" },
  { cmd: "cat contact.txt", out: "📧 suguna.3029@gmail.com · 📱 (530)-341-9756 · 💼 linkedin.com/in/suguna-shekar-29100a194" },
];

/* ════════════════════════════════════════════
   CODE RAIN CANVAS
   ════════════════════════════════════════════ */
function CodeRainCanvas() {
  const canvasRef = useRef(null);
  const cols = useRef([]);
  const animRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const chars = "01{}()<>/;:=+*&|!?#@$%^~λπΣ∞♡★✦⚡".split("");
    const colors = ["#f9a8d4","#c4b5fd","#a5f3fc","#fde68a","#fbcfe8","#d8b4fe"];
    let w, h, colCount;

    const resize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
      colCount = Math.floor(w / 18);
      cols.current = Array.from({ length: colCount }, () => Math.random() * h / 18 | 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      ctx.fillStyle = "rgba(253,242,248,0.06)";
      ctx.fillRect(0, 0, w, h);
      ctx.font = "15px 'Courier New', monospace";
      for (let i = 0; i < colCount; i++) {
        const ch = chars[Math.random() * chars.length | 0];
        const color = colors[Math.random() * colors.length | 0];
        ctx.fillStyle = color;
        ctx.globalAlpha = 0.25 + Math.random() * 0.35;
        ctx.fillText(ch, i * 18, cols.current[i] * 18);
        ctx.globalAlpha = 1;
        if (cols.current[i] * 18 > h && Math.random() > 0.975) cols.current[i] = 0;
        cols.current[i]++;
      }
      animRef.current = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(animRef.current); window.removeEventListener("resize", resize); };
  }, []);

  return <canvas ref={canvasRef} style={{ position:"fixed",inset:0,zIndex:0,pointerEvents:"none" }} />;
}

/* ════════════════════════════════════════════
   CURSOR SPARKLE TRAIL
   ════════════════════════════════════════════ */
function CursorSparkles() {
  const [sparks, setSparks] = useState([]);
  const idRef = useRef(0);

  useEffect(() => {
    let last = 0;
    const onMove = (e) => {
      const now = Date.now();
      if (now - last < 50) return;
      last = now;
      const id = idRef.current++;
      const spark = {
        id, x: e.clientX + (Math.random()-0.5)*20,
        y: e.clientY + (Math.random()-0.5)*20,
        char: ["✦","♡","⭐","✿","💖","⚡","🌸"][Math.random()*7|0],
        size: 12 + Math.random()*14,
      };
      setSparks(prev => [...prev.slice(-12), spark]);
      setTimeout(() => setSparks(prev => prev.filter(s => s.id !== id)), 800);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div style={{ position:"fixed",inset:0,zIndex:9999,pointerEvents:"none" }}>
      {sparks.map(s => (
        <span key={s.id} style={{
          position:"fixed", left:s.x, top:s.y, fontSize:s.size,
          animation:"sparkPop 0.8s ease-out forwards",
          pointerEvents:"none",
        }}>{s.char}</span>
      ))}
    </div>
  );
}

/* ════════════════════════════════════════════
   INTERACTIVE TERMINAL
   ════════════════════════════════════════════ */
function InteractiveTerminal() {
  const [lines, setLines] = useState([]);
  const [input, setInput] = useState("");
  const [lineIdx, setLineIdx] = useState(0);
  const [typing, setTyping] = useState(false);
  const termRef = useRef(null);

  const typeOutput = useCallback((text, callback) => {
    setTyping(true);
    let i = 0;
    const iv = setInterval(() => {
      if (i <= text.length) {
        setLines(prev => {
          const copy = [...prev];
          copy[copy.length - 1] = { type: "out", text: text.slice(0, i) };
          return copy;
        });
        i++;
      } else {
        clearInterval(iv);
        setTyping(false);
        if (callback) callback();
      }
    }, 18);
  }, []);

  const runLine = useCallback((idx) => {
    if (idx >= TERMINAL_LINES.length) return;
    const { cmd, out } = TERMINAL_LINES[idx];
    setLines(prev => [...prev, { type: "cmd", text: cmd }]);
    setTimeout(() => {
      setLines(prev => [...prev, { type: "out", text: "" }]);
      typeOutput(out, () => setLineIdx(idx + 1));
    }, 300);
  }, [typeOutput]);

  const handleKey = (e) => {
    if (e.key === "Enter" && !typing) {
      const val = input.trim().toLowerCase();
      setInput("");
      if (val === "run" || val === "next" || val === "") {
        runLine(lineIdx);
      } else if (val === "clear") {
        setLines([]); setLineIdx(0);
      } else if (val === "help") {
        setLines(prev => [...prev, { type:"cmd", text: val }, { type:"out", text: 'Try: run, clear, help, hire-me' }]);
      } else if (val === "hire-me") {
        setLines(prev => [...prev, { type:"cmd", text: val }, { type:"out", text: '💖 Aww! Let\'s connect → scroll to the contact section!' }]);
      } else {
        setLines(prev => [...prev, { type:"cmd", text: val }, { type:"out", text: `command not found: ${val}. Type "help" for commands.` }]);
      }
    }
  };

  useEffect(() => { if (termRef.current) termRef.current.scrollTop = termRef.current.scrollHeight; }, [lines]);

  return (
    <div className="terminal-window">
      <div className="terminal-bar">
        <span className="terminal-dot" style={{background:"#ff5f57"}} />
        <span className="terminal-dot" style={{background:"#febc2e"}} />
        <span className="terminal-dot" style={{background:"#28c840"}} />
        <span className="terminal-title">suguna@portfolio ~ %</span>
      </div>
      <div className="terminal-body" ref={termRef}>
        <div className="terminal-line out">Welcome! Type <b>run</b> to execute commands, or try <b>help</b> ✨</div>
        {lines.map((l, i) => (
          <div key={i} className={`terminal-line ${l.type}`}>
            {l.type === "cmd" && <span className="prompt">$ </span>}
            {l.text}
          </div>
        ))}
        <div className="terminal-input-row">
          <span className="prompt">$ </span>
          <input
            className="terminal-input"
            value={input} onChange={e => setInput(e.target.value)}
            onKeyDown={handleKey}
            placeholder={typing ? "running..." : "type a command..."}
            disabled={typing} autoFocus
          />
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════
   SVG DESK SCENE — hero illustration
   ════════════════════════════════════════════ */
function DeskScene() {
  return (
    <svg viewBox="0 0 400 260" className="desk-scene" xmlns="http://www.w3.org/2000/svg">
      {/* Desk */}
      <rect x="60" y="160" width="300" height="16" rx="4" fill="#e9d5ff" stroke="#c4b5fd" strokeWidth="1.5"/>
      <rect x="90" y="174" width="18" height="65" rx="3" fill="#c4b5fd"/>
      <rect x="294" y="174" width="18" height="65" rx="3" fill="#c4b5fd"/>
      {/* Monitor */}
      <rect x="120" y="80" width="170" height="82" rx="8" fill="#1e1b4b" stroke="#a78bfa" strokeWidth="2"/>
      <rect x="128" y="88" width="148" height="65" rx="4" fill="#0f0b30"/>
      {/* Code on screen */}
      <text x="136" y="103" fontSize="10" fill="#f9a8d4" fontFamily="monospace">
        {"func main() {"}
      </text>
      <text x="136" y="113" fontSize="10" fill="#c4b5fd" fontFamily="monospace">  go build(dreams)</text>
      <text x="136" y="123" fontSize="10" fill="#67e8f9" fontFamily="monospace">  coffee := "∞"</text>
      <text x="136" y="133" fontSize="10" fill="#fbbf24" fontFamily="monospace">  bugs := "fixed"</text>
      <text x="136" y="143" fontSize="10" fill="#f9a8d4" fontFamily="monospace">{`}`}</text>
      {/* Blinking cursor */}
      <rect x="168" y="137" width="5" height="10" fill="#67e8f9" opacity="0.9">
        <animate attributeName="opacity" values="1;0;1" dur="1.2s" repeatCount="indefinite"/>
      </rect>
      {/* Monitor stand */}
      <rect x="185" y="158" width="30" height="9" rx="2" fill="#a78bfa"/>
      <rect x="195" y="155" width="10" height="10" rx="1" fill="#c4b5fd"/>
      {/* Coffee cup */}
      <ellipse cx="310" cy="150" rx="16" ry="5" fill="#fde68a" stroke="#f59e0b" strokeWidth="1"/>
      <rect x="294" y="140" width="32" height="16" rx="4" fill="#fde68a" stroke="#f59e0b" strokeWidth="1"/>
      <path d="M326 144 C334 144 336 152 326 152" fill="none" stroke="#f59e0b" strokeWidth="1.5"/>
      {/* Steam */}
      <path d="M304 132 Q306 124 302 118" fill="none" stroke="#d8b4fe" strokeWidth="1.2" opacity="0.6">
        <animate attributeName="d" values="M304 132 Q306 124 302 118;M304 132 Q300 122 304 116;M304 132 Q306 124 302 118" dur="3s" repeatCount="indefinite"/>
      </path>
      <path d="M312 130 Q314 120 310 114" fill="none" stroke="#fbcfe8" strokeWidth="1.2" opacity="0.5">
        <animate attributeName="d" values="M312 130 Q314 120 310 114;M312 130 Q310 118 314 112;M312 130 Q314 120 310 114" dur="3.5s" repeatCount="indefinite"/>
      </path>
      {/* Plant */}
      <rect x="72" y="138" width="22" height="24" rx="4" fill="#fecdd3" stroke="#f9a8d4" strokeWidth="1"/>
      <ellipse cx="83" cy="130" rx="12" ry="10" fill="#86efac"/>
      <ellipse cx="76" cy="126" rx="8" ry="7" fill="#6ee7b7"/>
      <ellipse cx="90" cy="128" rx="7" ry="6" fill="#a7f3d0"/>
      <line x1="83" y1="140" x2="83" y2="128" stroke="#4ade80" strokeWidth="1.5"/>
      {/* Cat */}
      <ellipse cx="340" cy="156" rx="14" ry="8" fill="#fecdd3"/>
      <ellipse cx="340" cy="150" rx="10" ry="8" fill="#fbcfe8"/>
      <polygon points="333,144 336,136 339,144" fill="#fbcfe8"/>
      <polygon points="341,144 344,136 347,144" fill="#fbcfe8"/>
      <circle cx="336" cy="149" r="1.5" fill="#1e1b4b"/>
      <circle cx="344" cy="149" r="1.5" fill="#1e1b4b"/>
      <ellipse cx="340" cy="152" rx="2" ry="1" fill="#f9a8d4"/>
      {/* Cat tail */}
      <path d="M354 156 Q362 148 358 140" fill="none" stroke="#fbcfe8" strokeWidth="2.5" strokeLinecap="round">
        <animate attributeName="d" values="M354 156 Q362 148 358 140;M354 156 Q366 150 360 144;M354 156 Q362 148 358 140" dur="4s" repeatCount="indefinite"/>
      </path>
      {/* Keyboard */}
      <rect x="155" y="162" width="90" height="6" rx="2" fill="#e0e7ff" stroke="#c7d2fe" strokeWidth="0.5"/>
      {/* Hearts floating */}
      <text x="106" y="100" fontSize="10" fill="#f472b6" opacity="0.7">♡
        <animate attributeName="y" values="100;85;100" dur="4s" repeatCount="indefinite"/>
        <animate attributeName="opacity" values="0.7;0.3;0.7" dur="4s" repeatCount="indefinite"/>
      </text>
      <text x="290" y="95" fontSize="8" fill="#a78bfa" opacity="0.5">✦
        <animate attributeName="y" values="95;80;95" dur="3.5s" repeatCount="indefinite"/>
      </text>
    </svg>
  );
}

/* ════════════════════════════════════════════
   SCROLL PROGRESS CHARACTER
   ════════════════════════════════════════════ */
function ScrollProgressChar({ progress }) {
  const emojis = ["🚶‍♀️","💻","🔧","🧪","📝","🎉"];
  const idx = Math.min(Math.floor(progress / 20), emojis.length - 1);
  return (
    <div className="scroll-char" style={{ top: `calc(${Math.min(progress, 98)}% - 16px)` }}>
      <span style={{ fontSize: 50 }}>{emojis[idx]}</span>
    </div>
  );
}

/* ════════════════════════════════════════════
   CLICK BURST
   ════════════════════════════════════════════ */
function ClickBurst() {
  const [bursts, setBursts] = useState([]);
  const idRef = useRef(0);
  useEffect(() => {
    const onClick = (e) => {
      const id = idRef.current++;
      const particles = Array.from({ length: 8 }, (_, i) => ({
        angle: (i / 8) * 360,
        char: ["✦","♡","⭐","💖","✿","⚡","🌸","★"][i],
      }));
      setBursts(prev => [...prev.slice(-4), { id, x: e.clientX, y: e.clientY, particles }]);
      setTimeout(() => setBursts(prev => prev.filter(b => b.id !== id)), 700);
    };
    window.addEventListener("click", onClick);
    return () => window.removeEventListener("click", onClick);
  }, []);

  return (
    <div style={{ position:"fixed",inset:0,zIndex:9998,pointerEvents:"none" }}>
      {bursts.map(b => b.particles.map((p, i) => (
        <span key={`${b.id}-${i}`} style={{
          position:"fixed",
          left: b.x, top: b.y,
          fontSize: 14,
          animation: `burstOut 0.7s ease-out forwards`,
          "--angle": p.angle + "deg",
          pointerEvents:"none",
        }}>{p.char}</span>
      )))}
    </div>
  );
}

/* ════════════════════════════════════════════
   KONAMI EASTER EGG
   ════════════════════════════════════════════ */
function useKonami() {
  const [activated, setActivated] = useState(false);
  const seq = useRef([]);
  const code = "ArrowUp,ArrowUp,ArrowDown,ArrowDown,ArrowLeft,ArrowRight,ArrowLeft,ArrowRight,b,a";
  useEffect(() => {
    const onKey = (e) => {
      seq.current.push(e.key);
      if (seq.current.length > 10) seq.current.shift();
      if (seq.current.join(",") === code) setActivated(true);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
  return activated;
}

/* ════════════════════════════════════════════
   SCROLL REVEAL HOOK
   ════════════════════════════════════════════ */
function useReveal(threshold = 0.15) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, vis];
}

/* ════════════════════════════════════════════
   COMIC PANEL WRAPPER
   ════════════════════════════════════════════ */
function ComicPanel({ children, className = "", delay = 0, tilt = 0, accent }) {
  const [ref, vis] = useReveal(0.1);
  return (
    <div ref={ref}
      className={`comic-panel ${className} ${vis ? "vis" : ""}`}
      style={{ "--delay": delay + "s", "--tilt": tilt + "deg", "--accent": accent || "var(--pink)" }}
    >
      {children}
    </div>
  );
}

/* ════════════════════════════════════════════
   SPEECH BUBBLE
   ════════════════════════════════════════════ */
function Bubble({ children, direction = "left", color }) {
  return (
    <div className={`bubble bubble-${direction}`} style={{ "--bub-color": color || "var(--pink)" }}>
      {children}
    </div>
  );
}

/* ════════════════════════════════════════════
   FLIPPABLE PROJECT CARD
   ════════════════════════════════════════════ */
function ProjectCard({ project, delay }) {
  const [flipped, setFlipped] = useState(false);
  const [ref, vis] = useReveal(0.1);
  return (
    <div ref={ref} className={`flip-container ${vis ? "vis" : ""}`}
      style={{ "--delay": delay + "s" }}
      onClick={() => setFlipped(!flipped)}
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}>
      <div className={`flip-card ${flipped ? "flipped" : ""}`}>
        <div className="flip-front" style={{ "--card-accent": project.color }}>
          <span className="ep-badge">{project.ep}</span>
          <div className="flip-title">{project.title}</div>
          <div className="flip-hint">hover to reveal →</div>
        </div>
        <div className="flip-back">
          <div className="flip-title" style={{ fontSize: 16, marginBottom: 8 }}>{project.title}</div>
          <p className="flip-desc">{project.desc}</p>
          <div className="flip-techs">
            {project.tech.map(t => <span key={t} className="tech-pill">{t}</span>)}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════
   MAIN CSS
   ════════════════════════════════════════════ */
const css = `
@import url('https://fonts.googleapis.com/css2?family=Fredoka:wght@400;500;600;700&family=Caveat:wght@500;700&family=Fira+Code:wght@400;600&display=swap');

:root {
  --pink: #f472b6; --rose: #fb7185; --purple: #a78bfa; --lavender: #c4b5fd;
  --mint: #6ee7b7; --sky: #67e8f9; --peach: #fecdd3; --amber: #fbbf24;
  --bg: #fdf2f8; --bg2: #faf5ff;
  --card: #ffffff; --card-border: rgba(167,139,250,0.22);
  --text: #3b1164; --text2: #6d3a8f; --muted: #9879b5;
  --glow: rgba(244,114,182,0.3);
}
* { margin:0; padding:0; box-sizing:border-box; }
html { scroll-behavior:smooth; }
body,#root {
  font-family:'Fredoka',sans-serif; color:var(--text);
  background:var(--bg); overflow-x:hidden;
}

/* ─── Sparkle cursor ─── */
@keyframes sparkPop {
  0% { transform:scale(0) rotate(0deg); opacity:1; }
  100% { transform:scale(1.5) rotate(180deg) translateY(-40px); opacity:0; }
}

/* ─── Click burst ─── */
@keyframes burstOut {
  0% { transform:translate(0,0) scale(1); opacity:1; }
  100% { transform:translate(calc(cos(var(--angle))*60px), calc(sin(var(--angle))*60px)) scale(0); opacity:0; }
}

/* ─── Progress bar ─── */
.progress-bar {
  position:fixed;top:0;left:0;height:4px;z-index:200;
  background:linear-gradient(90deg,var(--pink),var(--purple),var(--sky),var(--amber));
  background-size:300% 100%; animation:gradientShift 4s linear infinite;
  transition:width 0.15s linear;
}
@keyframes gradientShift { 0%{background-position:0%} 100%{background-position:300%} }

/* ─── Nav ─── */
.story-nav {
  position:fixed;top:0;left:0;right:0;z-index:150;
  display:flex;align-items:center;justify-content:center;gap:10px;
  padding:10px 12px;
  background:rgba(253,242,248,0.8);backdrop-filter:blur(20px);
  border-bottom:2px solid var(--card-border);
}
.nav-btn {
  width:70px;height:70px;border-radius:50%;border:2px solid var(--card-border);
  background:var(--card);display:flex;align-items:center;justify-content:center;
  font-size:25px;cursor:pointer;transition:all 0.3s;
  box-shadow:0 2px 8px rgba(167,139,250,0.1);
}
.nav-btn:hover { transform:scale(1.15) rotate(-5deg); border-color:var(--pink); box-shadow:0 4px 16px var(--glow); }
.nav-btn.active { border-color:var(--pink); background:linear-gradient(135deg,#fdf2f8,#faf5ff);
  transform:scale(1.18); box-shadow:0 0 16px var(--glow); }
.nav-connector { width:50px;height:3px;border-radius:3px;
  background:linear-gradient(90deg,var(--pink),var(--purple));opacity:0.3; }

/* ─── Scroll progress character ─── */
.scroll-rail {
  position:fixed;right:16px;top:70px;bottom:20px;width:28px;z-index:100;
  display:flex;flex-direction:column;align-items:center;
}
.scroll-track { width:3px;height:100%;border-radius:3px;
  background:linear-gradient(180deg,var(--pink),var(--purple),var(--sky),var(--mint));opacity:0.3; }
.scroll-char { position:absolute;right:0;transition:top 0.3s ease-out; }

/* ─── Section ─── */
.chapter {
  position:relative;z-index:1;
  padding:110px 24px 70px;
  display:flex;flex-direction:column;align-items:center;
}
.chapter-label {
  font-family:'Fira Code',monospace;font-size:15px;letter-spacing:3px;
  text-transform:uppercase;color:var(--muted);margin-bottom:8px;
}
.chapter-heading {
  font-family:'Caveat',cursive;font-size:clamp(39px,8vw,80px);
  background:linear-gradient(135deg,var(--pink),var(--purple),var(--sky));
  -webkit-background-clip:text;-webkit-text-fill-color:transparent;
  background-clip:text;text-align:center;margin-bottom:40px;
  margin: 0 0 40px 0;
  width: 100%;
  max-width: 100%;
  overflow: visible;
}

/* ─── Comic panels ─── */
.comic-panel {
  opacity:0;transform:translateY(40px) rotate(var(--tilt,0deg));
  transition:opacity 0.6s var(--delay,0s),transform 0.6s var(--delay,0s);
  transition-timing-function:cubic-bezier(0.34,1.56,0.64,1);
}
.comic-panel.vis { opacity:1;transform:translateY(0) rotate(var(--tilt,0deg)); }

/* ─── Hero ─── */
.hero { min-height:100vh;display:flex;flex-direction:column;align-items:center;
  justify-content:center;gap:16px;text-align:center;padding-top:70px; }
.desk-scene { width:min(420px,90vw);height:auto;filter:drop-shadow(0 8px 30px rgba(167,139,250,0.2));
  animation:sceneFloat 6s ease-in-out infinite; }
@keyframes sceneFloat { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
.hero-name { font-size:clamp(42px,8vw,72px);font-weight:700;line-height:1.2;
  background:linear-gradient(135deg,var(--pink),var(--purple),var(--sky));
  -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text; }
.hero-tagline { font-family:'Fira Code',monospace;font-size:16px;color:var(--muted);letter-spacing:0.5px; }

/* ─── Bubble ─── */
.bubble {
  position:relative;background:var(--card);
  border:2.5px solid var(--bub-color,var(--pink));border-radius:22px;
  padding:16px 20px;max-width:520px;font-size:17px;line-height:1.6;
  box-shadow:0 4px 20px rgba(244,114,182,0.1),inset 0 0 0 1px rgba(255,255,255,0.5);
  transition:transform 0.3s,box-shadow 0.3s;
}
.bubble:hover { transform:translateY(-3px) rotate(-0.5deg);box-shadow:0 8px 30px rgba(244,114,182,0.18); }
.bubble::after {
  content:'';position:absolute;bottom:-14px;left:32px;
  width:0;height:0;
  border-left:14px solid transparent;border-right:14px solid transparent;
  border-top:14px solid var(--bub-color,var(--pink));
}
.bubble-right::after { left:auto;right:32px; }
.bubble .who { font-family:'Caveat',cursive;font-size:23px;color:var(--bub-color,var(--pink));margin-bottom:4px; }
.thought-bubble {
  display:inline-block;background:var(--card);
  border:2px dashed var(--lavender);border-radius:30px;
  padding:8px 16px;font-family:'Caveat',cursive;font-size:19px;color:var(--text2);
  margin-top:8px;transition:transform 0.3s;
}
.thought-bubble:hover { transform:scale(1.05) rotate(2deg); }

/* ─── Timeline ─── */
.timeline { position:relative;max-width:750px;width:100%;display:flex;flex-direction:column;gap:40px;padding-left:10px; }
.timeline::before { content:'';position:absolute;left:-10px;top:0;bottom:0;width:4px;border-radius:4px;
  background:linear-gradient(180deg,var(--pink),var(--purple),var(--sky),var(--mint)); }
.tl-item { position:relative; }
.tl-dot { position:absolute;left:-45px;top:20px;width:18px;height:18px;border-radius:50%;
  background:linear-gradient(135deg,var(--pink),var(--purple));
  border:4px solid var(--bg);box-shadow:0 0 0 2px var(--pink),0 0 12px var(--glow); }
.tl-year { font-family:'Fira Code',monospace;font-size:14px;color:var(--rose);letter-spacing:1px;margin-bottom:6px; }
.tl-card {
  background:var(--card);border:1.5px solid var(--card-border);border-radius:18px;
  padding:22px;box-shadow:0 4px 16px rgba(167,139,250,0.08);
  transition:all 0.3s;
}
.tl-card:hover { border-color:var(--pink);box-shadow:0 8px 32px var(--glow);transform:translateY(-3px) rotate(-0.3deg); }
.tl-title { font-size:20px;font-weight:700;margin-bottom:2px; }
.tl-place { font-size:16px;color:var(--purple);font-weight:600;margin-bottom:6px; }
.tl-desc { font-size:16px;color:var(--muted);line-height:1.5; }

/* ─── Flip cards ─── */
.flip-container {
  perspective:1000px;cursor:pointer;
  opacity:0;transform:translateY(30px);
  transition:opacity 0.5s calc(var(--delay,0s)),transform 0.5s calc(var(--delay,0s));
}
.flip-container.vis { opacity:1;transform:translateY(0); }
.flip-card { position:relative;width:100%;height:240px;transition:transform 0.7s;transform-style:preserve-3d; }
.flip-card.flipped { transform:rotateY(180deg); }
.flip-front,.flip-back {
  position:absolute;inset:0;border-radius:20px;backface-visibility:hidden;
  display:flex;flex-direction:column;justify-content:center;align-items:center;padding:24px;
  border:2px solid var(--card-border);
}
.flip-front {
  background:linear-gradient(145deg,var(--card),var(--bg2));
  border-left:5px solid var(--card-accent,var(--pink));
  box-shadow:0 4px 20px rgba(167,139,250,0.1);
}
.flip-front:hover { box-shadow:0 8px 32px var(--glow); }
.ep-badge { font-family:'Fira Code',monospace;font-size:14px;letter-spacing:3px;
  color:var(--card-accent);text-transform:uppercase;margin-bottom:10px;
  background:rgba(244,114,182,0.08);padding:4px 14px;border-radius:20px; }
.flip-title { font-size:22px;font-weight:700;text-align:center; }
.flip-hint { font-size:16px;color:var(--muted);margin-top:10px;font-family:'Fira Code',monospace; }
.flip-back {
  background:var(--card);transform:rotateY(180deg);align-items:flex-start;
  box-shadow:0 4px 20px rgba(167,139,250,0.12);
}
.flip-desc { font-size:16px;color:var(--muted);line-height:1.5;margin-bottom:12px; }
.flip-techs { display:flex;flex-wrap:wrap;gap:6px; }
.tech-pill { font-family:'Fira Code',monospace;font-size:13px;padding:4px 10px;border-radius:8px;
  background:rgba(167,139,250,0.1);color:var(--purple);border:1px solid rgba(167,139,250,0.2); }
.projects-grid { display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:24px;max-width:800px;width:100%; }

/* ─── Terminal ─── */
.terminal-window {
  width:min(600px,90vw);border-radius:14px;overflow:hidden;
  box-shadow:0 8px 40px rgba(30,27,75,0.25),0 0 0 1px rgba(167,139,250,0.2);
  font-family:'Fira Code',monospace;
}
.terminal-bar {
  background:linear-gradient(135deg,#2e1065,#1e1b4b);padding:10px 14px;
  display:flex;align-items:center;gap:8px;
}
.terminal-dot { width:12px;height:12px;border-radius:50%; }
.terminal-title { font-size:14px;color:#a78bfa;margin-left:8px; }
.terminal-body {
  background:#0f0b1a;padding:16px;max-height:260px;overflow-y:auto;
  scrollbar-width:thin;scrollbar-color:#a78bfa transparent;
}
.terminal-line { font-size:14px;line-height:1.8;color:#e2e0f0; }
.terminal-line.cmd { color:#67e8f9; }
.terminal-line.out { color:#f9a8d4; }
.prompt { color:#a78bfa;font-weight:600; }
.terminal-input-row { display:flex;align-items:center;margin-top:4px; }
.terminal-input {
  background:none;border:none;outline:none;color:#67e8f9;
  font-family:'Fira Code',monospace;font-size:14px;flex:1;
  caret-color:var(--pink);
}
.terminal-input::placeholder { color:#4c3b70; }

/* ─── Publications ─── */
.pub-card { background:var(--card);border:1.5px solid var(--card-border);border-radius:16px;
  padding:22px;box-shadow:0 3px 12px rgba(167,139,250,0.06);transition:all 0.3s; }
.pub-card:hover { border-color:var(--sky);box-shadow:0 6px 24px rgba(103,232,249,0.15);transform:translateY(-3px); }
.pub-title { font-size:19px;font-weight:700;margin-bottom:6px; }
.pub-venue { font-size:15px;color:var(--muted);font-family:'Fira Code',monospace; }

/* ─── Contact ─── */
.contact-btns { display:flex;flex-wrap:wrap;gap:12px;justify-content:center; }
.cbtn { display:inline-flex;align-items:center;gap:8px;padding:13px 26px;border-radius:16px;
  font-family:'Fredoka',sans-serif;font-size:15px;font-weight:600;
  cursor:pointer;border:none;transition:all 0.3s;position:relative;overflow:hidden; }
.cbtn::before { content:'';position:absolute;inset:0;background:linear-gradient(135deg,rgba(255,255,255,0.3),transparent);
  opacity:0;transition:opacity 0.3s; }
.cbtn:hover::before { opacity:1; }
.cbtn-fill { background:linear-gradient(135deg,var(--pink),var(--rose));color:white;
  box-shadow:0 4px 16px var(--glow); }
.cbtn-fill:hover { transform:translateY(-3px) scale(1.03);box-shadow:0 8px 28px var(--glow); }
.cbtn-ghost { background:var(--card);border:2px solid var(--purple);color:var(--purple); }
.cbtn-ghost:hover { background:var(--purple);color:white;transform:translateY(-3px);box-shadow:0 4px 20px rgba(167,139,250,0.25); }

/* ─── Wavy section dividers ─── */
.wave-section { position:relative;z-index:1;width:100%;height:70px;margin:-35px 0; }
.wave-section svg { width:100%;height:100%;display:block; }

/* ─── Easter egg ─── */
.easter-egg {
  position:fixed;inset:0;z-index:10000;
  background:rgba(0,0,0,0.7);backdrop-filter:blur(10px);
  display:flex;align-items:center;justify-content:center;
  animation:fadeIn 0.4s ease-out;
}
.egg-content {
  background:var(--card);border-radius:24px;padding:40px;text-align:center;
  box-shadow:0 20px 60px rgba(0,0,0,0.3);max-width:400px;
  animation:eggBounce 0.5s cubic-bezier(0.34,1.56,0.64,1);
}
@keyframes eggBounce { 0%{transform:scale(0) rotate(-10deg)} 100%{transform:scale(1) rotate(0deg)} }
@keyframes fadeIn { 0%{opacity:0} 100%{opacity:1} }

/* ─── Responsive ─── */
@media(max-width:640px) {
  .story-nav { gap:3px;padding:10px 8px; }
  .nav-btn { width:34px;height:34px;font-size:14px; }
  .nav-connector { width:8px; }
  .scroll-rail { display:none; }
  .projects-grid { grid-template-columns:1fr; }
  .chapter { padding:80px 14px 40px; }
  .flip-card { height:200px; }
}
`;

/* ════════════════════════════════════════════
   WAVE DIVIDER
   ════════════════════════════════════════════ */
function WaveDivider({ flip }) {
  return (
    <div className="wave-section" style={flip ? { transform:"scaleY(-1)" } : {}}>
      <svg viewBox="0 0 1440 70" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 40C180 10 360 65 540 35C720 5 900 60 1080 30C1260 0 1380 50 1440 25V70H0Z" fill="url(#wg)" fillOpacity="0.15"/>
        <path d="M0 50C200 25 400 60 600 40C800 20 1000 55 1200 35C1350 20 1440 45 1440 35V70H0Z" fill="url(#wg)" fillOpacity="0.08"/>
        <defs><linearGradient id="wg" x1="0" y1="0" x2="1440" y2="0" gradientUnits="userSpaceOnUse">
          <stop stopColor="#f472b6"/><stop offset=".5" stopColor="#a78bfa"/><stop offset="1" stopColor="#67e8f9"/>
        </linearGradient></defs>
      </svg>
    </div>
  );
}

/* ════════════════════════════════════════════
   NAV
   ════════════════════════════════════════════ */
const NAV = [
  { id:"hero", icon:"✨" }, { id:"education", icon:"📚" },
  { id:"experience", icon:"🔨" }, { id:"projects", icon:"🧩" },
  { id:"publications", icon:"📝" }, { id:"contact", icon:"🚀" },
];

function Nav({ active, onNav }) {
  return (
    <nav className="story-nav">
      {NAV.map((n, i) => (
        <div key={n.id} style={{ display:"flex",alignItems:"center",gap:6 }}>
          <button className={`nav-btn ${active===n.id?"active":""}`}
            onClick={() => onNav(n.id)} title={n.id}>{n.icon}</button>
          {i < NAV.length-1 && <div className="nav-connector" />}
        </div>
      ))}
    </nav>
  );
}

/* ════════════════════════════════════════════
   MAIN APP
   ════════════════════════════════════════════ */
export default function Portfolio() {
  const [active, setActive] = useState("hero");
  const [progress, setProgress] = useState(0);
  const konami = useKonami();
  const [eggDismissed, setEggDismissed] = useState(false);

  const handleNav = useCallback((id) => {
    document.getElementById(id)?.scrollIntoView({ behavior:"smooth" });
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(h > 0 ? (y / h) * 100 : 0);
      for (let i = NAV.length - 1; i >= 0; i--) {
        const el = document.getElementById(NAV[i].id);
        if (el && el.getBoundingClientRect().top <= 200) { setActive(NAV[i].id); break; }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <style>{css}</style>
      <CodeRainCanvas />
      <CursorSparkles />
      <ClickBurst />
      <div className="progress-bar" style={{ width: progress + "%" }} />
      <Nav active={active} onNav={handleNav} />

      {/* Scroll progress rail */}
      <div className="scroll-rail">
        <div className="scroll-track" />
        <ScrollProgressChar progress={progress} />
      </div>

      {/* ── HERO ── */}
      <section className="chapter hero" id="hero">
        <ComicPanel delay={0}><DeskScene /></ComicPanel>
        <ComicPanel delay={0.2}>
          <h1 className="hero-name">{PROFILE.name}</h1>
        </ComicPanel>
        <ComicPanel delay={0.35}>
          <p className="hero-tagline">{PROFILE.tagline}</p>
        </ComicPanel>
        <ComicPanel delay={0.5}>
          <Bubble>
            <div className="who">💬 {PROFILE.name} says:</div>
            {PROFILE.bio}
          </Bubble>
        </ComicPanel>
        <ComicPanel delay={0.65}>
          <InteractiveTerminal />
        </ComicPanel>
      </section>

      <WaveDivider />

      {/* ── EDUCATION ── */}
      <section className="chapter" id="education">
        <span className="chapter-label">Chapter 01</span>
        <h2 className="chapter-heading">Curiosity</h2>
        <div className="timeline">
          {EDUCATION.map((e, i) => (
            <ComicPanel key={i} className="tl-item" delay={i * 0.15} tilt={i % 2 === 0 ? -0.5 : 0.5}>
              <div className="tl-dot" />
              <div className="tl-year">{e.year}</div>
              <div className="tl-card">
                <div className="tl-title">{e.title}</div>
                <div className="tl-place">{e.place}</div>
                <div className="tl-desc">{e.desc}</div>
                <div className="thought-bubble">💭 {e.thought}</div>
              </div>
            </ComicPanel>
          ))}
        </div>
      </section>

      <WaveDivider flip />

      {/* ── EXPERIENCE ── */}
      <section className="chapter" id="experience">
        <span className="chapter-label">Chapter 02</span>
        <h2 className="chapter-heading">Building</h2>
        <div className="timeline">
          {EXPERIENCE.map((e, i) => (
            <ComicPanel key={i} className="tl-item" delay={i * 0.15} tilt={i % 2 === 0 ? 0.5 : -0.5}>
              <div className="tl-dot" />
              <div className="tl-year">{e.year}</div>
              <div className="tl-card">
                <div className="tl-title">{e.title}</div>
                <div className="tl-place">{e.place}</div>
                <div className="tl-desc">{e.desc}</div>
                <div className="thought-bubble">💭 {e.thought}</div>
              </div>
            </ComicPanel>
          ))}
        </div>
      </section>

      <WaveDivider />

      {/* ── PROJECTS ── */}
      <section className="chapter" id="projects">
        <span className="chapter-label">Chapter 03</span>
        <h2 className="chapter-heading">Breaking & Fixing</h2>
        <Bubble color="var(--purple)" direction="right">
          <div className="who">💬 Narrator:</div>
          Every project is an episode in her saga. Hover the cards to flip them!
        </Bubble>
        <div style={{ height: 28 }} />
        <div className="projects-grid">
          {PROJECTS.map((p, i) => <ProjectCard key={i} project={p} delay={i * 0.1} />)}
        </div>
      </section>

      <WaveDivider flip />

      {/* ── PUBLICATIONS ── */}
      <section className="chapter" id="publications">
        <span className="chapter-label">Chapter 04</span>
        <h2 className="chapter-heading">Sharing Knowledge</h2>
        <div style={{ display:"flex",flexDirection:"column",gap:24,maxWidth:700,width:"100%" }}>
          {PUBLICATIONS.map((p, i) => (
            <ComicPanel key={i} delay={i * 0.12}>
              <div className="pub-card">
                <div className="pub-title">{p.title}</div>
                <div className="pub-venue">{p.venue}</div>
                <div className="thought-bubble" style={{ marginTop: 10 }}>💭 {p.thought}</div>
              </div>
            </ComicPanel>
          ))}
        </div>
      </section>

      <WaveDivider />

      {/* ── CONTACT ── */}
      <section className="chapter" id="contact">
        <span className="chapter-label">Epilogue</span>
        <h2 className="chapter-heading">What's Next?</h2>
        <ComicPanel>
          <Bubble>
            <div className="who">💬 {PROFILE.name} says:</div>
            Every great story has the next chapter waiting to be written.
            Let's connect, collaborate, and create something amazing. ✨
          </Bubble>
        </ComicPanel>
        <div style={{ height: 24 }} />
        <ComicPanel delay={0.2}>
          <div className="contact-btns">
            <button className="cbtn cbtn-fill" onClick={() => window.open("mailto:suguna.3029@gmail.com")}>📧 Email Me</button>
            <button className="cbtn cbtn-ghost" onClick={() => window.open("https://www.linkedin.com/in/suguna-shekar-29100a194/")}>💼 LinkedIn</button>
            <button className="cbtn cbtn-ghost" onClick={() => window.open("https://github.com/sugunaaa")}>🐙 GitHub</button>
            <button className="cbtn cbtn-ghost" onClick={() => window.open("https://ieeexplore.ieee.org/document/10170429")}>📄 IEEE Paper</button>
          </div>
        </ComicPanel>
        <ComicPanel delay={0.35}>
          <div style={{ fontFamily:"'Fira Code',monospace",fontSize:15,color:"var(--muted)",marginTop:20,textAlign:"center" }}>
            <span style={{ color:"var(--pink)" }}>const</span> nextChapter = <span style={{ color:"#059669" }}>"yours + mine"</span>;
            <br/><span style={{ color:"var(--muted)",fontSize:13 }}>// psst… try the konami code ↑↑↓↓←→←→BA</span>
          </div>
        </ComicPanel>
      </section>

      <footer style={{ textAlign:"center",padding:"40px 20px",fontFamily:"'Fira Code',monospace",
        fontSize:14,color:"var(--muted)",position:"relative",zIndex:1 }}>
        crafted with 💖 and way too much CSS · {new Date().getFullYear()} · {PROFILE.name}
      </footer>

      {/* ── Konami Easter Egg ── */}
      {konami && !eggDismissed && (
        <div className="easter-egg" onClick={() => setEggDismissed(true)}>
          <div className="egg-content">
            <div style={{ fontSize: 48, marginBottom: 12 }}>🎉</div>
            <h3 style={{ fontSize: 24, marginBottom: 8 }}>Achievement Unlocked!</h3>
            <p style={{ color: "var(--muted)", fontSize: 14, marginBottom: 16 }}>
              You found the secret! You're clearly someone who explores every corner. I like that in a collaborator.
            </p>
            <p style={{ fontFamily: "'Caveat',cursive", fontSize: 20, color: "var(--pink)" }}>
              Let's build something legendary together 🚀
            </p>
            <p style={{ fontSize: 12, color: "var(--muted)", marginTop: 16 }}>click anywhere to dismiss</p>
          </div>
        </div>
      )}
    </>
  );
}
