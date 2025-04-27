import Link from "next/link";
import { Logo } from "@/components/logo";
import { Theme } from "@/components/theme";
import { Site } from "@/components/site";
import data from "@/data.json";

export default function Home() {
  return (
    <>
      <header className="flex items-center justify-between p-4">
        <Link href="/" className="flex items-center gap-2">
          <Logo size={24} />
          <span className="font-semibold text-black dark:text-white">Superhero</span>
        </Link>
        <Theme />
      </header>
      <main className="px-4">
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {data.map((site) => (
            <Site key={site.url} {...site} />
          ))}
        </div>
      </main>
      <footer className="py-6 text-center text-xs text-black dark:text-white">
        © {new Date().getFullYear()} Superhero. All rights reserved.
      </footer>
    </>
  )
}
