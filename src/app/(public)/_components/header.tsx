"use client";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { LogIn, Menu } from "lucide-react";

export function Header() {

  const [isOpen, setIsOpen] = useState(false);
  const session = null

  const navItens = [
    { label: "Página Inicial", href: "/" },
    { label: "Planos", href: "/planos" },
  ];

  const NavLinks = () => {
    return (
      <>
        {navItens.map((link) => (
          <Button
            onClick={() => setIsOpen(false)}
            key={link.href}
            asChild
            className="bg-transparent hover:bg-transparent text-black hover:text-emerald-600 shadow-none text-base"
          >
            <Link href={link.href}>
              {link.label}
            </Link>
          </Button>
        ))}

        {/* MOBILE */}
        <div className="block md:hidden w-full">
          {session ? (
            <Link
              href="/dashboard"
              className="flex items-center justify-center gap-2 w-full bg-green-500 text-white rounded-md px-4 py-2 hover:opacity-90"
            >
              Acessar Dashboard
              <LogIn />
            </Link>
          ) : (
            <Button className="flex items-center justify-center gap-2 w-full bg-green-500 text-white rounded-md px-4 py-2 hover:opacity-90">
              Fazer login
              <LogIn />
            </Button>
          )}
        </div>

        {/* DESKTOP */}
        <div className="hidden md:flex">
          {session ? (
            <Button variant="default" asChild>
              <Link href="/dashboard" className="flex items-center gap-2">
                Acessar Dashboard
                <LogIn />
              </Link>
            </Button>
          ) : (
            <Button className="flex items-center gap-2">
              Fazer login
              <LogIn />
            </Button>
          )}
        </div>
      </>
    );
  };


  return (
    <header className="fixed top-0 left-0 right-0 bg-white text-black z-[999] px-4 md:px-64 py-4">
      <div className="container mx-auto flex justify-between items-center">
        <a href="/" className="flex items-center gap-1 hover:opacity-90">
          <span className="text-emerald-600 text-4xl font-bold">Odonto
            <span className="text-black text-4xl drop-shadow">Pro</span>
          </span>

        </a>

        <nav className="hidden md:flex flex-wrap items-center gap-4 px-4 py-2 rounded">
          <NavLinks />
        </nav>

        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button
              className="text-black hover:bg-transparent"
              variant="ghost"
              size="icon"
            >
              <Menu className="w-6 h-6" />
            </Button>
          </SheetTrigger>

          <SheetContent
            side="right"
            className="w-[250px] sm:w-[300px] z-[9999] px-4 py-6"
          >
            <SheetHeader>
              <SheetTitle className="text-left text-lg font-semibold text-emerald-600">
                Menu
              </SheetTitle>
              <SheetDescription className="text-left text-sm text-emerald-600">
                Veja nossos links
              </SheetDescription>
            </SheetHeader>

            <nav className="flex flex-col items-start gap-3 mt-6 w-full">
              <NavLinks />
            </nav>
          </SheetContent>
        </Sheet>

      </div>
    </header>
  );
}

export default Header;
