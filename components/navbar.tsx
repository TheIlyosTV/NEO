"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import {
  Search,
  ShoppingBag,
  User,
  Menu,
  X,
  Heart,
  ChevronDown,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/context/cart-context";
import { useAuth } from "@/context/auth-context";
import { useWishlist } from "@/context/wishlist-context";
import CartMenu from "@/components/cart-menu";
import { useLanguage, type Language } from "@/context/language-context";

export function Navbar() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);
  const controls = useAnimation();

  const { user, logout } = useAuth();
  const { itemCount } = useCart();
  const { itemCount: wishlistCount } = useWishlist();
  const { language, setLanguage, t } = useLanguage();

  const languages = [
    { code: "UZB", name: "O'zbek" },
    { code: "ENG", name: "English" },
    { code: "RUS", name: "Русский" },
  ];

  // Search funksiyasi
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery("");
      setMobileMenuOpen(false);
    }
  };

  const handleLanguageChange = (newLanguage: Language) => {
    setLanguage(newLanguage);
    setLanguageOpen(false);
    if (typeof window !== "undefined") {
      localStorage.setItem("currentLanguage", newLanguage);
      const event = new CustomEvent("languageChange", {
        detail: { language: newLanguage },
      });
      window.dispatchEvent(event);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const isScrolledNow = window.scrollY > 50;
      setIsScrolled(isScrolledNow);
      controls.start(isScrolledNow ? "scrolled" : "default");
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [controls]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (cartOpen && !target.closest("[data-cart-container]")) {
        setCartOpen(false);
      }
      if (languageOpen && !target.closest("[data-language-container]")) {
        setLanguageOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [cartOpen, languageOpen]);

  const headerVariants = {
    default: {
      paddingTop: "1rem",
      paddingBottom: "1rem",
      backgroundColor: "rgba(255, 255, 255, 0.8)",
      backdropFilter: "blur(12px)",
    },
    scrolled: {
      paddingTop: "0.5rem",
      paddingBottom: "0.5rem",
      backgroundColor: "rgba(255, 255, 255, 1)",
      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
    },
  };

  const navItemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.3,
        ease: "easeOut",
      },
    }),
    hover: {
      scale: 1.05,
      transition: { duration: 0.2 },
    },
    tap: { scale: 0.95 },
  };

  const badgeVariants = {
    initial: { scale: 0 },
    animate: { scale: 1 },
    exit: { scale: 0 },
  };

  const languageVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 10 },
  };

  return (
    <motion.header
      initial="default"
      animate={controls}
      variants={headerVariants}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'shadow-md' : ''}`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Link href="/" className="text-2xl font-bold text-gray-900">
              NEO
            </Link>
          </motion.div>

          <nav className="hidden md:flex items-center space-x-8">
            {[
              { href: "/", label: t.home || "Home" },
              { href: "/category/men", label: t.men || "Men" },
              { href: "/category/women", label: t.women || "Women" },
              { href: "/category/shoes", label: t.shoes || "Shoes" },
              { href: "/category/perfumery", label: t.perfumery || "Perfumery" },
            ].map((item, i) => (
              <motion.div
                key={item.href}
                custom={i}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                whileTap="tap"
                variants={navItemVariants}
              >
                <Link
                  href={item.href}
                  className="text-gray-700 hover:text-gray-900 transition-colors"
                >
                  {item.label}
                </Link>
              </motion.div>
            ))}
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <div className="relative" data-language-container>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setLanguageOpen(!languageOpen)}
                className="flex items-center text-gray-700 hover:text-gray-900 transition-colors"
              >
                <span className="text-sm font-medium">{language}</span>
                <ChevronDown className="h-4 w-4 ml-1" />
              </motion.button>

              <AnimatePresence>
                {languageOpen && (
                  <motion.div
                    variants={languageVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-32 bg-white rounded-md shadow-lg border z-50"
                  >
                    <div className="py-1">
                      {languages.map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() =>
                            handleLanguageChange(lang.code as Language)
                          }
                          className={`block w-full text-left px-4 py-2 text-sm ${
                            language === lang.code
                              ? "bg-gray-100 text-gray-900"
                              : "text-gray-700 hover:bg-gray-50"
                          }`}
                        >
                          {lang.name}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setSearchOpen(!searchOpen)}
              className="text-gray-700 hover:text-gray-900 transition-colors"
            >
              <Search className="h-5 w-5" />
            </motion.button>

            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Link
                href="/wishlist"
                className="text-gray-700 hover:text-gray-900 transition-colors relative"
              >
                <Heart className="h-5 w-5" />
                {wishlistCount > 0 && (
                  <motion.div
                    variants={badgeVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="absolute -top-2 -right-2"
                  >
                    <Badge className="bg-gray-900 text-white border-none">
                      {wishlistCount}
                    </Badge>
                  </motion.div>
                )}
              </Link>
            </motion.div>

            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Link
                href={user ? "/account" : "/auth"}
                className="text-gray-700 hover:text-gray-900 transition-colors"
              >
                <User className="h-5 w-5" />
              </Link>
            </motion.div>

            <div className="relative" data-cart-container>
              <button
                onClick={() => setCartOpen(!cartOpen)}
                className="relative text-gray-700 hover:text-gray-900 transition-colors"
              >
                <ShoppingBag className="h-5 w-5" />
                {itemCount > 0 && (
                  <motion.div
                    variants={badgeVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="absolute -top-2 -right-2"
                  >
                    <Badge className="bg-gray-900 text-white border-none">
                      {itemCount}
                    </Badge>
                  </motion.div>
                )}
              </button>
              {cartOpen && (
                <div className="absolute right-0 top-full z-50">
                  <CartMenu onClose={() => setCartOpen(false)} />
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-4 md:hidden">
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Link
                href="/wishlist"
                className="text-gray-700 hover:text-gray-900 transition-colors relative"
              >
                <Heart className="h-5 w-5" />
                {wishlistCount > 0 && (
                  <motion.div
                    variants={badgeVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="absolute -top-2 -right-2"
                  >
                    <Badge className="bg-gray-900 text-white border-none">
                      {wishlistCount}
                    </Badge>
                  </motion.div>
                )}
              </Link>
            </motion.div>

            <div className="relative" data-cart-container>
              <button
                onClick={() => setCartOpen(!cartOpen)}
                className="relative text-gray-700 hover:text-gray-900 transition-colors"
              >
                <ShoppingBag className="h-5 w-5" />
                {itemCount > 0 && (
                  <motion.div
                    variants={badgeVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="absolute -top-2 -right-2"
                  >
                    <Badge className="bg-gray-900 text-white border-none">
                      {itemCount}
                    </Badge>
                  </motion.div>
                )}
              </button>
              {cartOpen && (
                <div className="absolute right-0 top-full z-50">
                  <CartMenu onClose={() => setCartOpen(false)} />
                </div>
              )}
            </div>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="text-gray-700"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </motion.button>
          </div>
        </div>

        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0, marginTop: 0 }}
              animate={{
                opacity: 1,
                height: "auto",
                marginTop: "1rem",
              }}
              exit={{ opacity: 0, height: 0, marginTop: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <form onSubmit={handleSearch} className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  type="search"
                  placeholder={t.searchPlaceholder || "Qidirish..."}
                  className="pl-10 pr-10 py-2 w-full"
                  autoFocus
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => {
                    setSearchOpen(false);
                    setSearchQuery("");
                  }}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="h-5 w-5" />
                </motion.button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{
              opacity: 1,
              height: "auto",
            }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden bg-white border-t overflow-hidden"
          >
            <div className="container mx-auto px-4 py-4">
              <motion.form
                onSubmit={handleSearch}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="relative mb-4"
              >
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  type="search"
                  placeholder={t.searchPlaceholder || "Qidirish..."}
                  className="pl-10 w-full"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </motion.form>

              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-500 mb-2">
                  {t.language || "Til"}
                </h3>
                <div className="flex space-x-2">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() =>
                        handleLanguageChange(lang.code as Language)
                      }
                      className={`px-3 py-1 rounded-md text-sm ${
                        language === lang.code
                          ? "bg-gray-900 text-white"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {lang.name}
                    </button>
                  ))}
                </div>
              </div>

              <nav className="flex flex-col space-y-4">
                {[
                  { href: "/", label: t.home || "Bosh sahifa" },
                  { href: "/category/men", label: t.men || "Erkaklar" },
                  { href: "/category/women", label: t.women || "Ayollar" },
                  { href: "/category/shoes", label: t.shoes || "Oyoq kiyim" },
                  {
                    href: "/category/perfumery",
                    label: t.perfumery || "Atirlar",
                  },
                ].map((item, i) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15 + i * 0.05 }}
                  >
                    <Link
                      href={item.href}
                      className="text-gray-700 hover:text-gray-900 transition-colors py-2 block"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <div className="mt-6 flex flex-col space-y-4">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <Link
                    href={user ? "/account" : "/auth"}
                    className="flex items-center text-gray-700 hover:text-gray-900 transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <User className="h-5 w-5 mr-2" />
                    {user
                      ? t.myAccount || "Mening hisobim"
                      : t.signInRegister || "Kirish / Ro'yxatdan o'tish"}
                  </Link>
                </motion.div>

                {user && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.45 }}
                  >
                    <button
                      onClick={() => {
                        logout();
                        setMobileMenuOpen(false);
                      }}
                      className="flex items-center text-gray-700 hover:text-gray-900 transition-colors w-full"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                        />
                      </svg>
                      {t.signOut || "Chiqish"}
                    </button>
                  </motion.div>
                )}

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <Link
                    href="/wishlist"
                    className="flex items-center text-gray-700 hover:text-gray-900 transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Heart className="h-5 w-5 mr-2" />
                    {t.wishlist || "Sevimlilar"}
                  </Link>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.55 }}
                >
                  <Link
                    href="/customer-service"
                    className="flex items-center text-gray-700 hover:text-gray-900 transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                      />
                    </svg>
                    {t.customerService || "Mijozlarga xizmat"}
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}