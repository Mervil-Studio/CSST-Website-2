import type { Metadata } from "next";
import { Orbitron, Space_Grotesk, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "./theme-context";
import AnnouncementBar from "@/components/AnnouncementBar";
import AnnouncementModal from "@/components/AnnouncementModal";
import "./globals.css";

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CSST — Colorado Springs School of Technology",
  description:
    "A free, public high school in Colorado Springs for grades 9–12. Hands-on learning in cybersecurity, AI, aerospace, and entrepreneurship — co-located with the NCC, Space ISAC, and Exponential Impact. D11 Innovation Zone school.",
  keywords: [
    "CSST",
    "Colorado Springs School of Technology",
    "Colorado Springs high school",
    "D11 school",
    "cybersecurity high school",
    "aerospace high school",
    "free public high school Colorado",
    "innovation school Colorado Springs",
    "Space ISAC",
    "NCC",
    "dual enrollment Colorado Springs",
    "UCCS dual enrollment",
  ],
  metadataBase: new URL("https://csrockets.org"),
  openGraph: {
    title: "CSST — Colorado Springs School of Technology",
    description:
      "A free, public high school built for the 21st century. Cybersecurity, AI, aerospace, and entrepreneurship — co-located with the NCC, Space ISAC, and Exponential Impact. Now enrolling grades 9–12.",
    type: "website",
    url: "https://csrockets.org",
    siteName: "Colorado Springs School of Technology",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "CSST — Colorado Springs School of Technology",
    description:
      "A free, public D11 high school. Cybersecurity · AI · Aerospace · Entrepreneurship. Co-located with the NCC and Space ISAC. Now enrolling.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${orbitron.variable} ${spaceGrotesk.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        {/* Inline script prevents flash of unstyled theme on load */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('csst-theme');document.documentElement.setAttribute('data-theme',(t&&['aerospace','cyber','entrepreneurship','leadership'].includes(t))?t:'leadership');}catch(e){document.documentElement.setAttribute('data-theme','leadership');}})();`,
          }}
        />
      </head>
      <body
        className="min-h-full flex flex-col bg-bg-primary text-text-primary"
        suppressHydrationWarning
      >
        <ThemeProvider>
          <AnnouncementModal />
          <AnnouncementBar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
