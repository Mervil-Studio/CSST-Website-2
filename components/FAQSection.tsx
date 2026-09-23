"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ChevronDown, ChevronRight } from "lucide-react";
import Link from "next/link";

const faqs = [
  {
    category: "About the School",
    q: "Is CSST just for kids who want to be programmers or go into tech?",
    a: `No — and this is probably the most important thing to understand about CSST.\n\nCSST is a full, accredited high school that covers every subject you'd find in any D11 high school: English, math, science, history, and electives. Students graduate with a standard D11 diploma. The difference isn't what subjects are covered — it's how they're taught and what they're connected to.\n\nAt CSST, every subject is taught through the lens of real-world application and future relevance. A student who loves writing might find themselves drafting technical documentation for a cybersecurity project. A student drawn to history might explore the geopolitics of space exploration. A student interested in art might work on UX design.\n\nTechnology touches every career field. CSST prepares students for that reality — regardless of whether they ever write a single line of code.`,
    featured: true,
  },
  {
    category: "About the School",
    q: "What kind of student thrives at CSST?",
    a: `Curious ones. That's the honest answer.\n\nCSST is designed for students who learn best by doing, not just by listening. Students who want to understand why something matters, not just memorize it for a test. Students who are ready to take some ownership of their learning and aren't looking for someone to hand them everything.\n\nThat said, "thriving" at CSST doesn't mean arriving with confidence or knowing what you want. Many students come in uncertain, a little lost, or just feeling like traditional school has never quite fit. The structure, the mentors, and the environment are designed to help those students find their footing.\n\nYou don't need to be a high achiever. You need to be willing to try.`,
    featured: false,
  },
  {
    category: "Admissions & Cost",
    q: "Is CSST free? What does it actually cost?",
    a: `CSST is a publicly funded school within Colorado Springs School District 11. Tuition is completely free — always.\n\nAs a D11 school, CSST is funded through the same public mechanisms as any other D11 high school. There is no tuition, no enrollment fee, and no pay-to-play model. Some elective activities or materials may have small associated costs (as is standard at any public school), but the school, its programs, and its industry connections are entirely free to attend.\n\nThis is intentional. Access to the careers of the future shouldn't be determined by a family's income. If CSST only served students whose families could afford private alternatives, it would be failing its own mission.`,
    featured: false,
  },
  {
    category: "Admissions & Cost",
    q: "Who can apply? What does 'application-based' mean?",
    a: `CSST is currently accepting 9th, 10th, and 11th grade students from across Colorado — you do not need to live within D11 boundaries to apply. Under Colorado's open enrollment law, CSST is open to students statewide. A meaningful portion of enrolled students come from outside Colorado Springs, which tells you something: families are actively choosing to leave their home district for this.\n\nCSST is planning for approximately 100 students per cohort year, growing to a full 9–12 school of 400–500 students over time.\n\n"Application-based" does not mean academically selective. It is not like applying to a competitive magnet school where only top students get in. The application exists to ensure that students who enroll have genuinely chosen to be there — that they (and their families) understand what CSST is and are intentionally choosing this environment.\n\nFactors like GPA, test scores, or prior tech experience are not filters for admission. The school wants students who are motivated, curious, and ready for a different kind of high school — not students who have already proven they can excel in a traditional one.\n\nInformation Nights are a great first step before applying — they help families ask real questions and get a feel for whether CSST is the right fit.`,
    featured: false,
  },
  {
    category: "Admissions & Cost",
    q: "Is CSST a charter school?",
    a: `No. CSST is a District 11 Innovation School — not a charter school.\n\nThe distinction matters. As a D11 Innovation School, CSST operates with state-approved waivers that give it flexibility in governance, staffing, curriculum, and program design. It is still fully within D11, accountable to D11 leadership, and students earn an official D11 diploma.\n\nCharter schools operate independently from the district that authorizes them. CSST does not. It has the freedom to be different, but it's still public, still D11, and still directly connected to the district's Academic Master Plan.`,
    featured: false,
  },
  {
    category: "Admissions & Cost",
    q: "Is transportation provided?",
    a: `Transportation options are available for students who reside within D11. If you live outside D11, please contact the school directly to discuss what might be available for your family.\n\n• Call: 719-328-4600\n• Email: DARIN.SMITH@d11.org\n\nCSST is located at 3650 N. Nevada Ave. — enter on the west side of the building at the CSST entrance.`,
    featured: false,
  },
  {
    category: "Academics",
    q: "Will students still graduate with a regular high school diploma?",
    a: `Yes, completely standard. CSST follows D11 graduation requirements in full. Every student who completes the program earns a Colorado Springs School District 11 high school diploma — the same credential as any other D11 graduate.\n\nOn top of that, students have significant opportunities to earn college credit through dual enrollment partnerships with UCCS and Pikes Peak State College. These aren't simulated or watered-down college courses — they're the real thing, listed on a real college transcript, potentially saving students (and families) significant tuition costs down the road.`,
    featured: false,
  },
  {
    category: "Academics",
    q: "How does dual enrollment work? What can students actually take?",
    a: `CSST students have access to two full college catalogs — no prerequisites beyond CSST's concurrent enrollment agreements with each institution.\n\n**University of Colorado Colorado Springs (UCCS)** is a full four-year research university with 9 colleges, 60+ undergraduate degree programs, and 1,000+ courses across every discipline — business, engineering, computer science, the sciences, humanities, education, and more. CSST students can take real UCCS courses on campus or online, alongside traditional college students, earning credit that appears on an official UCCS transcript.\n\n**Pikes Peak State College (PPSC)** offers 200+ certificate and degree programs across career/technical, workforce, and transfer pathways. PPSC courses can be taken on a PPSC campus, online, or through Campus Pathways delivered directly at CSST. Credits earned are fully transferable to Colorado public universities.\n\nStudents work with their CSST counselor to identify courses that align with their interests and count toward both high school requirements and future college plans. For many students, this means entering their freshman year of college with a semester or more of credit already completed — tuition-free.`,
    featured: false,
  },
  {
    category: "Academics",
    q: "Do students have to specialize? What if they're interested in multiple areas?",
    a: `Exploration is the default mode at CSST, not specialization.\n\nStudents aren't assigned a "track" on day one and locked in. The school is designed to expose students to a broad range of technology, industry, and career pathways — and let their interests emerge through that exposure. Some students will arrive knowing exactly what they want and go deep. Most will arrive uncertain, explore widely, and narrow their focus over time.\n\nEven students who do identify a strong interest are still completing a full, balanced high school curriculum alongside their area of focus. Depth of interest in one area doesn't mean ignoring everything else.`,
    featured: false,
  },
  {
    category: "The Environment",
    q: "Can students play sports or join extracurriculars?",
    a: `Yes. Colorado state law allows students who attend a school without an athletics program to play sports at their district of residence or attendance. CSST students can participate in sports at other schools in the region — they are not shut out of athletics by choosing CSST.\n\nFor extracurriculars beyond sports, CSST's co-location at Catalyst Campus opens doors that most high schools simply can't offer: access to real startup events, industry networking, and professional development opportunities that are more valuable than most after-school programs.`,
    featured: false,
  },
  {
    category: "The Environment",
    q: "What is a normal day at CSST actually like?",
    a: `The honest answer is: different from what you're used to.\n\nCSST doesn't run a rigid bell-schedule of 45-minute periods where you sit at a desk while a teacher talks. The environment is closer to a professional workspace: team areas for project work, meeting rooms for presentations and collaboration, subject-specific labs for hands-on technical work, and common areas for independent focus.\n\nStudents manage more of their own time and schedule than in a traditional high school. Teachers act as mentors and coaches — guiding students through material and projects rather than delivering lectures to passive audiences. There are still structured learning blocks, direct instruction, and clear academic expectations. But the culture is one of ownership: students are treated as capable young adults, and expected to show up like it.\n\nFor students who've always felt like the traditional model wasn't built for them — that's by design.`,
    featured: false,
  },
  {
    category: "The Environment",
    q: "What's the relationship between CSST and its industry partners? Is it just branding?",
    a: `It's not branding — the partners are physically present and structurally involved.\n\nCSST is co-located at the UCCS Cybersecurity Center, which means the National Cybersecurity Center is next door. Students walk past working professionals every day. Industry mentors come in to review student projects, present on their fields, and engage directly with coursework.\n\nThe Board of Directors is made up of the CEOs and leaders of CSST's ecosystem partners — the Space ISAC Executive Director, the NCC CEO, the Pikes Peak State College President, the USAFA's Department of Computer and Cyber Sciences head, and others. These aren't advisory board placeholders; they are actively governing the school.\n\nThrough Exponential Impact, students have access to a real startup accelerator's mentor network — not a simulation of one. The connections students make at CSST are with people who work in these industries, not just people who teach about them.`,
    featured: false,
  },
  {
    category: "Applying",
    q: "How do I learn more or attend an Information Night?",
    a: `Information Nights are the best first step. They're held at the school at 3650 N. Nevada Avenue — enter on the west side of the building at the CSST entrance. All nights start at 6:00 PM. You'll meet the staff, tour the facility, and get real answers to real questions.\n\nFuture information night dates are posted on the website as they're scheduled. You can also reach the school directly:\n\n• Phone: 719-328-4600\n• Email: DARIN.SMITH@d11.org\n• Website: csrockets.org\n\nApplications are submitted through the school website. The process is straightforward — the goal is to start a conversation, not to screen students out.`,
    featured: false,
  },
];

