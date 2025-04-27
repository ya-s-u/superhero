'use client';

import Link from "next/link";
import Image from "next/image";
import { useTheme } from 'next-themes';
import { useMounted } from '@/hooks/dom';

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
    >
      <Image src={`/captures/${new URL(url).host}/${theme}.jpeg`}
        width={768}
        height={480}
        alt={title}
        className="rounded"
      />
    </Link>
  )
}