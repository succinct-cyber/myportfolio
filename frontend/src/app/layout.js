import { Inter, JetBrains_Mono, Newsreader } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getProfile } from "@/lib/api";

const sans = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap" });
const serif = Newsreader({ subsets: ["latin"], style: ["normal", "italic"], variable: "--font-serif", display: "swap" });

const site = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
const description = "Yomi Fabiyi is a full-stack software engineer building reliable Python, Django, API and React applications.";

export const metadata = {
  metadataBase: new URL(site),
  title: { default: "Yomi Fabiyi — Software Engineer", template: "%s — Yomi Fabiyi" },
  description,
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }, { url: "/favicon-32.png", sizes: "32x32", type: "image/png" }, { url: "/favicon-16.png", sizes: "16x16", type: "image/png" }],
    apple: "/apple-touch-icon.png",
  },
  openGraph: { title: "Yomi Fabiyi — Software Engineer", description, type: "website", siteName: "Yomi Fabiyi", images: ["/favicon-512.png"] },
  twitter: { card: "summary" },
};

export const viewport = { themeColor: "#F7F7F2" };

export default async function RootLayout({ children }) {
  const profile = await getProfile();
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    jobTitle: profile.role,
    url: site,
    sameAs: [profile.github, profile.linkedin].filter(Boolean),
  };
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable} ${serif.variable}`}>
      <body id="top">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