const categories = [...new Set(faqs.map((f) => f.category))];

function renderAnswer(text: string) {
  const lines = text.split("\n\n");
  return lines.map((line, i) => {
    if (line.startsWith("**") || line.includes("**")) {
      const parts = line.split(/\*\*(.*?)\*\*/g);
      return (
        <p key={i} className="text-sm leading-relaxed mb-3 last:mb-0" style={{ color: "var(--text-muted)", opacity: 0.8 }}>
          {parts.map((part, j) =>
            j % 2 === 1 ? (
              <span key={j} className="font-semibold" style={{ color: "var(--text-primary)" }}>{part}</span>
            ) : (
              part
            )
          )}
        </p>
      );
    }
    if (line.startsWith("•")) {
      return (
        <p key={i} className="text-sm leading-relaxed mb-1.5 pl-3" style={{ color: "var(--text-muted)", opacity: 0.8 }}>{line}</p>
      );
    }
    return (
      <p key={i} className="text-sm leading-relaxed mb-3 last:mb-0" style={{ color: "var(--text-muted)", opacity: 0.8 }}>{line}</p>
    );
  });
}

function FAQItem({ q, a, featured }: { q: string; a: string; featured: boolean; index: number }) {
  const [open, setOpen] = useState(featured);

  return (
    <div
      className="rounded-xl border overflow-hidden transition-colors duration-200"
      style={{ background: open ? "var(--bg-card)" : "var(--bg-secondary)", borderColor: open ? "var(--border-accent)" : "var(--border-subtle)" }}
    >
      {/* Full-width native button — clickable anywhere across the question row */}
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        className="w-full flex items-start justify-between gap-4 p-5 text-left cursor-pointer"
        style={{ background: "transparent" }}
      >
        <div className="flex items-start gap-3 flex-1 min-w-0">
          {featured && (
            <span
              className="flex-shrink-0 mt-0.5 text-[10px] font-bold tracking-widest uppercase px-2 py-0.5 rounded whitespace-nowrap"
              style={{ background: "rgba(var(--accent-rgb),0.15)", color: "var(--accent)" }}
            >
              Key Q
            </span>
          )}
          <span
            className="text-sm font-semibold leading-snug"
            style={{ color: open ? "var(--text-primary)" : "var(--text-muted)" }}
          >
            {q}
          </span>
        </div>
        <ChevronDown
          className="w-4 h-4 flex-shrink-0 mt-0.5 transition-transform duration-200"
          style={{
            color: open ? "var(--accent)" : "var(--text-muted)",
            opacity: open ? 1 : 0.5,
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
          }}
        />
      </button>

      {open && (
        <div className="px-5 pb-6 pt-4 border-t" style={{ borderColor: "var(--border-subtle)" }}>
          {renderAnswer(a)}
        </div>
      )}
    </div>
  );
}

