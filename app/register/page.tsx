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

export default function RegisterPage() {
  // State Variables
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Email Signup
  const handleSignup = async () => {
    // Password Match Check
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    // Signup with Supabase
    const { error } = await supabase.auth.signUp({
      email,
      password,

      options: {
        data: {
          full_name: fullName,
        },
      },
    });

    // Error Handling
    if (error) {
      alert(error.message);
      return;
    }

    alert("Account created successfully!");

    // Redirect
    window.location.href = "/dashboard";
  };

  // Google Login
  const handleGoogleLogin = async () => {
     console.log("Google button clicked");
    await supabase.auth.signInWithOAuth({
      provider: "google",

      options: {
        redirectTo: "http://localhost:3000/dashboard",
      },
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-12">
      <Card className="w-full max-w-md border border-slate-200 bg-white shadow-xl">

        {/* Header */}
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-3xl font-bold text-slate-900">
            Create Account
          </CardTitle>

          <CardDescription className="text-slate-500">
            Start managing your tasks efficiently
          </CardDescription>
        </CardHeader>

        {/* Content */}
        <CardContent className="space-y-5">

          {/* Full Name */}
          <Input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="h-12 rounded-xl"
          />

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

          {/* Confirm Password */}
          <Input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="h-12 rounded-xl"
          />

          {/* Signup Button */}
          <Button
            className="w-full h-12 rounded-xl bg-slate-900 hover:bg-slate-800"
            onClick={handleSignup}
          >
            Create Account
          </Button>

          {/* Divider */}
          <div className="flex items-center gap-4">
            <div className="h-px flex-1 bg-slate-200"></div>

            <span className="text-sm text-slate-400">OR</span>

            <div className="h-px flex-1 bg-slate-200"></div>
          </div>

         <button
          type="button"
            className="w-full h-12 rounded-xl border border-slate-300 flex items-center justify-center gap-2"
               onClick={() => handleGoogleLogin()}
>
        <Mail className="h-4 w-4" />
        Continue with Google
        </button>

          {/* Login Link */}
          <p className="text-center text-sm text-slate-500">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-medium text-slate-900 hover:underline"
            >
              Login
            </Link>
          </p>

        </CardContent>
      </Card>
    </div>
  );
}