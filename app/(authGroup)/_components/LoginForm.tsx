"use client";

import React, { useActionState, useEffect, useState } from "react";
import { Eye, EyeOff, Lock, Mail, ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { loginSchema, type LoginFormValues } from "@/lib/validation/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginAction } from "../_actions/authActions";
import { toast } from "sonner";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  // 1. React 19 Action State
  const [state, action, pending] = useActionState(LoginAction, false);

  // 2. React Hook Form Setup with Zod
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 3. Submit Handler
  const onFormSubmit = (data: LoginFormValues) => {
    React.startTransition(() => {
      action(data);
    });
  };

  // 4. Watch for State Changes & Errors
  useEffect(() => {
    if (!state) return;

    if (!state.success && state.message) {
      toast.error(state.message || "Login failed");
    }
  }, [state]);

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
      {/* 1. Email Input */}
      <div>
        <label className="block text-xs font-semibold text-foreground mb-1">
          Email Address
        </label>
        <div className="relative">
          <Mail className="w-4 h-4 absolute left-3.5 top-3 text-muted-foreground" />
          <input
            type="email"
            placeholder="john@example.com"
            {...register("email")}
            className="w-full bg-background border border-border rounded-xl pl-10 pr-4 py-2.5 text-sm font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>
        {errors.email && (
          <p className="text-xs font-medium text-destructive mt-1">
            {errors.email.message}
          </p>
        )}
      </div>

      {/* 2. Password Input */}
      <div>
        <label className="block text-xs font-semibold text-foreground">
          Password
        </label>

        <div className="relative">
          <Lock className="w-4 h-4 absolute left-3.5 top-3 text-muted-foreground" />
          <input
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            {...register("password")}
            className="w-full bg-background border border-border rounded-xl pl-10 pr-10 py-2.5 text-sm font-medium text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3.5 top-3 text-muted-foreground hover:text-foreground"
          >
            {showPassword ? (
              <EyeOff className="w-4 h-4" />
            ) : (
              <Eye className="w-4 h-4" />
            )}
          </button>
        </div>
        {errors.password && (
          <p className="text-xs font-medium text-destructive mt-1">
            {errors.password.message}
          </p>
        )}

        <div className="items-end text-end">
          <Link
            href="/forgot-password"
            className="text-xs text-primary hover:underline font-semibold"
          >
            Forgot password?
          </Link>
        </div>
      </div>

      {/* 3. Submit Button */}
      <Button
        type="submit"
        disabled={pending}
        className="w-full py-6 rounded-xl font-bold text-sm shadow-md cursor-pointer flex items-center justify-center gap-2 mt-2"
      >
        {pending ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Logging in...</span>
          </>
        ) : (
          <>
            <span>Log In</span>
            <ArrowRight className="w-4 h-4" />
          </>
        )}
      </Button>
    </form>
  );
};

export default LoginForm;
