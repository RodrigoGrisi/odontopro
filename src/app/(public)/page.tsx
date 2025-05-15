import Header from "@/app/(public)/_components/header";
import { Hero } from "@/app/(public)/_components/hero";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <Header />
      <div>
        <Hero />
      </div>
    </div>
  )
}