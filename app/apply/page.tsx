"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronRight, ChevronLeft, CheckCircle2, User, Phone,
  FileText, Rocket, ArrowLeft,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const FORM_ACTION =
  "https://docs.google.com/forms/d/e/1FAIpQLScj-nwvtMNed8326hjj_EY05tnANYv_A-NYURFWPwJqbhH9TA/formResponse";

// Leadership palette — CSST teal
const L = {
  bg:          "#F4FDFF",
  bgCard:      "#FFFFFF",
  bgElevated:  "#D4EFF8",
  bgSecondary: "#E6F7FC",
  nav:         "rgba(244, 253, 255, 0.97)",
  textPrimary: "#0C2027",
  textMuted:   "#1C5068",
  textFaint:   "#2A7A96",
  accent:      "#0891B2",
  accentDim:   "#0E7490",
  accentRgb:   "8, 145, 178",
  border:      "rgba(8, 145, 178, 0.12)",
  borderMid:   "rgba(8, 145, 178, 0.28)",
  borderStrong:"rgba(8, 145, 178, 0.45)",
  glow:        "0 0 0 3px rgba(8, 145, 178, 0.12)",
};

// ─── Step definitions ─────────────────────────────────────────────────────────
const steps = [
  { id: 1, label: "Student Info",   icon: User,     title: "Tell us about your student.",      subtitle: "Basic information about the incoming student." },
  { id: 2, label: "Contact",        icon: Phone,    title: "How can we reach you?",             subtitle: "Parent or guardian contact details." },
  { id: 3, label: "Background",     icon: FileText, title: "A little background.",              subtitle: "Learning profile and how you found us." },
  { id: 4, label: "Your Story",     icon: Rocket,   title: "Why CSST?",                        subtitle: "Help us understand your student's goals and character." },
];

type FormData = {
  firstName: string; lastName: string; grade: string; currentSchool: string;
  parentName: string; primaryEmail: string; additionalEmail: string; phone: string; address: string;
  learningNeeds: string; learningDetails: string; howHeard: string; infoSession: string;
  whyInterested: string; contributions: string; pathwaysFit: string; characteristics: string; otherInfo: string;
};

const EMPTY: FormData = {
  firstName: "", lastName: "", grade: "", currentSchool: "",
  parentName: "", primaryEmail: "", additionalEmail: "", phone: "", address: "",
  learningNeeds: "", learningDetails: "", howHeard: "", infoSession: "",
  whyInterested: "", contributions: "", pathwaysFit: "", characteristics: "", otherInfo: "",
};

// ─── Field components ─────────────────────────────────────────────────────────
function Field({
  label, name, value, onChange, required = true, type = "text", placeholder = "",
}: {
  label: string; name: keyof FormData; value: string; onChange: (n: keyof FormData, v: string) => void;
  required?: boolean; type?: string; placeholder?: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold tracking-wide" style={{ color: L.textMuted }}>
        {label}{required && <span className="ml-1" style={{ color: L.accent }}>*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(name, e.target.value)}
        placeholder={placeholder}
        required={required}
        style={{
          background: L.bgSecondary,
          border: `1px solid ${L.border}`,
          color: L.textPrimary,
        }}
        className="px-4 py-3 rounded-xl text-sm transition-all focus:outline-none"
        onFocus={e => { e.currentTarget.style.borderColor = L.borderMid; e.currentTarget.style.boxShadow = L.glow; }}
        onBlur={e  => { e.currentTarget.style.borderColor = L.border;    e.currentTarget.style.boxShadow = "none"; }}
      />
    </div>
  );
}

