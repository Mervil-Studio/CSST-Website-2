"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ExternalLink, Mail, X } from "lucide-react";
import Image from "next/image";
import leadershipData from "@/content/leadership.json";
import facultyData from "@/content/faculty.json";

const BASE = "/people";

interface Person {
  name: string;
  title: string;
  bio: string;
  photo: string;
  color: string;
  initials: string;
  email?: string | null;
  linkedin?: string | null;
  org?: string | null;
}

// ─── DEFAULT DATA (used as fallback if props not supplied) ────────────────────

const defaultLeadership = leadershipData.members as Person[];
const defaultFaculty = facultyData.members as Person[];

const defaultBoard: Person[] = [
  {
    name: "Vance Brown",
    title: "Founder & Board President",
    org: "Founder of CSST",
    bio: "Vance is one of Colorado Springs' most influential figures at the intersection of technology, entrepreneurship, and education. He previously served as CEO of the National Cybersecurity Center and Director of Exponential Impact (XI) before founding CSST — building a school designed to feed directly into the ecosystems he helped create.",
    photo: `${BASE}/vance.jpg`,
    color: "#00D4FF",
    initials: "VB",
    linkedin: "https://www.linkedin.com/in/vance-brown/",
  },
  {
    name: "Michael Gaal",
    title: "Board Member",
    org: "Superintendent, D11",
    bio: "Michael Gaal is one of the most consequential public education reformers in Colorado. As D11 Superintendent since 2022, he inherited a district where over 33% of schools were on the state watchlist — and has driven that number to under 10%. But his most audacious move was CSST. In April 2024, Gaal personally presented the Colorado Springs School of Technology to the Colorado State Board of Education as the centerpiece of D11's Academic Master Plan. The board approved it unanimously. Under his leadership, D11 is proving that public schools can be both rigorous and radically different — and that a city like Colorado Springs can build the talent pipeline its most important industries need, starting in high school.",
    photo: `${BASE}/michael.jpg`,
    color: "#00D4FF",
    initials: "MG",
    linkedin: null,
  },
  {
    name: "Greg Oslan",
    title: "Board Member",
    org: "CEO, National Cybersecurity Center",
    bio: "Greg leads the NCC, the anchor co-location partner for CSST. Under his leadership the NCC secured a $1M NSF Innovation Engines grant and has expanded its national footprint. His board role creates a direct, structural bridge between CSST students and active cybersecurity professionals.",
    photo: `${BASE}/greg.jpg`,
    color: "#00D4FF",
    initials: "GO",
    linkedin: "https://www.linkedin.com/in/greg-oslan-245123/",
  },
  {
    name: "Erin Miller",
    title: "Board Member",
    org: "Executive Director, Space ISAC",
    bio: "Erin leads Space ISAC, the global information sharing and analysis center for space-based threat intelligence. Her presence on the CSST board connects students directly to the aerospace defense sector and opens a pipeline into space security careers.",
    photo: `${BASE}/erin.jpg`,
    color: "#34D399",
    initials: "EM",
    linkedin: "https://www.linkedin.com/in/erinmarlenemiller/",
  },
  {
    name: "Lance Bolton",
    title: "Board Member",
    org: "President, Pikes Peak State College",
    bio: "As President of Pikes Peak State College, Lance's partnership enables CSST students to access dual enrollment across PPSC's catalog of over 200 credit programs — at no cost to students. His involvement makes college credit a default part of the CSST experience, not an exception.",
    photo: `${BASE}/lance.jpg`,
    color: "#A78BFA",
    initials: "LB",
    linkedin: "https://www.linkedin.com/in/lance-bolton-b4619842/",
  },
  {
    name: "Johnna Reeder Kleymeyer",
    title: "Board Member",
    org: "CEO, Colorado Springs Chamber & EDC",
    bio: "Johnna leads the Colorado Springs Chamber & EDC, the region's primary economic development organization. Her board role ensures CSST is directly connected to the hiring priorities of the Colorado Springs business community and the talent pipeline that shapes the regional economy.",
    photo: `${BASE}/johnna.jpg`,
    color: "#F59E0B",
    initials: "JK",
    linkedin: "https://www.linkedin.com/in/johnna-reeder-kleymeyer-7056984/",
  },
  {
    name: "Dawn Conley",
    title: "Board Member",
    org: "Sr. Executive Director, Catalyst Campus",
    bio: "Dawn oversees Catalyst Campus — the innovation hub where CSST is physically located. Her deep knowledge of the campus ecosystem, its tenants, and its mission makes her essential to CSST's co-location strategy and the daily lived experience of being surrounded by active startups and tech companies.",
    photo: `${BASE}/dawn.jpg`,
    color: "#FB923C",
    initials: "DC",
    linkedin: "https://www.linkedin.com/in/dawnconley/",
  },
  {
    name: "Col. Judson Dressler (Ret.)",
    title: "Board Member",
    org: "Dept. Head, Comp. & Cyber Sciences, USAFA",
    bio: "Judson heads the Department of Computer and Cyber Sciences at the US Air Force Academy, bringing federal military perspective to CSST's cybersecurity and aerospace programs. His board role bridges the school to USAFA partnerships and provides insight into the defense-sector talent pipeline.",
    photo: `${BASE}/judson.jpg`,
    color: "#C0C0D0",
    initials: "JD",
    linkedin: "https://www.linkedin.com/in/judson-dressler-phd-27245993/",
  },
  {
    name: "Jennifer Sobanet",
    title: "Board Member",
    org: "Education & Innovation Leader",
    bio: "Jennifer brings a depth of experience in education leadership, higher education, and workforce innovation. Her perspective ensures CSST's programs remain aligned with where education is headed — not just where it has been.",
    photo: `${BASE}/jennifer.jpg`,
    color: "#C0C0D0",
    initials: "JS",
    linkedin: null,
  },
];