export default function FAQSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="faq" ref={ref} className="relative py-28 overflow-hidden" style={{ background: "var(--bg-secondary)" }}>
      <div className="absolute inset-0 grid-bg opacity-20" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[200px] blur-[100px] pointer-events-none" style={{ background: "rgba(var(--accent-rgb),0.04)" }} />

      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <div className="mb-14">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 mb-6 text-xs font-medium tracking-[0.25em] uppercase"
            style={{ color: "var(--accent)" }}
          >
            <span className="w-8 h-px" style={{ background: "var(--accent)" }} />
            Common Questions
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display text-4xl md:text-5xl font-black leading-tight tracking-tight mb-4"
            style={{ color: "var(--text-primary)" }}
          >
            Straight Answers.
            <br />
            <span style={{ color: "var(--accent)" }}>No Brochure Speak.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-base leading-relaxed"
            style={{ color: "var(--text-muted)" }}
          >
            Start with the most important one: CSST is for{" "}
            <span className="font-medium" style={{ color: "var(--text-primary)" }}>every kind of student</span> — not just
            &ldquo;tech kids.&rdquo;
          </motion.p>
        </div>

        {/* FAQs grouped by category */}
        {categories.map((cat) => (
          <div key={cat} className="mb-10">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-[10px] font-bold tracking-[0.25em] uppercase mb-4 pl-1"
              style={{ color: "rgba(var(--accent-rgb),0.50)" }}
            >
              {cat}
            </motion.p>
            <div className="space-y-3">
              {faqs
                .filter((f) => f.category === cat)
                .map((faq, i) => (
                  <FAQItem key={faq.q} {...faq} index={i} />
                ))}
            </div>
          </div>
        ))}

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-8 p-6 rounded-xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
          style={{ background: "var(--bg-card)", borderColor: "var(--border-accent)" }}
        >
          <div>
            <p className="text-sm font-semibold mb-1" style={{ color: "var(--text-primary)" }}>Still have questions?</p>
            <p className="text-xs" style={{ color: "var(--text-muted)", opacity: 0.7 }}>
              Come to an Information Night at 3650 N. Nevada — or reach out directly.
            </p>
          </div>
          <div className="flex gap-3 flex-shrink-0 flex-wrap">
            <a
              href="mailto:info@csrockets.org"
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg border text-sm font-semibold transition-all"
              style={{ borderColor: "var(--border-accent)", color: "var(--accent)" }}
            >
              Email Us
            </a>
            <Link
              href="https://www.csrockets.org"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-bold transition-all group"
              style={{ background: "var(--accent)", color: "var(--bg-primary)" }}
            >
              Apply at csrockets.org
              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
