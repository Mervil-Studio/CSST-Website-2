"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Users, Monitor, Coffee, BookOpen, Lightbulb, ArrowUpRight } from "lucide-react";
import Image from "next/image";

const spaceFeatures = [
  {
    icon: Users,
    title: "Team Collaboration Zones",
    description:
      "Open, reconfigurable work areas designed for group projects, peer problem-solving, and the kind of spontaneous collaboration that actually produces good ideas. No rows of desks.",
    color: "#00D4FF",
  },
  {
    icon: Monitor,
    title: "Professional Meeting Rooms",
    description:
      "Glass-walled conference rooms where students run their own stand-ups, present to mentors, and conduct project reviews — exactly like a real team would.",
    color: "#A78BFA",
  },
  {
    icon: Coffee,
    title: "Common Areas & Think Space",
    description:
      "Shared spaces for independent work, informal conversation, and decompression. Because creative thinking doesn't happen on command — it happens between things.",
    color: "#34D399",
  },
  {
    icon: BookOpen,
    title: "Subject-Specific Labs",
    description:
      "Dedicated spaces for hands-on technical work: coding environments, cybersecurity simulation labs, and maker space tools — all designed around doing, not watching.",
    color: "#F59E0B",
  },
  {
    icon: Lightbulb,
    title: "Access to Industry Partners",
    description:
      "The NCC is next door. The XI Accelerator is in the building. Students don't just read about industry — they walk into it.",
    color: "#FB923C",
  },
];

const principles = [
  {
    number: "01",
    headline: "Students Are Treated as Young Adults",
    body: "There are no hall passes at CSST. Students manage their own time, take responsibility for their learning, and are expected to show up like professionals — because that's how professionals develop.",
  },
  {
    number: "02",
    headline: "Teachers Are Mentors, Not Lecturers",
    body: "CSST faculty guide curiosity rather than dictate content. The model is coaching: understand what a student is interested in, connect it to real skills, and help them go deeper. The student drives.",
  },
  {
    number: "03",
    headline: "Interest-Led, Standards-Grounded",
    body: "Students still cover a full, rigorous high school curriculum — core academics included. But how they engage with that material is shaped by their interests, not a one-size-fits-all lesson plan.",
  },
  {
    number: "04",
    headline: "Real Projects. Real Stakes.",
    body: "Coursework connects to actual industry challenges. Students don't do busywork — they build things, solve problems, and present results to people who actually work in the field.",
  },
];

const spacePhotos = [
  {
    src: "/csst/break-hub-space.jpg",
    alt: "CSST open hub with collaboration seating and project tables",
  },
  {
    src: "/csst/space-lockers.jpg",
    alt: "CSST locker wall in the student commons",
  },
  {
    src: "/csst/break-hallway.jpg",
    alt: "CSST hallway with glass-walled meeting rooms",
  },
];

