'use client';

import Link from "next/link";
import { motion } from 'framer-motion';
import { Logo } from "@/components/logo";
import { Theme } from "@/components/theme";
import { Site } from "@/components/site";
import DecryptedText from "@/components/motion/text";
import data from "@/data.json";

export default function Home() {
  return (
    <>
      <header className="flex items-center justify-between p-4">
        <Link href="/" className="flex items-center gap-2">
          <Logo size={24} />
          <DecryptedText animateOn="view" sequential text="Superhero" className="font-semibold text-black dark:text-white" encryptedClassName="font-semibold" />
        </Link>
        <Theme />
      </header>
      <main className="px-4">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        >
          {data.map((site) => (
            <motion.div key={site.url} variants={itemVariants}>
              <Site key={site.url} {...site} />
            </motion.div>
          ))}
        </motion.div>
      </main>
      <footer className="py-6 text-center text-xs text-black dark:text-white">
        © {new Date().getFullYear()} Superhero. All rights reserved.
      </footer>
    </>
  )
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};
