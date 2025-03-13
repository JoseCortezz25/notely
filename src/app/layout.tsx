import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { ThemeProvider } from "@/components/providers/theme-provider";
import "./globals.scss";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/app-sidebar";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Textify Notes",
  description: "A simple note-taking app powered AI",
  metadataBase: new URL("https://textify-notes.vercel.app/")
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      className={montserrat.className}
      lang="en"
      suppressHydrationWarning
    >
      <head />
      <body className="bg-black-pearl-50 text-neutral-950 dark:text-black-pearl-50 dark:bg-black-pearl-950">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SidebarProvider>
            <AppSidebar />
            {children}
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
