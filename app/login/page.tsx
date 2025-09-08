"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useAuthStore } from "@/stores/auth-store";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { Activity, Stethoscope, Brain } from "lucide-react";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const { login, isLoading, error } = useAuthStore();
  const [showDemo, setShowDemo] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginForm) => {
    const success = await login(data.email, data.password);
    if (success) {
      router.push("/dashboard");
    }
  };

  const useDemoAccount = (role: "doctor" | "staff") => {
    const demoCredentials = {
      doctor: { email: "doctor@falconcare.com", password: "secret" },
      staff: { email: "staff@falconcare.com", password: "secret" },
    };

    const creds = demoCredentials[role];
    setValue("email", creds.email);
    setValue("password", creds.password);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 healthcare-gradient relative">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative z-10 flex flex-col justify-center px-12 text-white">
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-6">
              <div className="h-12 w-12 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <Activity className="h-7 w-7" />
              </div>
              <h1 className="text-3xl font-bold">FalconCare</h1>
            </div>
            <h2 className="text-2xl font-semibold mb-4">
              AI-Native Revenue Cycle Management
            </h2>
            <p className="text-lg text-white/90 leading-relaxed">
              Streamline your healthcare operations with intelligent automation,
              from patient encounters to claim submissions.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <div className="flex items-start space-x-4">
              <div className="h-8 w-8 rounded bg-white/20 flex items-center justify-center flex-shrink-0">
                <Stethoscope className="h-4 w-4" />
              </div>
              <div>
                <h3 className="font-semibold">Smart Clinical Processing</h3>
                <p className="text-white/80 text-sm">
                  AI extracts structured data from clinical notes and suggests
                  optimal coding
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="h-8 w-8 rounded bg-white/20 flex items-center justify-center flex-shrink-0">
                <Brain className="h-4 w-4" />
              </div>
              <div>
                <h3 className="font-semibold">Intelligent Workflows</h3>
                <p className="text-white/80 text-sm">
                  Automated eligibility checks, claim optimization, and denial
                  management
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Login form */}
      <div className="flex-1 flex items-center justify-center px-8 lg:px-12">
        <div className="w-full max-w-md">
          <div className="text-center mb-8 lg:hidden">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Activity className="h-8 w-8 text-falcon-500" />
              <h1 className="text-2xl font-bold">FalconCare</h1>
            </div>
          </div>

          <Card>
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold">Welcome back</CardTitle>
              <CardDescription>
                Sign in to your FalconCare account to continue
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    {...register("email")}
                    // error={errors.email?.message}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    {...register("password")}
                    // error={errors.password?.message}
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  disabled={isLoading}
                  //   variant="falcon"
                >
                  {isLoading ? (
                    <>
                      <LoadingSpinner size="sm" className="mr-2" />
                      Signing in...
                    </>
                  ) : (
                    "Sign In"
                  )}
                </Button>
              </form>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    Or try demo
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => useDemoAccount("doctor")}
                  disabled={isLoading}
                >
                  Demo Doctor
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => useDemoAccount("staff")}
                  disabled={isLoading}
                >
                  Demo Staff
                </Button>
              </div>

              <p className="text-center text-sm text-muted-foreground">
                Demo credentials are pre-filled for testing purposes
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
