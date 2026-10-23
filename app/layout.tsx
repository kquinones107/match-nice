import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Conecta Bonito",
  description: "Una experiencia interactiva de coqueteo, preguntas con picardía y planes para descubrir si hay química.",
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="es"><body>{children}</body></html>;
}
