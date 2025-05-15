import React from "react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-gray-800 text-white flex flex-col p-4">
        <h2 className="text-2xl font-bold mb-6">Meu Dashboard</h2>
        <nav className="flex flex-col space-y-3">
          <a href="#" className="hover:bg-gray-700 px-3 py-2 rounded">
            Home
          </a>
          <a href="#" className="hover:bg-gray-700 px-3 py-2 rounded">
            Perfil
          </a>
          <a href="#" className="hover:bg-gray-700 px-3 py-2 rounded">
            Configurações
          </a>
          <a href="#" className="hover:bg-gray-700 px-3 py-2 rounded">
            Sair
          </a>
        </nav>
      </aside>

      {/* Conteúdo principal */}
      <main className="flex-1 p-6 bg-gray-100">
        {children}
      </main>
    </div>
  );
}
