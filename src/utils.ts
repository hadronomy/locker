import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export async function delay(ms: number) {
  return new Promise((res) => setTimeout(res, ms));
}

export function getBaseUrl() {
  if (typeof window !== 'undefined') return ''; // browser should use relative url
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`; // SSR should use vercel url
  return `http://localhost:${process.env.PORT ?? 3000}`; // dev SSR should use localhost
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
