"use client";
import { useState } from "react";
import { ChevronLeft, ChevronRight, Menu } from "lucide-react";
import { usePathname } from "next/navigation";

export default function SideBarDashboard({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const toggleMobileMenu = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen">

      {/* MOBILE TOPBAR FIXA */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-gray-800 text-white p-4 flex justify-between items-center shadow-md">
        <h2 className="text-xl font-bold">Meu Dashboard</h2>
        <button onClick={toggleMobileMenu} className="text-white">
          <Menu />
        </button>
      </div>


{isMobileOpen && (
  <nav className="md:hidden fixed top-16 left-0 right-0 z-40 bg-gray-700 text-white flex flex-col space-y-2 p-4 shadow-md">
    <a href="#" className="hover:bg-gray-600 px-3 py-2 rounded">🏠 Home</a>
    <a href="#" className="hover:bg-gray-600 px-3 py-2 rounded">👤 Perfil</a>
    <a href="#" className="hover:bg-gray-600 px-3 py-2 rounded">⚙️ Configurações</a>
    <a href="#" className="hover:bg-gray-600 px-3 py-2 rounded">🚪 Sair</a>
  </nav>
)}

      {/* DESKTOP SIDEBAR */}
      <aside
        className={`
          hidden md:flex relative transition-all duration-300
          bg-gray-800 text-white p-4 flex-col ${isCollapsed ? "w-20" : "w-64"}
        `}
      >
        <button
          onClick={toggleSidebar}
          className="absolute top-4 -right-3 w-6 h-6 bg-gray-700 text-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-600 transition"
        >
          {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>

        {!isCollapsed && <h2 className="text-2xl font-bold mb-6">Meu Dashboard</h2>}

        <nav className="flex flex-col space-y-3 mt-4">
          <a href="#" className="hover:bg-gray-700 px-3 py-2 rounded">
            {isCollapsed ? "🏠" : "Home"}
          </a>
          <a href="#" className="hover:bg-gray-700 px-3 py-2 rounded">
            {isCollapsed ? "👤" : "Perfil"}
          </a>
          <a href="#" className="hover:bg-gray-700 px-3 py-2 rounded">
            {isCollapsed ? "⚙️" : "Configurações"}
          </a>
          <a href="#" className="hover:bg-gray-700 px-3 py-2 rounded">
            {isCollapsed ? "🚪" : "Sair"}
          </a>
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <div className="flex-1 p-4 bg-gray-100 pt-16 md:pt-4">
        {children}
      </div>
    </div>
  );
}
