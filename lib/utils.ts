/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react-hooks/rules-of-hooks */

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(
  amount: number,
  currency: string = "AED"
): string {
  return new Intl.NumberFormat("en-AE", {
    style: "currency",
    currency: currency,
  }).format(amount);
}

export function formatDate(
  date: Date | string,
  options?: Intl.DateTimeFormatOptions
): string {
  const dateObj = typeof date === "string" ? new Date(date) : date;

  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    ...options,
  }).format(dateObj);
}

export function formatRelativeTime(date: Date | string): string {
  const now = Date.now();
  const then =
    typeof date === "string" ? new Date(date).getTime() : date.getTime();
  const diff = Math.floor((now - then) / 1000); // seconds

  if (diff < 60) return "now";
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  if (diff < 2592000) return `${Math.floor(diff / 86400)}d ago`;
  return `${Math.floor(diff / 2592000)}mo ago`;
}

export function getStatusColor(status: string): {
  bg: string;
  text: string;
  border?: string;
} {
  const statusColors: Record<
    string,
    { bg: string; text: string; border?: string }
  > = {
    draft: { bg: "bg-gray-100", text: "text-gray-800" },
    processing: { bg: "bg-blue-100", text: "text-blue-800" },
    submitted: { bg: "bg-yellow-100", text: "text-yellow-800" },
    approved: { bg: "bg-green-100", text: "text-green-800" },
    denied: { bg: "bg-red-100", text: "text-red-800" },
    paid: { bg: "bg-green-100", text: "text-green-800" },
    review: { bg: "bg-orange-100", text: "text-orange-800" },
    active: { bg: "bg-green-100", text: "text-green-800" },
    inactive: { bg: "bg-gray-100", text: "text-gray-800" },
  };

  return statusColors[status.toLowerCase()] || statusColors.draft;
}

export function getConfidenceColor(confidence: number): {
  bg: string;
  text: string;
  border: string;
} {
  if (confidence >= 0.9) {
    return {
      bg: "bg-green-50",
      text: "text-green-700",
      border: "border-green-200",
    };
  } else if (confidence >= 0.7) {
    return {
      bg: "bg-yellow-50",
      text: "text-yellow-700",
      border: "border-yellow-200",
    };
  } else {
    return { bg: "bg-red-50", text: "text-red-700", border: "border-red-200" };
  }
}

export function calculateAge(dateOfBirth: Date | string): number {
  const birth =
    typeof dateOfBirth === "string" ? new Date(dateOfBirth) : dateOfBirth;
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }

  return age;
}

export function generateMRN(): string {
  const prefix = "MRN";
  const timestamp = Date.now().toString().slice(-6);
  const random = Math.floor(Math.random() * 1000)
    .toString()
    .padStart(3, "0");
  return `${prefix}${timestamp}${random}`;
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "...";
}

export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function isValidPhone(phone: string): boolean {
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
  return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ""));
}

export function formatPhoneNumber(phone: string): string {
  const cleaned = phone.replace(/\D/g, "");

  if (cleaned.startsWith("971")) {
    // UAE number format
    return cleaned.replace(/(\d{3})(\d{2})(\d{3})(\d{4})/, "+$1 $2 $3 $4");
  } else if (cleaned.startsWith("966")) {
    // Saudi Arabia number format
    return cleaned.replace(/(\d{3})(\d{2})(\d{3})(\d{4})/, "+$1 $2 $3 $4");
  } else if (cleaned.length === 10) {
    // Generic 10-digit format
    return cleaned.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
  }

  return phone;
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout;

  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}
