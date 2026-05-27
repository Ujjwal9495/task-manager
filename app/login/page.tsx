"use client";

import { useState } from "react";
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
import { Input } from "@/components/ui/input";

import { Mail } from "lucide-react";

export default function LoginPage() {
  // State Variables
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Email Login
  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    // Error Handling
    if (error) {
      alert(error.message);
      return;
    }

    // Redirect
    window.location.href = "/dashboard";
  };

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

        {/* Header */}
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-3xl font-bold text-slate-900">
            Welcome Back
          </CardTitle>

          <CardDescription className="text-slate-500">
            Login to continue managing your tasks
          </CardDescription>
        </CardHeader>

        {/* Content */}
        <CardContent className="space-y-5">

          {/* Email */}
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-12 rounded-xl"
          />

          {/* Password */}
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="h-12 rounded-xl"
          />

          {/* Login Button */}
          <Button
            className="w-full h-12 rounded-xl bg-slate-900 hover:bg-slate-800"
            onClick={handleLogin}
          >
            Login
          </Button>

          {/* Divider */}
          <div className="flex items-center gap-4">
            <div className="h-px flex-1 bg-slate-200"></div>

            <span className="text-sm text-slate-400">OR</span>

            <div className="h-px flex-1 bg-slate-200"></div>
          </div>

          {/* Google Button */}
          <Button
            variant="outline"
            className="w-full h-12 rounded-xl"
            onClick={handleGoogleLogin}
          >
            <Mail className="mr-2 h-4 w-4" />
            Continue with Google
          </Button>

          {/* Register Link */}
          <p className="text-center text-sm text-slate-500">
            Don&apos;t have an account?{" "}
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