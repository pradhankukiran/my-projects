import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "My Projects",
  description: "View all your Vercel projects and deployments",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-on-surface">
        <header className="sticky top-0 z-50 border-b border-outline bg-white/90 backdrop-blur-md">
          <div className="mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="h-9 w-9 flex items-center justify-center rounded-xl bg-primary text-on-primary shadow-sm group-hover:scale-105 transition-transform duration-200">
                <svg
                  height="16"
                  viewBox="0 0 75 65"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  className="mt-0.5"
                >
                  <path d="M37.59.25l36.95 64H.64l36.95-64z" />
                </svg>
              </div>
              <span className="text-lg font-bold tracking-tight text-on-surface group-hover:text-primary transition-colors">
                Project Hub
              </span>
            </Link>
            <div className="flex items-center gap-4">
              <span className="hidden sm:inline-block text-xs font-medium px-2.5 py-1 bg-secondary-container text-on-secondary-container rounded-full">
                Vercel API Connected
              </span>
              <div className="h-9 w-9 rounded-full bg-slate-200 border border-outline flex items-center justify-center font-bold text-sm text-slate-600 select-none shadow-inner">
                JD
              </div>
            </div>
          </div>
        </header>
        <main className="flex-1 pb-16">{children}</main>
      </body>
    </html>
  );
}
