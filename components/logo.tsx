'use client';

import { useTheme } from 'next-themes';
import { useMounted } from '@/hooks/dom';

interface Props {
  size?: number | string;
}

export const Logo = ({ size = 266 }: Props) => {
  const mounted = useMounted();
  const { theme } = useTheme();

  if (!mounted) return null;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 266 266"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M76.0447 0C34.0464 0 0 34.0464 0 76.0447V189.955C0 231.954 34.0464 266 76.0447 266H189.955C231.954 266 266 231.954 266 189.955V76.0447C266 34.0464 231.954 0 189.955 0H76.0447ZM132.844 48.5059L66.6565 151.295H132.844V217.494L199.031 114.705H132.844V48.5059Z"
        fill={theme === "dark" ? "white" : "black"}
      />
    </svg>
  )
}