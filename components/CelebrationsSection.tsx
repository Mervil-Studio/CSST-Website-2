"use client";

import { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { ExternalLink } from "lucide-react";

// ─── CONFIGURATION ────────────────────────────────────────────────────────────
// To wire up the live Instagram feed:
//   1. Sign up at https://behold.so (free tier)
//   2. Connect Instagram account: @csrockets_cos
//   3. Create a feed and copy the Feed ID shown in your dashboard
//   4. Replace the empty string below with that Feed ID (e.g. "AbCdEf1234567890")
const BEHOLD_FEED_ID = ""; // ← paste Behold Feed ID here

const INSTAGRAM_URL = "https://www.instagram.com/csrockets_cos/";

// Real CSST photos — 16 items = 4 rows × 4 cols on desktop
const PLACEHOLDER_POSTS = [
  { id:  "1", img: "/csst/g01-teacher-student-laptop.jpg",  caption: "One-on-one mentoring" },
  { id:  "2", img: "/csst/g02-student-waving.jpg",          caption: "Engaged and ready" },
  { id:  "3", img: "/csst/g03-student-cad.jpg",             caption: "3D design in action" },
  { id:  "4", img: "/csst/g04-classroom-wide.jpg",          caption: "Active learning" },
  { id:  "5", img: "/csst/g05-student-focused.jpg",         caption: "Deep in the work" },
  { id:  "6", img: "/csst/g06-two-students-hub.jpg",        caption: "Friends at the hub" },
  { id:  "7", img: "/csst/g07-classroom-space.jpg",         caption: "The classroom" },
  { id:  "8", img: "/csst/g08-full-class.jpg",              caption: "All together now" },
  { id:  "9", img: "/csst/g09-teacher-student-couch.jpg",   caption: "Teacher-student collaboration" },
  { id: "10", img: "/csst/g10-admin-student.jpg",           caption: "Leadership in action" },
  { id: "11", img: "/csst/g11-student-raising-hand.jpg",    caption: "Curiosity wins" },
  { id: "12", img: "/csst/g12-ribbon-cutting.jpg",          caption: "Grand Opening — Aug 2025" },
  { id: "13", img: "/csst/g13-community-event.jpg",         caption: "Community at CSST" },
  { id: "14", img: "/csst/g14-ribbon-closeup.jpg",          caption: "Cutting the ribbon" },
  { id: "15", img: "/csst/g15-speaker-event.jpg",           caption: "Opening day conversations" },
  { id: "16", img: "/csst/g16-csst-plaque.jpg",             caption: "Colorado Springs School of Technology" },
];

// Injects the Behold widget script once and renders the custom element via dangerouslySetInnerHTML
function BeholdFeed({ feedId }: { feedId: string }) {
  useEffect(() => {
    if (document.getElementById("behold-script")) return;
    const script = document.createElement("script");
    script.id = "behold-script";
    script.src = "https://w.behold.so/widget.js";
    script.type = "module";
    document.head.appendChild(script);
  }, []);

  return (
    <div
      dangerouslySetInnerHTML={{
        __html: `<behold-widget feed-id="${feedId}"></behold-widget>`,
      }}
    />
  );
}

export default function CelebrationsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const hasFeed = BEHOLD_FEED_ID.length > 0;

  return (
    <section
      ref={ref}
      className="w-full py-20 px-6"
      style={{ background: "var(--bg-primary)" }}
    >
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <div
            className="inline-flex items-center gap-2 mb-4 text-xs font-medium tracking-[0.25em] uppercase"
            style={{ color: "var(--accent)" }}
          >
            <span className="w-8 h-px" style={{ background: "var(--accent)" }} />
            Community
          </div>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <h2
              className="font-display text-3xl md:text-4xl lg:text-5xl font-black leading-tight tracking-tight"
              style={{ color: "var(--text-primary)" }}
            >
              Celebrate Life With Us at CSST
            </h2>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-medium transition-all hover:opacity-80 shrink-0"
              style={{
                borderColor: "var(--border-accent)",
                color: "var(--accent)",
              }}
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/></svg>
              @csrockets_cos
              <ExternalLink className="w-3 h-3 opacity-60" />
            </a>
          </div>
          <p className="mt-3 text-base" style={{ color: "var(--text-muted)" }}>
            Real moments from our students, staff, and community.
          </p>
        </motion.div>

        {/* Feed */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15 }}
        >
          {hasFeed ? (
            <BeholdFeed feedId={BEHOLD_FEED_ID} />
          ) : (
            // CSST UGC photo grid — 4×4
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {PLACEHOLDER_POSTS.map((post, i) => (
                <motion.a
                  key={post.id}
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.1 + i * 0.04 }}
                  className="relative aspect-square rounded-xl overflow-hidden group border"
                  style={{ borderColor: "var(--border-subtle)" }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={post.img}
                    alt={post.caption}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-300 flex items-end p-2">
                    <p className="text-white text-[10px] leading-snug opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {post.caption}
                    </p>
                  </div>
                  {/* Instagram icon on hover */}
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <svg className="w-4 h-4 text-white drop-shadow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/></svg>
                  </div>
                </motion.a>
              ))}
            </div>
          )}
        </motion.div>

        {/* Follow link footer */}
        {!hasFeed && (
          <p className="mt-6 text-xs text-center" style={{ color: "var(--text-muted)", opacity: 0.6 }}>
            Follow{" "}
            <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="underline font-medium">
              @csrockets_cos
            </a>{" "}
            on Instagram for the latest from CSST.
          </p>
        )}

      </div>
    </section>
  );
}
