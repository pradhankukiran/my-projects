import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  title: "Vercel Projects Admin - GOV.UK",
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
      <body className="min-h-full flex flex-col bg-govuk-bg text-govuk-text font-sans">
        {/* GOV.UK Header */}
        <header className="govuk-header" role="banner" data-module="govuk-header">
          <div className="govuk-header__container govuk-width-container">
            <div className="govuk-header__logo">
              <a href="/" className="govuk-header__logo">
                <svg
                  role="presentation"
                  focusable="false"
                  className="govuk-header__logotype-crown"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 32 30"
                  width="32"
                  height="30"
                  fill="currentColor"
                >
                  <path d="M22.6 10.4c-1 .4-2 .1-2.4-.8-.4-.9-.1-2 .8-2.4.9-.4 2-.1 2.4.8.5.9.2 2-.8 2.4zm-10.6 0c.9-.4 1.2-1.5.8-2.4-.4-.9-1.5-1.2-2.4-.8-.9.4-1.2 1.5-.8 2.4.4.9 1.5 1.2 2.4.8zm3.2 3.2c.9-.4 1.2-1.5.8-2.4-.4-.9-1.5-1.2-2.4-.8-.9.4-1.2 1.5-.8 2.4.4.9 1.5 1.2 2.4.8zm7.1 2.8c-.9.4-1.2 1.5-.8 2.4.4.9 1.5 1.2 2.4.8.9-.4 1.2-1.5.8-2.4-.4-.9-1.5-1.2-2.4-.8zm-11 0c.9-.4 1.2-1.5.8-2.4-.4-.9-1.5-1.2-2.4-.8-.9.4-1.2 1.5-.8 2.4.4.9 1.5 1.2 2.4.8zM25 18c0-.6-.5-1-1-1h-1.1c-.6 0-1 .4-1 1v2h-3.9v-2c0-.6-.5-1-1-1h-1.1c-.6 0-1 .4-1 1v2H11v-2c0-.6-.5-1-1-1H8.9c-.6 0-1 .4-1 1v2H5c-.6 0-1 .4-1 1v3c0 .6.4 1 1 1h22c.6 0 1-.4 1-1v-3c0-.6-.4-1-1-1h-2v-2zM6 24h20v2H6v-2z" />
                </svg>
                <span className="govuk-header__logotext">GOV.UK</span>
              </a>
              <span className="govuk-header__service-name">
                Vercel Projects Admin
              </span>
            </div>
          </div>
        </header>

        {/* Main Content Wrapper */}
        <main className="flex-1 pb-16">
          {children}
        </main>

        {/* GOV.UK Footer */}
        <footer className="govuk-footer" role="contentinfo">
          <div className="govuk-width-container">
            <div className="govuk-footer__meta">
              <div className="govuk-footer__licence-description">
                <svg
                  aria-hidden="true"
                  focusable="false"
                  className="inline-block mr-2 align-middle"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 483.2 195.7"
                  height="17"
                  width="41"
                  fill="currentColor"
                >
                  <path d="M421.5 142.8V.1l-50.7 32.5v110.2c0 21.8-11.6 30-31.4 30-18.7 0-31.4-8.8-31.4-29.8V32.6L257.3.1v143.5c0 47.9 28.2 62.6 72.8 62.6 44.1 0 72.8-14.7 72.8-62.6v-23.3l50.7-32.5h-32.1zM203.7 151.7V.1L153 32.6v118.8c0 14.1-6.1 19.3-17.3 19.3-11.4 0-17-5.9-17-19.3V32.6L67.9.1v153.1c0 37.6 20.3 52.9 57.3 52.9 37.8 0 57.3-15.3 57.3-52.9v-23.2l50.7-32.5H202.1v23.3zM461.1 26.3c-6.1-5.8-13.4-8.7-22.1-8.7s-15.9 2.9-22 8.7c-6.1 5.8-9.1 13-9.1 21.6 0 8.6 3 15.8 9.1 21.6s13.3 8.7 22 8.7 16-2.9 22.1-8.7c6.1-5.8 9.2-13 9.2-21.6-.1-8.6-3.2-15.8-9.2-21.6z" />
                </svg>
                <span className="align-middle">
                  All content is available under the{" "}
                  <a
                    className="govuk-footer__link"
                    href="https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/"
                    rel="license"
                  >
                    Open Government Licence v3.0
                  </a>
                  , except where otherwise stated
                </span>
              </div>
              <div className="govuk-footer__copyright-logo">
                <svg
                  role="presentation"
                  focusable="false"
                  className="govuk-footer__licence-logo"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 125 102"
                  width="40"
                  height="32"
                  fill="currentColor"
                >
                  <path d="M12.6 15.6c-.6 0-1.1-.5-1.1-1.1s.5-1.1 1.1-1.1h100.8c.6 0 1.1.5 1.1 1.1s-.5 1.1-1.1 1.1H12.6zm0 5c-.6 0-1.1-.5-1.1-1.1s.5-1.1 1.1-1.1h100.8c.6 0 1.1.5 1.1 1.1s-.5 1.1-1.1 1.1H12.6zm0 5c-.6 0-1.1-.5-1.1-1.1s.5-1.1 1.1-1.1h100.8c.6 0 1.1.5 1.1 1.1s-.5 1.1-1.1 1.1H12.6zm0 5c-.6 0-1.1-.5-1.1-1.1s.5-1.1 1.1-1.1h100.8c.6 0 1.1.5 1.1 1.1s-.5 1.1-1.1 1.1H12.6zM6 46.2c0-.6.5-1.1 1.1-1.1h110.8c.6 0 1.1.5 1.1 1.1s-.5 1.1-1.1 1.1H7.1c-.6 0-1.1-.5-1.1-1.1zm0 5c0-.6.5-1.1 1.1-1.1h110.8c.6 0 1.1.5 1.1 1.1s-.5 1.1-1.1 1.1H7.1c-.6 0-1.1-.5-1.1-1.1zm0 5c0-.6.5-1.1 1.1-1.1h110.8c.6 0 1.1.5 1.1 1.1s-.5 1.1-1.1 1.1H7.1c-.6 0-1.1-.5-1.1-1.1z" />
                </svg>
                <span className="mt-1">© Crown copyright</span>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
