import clsx from "clsx";
import type { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(...inputs));
}

export function dateFormat(date: Date) {
  const day = String(date.getDate()).padStart(2, '0'); // Day with leading zero
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Month (0-based)
  const year = date.getFullYear();

  return `${day}/${month}/${year}`; // Format as dd/mm/yyyy
}