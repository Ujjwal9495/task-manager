"use client";

import Link from "next/link";

import { supabase } from "@/lib/supabase";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import { Mail } from "lucide-react";

export default function LoginPage() {
  // Google Login
  const handleGoogleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: "https://task-manager-murex-omega-53.vercel.app/dashboard",
      },
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-12">
      <Card className="w-full max-w-md border border-slate-200 bg-white shadow-xl">

        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-3xl font-bold text-slate-900">
            Welcome Back
          </CardTitle>

          <CardDescription className="text-slate-500">
            Login to continue managing your tasks
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-5">
          <Button
            variant="outline"
            className="w-full h-12 rounded-xl"
            onClick={handleGoogleLogin}
          >
            <Mail className="mr-2 h-4 w-4" />
            Continue with Google
          </Button>

          <p className="text-center text-sm text-slate-500">
            Don&apos;t have an account? {" "}
            <Link
              href="/register"
              className="font-medium text-slate-900 hover:underline"
            >
              Create Account
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}