export default function TheSpaceSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="the-space" ref={ref} className="relative py-28 overflow-hidden" style={{ background: "var(--bg-secondary)" }}>
      <div className="absolute inset-0 grid-bg opacity-25" />
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-80 h-[600px] blur-[120px] pointer-events-none" style={{ background: `rgba(var(--accent-rgb), 0.04)` }} />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 mb-6 text-xs font-medium tracking-[0.25em] uppercase"
            style={{ color: "var(--accent)" }}
          >
            <span className="w-8 h-px" style={{ background: "var(--accent)" }} />
            The Environment
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display text-4xl md:text-5xl lg:text-6xl font-black leading-tight tracking-tight mb-6"
            style={{ color: "var(--text-primary)" }}
          >
            Not a Classroom.
            <br />
            <span style={{ color: "var(--accent)" }}>A Launchpad.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-lg leading-relaxed"
            style={{ color: "var(--text-muted)" }}
          >
            CSST was designed to look and feel like a startup office — because the habits
            students build in their environment follow them into their careers. Walk in, and you
            won&apos;t find rows of desks and a whiteboard. You&apos;ll find team spaces, project
            rooms, and people working on real things.
          </motion.p>
        </div>

        {/* Photo triptych — CSST physical space */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.28 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-16"
        >
          {spacePhotos.map((photo, i) => (
            <div
              key={i}
              className="relative overflow-hidden rounded-2xl group h-56 sm:h-72 lg:h-[400px]"
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, 33vw"
                unoptimized
              />
              <div
                className="absolute inset-0 opacity-20 transition-opacity duration-300 group-hover:opacity-10"
                style={{ background: `rgba(var(--accent-rgb), 0.15)` }}
              />
            </div>
          ))}
        </motion.div>

        {/* Two-column: space features + principles */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* Left: Space features */}
          <div className="space-y-4">
            <p className="text-xs font-medium tracking-[0.2em] uppercase mb-6" style={{ color: `rgba(var(--accent-rgb), 0.50)` }}>
              Physical Environment
            </p>
            {spaceFeatures.map(({ icon: Icon, title, description, color }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.15 + i * 0.09 }}
                className="group flex gap-4 p-5 rounded-xl border transition-all duration-300"
                style={{ background: "var(--bg-card)", borderColor: `${color}15` }}
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center border flex-shrink-0 mt-0.5"
                  style={{ background: `${color}10`, borderColor: `${color}20` }}
                >
                  <Icon style={{ color, width: 18, height: 18 }} strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="text-sm font-semibold mb-1" style={{ color: "var(--text-primary)" }}>{title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)", opacity: 0.85 }}>{description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right: Principles */}
          <div>
            <p className="text-xs font-medium tracking-[0.2em] uppercase mb-6" style={{ color: `rgba(var(--accent-rgb), 0.50)` }}>
              How It Works
            </p>
            <div className="space-y-6">
              {principles.map(({ number, headline, body }, i) => (
                <motion.div
                  key={number}
                  initial={{ opacity: 0, x: 20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.12 }}
                  className="relative pl-8 border-l transition-colors duration-300 group"
                  style={{ borderColor: "var(--border-accent)" }}
                >
                  <span
                    className="absolute left-0 -translate-x-1/2 top-0 font-display text-[10px] font-black pr-1 transition-colors"
                    style={{ color: `rgba(var(--accent-rgb), 0.35)`, background: "var(--bg-secondary)" }}
                  >
                    {number}
                  </span>
                  <h3 className="text-sm font-bold mb-2" style={{ color: "var(--text-primary)" }}>{headline}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)", opacity: 0.7 }}>{body}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Location callout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="relative rounded-2xl border overflow-hidden p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
          style={{ background: "var(--bg-card)", borderColor: "var(--border-accent)" }}
        >
          <div className="absolute top-0 left-0 right-0 h-px" style={{ background: `linear-gradient(90deg, transparent, rgba(var(--accent-rgb),0.30), transparent)` }} />
          <div>
            <p className="text-xs font-medium tracking-widest uppercase mb-2" style={{ color: `rgba(var(--accent-rgb), 0.6)` }}>Where We Are</p>
            <h3 className="font-display text-xl font-black mb-2" style={{ color: "var(--text-primary)" }}>
              3650 N. Nevada Avenue, Colorado Springs
            </h3>
            <p className="text-sm leading-relaxed max-w-lg" style={{ color: "var(--text-muted)", opacity: 0.7 }}>
              Co-located at the UCCS Cybersecurity Center. Enter on the west side of the
              building at the CSST entrance. Upcoming Information Nights start at 6:00 PM.
            </p>
          </div>
          <a
            href="https://maps.google.com/?q=3650+N+Nevada+Ave+Colorado+Springs+CO"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg border text-sm font-semibold transition-all group flex-shrink-0"
            style={{ borderColor: "var(--border-accent)", color: "var(--accent)" }}
          >
            View on Map
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
