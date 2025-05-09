import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">O'quvchilar Testi</h1>
        </div>
      </header>
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h2 className="text-3xl font-bold tracking-tight">O'quvchilar uchun test platformasi</h2>
          <p className="text-lg text-gray-600">
            Bilimingizni sinab ko'rish uchun testni boshlang. Test yakunida natijalaringiz o'qituvchiga yuboriladi.
          </p>
          <div className="pt-4">
            <Link href="/register">
              <Button size="lg" className="px-8">
                Testni boshlash
              </Button>
            </Link>
          </div>
        </div>
      </main>
      <footer className="bg-gray-50 border-t py-6">
        <div className="container mx-auto px-4 text-center text-gray-500">
          &copy; {new Date().getFullYear()} O'quvchilar Test Platformasi
        </div>
      </footer>
    </div>
  )
}
