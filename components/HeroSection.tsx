"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ArrowDown, GraduationCap, DollarSign, Users } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

// ─── Particle network canvas ──────────────────────────────────────────────────
function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const particles: { x: number; y: number; vx: number; vy: number; size: number; opacity: number; pulse: number }[] = [];

    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener("resize", resize);

    for (let i = 0; i < 70; i++) {
      particles.push({
        x: Math.random() * canvas.width, y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3, vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 1.5 + 0.5, opacity: Math.random() * 0.45 + 0.1,
        pulse: Math.random() * Math.PI * 2,
      });
    }

    const getAccentRgb = () =>
      getComputedStyle(document.documentElement).getPropertyValue("--accent-rgb").trim() || "0, 212, 255";

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const accentRgb = getAccentRgb();
      particles.forEach((p) => {
        p.x += p.vx; p.y += p.vy; p.pulse += 0.015;
        const alpha = p.opacity * (0.6 + 0.4 * Math.sin(p.pulse));
        if (p.x < 0) p.x = canvas.width; if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height; if (p.y > canvas.height) p.y = 0;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${accentRgb}, ${alpha})`; ctx.fill();
      });
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x, dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath(); ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(${accentRgb}, ${0.07 * (1 - dist / 120)})`; ctx.lineWidth = 0.5; ctx.stroke();
          }
        }
      }
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize); };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.55 }} />;
}

// ─── Cycling hero photos ───────────────────────────────────────────────────────
const heroPhotos = [
  { src: "/hero/school-8.jpg",    alt: "CSST students at work" },
  { src: "/hero/exterior.jpg",    alt: "CSST at Catalyst Campus" },
  { src: "/hero/ecosystem.jpg",   alt: "CSST ecosystem partners" },
  { src: "/hero/image-asset.jpg", alt: "CSST campus life" },
];

function PhotoFrame() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setCurrent((c) => (c + 1) % heroPhotos.length), 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="relative w-full h-full">
      {/* Outer frame — bracket corners */}
      <div className="absolute -inset-[1px] rounded-2xl z-10 pointer-events-none" style={{ border: "1px solid var(--border-strong)" }}>
        <span className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 rounded-tl-xl" style={{ borderColor: "var(--accent)" }} />
        <span className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 rounded-tr-xl" style={{ borderColor: "var(--accent)" }} />
        <span className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 rounded-bl-xl" style={{ borderColor: "var(--accent)" }} />
        <span className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 rounded-br-xl" style={{ borderColor: "var(--accent)" }} />
      </div>
      {/* Glow */}
      <div className="absolute -inset-4 rounded-3xl blur-2xl pointer-events-none" style={{ background: `rgba(var(--accent-rgb), 0.06)` }} />

      {/* Photo crossfade */}
      <div className="relative w-full h-full rounded-2xl overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div key={current} className="absolute inset-0"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}>
            <Image src={heroPhotos[current].src} alt={heroPhotos[current].alt} fill
              className="object-cover" priority={current === 0} unoptimized />
            <div className="absolute inset-0 bg-gradient-to-r from-bg-primary/60 via-transparent to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-bg-primary/50 via-transparent to-transparent" />
          </motion.div>
        </AnimatePresence>

        {/* Photo counter dots */}
        <div className="absolute bottom-4 right-4 flex gap-1.5 z-10">
          {heroPhotos.map((_, i) => (
            <button key={i} onClick={() => setCurrent(i)}
              className="transition-all duration-300 rounded-full"
              style={{
                width: i === current ? 16 : 6, height: 6,
                background: i === current ? "var(--accent)" : `rgba(var(--accent-rgb), 0.3)`,
              }}
            />
          ))}
        </div>

      </div>
    </div>
  );
}

// ─── Trust badges ─────────────────────────────────────────────────────────────
const trustBadges = [
  { icon: GraduationCap, label: "Grades 9–12" },
  { icon: DollarSign,    label: "100% Tuition Free" },
  { icon: Users,         label: "D11 Public School" },
];

