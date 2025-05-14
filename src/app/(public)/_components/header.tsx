import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";

export function Header() {
  const website = "https://www.google.com.br";

  const navLinks = [
    { label: "Home", href: website },
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Contact", href: "/contact" },
    { label: "Login", href: "/login" },
  ];

  return (
    <header className="fixed top-0 left-0 w-full bg-rose-500 text-white z-[999] px-4 md:px-64 py-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <a href={website} className="flex items-center gap-1 hover:opacity-90">
          <span className="text-zinc-900 text-4xl font-bold">Job</span>
          <span className="text-white text-4xl drop-shadow">Pro</span>
        </a>

        <nav className="hidden md:flex space-x-6">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="hover:text-gray-200">
              {link.label}
            </a>
          ))}
        </nav>

        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                className="bg-white text-rose-500 hover:bg-gray-200"
                variant="ghost"
                size="icon"
              >
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[350px] z-[9999]">
              <SheetHeader className="mt-4 mx-2">
                <SheetTitle className="text-rose-500">Menu</SheetTitle>
              </SheetHeader>
              <nav className="mt-4 flex flex-col divide-y divide-rose-200/40 mx-6">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className="py-2 text-rose-500 hover:text-rose-700 transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

export default Header;
