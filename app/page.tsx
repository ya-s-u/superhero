import Link from "next/link";
import Image from "next/image";
import { Logo } from "@/components/logo";
import { Theme } from "@/components/theme";

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
          {Array.from({ length: 99 }).map((_, i) => (
            <Link
              key={i}
              href={`/hero/${i + 1}`}
            >
              <Image src="https://screenshotone.com/_astro/stripe.DktQZYtB_2nk9Aw.webp"
                width={768}
                height={480}
                alt=""
                className="rounded"
              />
            </Link>
          ))}
        </div>
      </main>
      <footer className="py-6 text-center text-xs text-black dark:text-white">
        © {new Date().getFullYear()} Superhero. All rights reserved.
      </footer>
    </>
  )
}
