import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Design System SCI GLORIA
        brand: {
          blue: "#0B192C",       // Bleu Nuit Profond (Primaire)
          blueLight: "#162E52",  // Bleu Nuit Doux
          gold: "#F59E0B",       // Jaune Chantier / Or (Accent BTP)
          goldLight: "#FDE68A",  // Doré doux
          surface: "#F8FAFC",    // Gris Platine fond cartes
          border: "#E5E7EB",     // Gris Délicat bordures
          muted: "#4B5563",      // Gris Métal textes secondaires
          whatsapp: "#25D366",   // Vert Officiel WhatsApp Business
        },
      },
      fontFamily: {
        sans: ["var(--font-poppins)", "sans-serif"],
        poppins: ["var(--font-poppins)", "sans-serif"],
      },
      boxShadow: {
        stack: "0 20px 40px -15px rgba(11, 25, 44, 0.08)",
        card: "0 10px 30px -10px rgba(11, 25, 44, 0.06)",
        hover: "0 25px 50px -12px rgba(11, 25, 44, 0.15)",
      },
    },
  },
  plugins: [],
};

export default config;
