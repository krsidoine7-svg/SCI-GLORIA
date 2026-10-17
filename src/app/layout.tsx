import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { JsonLd } from "@/components/JsonLd";
import { FavoritesProvider } from "@/context/FavoritesContext";
import { FavoritesDrawer } from "@/components/FavoritesDrawer";
import { CartProvider } from "@/context/CartContext";
import { CartDrawer } from "@/components/CartDrawer";
import { PageLoader } from "@/components/PageLoader";

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://scigloria.ci"),
  title: "SCI GLORIA INVESTMENT & CO — Construction, Immobilier & Matériaux (Abidjan)",
  description:
    "Magasin & Entrepôt à Marcory en bas du pont, près de la pharmacie Tiaco. Construction, unité de fabrication de briques, vente de matériaux de finition et gestion immobilière sécurisée à Abidjan.",
  keywords: [
    "SCI GLORIA",
    "briques Abidjan",
    "construction Côte d'Ivoire",
    "matériaux Marcory",
    "gestion immobilière Abidjan",
    "terrains sécurisés ACD",
    "devis gratuit BTP",
  ],
  authors: [{ name: "SCI GLORIA INVESTMENT & CO" }],
  openGraph: {
    title: "SCI GLORIA INVESTMENT & CO — BTP & Immobilier à Abidjan",
    description:
      "Vente de briques, matériaux de construction et gestion immobilière à Marcory en bas du pont.",
    url: "https://scigloria.ci",
    siteName: "SCI GLORIA INVESTMENT & CO",
    locale: "fr_CI",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SCI GLORIA INVESTMENT & CO — BTP & Immobilier à Abidjan",
    description:
      "Magasin, entrepôt et unité industrielle de fabrication de briques à Marcory.",
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={poppins.variable}>
      <head>
        <JsonLd />
      </head>
      <body className="font-sans bg-white text-brand-blue min-h-screen antialiased flex flex-col w-full max-w-full">
        {/* Page / Écran de chargement immersif à l'arrivée sur le site */}
        <PageLoader />

        <FavoritesProvider>
          <CartProvider>
            {children}
            <CartDrawer />
            <FavoritesDrawer />
          </CartProvider>
        </FavoritesProvider>
      </body>
    </html>
  );
}
