"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

// ─── Photo slot data ──────────────────────────────────────────────────────────
// src = Unsplash direct URL. Swap any src for a real CSST photo when ready.
// aspect controls the grid cell height ratio.

interface PhotoSlot {
  id: string;
  label: string;
  aspect: "square" | "portrait" | "wide";
  src: string;
  alt: string;
}

const U = (id: string, w: number, h: number) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&h=${h}&fit=crop&auto=format&q=75`;

const photoSlots: PhotoSlot[] = [
  {
    id: "s1",
    label: "Cyber Lab Session",
    aspect: "portrait",
    src: U("1550751827-4bd374c3f58b", 600, 750),
    alt: "Student in a cybersecurity lab",
  },
  {
    id: "s2",
    label: "Team Collaboration",
    aspect: "square",
    src: U("1522202176988-66273c2fd55f", 600, 600),
    alt: "Students collaborating on laptops",
  },
  {
    id: "s3",
    label: "Space & Engineering",
    aspect: "square",
    src: U("1446776653964-20c1d3a81b06", 600, 600),
    alt: "Space and aerospace exploration",
  },
  {
    id: "s4",
    label: "Pitch Day",
    aspect: "portrait",
    src: U("1475721027785-f74eccf877e2", 600, 750),
    alt: "Student presenting at pitch day",
  },
  {
    id: "s5",
    label: "Coding & Development",
    aspect: "wide",
    src: U("1498050108023-c5249f4df085", 900, 560),
    alt: "Code on a laptop screen",
  },
  {
    id: "s6",
    label: "Project Brainstorm",
    aspect: "square",
    src: U("1517245386807-bb43f82c33c4", 600, 600),
    alt: "Students brainstorming a project",
  },
  {
    id: "s7",
    label: "Modern Learning Space",
    aspect: "square",
    src: U("1497366216548-37526070297c", 600, 600),
    alt: "Modern collaborative workspace",
  },
  {
    id: "s8",
    label: "Group Problem Solving",
    aspect: "portrait",
    src: U("1522071820081-009f0129c71c", 600, 750),
    alt: "Team working around a table",
  },
  {
    id: "s9",
    label: "Independent Focus",
    aspect: "square",
    src: U("1434030216411-0b5bdcc1c030", 600, 600),
    alt: "Student focused on work at a laptop",
  },
  {
    id: "s10",
    label: "Entrepreneur Workshop",
    aspect: "wide",
    src: U("1587614382346-4ec70e388b28", 900, 560),
    alt: "Students in an entrepreneurship workshop",
  },
];

// ─── Single photo card ────────────────────────────────────────────────────────
function PhotoCard({ slot, index }: { slot: PhotoSlot; index: number }) {
  const paddingMap = { square: "100%", portrait: "125%", wide: "62%" };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.55, delay: index * 0.055 }}
      className="relative rounded-xl overflow-hidden border group"
      style={{ borderColor: "var(--border-subtle)" }}
    >
      <div className="relative w-full" style={{ paddingBottom: paddingMap[slot.aspect] }}>
        <Image
          src={slot.src}
          alt={slot.alt}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          unoptimized
        />
        {/* Gradient overlay — label at bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
          <p className="text-[10px] font-semibold text-white/90 tracking-wide">{slot.label}</p>
          <p className="text-[9px] text-white/50 mt-0.5">CSST Placeholder · Replace with real photo</p>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────
export default function StudentLifeSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="relative py-24 overflow-hidden" style={{ background: "var(--bg-primary)" }}>
      <div className="absolute inset-0 grid-bg opacity-15" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="max-w-2xl mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 mb-5 text-xs font-medium tracking-[0.25em] uppercase"
            style={{ color: "var(--accent)" }}
          >
            <span className="w-8 h-px" style={{ background: "var(--accent)" }} />
            Student Life
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display text-4xl md:text-5xl font-black leading-tight tracking-tight mb-4"
            style={{ color: "var(--text-primary)" }}
          >
            Life at CSST
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-base leading-relaxed"
            style={{ color: "var(--text-muted)" }}
          >
            Inside the Catalyst Campus ecosystem, students work alongside real professionals every day.
            Real CSST photos coming soon — these are placeholders.
          </motion.p>
        </div>

        {/* Masonry-style grid — 4 columns, mixed row heights */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
          {photoSlots.map((slot, i) => (
            <PhotoCard key={slot.id} slot={slot} index={i} />
          ))}
        </div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-8 text-center text-xs"
          style={{ color: "var(--text-muted)", opacity: 0.4 }}
        >
          Have real CSST photos to share? Email{" "}
          <a
            href="mailto:DARIN.SMITH@d11.org"
            className="hover:underline transition-colors"
            style={{ color: "var(--accent)", opacity: 1 }}
          >
            DARIN.SMITH@d11.org
          </a>
        </motion.p>
      </div>
    </section>
  );
}