// ─── MODAL ─────────────────────────────────────────────────────────────────────
function PersonModal({ person, onClose }: { person: Person; onClose: () => void }) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[100] flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="absolute inset-0 bg-black/70 backdrop-blur-sm cursor-pointer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={onClose}
        />
        <motion.div
          className="relative z-10 w-full max-w-md rounded-2xl border overflow-hidden"
          style={{ background: "var(--bg-card)", borderColor: `${person.color}25` }}
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ type: "spring", stiffness: 380, damping: 30 }}
        >
          <div className="h-1 w-full" style={{ background: `linear-gradient(90deg, transparent, ${person.color}, transparent)` }} />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 w-8 h-8 rounded-lg border flex items-center justify-center transition-all"
            style={{ borderColor: `${person.color}20`, color: "var(--text-muted)" }}
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex items-end gap-5 px-7 pt-7 pb-5 border-b" style={{ borderColor: `${person.color}12` }}>
            <div
              className="relative rounded-xl overflow-hidden flex-shrink-0 border-2"
              style={{ width: 96, height: 96, borderColor: `${person.color}30` }}
            >
              <Image src={person.photo} alt={person.name} width={96} height={96}
                className="w-full h-full object-cover object-top" unoptimized />
            </div>
            <div className="pb-1">
              <h3 className="font-display text-lg font-bold leading-tight" style={{ color: "var(--text-primary)" }}>{person.name}</h3>
              <p className="text-xs font-semibold mt-1" style={{ color: person.color }}>{person.title}</p>
              {person.org && (
                <p className="text-[11px] mt-0.5" style={{ color: "var(--text-muted)", opacity: 0.6 }}>{person.org}</p>
              )}
              {person.email && (
                <a href={`mailto:${person.email}`}
                  className="inline-flex items-center gap-1 text-[10px] mt-1 transition-colors"
                  style={{ color: "var(--text-muted)", opacity: 0.6 }}
                >
                  <Mail className="w-3 h-3" /> {person.email}
                </a>
              )}
            </div>
          </div>

          <div className="px-7 py-5">
            <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>{person.bio}</p>
          </div>

          {person.linkedin && (
            <div className="px-7 pb-6">
              <a
                href={person.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold border transition-all hover:opacity-90"
                style={{ background: `${person.color}18`, borderColor: `${person.color}30`, color: person.color }}
              >
                <ExternalLink className="w-3.5 h-3.5" />
                View LinkedIn Profile
              </a>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// ─── SQUARE PHOTO CARD (Leadership / Faculty) ─────────────────────────────────
function SquarePhotoCard({ person, onClick }: { person: Person; onClick: () => void }) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 400, damping: 22 }}
      className="group relative rounded-xl overflow-hidden border text-left w-full cursor-pointer focus:outline-none transition-all duration-300"
      style={{ background: "var(--bg-primary)", borderColor: `${person.color}15` }}
      onMouseEnter={(e) => (e.currentTarget.style.borderColor = `${person.color}35`)}
      onMouseLeave={(e) => (e.currentTarget.style.borderColor = `${person.color}15`)}
    >
      {/* 1:1 square photo */}
      <div className="relative w-full" style={{ paddingBottom: "100%" }}>
        <Image
          src={person.photo} alt={person.name} fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
          className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-transparent to-transparent opacity-60" />
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center"
          style={{ background: `${person.color}12` }}>
          <div className="w-9 h-9 rounded-full border flex items-center justify-center"
            style={{ background: "var(--bg-primary)", borderColor: `${person.color}60`, opacity: 0.9 }}>
            <ExternalLink className="w-4 h-4" style={{ color: person.color }} />
          </div>
        </div>
        {person.linkedin && (
          <div className="absolute top-2 right-2 w-6 h-6 rounded-full flex items-center justify-center"
            style={{ background: "var(--bg-primary)", border: `1px solid ${person.color}40` }}>
            <ExternalLink className="w-3 h-3" style={{ color: person.color }} />
          </div>
        )}
      </div>
      <div className="px-3 py-3">
        <p className="text-xs font-semibold leading-tight" style={{ color: "var(--text-primary)" }}>{person.name}</p>
        <p className="text-[10px] mt-0.5" style={{ color: `${person.color}80` }}>{person.title}</p>
      </div>
    </motion.button>
  );
}