function TextArea({
  label, name, value, onChange, required = true, placeholder = "", hint,
}: {
  label: string; name: keyof FormData; value: string; onChange: (n: keyof FormData, v: string) => void;
  required?: boolean; placeholder?: string; hint?: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold tracking-wide" style={{ color: L.textMuted }}>
        {label}{required && <span className="ml-1" style={{ color: L.accent }}>*</span>}
      </label>
      {hint && <p className="text-[11px] -mt-0.5 leading-snug" style={{ color: L.textFaint }}>{hint}</p>}
      <textarea
        value={value}
        onChange={(e) => onChange(name, e.target.value)}
        placeholder={placeholder}
        required={required}
        rows={4}
        style={{
          background: L.bgSecondary,
          border: `1px solid ${L.border}`,
          color: L.textPrimary,
        }}
        className="px-4 py-3 rounded-xl text-sm transition-all focus:outline-none resize-none leading-relaxed"
        onFocus={e => { e.currentTarget.style.borderColor = L.borderMid; e.currentTarget.style.boxShadow = L.glow; }}
        onBlur={e  => { e.currentTarget.style.borderColor = L.border;    e.currentTarget.style.boxShadow = "none"; }}
      />
    </div>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────
export default function ApplyPage() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<FormData>(EMPTY);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const set = (name: keyof FormData, value: string) =>
    setData((d) => ({ ...d, [name]: value }));

  const nextStep = () => setStep((s) => Math.min(s + 1, 4));
  const prevStep = () => setStep((s) => Math.max(s - 1, 1));

  const isStepValid = () => {
    if (step === 1) return data.firstName && data.lastName && data.grade && data.currentSchool;
    if (step === 2) return data.parentName && data.primaryEmail && data.phone && data.address;
    if (step === 3) return data.learningNeeds && data.howHeard && data.infoSession;
    if (step === 4) return data.whyInterested && data.contributions && data.pathwaysFit && data.characteristics;
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const body = new URLSearchParams({
      "entry.149495572":  data.firstName,
      "entry.2005620554": data.lastName,
      "entry.1081601876": data.grade,
      "entry.1210029210": data.currentSchool,
      "entry.749213967":  data.parentName,
      "entry.1045781291": data.primaryEmail,
      "entry.732519118":  data.additionalEmail,
      "entry.1166974658": data.phone,
      "entry.1065046570": data.address,
      "entry.839337160":  data.learningNeeds,
      "entry.1039609381": data.learningDetails,
      "entry.650982363":  data.howHeard,
      "entry.733926478":  data.infoSession,
      "entry.845573583":  data.whyInterested,
      "entry.1815204934": data.contributions,
      "entry.1595011606": data.pathwaysFit,
      "entry.1567960135": data.characteristics,
      "entry.665500775":  data.otherInfo,
    });

    try {
      await fetch(FORM_ACTION, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body.toString(),
      });
    } catch {
      // no-cors fetch always "fails" on the response — submission still goes through
    }

    setSubmitting(false);
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen" style={{ background: L.bg, color: L.textPrimary }}>
      {/* Hidden iframe for form submission */}
      <iframe ref={iframeRef} name="hidden-form-target" className="hidden" />

      {/* Subtle background accent blobs */}
      <div className="fixed top-0 right-0 w-[500px] h-[500px] pointer-events-none"
        style={{ background: `radial-gradient(circle, rgba(${L.accentRgb},0.06) 0%, transparent 70%)` }} />
      <div className="fixed bottom-0 left-0 w-[400px] h-[400px] pointer-events-none"
        style={{ background: `radial-gradient(circle, rgba(${L.accentRgb},0.04) 0%, transparent 70%)` }} />

      {/* Nav bar */}
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl h-[72px] flex items-center px-6"
        style={{ background: L.nav, borderBottom: `1px solid ${L.border}` }}>
        <div className="max-w-5xl mx-auto w-full flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/csst-logo.png" alt="CSST" width={120} height={28} className="h-8 w-auto object-contain" />
          </Link>
          <Link href="/" className="flex items-center gap-2 text-xs transition-colors"
            style={{ color: L.textFaint }}
            onMouseEnter={e => (e.currentTarget.style.color = L.accent)}
            onMouseLeave={e => (e.currentTarget.style.color = L.textFaint)}>
            <ArrowLeft className="w-3.5 h-3.5" /> Back to site
          </Link>
        </div>
      </header>

      <main className="pt-[72px] pb-24">
        <div className="max-w-2xl mx-auto px-6">

          {/* ── SUCCESS STATE ── */}
          {submitted ? (
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
              className="flex flex-col items-center text-center py-24">
              <div className="w-20 h-20 rounded-full flex items-center justify-center mb-6"
                style={{ background: `rgba(${L.accentRgb},0.10)`, border: `1px solid rgba(${L.accentRgb},0.30)`, boxShadow: `0 0 40px rgba(${L.accentRgb},0.15)` }}>
                <CheckCircle2 className="w-10 h-10" style={{ color: L.accent }} strokeWidth={1.5} />
              </div>
              <h1 className="font-display text-4xl font-black mb-4" style={{ color: L.textPrimary }}>Application Received.</h1>
              <p className="text-lg leading-relaxed mb-3 max-w-md" style={{ color: L.textMuted }}>
                Thank you for applying to CSST for 2026–2027. Your application has been submitted.
              </p>
              <p className="text-sm max-w-md mb-10" style={{ color: L.textFaint }}>
                The CSST admissions team will reach out with next steps. In the meantime, explore what
                makes this school unlike any other.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="/"
                  className="px-6 py-3 rounded-xl text-sm font-bold transition-colors"
                  style={{ background: L.accent, color: "#FFFFFF", boxShadow: `0 0 20px rgba(${L.accentRgb},0.25)` }}>
                  Back to CSST →
                </Link>
                <a href="mailto:DARIN.SMITH@d11.org?subject=CSST Application Question"
                  className="px-6 py-3 rounded-xl border text-sm transition-all"
                  style={{ borderColor: L.border, color: L.textMuted }}>
                  Email Darin Smith
                </a>
              </div>
            </motion.div>
          ) : (
            <>
              {/* ── HEADER ── */}
              <div className="py-14 pb-10">
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}
                  className="inline-flex items-center gap-2 mb-5 text-xs font-medium tracking-[0.25em] uppercase"
                  style={{ color: L.accent }}>
                  <span className="w-8 h-px" style={{ background: L.accent }} />2026–2027 Enrollment
                </motion.div>
                <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
                  className="font-display text-4xl md:text-5xl font-black leading-tight mb-3"
                  style={{ color: L.textPrimary }}>
                  Apply to CSST.
                  <br /><span style={{ color: L.accent }}>100% Tuition Free.</span>
                </motion.h1>
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
                  className="text-sm" style={{ color: L.textFaint }}>
                  Submitting this application does not guarantee enrollment — it&apos;s the first step. The admissions team will contact you with next steps.
                </motion.p>
              </div>

              {/* ── STEP PROGRESS ── */}
              <div className="mb-10">
                <div className="flex items-center gap-0">
                  {steps.map((s, i) => {
                    const StepIcon = s.icon;
                    const done   = step > s.id;
                    const active = step === s.id;
                    return (
                      <div key={s.id} className="flex items-center flex-1 last:flex-none">
                        <div className="flex flex-col items-center gap-1.5">
                          <div className="w-9 h-9 rounded-full flex items-center justify-center border-2 transition-all duration-300"
                            style={{
                              background:   done ? L.accent : active ? `rgba(${L.accentRgb},0.12)` : "transparent",
                              borderColor:  done || active ? L.accent : L.border,
                            }}>
                            {done
                              ? <CheckCircle2 className="w-4 h-4" style={{ color: "#FFFFFF" }} />
                              : <StepIcon className="w-4 h-4" style={{ color: active ? L.accent : L.textFaint }} />
                            }
                          </div>
                          <span className="text-[10px] font-medium whitespace-nowrap"
                            style={{ color: active ? L.accent : done ? L.textMuted : L.textFaint, opacity: done || active ? 1 : 0.6 }}>
                            {s.label}
                          </span>
                        </div>
                        {i < steps.length - 1 && (
                          <div className="flex-1 h-px mx-2 mb-5 transition-all duration-500"
                            style={{ background: step > s.id ? `rgba(${L.accentRgb},0.40)` : L.border }} />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* ── FORM PANEL ── */}
              <form onSubmit={handleSubmit}>
                <AnimatePresence mode="wait">
                  <motion.div key={step}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="rounded-2xl p-8"
                    style={{ background: L.bgCard, border: `1px solid ${L.border}`, boxShadow: `0 4px 24px rgba(${L.accentRgb},0.07)` }}
                  >
                    {/* Step header */}
                    <div className="mb-8 pb-6" style={{ borderBottom: `1px solid ${L.border}` }}>
                      <div className="flex items-center gap-2 mb-2">
                        {(() => { const S = steps[step - 1]; const Icon = S.icon; return <Icon className="w-4 h-4" style={{ color: L.accent }} />; })()}
                        <span className="text-xs font-bold tracking-widest uppercase" style={{ color: L.textFaint }}>Step {step} of 4</span>
                      </div>
                      <h2 className="font-display text-2xl font-bold" style={{ color: L.textPrimary }}>{steps[step - 1].title}</h2>
                      <p className="text-sm mt-1" style={{ color: L.textFaint }}>{steps[step - 1].subtitle}</p>
                    </div>

                    {/* ── STEP 1: Student Info ── */}
                    {step === 1 && (
                      <div className="space-y-5">
                        <div className="grid grid-cols-2 gap-5">
                          <Field label="Student First Name" name="firstName" value={data.firstName} onChange={set} placeholder="First name" />
                          <Field label="Student Last Name"  name="lastName"  value={data.lastName}  onChange={set} placeholder="Last name"  />
                        </div>
                        <Field label="Current Grade (2025–2026)" name="grade" value={data.grade} onChange={set} placeholder="e.g. 8th grade" />
                        <Field label="Current School (2025–2026)" name="currentSchool" value={data.currentSchool} onChange={set} placeholder="School name" />
                      </div>
                    )}

                    {/* ── STEP 2: Contact ── */}
                    {step === 2 && (
                      <div className="space-y-5">
                        <Field label="Parent/Guardian Name(s)" name="parentName" value={data.parentName} onChange={set} placeholder="Full name(s)" />
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                          <Field label="Primary Email" name="primaryEmail" value={data.primaryEmail} onChange={set} type="email" placeholder="your@email.com" />
                          <Field label="Additional Email (optional)" name="additionalEmail" value={data.additionalEmail} onChange={set} type="email" required={false} placeholder="optional" />
                        </div>
                        <Field label="Phone Number" name="phone" value={data.phone} onChange={set} type="tel" placeholder="(719) 000-0000" />
                        <Field label="Home Address" name="address" value={data.address} onChange={set} placeholder="Street, City, State, ZIP" />
                      </div>
                    )}

                    {/* ── STEP 3: Background ── */}
                    {step === 3 && (
                      <div className="space-y-5">
                        <TextArea
                          label="Does your child have any specific learning needs?"
                          name="learningNeeds" value={data.learningNeeds} onChange={set}
                          hint="CSST actively supports diverse learners. There's no wrong answer here."
                          placeholder="Share anything relevant — IEP, 504, learning differences, etc. Or simply write 'None known.'"
                        />
                        <TextArea
                          label="Details about learning needs (optional)"
                          name="learningDetails" value={data.learningDetails} onChange={set} required={false}
                          placeholder="Any additional context you'd like to share..."
                        />
                        <Field
                          label="How did you hear about our school?"
                          name="howHeard" value={data.howHeard} onChange={set}
                          placeholder="e.g. Word of mouth, Google, school counselor..."
                        />
                        <Field
                          label="Have you attended an information session? If so, when?"
                          name="infoSession" value={data.infoSession} onChange={set}
                          placeholder="e.g. Yes – March 2026 open house. Or: Not yet."
                        />
                      </div>
                    )}

                    {/* ── STEP 4: Essay questions ── */}
                    {step === 4 && (
                      <div className="space-y-6">
                        <TextArea
                          label="Why is your student interested in our school?"
                          name="whyInterested" value={data.whyInterested} onChange={set}
                          placeholder="What draws them to CSST specifically?"
                        />
                        <TextArea
                          label="What positive contributions will your student bring?"
                          name="contributions" value={data.contributions} onChange={set}
                          placeholder="How will they add to our community?"
                        />
                        <TextArea
                          label="How do our pathways fit your student's interests or future plans?"
                          name="pathwaysFit" value={data.pathwaysFit} onChange={set}
                          hint="CSST pathways: Cybersecurity · Aerospace · Entrepreneurship · Leadership"
                          placeholder="Which pathway(s) resonate and why?"
                        />
                        <TextArea
                          label="How does your student demonstrate CSST's characteristics?"
                          name="characteristics" value={data.characteristics} onChange={set}
                          hint="CSST students are active participants, value respectful relationships, and are willing to work hard and grow."
                          placeholder="Share specific examples..."
                        />
                        <TextArea
                          label="Anything else you'd like us to know?"
                          name="otherInfo" value={data.otherInfo} onChange={set} required={false}
                          placeholder="Optional — any other context that would help us understand your student."
                        />
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>

                {/* ── NAV BUTTONS ── */}
                <div className="flex items-center justify-between mt-6 gap-4">
                  {step > 1 ? (
                    <button type="button" onClick={prevStep}
                      className="flex items-center gap-2 px-5 py-3 rounded-xl border text-sm transition-all"
                      style={{ borderColor: L.border, color: L.textMuted }}>
                      <ChevronLeft className="w-4 h-4" /> Back
                    </button>
                  ) : (
                    <Link href="/"
                      className="flex items-center gap-2 px-5 py-3 rounded-xl border text-sm transition-all"
                      style={{ borderColor: L.border, color: L.textFaint }}>
                      <ArrowLeft className="w-4 h-4" /> Cancel
                    </Link>
                  )}

                  {step < 4 ? (
                    <button
                      type="button" onClick={nextStep}
                      disabled={!isStepValid()}
                      className="flex items-center gap-2 px-7 py-3 rounded-xl text-sm font-bold transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                      style={{ background: L.accent, color: "#FFFFFF", boxShadow: `0 0 20px rgba(${L.accentRgb},0.20)` }}
                    >
                      Continue <ChevronRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={!isStepValid() || submitting}
                      className="flex items-center gap-2 px-8 py-3 rounded-xl text-sm font-bold transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                      style={{ background: L.accent, color: "#FFFFFF", boxShadow: `0 0 24px rgba(${L.accentRgb},0.25)` }}
                    >
                      {submitting ? (
                        <><span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" /> Submitting…</>
                      ) : (
                        <>Submit Application <Rocket className="w-4 h-4" /></>
                      )}
                    </button>
                  )}
                </div>

                {/* Fine print */}
                <p className="text-[11px] text-center mt-6 leading-relaxed" style={{ color: L.textFaint }}>
                  Your application is submitted directly to CSST Admissions via the official D11 form system.
                  Submitting does not guarantee enrollment.
                </p>
              </form>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
