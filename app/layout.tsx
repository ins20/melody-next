"use client";

import "./globals.css";
import { Montserrat } from "next/font/google";

import { cn } from "../lib/utils";

import { ThemeProvider } from "@/components/theme-provider";

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { ModeToggle } from "@/components/ui/toggle";
import { ModulzLogoIcon } from "@radix-ui/react-icons";
import Link from "next/link";

type RootLayoutProps = {
  children: React.ReactNode;
};

export const font = Montserrat({ subsets: ["cyrillic", "latin"] });

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`min-h-screen bg-background font-sans antialiased flex flex-col ${font.className}`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Menubar className="border-none flex justify-between w-full p-10">
            <Link
              href={"/"}
              className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl"
            >
              MELODY
            </Link>
            <ModeToggle />
          </Menubar>
          <main className="flex grow justify-center">{children}</main>

          <footer className="flex h-24 w-full items-center justify-between border-t p-10 flex-col lg:flex-row">
            <ModulzLogoIcon width={50} height={50} />
            <p className="leading-7 text-center">
              Благодаря Melody, пользователи могут наслаждаться широким выбором
              музыкальных треков из различных жанров, альбомов и исполнителей.
            </p>
            <h2 className="scroll-m-20 text-lg-4xl font-extrabold tracking-tight lg:text-5xl">
              MELODY
            </h2>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