// ─── PORTRAIT CARD (Board — 3:4 ratio, slightly smaller) ─────────────────────
function PortraitCard({ person, onClick }: { person: Person; onClick: () => void }) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ y: -3 }}
      transition={{ type: "spring", stiffness: 400, damping: 22 }}
      className="group relative rounded-xl overflow-hidden border text-left w-full cursor-pointer focus:outline-none transition-all duration-300"
      style={{ background: "var(--bg-primary)", borderColor: `${person.color}15` }}
      onMouseEnter={(e) => (e.currentTarget.style.borderColor = `${person.color}30`)}
      onMouseLeave={(e) => (e.currentTarget.style.borderColor = `${person.color}15`)}
    >
      {/* 3:4 portrait ratio */}
      <div className="relative w-full" style={{ paddingBottom: "133%" }}>
        <Image
          src={person.photo} alt={person.name} fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 16vw"
          className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-bg-primary/10 to-transparent" />
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center"
          style={{ background: `${person.color}10` }}>
          <div className="w-8 h-8 rounded-full border flex items-center justify-center"
            style={{ background: "var(--bg-primary)", borderColor: `${person.color}50`, opacity: 0.9 }}>
            <ExternalLink className="w-3.5 h-3.5" style={{ color: person.color }} />
          </div>
        </div>
        {person.linkedin && (
          <div className="absolute top-2 right-2 w-5 h-5 rounded-full flex items-center justify-center"
            style={{ background: "var(--bg-primary)", border: `1px solid ${person.color}40` }}>
            <ExternalLink className="w-2.5 h-2.5" style={{ color: person.color }} />
          </div>
        )}
      </div>
      <div className="px-3 pt-2.5 pb-3">
        <p className="text-[11px] font-semibold leading-tight" style={{ color: "var(--text-primary)" }}>{person.name}</p>
        {person.org && (
          <p className="text-[10px] mt-0.5 leading-snug" style={{ color: "var(--text-muted)", opacity: 0.6 }}>{person.org}</p>
        )}
      </div>
    </motion.button>
  );
}

// ─── SECTION ──────────────────────────────────────────────────────────────────
interface TeamSectionProps {
  leadership?: Person[];
  faculty?: Person[];
  board?: Person[];
}

