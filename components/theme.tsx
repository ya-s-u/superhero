'use client';

import { MonitorCog, Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useMounted } from '@/hooks/dom';

export const Theme = () => {
  const mounted = useMounted();
  const { theme, setTheme, themes } = useTheme();

  if (!mounted) return null;

  return (
    <div className="flex items-center gap-4">
      {themes.map((item) => (
        <button
          key={item}
          onClick={() => setTheme(item)}
          className={`flex items-center justify-center cursor-pointer ${
            item === theme ? '' : ''
          }`}
        >
          {item === 'light' ? (
            <Sun className="size-4" />
          ) : item === 'system' ? (
            <MonitorCog className="size-4" />
          ) : (
            <Moon className="size-4" />
          )}
        </button>
      ))}
    </div>
  );
};
