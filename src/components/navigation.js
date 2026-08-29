"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import LoginModal from "./LoginModal";
import DarkModeToggle from "./DarkModeToggle";
import { clearToken, getToken } from "../lib/auth";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const syncToken = () => setToken(getToken());
    syncToken();
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("storage", syncToken);
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("storage", syncToken);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleLogout = () => {
    clearToken();
    setToken(null);
    setIsOpen(false);
    window.location.href = "/";
  };

  const menuItems = [
    { name: "หน้าแรก", href: "/" },
    { name: "สินค้า", href: "/#products" },
    { name: "เกี่ยวกับเรา", href: "/about" },
    { name: "บริการ", href: "/service" },
    { name: "ติดต่อเรา", href: "/contact" },
  ];

  const textColor = isScrolled ? "text-gray-800 dark:text-white" : "text-white";
  const hoverBg = isScrolled ? "hover:bg-pink-50 dark:hover:bg-white/10" : "hover:bg-white/20";

  return (
    <>
      <nav className={`fixed left-0 top-0 z-50 w-full transition-all duration-500 ${
        isScrolled
          ? "border-b border-pink-100 bg-white/95 shadow-sm backdrop-blur-xl dark:border-purple-900/40 dark:bg-[#24162d]/95"
          : "bg-gradient-to-b from-[#3d1b48]/70 to-transparent backdrop-blur-sm"
      }`}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            <Link href="/" className="group flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-tr from-pink-500 via-fuchsia-500 to-purple-600 text-xl text-white shadow-lg shadow-pink-500/30 transition group-hover:scale-105">
                ✿
              </div>
              <div>
                <h1 className={`text-xl font-extrabold tracking-tight ${textColor}`}>PP BEAUTY</h1>
                <p className={`text-[10px] font-semibold uppercase tracking-[0.2em] ${isScrolled ? "text-pink-500" : "text-pink-100"}`}>
                  Cosmetics & Beauty
                </p>
              </div>
            </Link>

            <div className="flex items-center gap-2 md:gap-3">
              <div className="mr-1 hidden items-center gap-1 md:flex">
                {menuItems.map((item) => (
                  <Link key={item.name} href={item.href} className={`rounded-full px-4 py-2 text-sm font-medium transition ${textColor} ${hoverBg}`}>
                    {item.name}
                  </Link>
                ))}
              </div>
              <div className="hidden sm:block"><DarkModeToggle /></div>
              <Link href="/cart" aria-label="ตะกร้าสินค้า" className={`relative rounded-full p-2.5 transition ${textColor} ${hoverBg}`}>
                <span className="text-xl">🛍️</span>
                <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-fuchsia-600 text-[10px] font-bold text-white ring-2 ring-white">3</span>
              </Link>

              <div className="hidden md:block">
                {token ? (
                  <button onClick={handleLogout} className={`rounded-full border px-5 py-2.5 text-sm font-medium transition ${isScrolled ? "border-pink-200 bg-white text-gray-700 hover:bg-pink-50" : "border-white/50 bg-white/10 text-white hover:bg-white hover:text-purple-800"}`}>ออกจากระบบ</button>
                ) : (
                  <button onClick={() => setIsLoginModalOpen(true)} className={`rounded-full border px-5 py-2.5 text-sm font-medium transition ${isScrolled ? "border-pink-200 bg-white text-gray-700 hover:bg-pink-50" : "border-white/50 bg-white/10 text-white hover:bg-white hover:text-purple-800"}`}>เข้าสู่ระบบ</button>
                )}
              </div>
              {!token && (
                <Link href="/register" className="hidden rounded-full bg-gradient-to-r from-pink-500 to-purple-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-pink-500/20 transition hover:-translate-y-0.5 hover:shadow-lg md:block">
                  สมัครสมาชิก
                </Link>
              )}
              <button onClick={() => setIsOpen(!isOpen)} className={`rounded-full p-2.5 md:hidden ${textColor}`} aria-label="เมนู">
                <div className="space-y-1.5">
                  <span className="block h-0.5 w-5 bg-current"/><span className="block h-0.5 w-5 bg-current"/><span className="block h-0.5 w-5 bg-current"/>
                </div>
              </button>
            </div>
          </div>

          {isOpen && (
            <div className="mb-4 rounded-2xl border border-pink-100 bg-white p-4 shadow-xl dark:border-purple-900 dark:bg-[#2b1b35] md:hidden">
              <div className="flex items-center justify-between px-4 py-3"><span className="text-sm font-medium text-gray-700 dark:text-gray-200">โหมดการแสดงผล</span><DarkModeToggle /></div>
              {menuItems.map((item) => (
                <Link key={item.name} href={item.href} onClick={() => setIsOpen(false)} className="block rounded-xl px-4 py-3 text-sm font-medium text-gray-600 hover:bg-pink-50 hover:text-fuchsia-600 dark:text-gray-200">
                  {item.name}
                </Link>
              ))}
              {!token && <Link href="/register" onClick={() => setIsOpen(false)} className="mt-2 block rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 px-4 py-3 text-center text-sm font-semibold text-white">สมัครสมาชิก</Link>}
            </div>
          )}
        </div>
      </nav>
      <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
    </>
  );
}