export default function TeamSection({ leadership = defaultLeadership, faculty = defaultFaculty, board = defaultBoard }: TeamSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [modalPerson, setModalPerson] = useState<Person | null>(null);

  return (
    <section id="team" ref={ref} className="relative py-28 overflow-hidden" style={{ background: "var(--bg-secondary)" }}>
      <div className="absolute inset-0 grid-bg opacity-20" />
      {modalPerson && <PersonModal person={modalPerson} onClose={() => setModalPerson(null)} />}

      <div className="max-w-7xl mx-auto px-6">

        {/* ── LEADERSHIP + ADMIN ─────────────────────────────────────────── */}
        <div className="mb-20">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 mb-6 text-xs font-medium tracking-[0.25em] uppercase" style={{ color: "var(--accent)" }}>
            <span className="w-8 h-px" style={{ background: "var(--accent)" }} />The People Behind It
          </motion.div>
          <motion.h2 initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display text-4xl md:text-5xl font-black leading-tight tracking-tight mb-3" style={{ color: "var(--text-primary)" }}>
            Leadership &amp; Team
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.2 }}
            className="text-base max-w-2xl mb-2" style={{ color: "var(--text-muted)" }}>
            At CSST, teachers are mentors and coaches — not lecturers. Our staff guide curiosity, not dictate a path.
          </motion.p>
          <motion.p initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.35 }}
            className="text-xs mb-10" style={{ color: "var(--text-muted)", opacity: 0.5 }}>Tap any card to learn more.</motion.p>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {leadership.map((person, i) => (
              <motion.div key={person.name}
                initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.3 + i * 0.08 }}>
                <SquarePhotoCard person={person} onClick={() => setModalPerson(person)} />
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── FACULTY ───────────────────────────────────────────────────── */}
        <div className="mb-20">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 mb-6 text-xs font-medium tracking-[0.25em] uppercase" style={{ color: "var(--accent)" }}>
            <span className="w-8 h-px" style={{ background: "var(--accent)" }} />In The Classroom
          </motion.div>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display text-4xl md:text-5xl font-black leading-tight tracking-tight mb-3" style={{ color: "var(--text-primary)" }}>
            Faculty
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.2 }}
            className="text-base max-w-2xl mb-2" style={{ color: "var(--text-muted)" }}>
            Industry professionals and educators who bring real-world context into every subject.
          </motion.p>
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.35 }}
            className="text-xs mb-10" style={{ color: "var(--text-muted)", opacity: 0.5 }}>Tap any card to learn more. LinkedIn badge = verified profile.</motion.p>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {faculty.map((f, i) => (
              <motion.div key={f.name}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-40px" }} transition={{ delay: i * 0.08 }}>
                <SquarePhotoCard person={f} onClick={() => setModalPerson(f)} />
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── BOARD ─────────────────────────────────────────────────────── */}
        <div>
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 mb-6 text-xs font-medium tracking-[0.25em] uppercase" style={{ color: "var(--accent)" }}>
            <span className="w-8 h-px" style={{ background: "var(--accent)" }} />Governance
          </motion.div>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display text-4xl md:text-5xl font-black leading-tight tracking-tight mb-3" style={{ color: "var(--text-primary)" }}>
            Board of Directors
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.2 }}
            className="text-base max-w-2xl mb-2" style={{ color: "var(--text-muted)" }}>
            Governed by the CEOs and leaders of its own ecosystem — the same organizations students work alongside every day.
          </motion.p>
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.35 }}
            className="text-xs mb-10" style={{ color: "var(--text-muted)", opacity: 0.5 }}>Tap any card for background and LinkedIn.</motion.p>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {board.map((member, i) => (
              <motion.div key={member.name}
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-40px" }} transition={{ duration: 0.55, delay: i * 0.07 }}>
                <PortraitCard person={member} onClick={() => setModalPerson(member)} />
              </motion.div>
            ))}
          </div>

          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.6 }}
            className="mt-8 p-4 rounded-xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
            style={{ background: "var(--bg-card)", borderColor: "var(--border-subtle)" }}
          >
            <p className="text-xs" style={{ color: "var(--text-muted)", opacity: 0.6 }}>
              Board meetings are virtual &amp; open to the public. Next meeting:{" "}
              <span style={{ color: "var(--accent)", opacity: 1 }}>May 6, 2026 at 1:00 PM</span>
            </p>
            <a href="mailto:DARIN.SMITH@d11.org?subject=CSST Board Meeting"
              className="text-xs font-medium hover:underline flex-shrink-0" style={{ color: "var(--accent)" }}>
              Email Darin Smith →
            </a>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
