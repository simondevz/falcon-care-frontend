import type { Metadata } from "next";
import "./globals.css";
import ReactQueryProvider from "@/providers/react-query-provider";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "@/components/auth-provider";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "FalconCare - AI-Native RCM Platform",
  description:
    "Intelligent Revenue Cycle Management for GCC Healthcare Providers",
  keywords: ["healthcare", "RCM", "AI", "medical coding", "claims processing"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ReactQueryProvider>
            <AuthProvider>
              {children}
              <Toaster />
            </AuthProvider>
          </ReactQueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
