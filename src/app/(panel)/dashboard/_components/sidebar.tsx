"use client"
import { useState } from 'react'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from '@/components/ui/button'
import { Banknote, CalendarCheck2, ChevronLeft, ChevronRight, Folder, List, Settings } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import logotipoOdontoPro from '../../../../../public/imgs/logo.png'

export function SidebarDashboard({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = useState(false)

  return (
    <div className="flex min-h-screen w-full">

      {/* Sidebar fixa no desktop */}
      <aside
        className={clsx(
          "flex flex-col bg-background transition-all duration-400",
          {
            "w-20": isCollapsed,
            "w-64": !isCollapsed,
            "hidden md:flex md:fixed": true,
          }
        )}
      >
        <div className="h-[72px] flex p-2 items-center justify-between">
          {!isCollapsed && (
            <Image
              src={logotipoOdontoPro}
              alt="Logotipo Odonto Pro"
              width={180}
              quality={100}
              className="transition-opacity duration-400 ease-in-out "
            />
          )}
          {isCollapsed ? (
            <Button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="p-2 rounded-lg bg-gray-500 hover:bg-emerald-400
             text-white transition-colors duration-400"
            >
              <span className="w-12 flex items-center justify-center">
                <ChevronRight className="w-6 h-6" />
              </span>
            </Button>
          ) : (
            <Button onClick={() => setIsCollapsed(!isCollapsed)}
              className="p-2 rounded-lg bg-emerald-500 hover:bg-emerald-400
             text-white transition-colors duration-400"
            >
              <span className="w-6 flex items-center justify-center ">
                <ChevronLeft className="w-6 h-6" />
              </span>
            </Button>
          )}
        </div>


        <nav className="flex flex-col gap-4 ">
          <SidebarLink
            href="/dashboard"
            label="Agendamentos"
            pathname={pathname}
            isCollapsed={isCollapsed}
            icon={<CalendarCheck2 className="w-6 h-6 text-center" />}
          />
          <SidebarLink
            href="/dashboard/services"
            label="Serviços"
            pathname={pathname}
            isCollapsed={isCollapsed}
            icon={<Folder className="w-6 h-6" />}
          />
          <SidebarLink
            href="/dashboard/profile"
            label="Meu perfil"
            pathname={pathname}
            isCollapsed={isCollapsed}
            icon={<Settings className="w-6 h-6" />}
          />
          <SidebarLink
            href="/dashboard/plans"
            label="Planos"
            pathname={pathname}
            isCollapsed={isCollapsed}
            icon={<Banknote className="w-6 h-6" />}
          />
        </nav>
      </aside>

      {/* Conteúdo principal */}
      <div
        className={clsx("flex flex-1 flex-col transition-all duration-300", {
          "md:ml-20": isCollapsed,
          "md:ml-64": !isCollapsed,
        })}
      >
        {/* Header Mobile */}
        <header className="md:hidden flex items-center justify-between border-b px-2 md:px-6 h-14 z-10 sticky top-0 bg-white">

          <div>
            <Image src={logotipoOdontoPro}
              alt="Logotipo Odonto Pro"
              width={180}
              quality={100}
            />
          </div>
          <Sheet>
            <div className="flex items-center gap-4">
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="md:hidden">
                  <List className="w-5 h-5" />
                </Button>
              </SheetTrigger>

            </div>

            <SheetContent side="right" className="sm:max-w-xs text-black">
              <SheetHeader>
                <SheetTitle>Menu administrativo</SheetTitle>
                <div>
                  <Image src={logotipoOdontoPro}
                    alt="Logotipo Odonto Pro"
                    width={500}
                    quality={100}
                  />
                </div>
              </SheetHeader>

              <nav className="grid gap-2 text-base pt-5">
                <SidebarLink
                  href="/dashboard"
                  label="Agendamentos"
                  pathname={pathname}
                  isCollapsed={false}
                  icon={<CalendarCheck2 className="w-6 h-6" />}
                />
                <SidebarLink
                  href="/dashboard/services"
                  label="Serviços"
                  pathname={pathname}
                  isCollapsed={false}
                  icon={<Folder className="w-6 h-6" />}
                />
                <SidebarLink
                  href="/dashboard/profile"
                  label="Meu perfil"
                  pathname={pathname}
                  isCollapsed={false}
                  icon={<Settings className="w-6 h-6" />}
                />
                <SidebarLink
                  href="/dashboard/plans"
                  label="Planos"
                  pathname={pathname}
                  isCollapsed={false}
                  icon={<Banknote className="w-6 h-6" />}
                />
              </nav>
            </SheetContent>
          </Sheet>
        </header>

        {/* Conteúdo renderizado */}
        <main className="flex-1 py-4 px-2 md:p-6">
          {children}
        </main>
      </div>
    </div>
  )
}

interface SidebarLinkProps {
  href: string
  icon: React.ReactNode
  label: string
  pathname: string
  isCollapsed: boolean
}

function SidebarLink({ href, icon, isCollapsed, label, pathname }: SidebarLinkProps) {
  return (
    <Link href={href}>
      <div
        className={clsx(
          "flex items-center px-3 py-2 rounded-md transition-colors mx-2",
          {
            "justify-center": isCollapsed,
            "gap-3": !isCollapsed,
            "text-white bg-emerald-500": pathname === href,
            "text-gray-700 hover:bg-gray-100": pathname !== href,
          }
        )}
      >
        <span className="w-6 h-6 flex items-center justify-center">{icon}</span>
        {!isCollapsed && <span>{label}</span>}
      </div>
    </Link>
  )
}
