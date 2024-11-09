import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "JSON Formatter",
  description: "Beautify and format your JSON in one click with our easy-to-use JSON formatter. Improve readability and share with ease!",
  keywords: "json formatter,json viewer, beautify JSON, JSON editor, online JSON tool, format JSON online",
  openGraph: {
    title: "JSON Formatter - Beautify Your JSON with One Click",
    description: "Use our free JSON formatter tool to beautify, format, and share your JSON easily.",
    url: "https://www.yoursite.com", // Update with your actual site URL
    type: "website",
    images: [
      {
        url: "/JSON-FORMATTER.svg", // Add your own image URL
        width: 1200,
        height: 630,
        alt: "JSON Formatter Preview Image",
      },
    ],
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="p-4 bg-gray-100 pb-0">
          <h2 className="text-3xl font-bold text-blue-600">
            JSON Formatter
          </h2>
          <p className="text-base text-gray-700">
            Beautify your JSON in one click
          </p>
          </div>
        {children}
      </body>
    </html>
  );
}
