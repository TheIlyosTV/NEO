"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, Mail, Lock, User, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { signIn, useSession } from "next-auth/react";

interface User {
  email: string;
  password: string;
  name?: string;
}

const VALID_ADMIN_EMAIL = "zabutolib@gmail.com";
const VALID_ADMIN_PASSWORD = "Mustafo77";

export default function AuthPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const { data: session } = useSession();

  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState("login");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [registerName, setRegisterName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab === "register") {
      setActiveTab("register");
    }
  }, [searchParams]);

  useEffect(() => {
    localStorage.removeItem("loggedInUser");
  }, []);

  useEffect(() => {
    if (session && window.location.pathname === "/auth") {
      const userData = {
        email: session.user?.email || "",
        isAdmin: session.user?.email === VALID_ADMIN_EMAIL,
      };
      localStorage.setItem("loggedInUser", JSON.stringify(userData));
      if (userData.isAdmin) {
        router.push("/admin/dashboard");
      } else {
        router.push("/account");
      }
    }
  }, [session, router]);

  useEffect(() => {
    const userData = localStorage.getItem("loggedInUser");
    if (userData && window.location.pathname === "/auth" && !session) {
      const user = JSON.parse(userData);
      if (user.isAdmin) {
        router.push("/admin/dashboard");
      } else {
        router.push("/account");
      }
    }
  }, [router, session]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (email: string, password: string) => {
    const isAdmin =
      email === VALID_ADMIN_EMAIL && password === VALID_ADMIN_PASSWORD;
    if (isAdmin) {
      const userData = {
        email,
        isAdmin,
      };
      localStorage.setItem("loggedInUser", JSON.stringify(userData));
      if (isAdmin) {
        router.push("/admin/dashboard");
      } else {
        router.push("/account");
      }
      return true;
    }
    return false;
  };

  const handleLoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const success = await handleLogin(loginEmail, loginPassword);
      if (!success) {
        toast({
          title: "Xato",
          description: "Email yoki parol xato",
          variant: "destructive",
        });
      }
    } catch {
      toast({
        title: "Xato",
        description: "Kirishda xatolik yuz berdi",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      const result = await signIn("google", {
        redirect: false,
        callbackUrl: "/account",
      });
      if (result?.error) {
        toast({
          title: "Xato",
          description: "Google orqali kirishda xatolik yuz berdi",
          variant: "destructive",
        });
      }
    } catch {
      toast({
        title: "Xato",
        description: "Google orqali kirishda xatolik yuz berdi",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !registerName ||
      !registerEmail ||
      !registerPassword ||
      !confirmPassword
    ) {
      toast({
        title: "Xato",
        description: "Iltimos, barcha maydonlarni to‘ldiring",
        variant: "destructive",
      });
      return;
    }

    if (!agreeTerms) {
      toast({
        title: "Xato",
        description:
          "Shartlar va Maxfiylik Siyosatiga rozilik berishingiz kerak",
        variant: "destructive",
      });
      return;
    }

    const passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*]).{6,}$/;
    if (!passwordRegex.test(registerPassword)) {
      toast({
        title: "Xato",
        description:
          "Parol kamida 6 belgi, raqam va maxsus belgidan iborat bo‘lishi kerak",
        variant: "destructive",
      });
      return;
    }

    if (registerPassword !== confirmPassword) {
      toast({
        title: "Xato",
        description: "Parollar mos kelmadi",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: registerName,
          email: registerEmail,
          password: registerPassword,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast({
          title: "Muvaffaqiyat",
          description:
            data.message ||
            `Xush kelibsiz, ${registerName}! Hisobingiz muvaffaqiyatli yaratildi.`,
        });
        router.push("/account");
      } else {
        toast({
          title: "Xato",
          description: data.message || "Ro‘yxatdan o‘tishda xatolik yuz berdi",
          variant: "destructive",
        });
      }
    } catch {
      toast({
        title: "Xato",
        description: "Server bilan aloqada xatolik",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center text-sm text-gray-500 mb-8">
        <Link href="/" className="hover:text-gray-700">
          Bosh sahifa
        </Link>
        <ChevronRight className="h-4 w-4 mx-2" />
        <span className="text-gray-900">Kirish</span>
      </div>

      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">Xush Kelibsiz</h1>
          <p className="text-gray-600 mt-2">
            Hisobingizga kirish uchun davom eting
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-8">
          <Tabs
            defaultValue="login"
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="login">Kirish</TabsTrigger>
              <TabsTrigger value="register">Ro&apos;yxatdan o&apos;tish</TabsTrigger>
            </TabsList>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <TabsContent value="login" className="space-y-4">
                  <form onSubmit={handleLoginSubmit}>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <Input
                          id="email"
                          type="email"
                          placeholder="Emailingizni kiriting"
                          className="pl-10"
                          value={loginEmail}
                          onChange={(e) => setLoginEmail(e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2 mt-4">
                      <div className="flex justify-between">
                        <Label htmlFor="password">Parol</Label>
                        <Link
                          href="/auth/forgot-password"
                          className="text-sm text-gray-600 hover:text-gray-900"
                        >
                          Parolni unutdingizmi?
                        </Link>
                      </div>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Parolingizni kiriting"
                          className="pl-10 pr-10"
                          value={loginPassword}
                          onChange={(e) => setLoginPassword(e.target.value)}
                          required
                        />
                        <button
                          type="button"
                          onClick={togglePasswordVisibility}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showPassword ? (
                            <EyeOff className="h-5 w-5" />
                          ) : (
                            <Eye className="h-5 w-5" />
                          )}
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 mt-4">
                      <Checkbox
                        id="remember"
                        checked={rememberMe}
                        onCheckedChange={(checked) =>
                          setRememberMe(checked as boolean)
                        }
                      />
                      <Label htmlFor="remember" className="text-sm">
                        Meni eslab qol
                      </Label>
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-gray-900 hover:bg-gray-800 text-white mt-6"
                      disabled={isLoading}
                    >
                      {isLoading ? "Kirilmoqda..." : "Kirish"}
                    </Button>
                  </form>

                  <div className="relative mt-6">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-300" />
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="bg-white px-2 text-gray-500">
                        Yoki bilan davom eting
                      </span>
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    className="w-full mt-4 flex items-center justify-center gap-2"
                    onClick={handleGoogleSignIn}
                    disabled={isLoading}
                  >
                    <svg className="h-5 w-5" viewBox="0 0 24 24">
                      <path
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.51h5.84c-.25 1.35-1.01 2.49-2.14 3.24v2.69h3.46c2.02-1.86 3.19-4.6 3.19-7.89z"
                        fill="#4285F4"
                      />
                      <path
                        d="M12 23.5c2.89 0 5.31-.94 7.08-2.55l-3.46-2.69c-.98.66-2.23 1.05-3.62 1.05-2.78 0-5.14-1.88-5.98-4.41H2.44v2.77C4.2 21.31 7.71 23.5 12 23.5z"
                        fill="#34A853"
                      />
                      <path
                        d="M6.02 14.09c-.21-.63-.33-1.3-.33-2.09s.12-1.46.33-2.09V7.14H2.44C1.58 8.62 1 10.28 1 12s.58 3.38 1.44 4.86l3.58-2.77z"
                        fill="#FBBC05"
                      />
                      <path
                        d="M12 5.5c1.59 0 3.01.55 4.12 1.62l3.09-3.09C17.31 2.38 14.89 1.5 12 1.5 7.71 1.5 4.2 3.87 2.44 7.14l3.58 2.77c.84-2.53 3.2-4.41 5.98-4.41z"
                        fill="#EA4335"
                      />
                    </svg>
                    Google bilan kirish
                  </Button>
                </TabsContent>

                <TabsContent value="register" className="space-y-4">
                  <form onSubmit={handleRegisterSubmit}>
                    <div className="space-y-2">
                      <Label htmlFor="register-name">To&apos;liq ism</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <Input
                          id="register-name"
                          type="text"
                          placeholder="Ismingizni kiriting"
                          className="pl-10"
                          value={registerName}
                          onChange={(e) => setRegisterName(e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2 mt-4">
                      <Label htmlFor="register-email">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <Input
                          id="register-email"
                          type="email"
                          placeholder="Emailingizni kiriting"
                          className="pl-10"
                          value={registerEmail}
                          onChange={(e) => setRegisterEmail(e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2 mt-4">
                      <Label htmlFor="register-password">Parol</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <Input
                          id="register-password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Parol yarating"
                          className="pl-10 pr-10"
                          value={registerPassword}
                          onChange={(e) => setRegisterPassword(e.target.value)}
                          required
                        />
                        <button
                          type="button"
                          onClick={togglePasswordVisibility}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showPassword ? (
                            <EyeOff className="h-5 w-5" />
                          ) : (
                            <Eye className="h-5 w-5" />
                          )}
                        </button>
                      </div>
                      <p className="text-xs text-gray-500">
                        Parol kamida 6 belgi, raqam va maxsus belgidan iborat
                        bo&apos;lishi kerak.
                      </p>
                    </div>

                    <div className="space-y-2 mt-4">
                      <Label htmlFor="confirm-password">
                        Parolni tasdiqlang
                      </Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <Input
                          id="confirm-password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Parolni tasdiqlang"
                          className="pl-10 pr-10"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          required
                        />
                        <button
                          type="button"
                          onClick={togglePasswordVisibility}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                          {showPassword ? (
                            <EyeOff className="h-5 w-5" />
                          ) : (
                            <Eye className="h-5 w-5" />
                          )}
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 mt-4">
                      <Checkbox
                        id="terms"
                        checked={agreeTerms}
                        onCheckedChange={(checked) =>
                          setAgreeTerms(checked as boolean)
                        }
                        required
                      />
                      <Label
                        htmlFor="terms"
                        className="text-sm text-gray-700 leading-tight whitespace-nowrap"
                      >
                        Men{" "}
                        <Link
                          href="/terms"
                          className="text-gray-900 underline hover:text-gray-700 transition-colors duration-200"
                        >
                          Xizmat shartlari
                        </Link>{" "}
                        va{" "}
                        <Link
                          href="/privacy"
                          className="text-gray-900 underline hover:text-gray-700 transition-colors duration-200"
                        >
                          Maxfiylik siyosati
                        </Link>{" "}
                        ga roziman
                      </Label>
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-gray-900 hover:bg-gray-800 text-white mt-6"
                      disabled={isLoading}
                    >
                      {isLoading ? "Hisob yaratilmoqda..." : "Hisob yaratish"}
                    </Button>
IZES
                  </form>

                  <div className="relative mt-6">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-300" />
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="bg-white px-2 text-gray-500">
                        Yoki bilan davom eting
                      </span>
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    className="w-full mt-4 flex items-center justify-center gap-2"
                    onClick={handleGoogleSignIn}
                    disabled={isLoading}
                  >
                    <svg className="h-5 w-5" viewBox="0 0 24 24">
                      <path
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.51h5.84c-.25 1.35-1.01 2.49-2.14 3.24v2.69h3.46c2.02-1.86 3.19-4.6 3.19-7.89z"
                        fill="#4285F4"
                      />
                      <path
                        d="M12 23.5c2.89 0 5.31-.94 7.08-2.55l-3.46-2.69c-.98.66-2.23 1.05-3.62 1.05-2.78 0-5.14-1.88-5.98-4.41H2.44v2.77C4.2 21.13 7.71 23.5 12 23.5z"
                        fill="#34A853"
                      />
                      <path
                        d="M6.02 14.09c-.21-.63-.33-1.3-.33-2.09s.12-1.46.33-2.09V7.14H2.44C1.58 8.62 1 10.28 1 12s.58 3.38 1.44 4.86l3.58-2.77z"
                        fill="#FBBC05"
                      />
                      <path
                        d="M12 5.5c1.59 0 3.01.55 4.12 1.62l3.09-3.09C17.31 2.38 14.89 1.5 12 1.5 7.71 1.5 4.2 3.87 2.44 7.14l3.58 2.77c.84-2.53 3.2-4.41 5.98-4.41z"
                        fill="#EA4335"
                      />
                    </svg>
                    Google bilan ro&apos;yxatdan o&apos;tish
                  </Button>
                </TabsContent>
              </motion.div>
            </AnimatePresence>
          </Tabs>
        </div>
      </div>
    </div>
  );
}