// ─── Section ──────────────────────────────────────────────────────────────────
export default function HeroSection() {
  return (
    <section className="relative min-h-[92vh] flex flex-col justify-center overflow-hidden bg-bg-primary">
      {/* Background layers */}
      <div className="absolute inset-0 grid-bg opacity-50" />
      <div className="absolute inset-0 scanline" />
      <ParticleCanvas />

      {/* Ambient glows */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[120px] pointer-events-none" style={{ background: `rgba(var(--accent-rgb), 0.05)` }} />
      <div className="absolute top-1/3 right-1/4 w-[300px] h-[300px] rounded-full blur-[100px] pointer-events-none" style={{ background: `rgba(var(--accent-rgb), 0.04)` }} />

      {/* Corner accents */}
      <div className="absolute top-24 left-8 w-16 h-16 border-l-2 border-t-2 pointer-events-none" style={{ borderColor: "var(--border-accent)" }} />
      <div className="absolute bottom-24 right-8 w-16 h-16 border-r-2 border-b-2 pointer-events-none" style={{ borderColor: "var(--border-accent)" }} />

      {/* ── SPLIT LAYOUT ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* LEFT — text content */}
          <div>
            {/* Trust badges */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
              className="flex flex-wrap items-center gap-2 mb-8">
              <div
                className="flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-semibold tracking-wide"
                style={{ borderColor: "rgba(52,211,153,0.30)", background: "rgba(52,211,153,0.08)", color: "#34D399" }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#34D399] animate-pulse" />
                Now Enrolling — 2026–2027
              </div>
              {trustBadges.map(({ icon: Icon, label }) => (
                <div key={label}
                  className="flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-semibold tracking-wide"
                  style={{ borderColor: "var(--border-accent)", background: `rgba(var(--accent-rgb), 0.06)`, color: "var(--accent)" }}
                >
                  <Icon className="w-3 h-3" />{label}
                </div>
              ))}
            </motion.div>

            {/* Headline */}
            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.15 }}
              className="font-display font-black text-5xl md:text-6xl xl:text-7xl leading-[0.95] tracking-tight mb-6">
              <span className="block text-text-primary">VENTURE INTO</span>
              <span className="block" style={{ color: "var(--accent)", textShadow: `0 0 40px rgba(var(--accent-rgb), 0.4)` }}>
                WHAT&apos;S POSSIBLE.
              </span>
            </motion.h1>

            {/* Sub-headline */}
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }}
              className="text-lg text-text-muted/80 leading-relaxed mb-4 max-w-xl">
              Colorado Springs School of Technology is a{" "}
              <span className="text-text-primary font-semibold">free, public high school</span> for grades 9–12.
              Space. Cybersecurity. Entrepreneurship. Ethics. Hands-on learning backed by industry,
              government, and higher education — connecting students to the careers that shape the future.
            </motion.p>

            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.45 }}
              className="text-xs text-text-muted/40 mb-8 tracking-wide">
              3650 N. Nevada Ave · Co-located with the National Cybersecurity Center · D11
            </motion.p>

            {/* CTAs */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.55 }}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-8">
              <Link href="/apply"
                className="group flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-bold tracking-wide transition-all duration-200"
                style={{
                  background: "var(--accent)",
                  color: "var(--bg-primary)",
                  boxShadow: `0 0 30px rgba(var(--accent-rgb), 0.4)`,
                }}
              >
                Apply — It&apos;s Free
                <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <a href="#programs"
                className="group flex items-center gap-2 px-7 py-3.5 rounded-xl border text-sm font-semibold transition-all duration-200"
                style={{
                  borderColor: "var(--border-strong)",
                  color: "var(--accent)",
                }}
              >
                Explore Programs
                <ChevronRight className="w-4 h-4 opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
              </a>
            </motion.div>

            {/* Inquiry contact */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.75 }}
              className="inline-flex items-center gap-3 px-4 py-2 rounded-full border text-xs font-medium"
              style={{ borderColor: "var(--border-accent)", background: "var(--bg-elevated)", color: "var(--text-muted)" }}
            >
              <span className="w-1.5 h-1.5 rounded-full animate-pulse flex-shrink-0" style={{ background: "var(--accent)" }} />
              Questions?&nbsp;
              <a href="tel:7193284600" className="hover:text-accent transition-colors" style={{ color: "var(--accent)" }}>719-328-4600</a>
              <span style={{ color: "var(--text-muted)", opacity: 0.4 }}>·</span>
              <a href="mailto:DARIN.SMITH@d11.org" className="hover:text-accent transition-colors" style={{ color: "var(--accent)" }}>DARIN.SMITH@d11.org</a>
            </motion.div>
          </div>

          {/* RIGHT — photo frame */}
          <motion.div initial={{ opacity: 0, x: 40, scale: 0.95 }} animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
            className="hidden lg:block relative" style={{ height: 520 }}>
            <PhotoFrame />

            {/* Floating stat cards */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2 }}
              className="absolute -left-8 bottom-16 z-20 px-4 py-3 rounded-xl border backdrop-blur-md shadow-xl"
              style={{ background: "var(--bg-card)", borderColor: "var(--border-accent)" }}
            >
              <div className="text-xl font-display font-black" style={{ color: "var(--accent)" }}>9+</div>
              <div className="text-[10px] font-medium" style={{ color: "var(--text-muted)" }}>Ecosystem Partners</div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.4 }}
              className="absolute -right-4 top-12 z-20 px-4 py-3 rounded-xl border backdrop-blur-md shadow-xl"
              style={{ background: "var(--bg-card)", borderColor: "rgba(52,211,153,0.25)" }}
            >
              <div className="text-xl font-display font-black text-[#34D399]">400+</div>
              <div className="text-[10px] font-medium" style={{ color: "var(--text-muted)" }}>Students at Full Build-Out</div>
            </motion.div>
          </motion.div>

        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ color: `rgba(var(--accent-rgb), 0.4)` }}
      >
        <span className="text-[9px] tracking-[0.35em] uppercase font-medium">Explore</span>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}>
          <ArrowDown className="w-4 h-4" />
        </motion.div>
      </motion.div>
    </section>
  );
}
