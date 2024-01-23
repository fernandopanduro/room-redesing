import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  icons: {
    icon: "https://room-redesing.vercel.app/icon.jpeg",
  },
  title: "Room Redesign: 🚀 Transforma tu Espacio con la Potencia de la IA",
  description:
    "Descubre Room Redesign, la innovadora herramienta de diseño de interiores impulsada por inteligencia artificial. 🖼️ Sube una imagen de tu habitación y explora más de 20 estilos de diseño para recibir visualizaciones fotorrealistas en segundos. ¡Da vida a tus ideas de renovación con facilidad y creatividad! ✨",
  keywords:
    "Room Redesign, diseño de interiores, inteligencia artificial, rediseño de habitaciones, estilos de diseño, visualización fotorrealista, creatividad en decoración, renovación de hogar",
  applicationName: "Room Redesign",
  authors: [{ name: "Fernando Panduro", url: "https://ferpanduro.com" }],
  creator: "Fernando Panduro",
  robots: "index, follow",
  openGraph: {
    type: "website",
    url: "https://room-redesing.vercel.app/",
    title: "Room Redesign: 🚀 Transforma tu Espacio con la Potencia de la IA",
    description:
      "Descubre Room Redesign, la innovadora herramienta de diseño de interiores con inteligencia artificial.",
    siteName: "Room Redesign",
    images: [
      {
        url: "https://room-redesing.vercel.app/image-meta.jpeg",
        alt: "Room Redesign",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    // site: "@tucuenta", // Reemplaza con tu nombre de usuario de Twitter
    // creator: "@tucuenta", // Reemplaza con tu nombre de usuario de Twitter
    title: "Room Redesign: 🚀 Transforma tu Espacio con la Potencia de la IA",
    description:
      "Descubre Room Redesign, la innovadora herramienta de diseño de interiores con inteligencia artificial.",
    images: "https://room-redesing.vercel.app/image-meta.jpeg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange>
          {children}
          <Toaster richColors />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
