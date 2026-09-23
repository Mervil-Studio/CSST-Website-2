"use client";

import { motion } from "framer-motion";
import { Lock, ArrowLeft, Rocket } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0F] text-white flex flex-col">
      <div className="fixed inset-0 grid-bg opacity-20 pointer-events-none" />
      <div className="fixed left-1/2 top-1/3 -translate-x-1/2 w-[600px] h-[400px] bg-[#00D4FF]/5 blur-[120px] pointer-events-none" />

      {/* Nav */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0A0A0F]/90 backdrop-blur-xl border-b border-[#00D4FF]/10 h-[72px] flex items-center px-6">
        <div className="max-w-5xl mx-auto w-full flex items-center justify-between">
          <Link href="/">
            <Image src="/csst-logo.png" alt="CSST" width={120} height={28} className="h-8 w-auto object-contain" />
          </Link>
          <Link href="/" className="flex items-center gap-2 text-xs text-[#C0C0D0]/50 hover:text-white transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to site
          </Link>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center px-6 pt-[72px]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="flex flex-col items-center text-center max-w-md w-full"
        >
          {/* Icon */}
          <div className="relative mb-8">
            <div className="w-20 h-20 rounded-2xl bg-[#00D4FF]/8 border border-[#00D4FF]/20 flex items-center justify-center shadow-[0_0_40px_rgba(0,212,255,0.15)]">
              <Lock className="w-9 h-9 text-[#00D4FF]" strokeWidth={1.5} />
            </div>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 rounded-2xl border border-[#00D4FF]/10"
              style={{ scale: 1.3 }}
            />
          </div>

          <div className="inline-flex items-center gap-2 mb-5 px-3 py-1.5 rounded-full border border-[#00D4FF]/20 bg-[#00D4FF]/5">
            <Rocket className="w-3 h-3 text-[#00D4FF]" />
            <span className="text-xs font-bold tracking-[0.2em] text-[#00D4FF]/70 uppercase">Coming Soon</span>
          </div>

          <h1 className="font-display text-4xl font-black text-white mb-4 leading-tight">
            Mission Control.<br />
            <span className="text-[#00D4FF]">Under Construction.</span>
          </h1>

          <p className="text-base text-[#C0C0D0]/60 leading-relaxed mb-4">
            The CSST Student &amp; Partner Portal is in development. Students, parents, and
            ecosystem partners will soon have a dedicated dashboard for coursework, projects, and collaboration.
          </p>

          <p className="text-sm text-[#C0C0D0]/35 mb-10">
            Powered by Google Classroom integration · D11 SSO · Partner access tiers
          </p>

          <div className="flex flex-col sm:flex-row gap-3 w-full justify-center">
            <Link href="/"
              className="px-6 py-3 rounded-xl bg-[#00D4FF] text-[#0A0A0F] text-sm font-bold hover:bg-white transition-colors shadow-[0_0_20px_rgba(0,212,255,0.25)]">
              ← Back to CSST
            </Link>
            <a href="mailto:DARIN.SMITH@d11.org?subject=Portal Access"
              className="px-6 py-3 rounded-xl border border-[#C0C0D0]/15 text-sm text-[#C0C0D0]/60 hover:text-white hover:border-[#C0C0D0]/30 transition-all">
              Contact Admissions
            </a>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
