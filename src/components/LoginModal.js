"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  LOGIN_ENDPOINTS,
  apiMessage,
  extractToken,
  extractUser,
  saveToken,
  saveUser,
} from "../lib/auth";
import Swal from "sweetalert2";

const FEATURES = [
  { icon: "🛡️", title: "ปลอดภัย", desc: "ข้อมูลของคุณได้รับการดูแล" },
  { icon: "🛍️", title: "ช้อปง่าย", desc: "ค้นหาและเลือกซื้อสินค้าได้ง่าย" },
  { icon: "💬", title: "บริการดี", desc: "พร้อมช่วยเหลือและให้คำแนะนำ" },
];

export default function LoginModal({ isOpen, onClose }) {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setUsername("");
      setPassword("");
      setShowSuccess(false);
      setLoading(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username.trim() || !password.trim()) {
      await Swal.fire({
        icon: "warning",
        title: "กรุณากรอกข้อมูลให้ครบ",
        confirmButtonColor: "#2563eb",
      });
      return;
    }

    setLoading(true);

    try {
      let isSuccess = false;

      for (const url of LOGIN_ENDPOINTS) {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({ username: username.trim(), password }),
        });

        const contentType = response.headers.get("content-type") || "";
        const data = contentType.includes("application/json")
          ? await response.json().catch(() => ({}))
          : { message: await response.text().catch(() => "") };

        if (response.ok) {
          const token = extractToken(data);
          if (!token) {
            throw new Error("ไม่พบ Token จากเซิร์ฟเวอร์");
          }
          saveToken(token);
          saveUser(extractUser(data, username.trim()));
          setShowSuccess(true);
          isSuccess = true;

          setTimeout(() => {
            onClose();
            router.push("/User");
          }, 1000);
          break;
        }

        if (response.status === 404 || response.status === 405) {
          continue;
        }

        throw new Error(apiMessage(data, `HTTP ${response.status}`));
      }

      if (!isSuccess) {
        throw new Error("ไม่พบ Login API ที่ใช้งานได้");
      }
    } catch (error) {
      console.error("LOGIN MODAL ERROR:", error);
      await Swal.fire({
        icon: "error",
        title: "เข้าสู่ระบบไม่สำเร็จ",
        text: error?.message || "ไม่สามารถเข้าสู่ระบบได้",
        confirmButtonColor: "#2563eb",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#020817]/70 p-4 backdrop-blur-md">
        <div className="relative w-full max-w-4xl overflow-hidden rounded-3xl border border-white/10 bg-white shadow-2xl dark:bg-[#102542]">
          {/* Close Button */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close Modal"
            className="absolute right-5 top-5 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white/80 text-gray-500 shadow-sm transition hover:bg-gray-100 hover:text-gray-900 dark:bg-[#102542]/80 dark:text-gray-300 dark:hover:bg-[#1b3858]"
          >
            ✕
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Left Panel */}
            <div className="hidden bg-gradient-to-br from-pink-600 via-purple-600 to-pink-800 p-10 text-white md:flex md:flex-col md:justify-center">
              <div className="mb-8">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 text-lg font-bold shadow-lg backdrop-blur">
                  BAS
                </div>
                <h2 className="mt-7 text-3xl font-bold">ยินดีต้อนรับกลับมา 👋</h2>
                <p className="mt-3 leading-relaxed text-pink-100">
                  เข้าสู่ระบบเพื่อใช้งาน BB SHOP และสัมผัสประสบการณ์การช้อปปิ้งที่ง่ายขึ้น
                </p>
              </div>

              {/* Features List */}
              <div className="space-y-4">
                {FEATURES.map((item) => (
                  <div key={item.title} className="flex items-center gap-4 rounded-2xl bg-white/10 p-4 backdrop-blur">
                    <div className="text-2xl">{item.icon}</div>
                    <div>
                      <p className="font-semibold">{item.title}</p>
                      <p className="text-xs text-pink-100">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Panel (Form) */}
            <div className="p-7 sm:p-10">
              <div className="mb-7 md:hidden">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-pink-600 to-purple-500 text-sm font-bold text-white shadow-lg">
                  BAS
                </div>
              </div>

              <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">เข้าสู่ระบบ</h2>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  กรุณากรอกข้อมูลของคุณเพื่อเข้าสู่ระบบ
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Username */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-200">
                    Username
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -trangray-y-1/2 text-gray-400">👤</span>
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="กรอก Username"
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3.5 pl-11 pr-4 text-gray-900 outline-none transition focus:border-pink-500 focus:bg-white focus:ring-4 focus:ring-pink-500/10 dark:border-[#2a4868] dark:bg-[#0b1b33] dark:text-white dark:focus:bg-[#102542]"
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <label className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                      Password
                    </label>
                    <Link
                      href="/forgot-password"
                      className="text-xs font-medium text-pink-600 hover:text-pink-700 dark:text-pink-400"
                    >
                      ลืมรหัสผ่าน?
                    </Link>
                  </div>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -trangray-y-1/2 text-gray-400">🔒</span>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3.5 pl-11 pr-4 text-gray-900 outline-none transition focus:border-pink-500 focus:bg-white focus:ring-4 focus:ring-pink-500/10 dark:border-[#2a4868] dark:bg-[#0b1b33] dark:text-white dark:focus:bg-[#102542]"
                    />
                  </div>
                </div>

                {/* Remember Me */}
                <label className="flex cursor-pointer items-center gap-3">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="h-4 w-4 rounded border-gray-300 text-pink-600 focus:ring-pink-500"
                  />
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    จดจำการเข้าสู่ระบบ
                  </span>
                </label>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="group flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-pink-600 to-purple-600 py-3.5 font-semibold text-white shadow-lg shadow-pink-500/20 transition-all duration-300 hover:-trangray-y-0.5 hover:from-pink-700 hover:to-purple-700 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? (
                    <>
                      <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                      กำลังเข้าสู่ระบบ...
                    </>
                  ) : (
                    <>
                      เข้าสู่ระบบ
                      <span className="transition-transform group-hover:trangray-x-1">→</span>
                    </>
                  )}
                </button>
              </form>

              {/* Divider */}
              <div className="my-7 flex items-center gap-4">
                <div className="h-px flex-1 bg-gray-200 dark:bg-[#1e3b5c]" />
                <span className="text-xs text-gray-400">หรือ</span>
                <div className="h-px flex-1 bg-gray-200 dark:bg-[#1e3b5c]" />
              </div>

              {/* Register */}
              <p className="text-center text-sm text-gray-500 dark:text-gray-400">
                ยังไม่มีบัญชี?
                <Link
                  href="/register"
                  onClick={onClose}
                  className="ml-1 font-semibold text-pink-600 hover:text-pink-700 dark:text-pink-400"
                >
                  สมัครสมาชิก
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      {showSuccess && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-[#020817]/60 p-4 backdrop-blur-md">
          <div className="w-full max-w-sm overflow-hidden rounded-3xl border border-white/20 bg-white p-8 text-center shadow-2xl animate-in fade-in zoom-in-95 duration-300 dark:border-[#2a4868] dark:bg-[#102542]">
            <div className="relative mx-auto flex h-20 w-20 items-center justify-center">
              <div className="absolute inset-0 animate-ping rounded-full bg-green-400/20" />
              <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-green-50 dark:bg-green-500/10">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-3xl text-white shadow-lg shadow-green-500/30">
                  ✓
                </div>
              </div>
            </div>

            <h2 className="mt-7 text-2xl font-bold text-gray-900 dark:text-white">ยินดีต้อนรับกลับมา!</h2>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">เข้าสู่ระบบสำเร็จ</p>
            <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">กำลังนำคุณไปยังหน้าหลัก...</p>

            <div className="mt-7 h-2 overflow-hidden rounded-full bg-gray-100 dark:bg-[#0b1b33]">
              <div className="h-full w-full origin-left animate-[shrink_1s_linear] rounded-full bg-gradient-to-r from-green-400 to-green-600" />
            </div>
            <p className="mt-3 text-xs text-gray-400">1 วินาที</p>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes shrink {
          from {
            transform: scaleX(1);
          }
          to {
            transform: scaleX(0);
          }
        }
      `}</style>
    </>
  );
}