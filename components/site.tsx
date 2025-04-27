'use client';

import Link from "next/link";
import Image from "next/image";
import { useTheme } from 'next-themes';
import { useMounted } from '@/hooks/dom';
import SpotlightCard from "./motion/card";
import { ExternalLink } from "lucide-react";

interface Props {
  title: string;
  url: string;
}

export const Site = ({ title, url }: Props) => {
  const mounted = useMounted();
  const { theme } = useTheme();

  if (!mounted) return null;

  return (
    <Link
      href={url}
      target="_blank"
      className="group relative"
    >
      <SpotlightCard spotlightColor={theme === "light" ? "rgba(0, 0, 0, 0.6)" : "rgba(255, 255, 255, 0.4)"}>
        <Image src={`/captures/${new URL(url).host}/${theme === "light" ? "light" : "dark"}.jpeg`}
          width={768}
          height={480}
          alt={title}
          className="rounded transition duration-300 group-hover:opacity-50"
        />
      </SpotlightCard>
      <div className="pointer-events-none absolute inset-0 hidden group-hover:flex items-center justify-center transition duration-300">
        <ExternalLink size={30} color="white" className="shadow-xl" />
      </div>
    </Link>
  )
}