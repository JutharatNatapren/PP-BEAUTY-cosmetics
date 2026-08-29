"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

// ==========================================
// Login API
// ==========================================
const LOGIN_URL = "https://api.itdev.cmtc.ac.th/auth/login";

export default function LoginPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    txt_username: "",
    txt_password: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // SweetAlert2 Dark Theme Defaults
  const swalDark = {
    background: "#0f172a",
    color: "#fff",
  };

  // ==========================================
  // เปลี่ยนค่าช่องกรอก
  // ==========================================
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // ==========================================
  // Login
  // ==========================================
  const handleLogin = async (e) => {
    e.preventDefault();

    if (!form.txt_username.trim()) {
      await Swal.fire({
        ...swalDark,
        icon: "warning",
        title: "กรุณากรอก Username",
        text: "กรุณากรอก Username ก่อนเข้าสู่ระบบ",
        confirmButtonText: "ตกลง",
        confirmButtonColor: "#8b5cf6",
      });
      return;
    }

    if (!form.txt_password.trim()) {
      await Swal.fire({
        ...swalDark,
        icon: "warning",
        title: "กรุณากรอก Password",
        text: "กรุณากรอกรหัสผ่านก่อนเข้าสู่ระบบ",
        confirmButtonText: "ตกลง",
        confirmButtonColor: "#8b5cf6",
      });
      return;
    }

    try {
      setIsLoading(true);

      const response = await fetch(LOGIN_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: form.txt_username,
          password: form.txt_password,
        }),
      });

      const result = await response.json().catch(() => ({}));

      // Login สำเร็จ
      if (response.ok) {
        if (result.token) {
          localStorage.setItem("token", result.token);
        }

        if (result.user) {
          localStorage.setItem("user", JSON.stringify(result.user));
        }

        if (!result.token) {
          await Swal.fire({
            ...swalDark,
            icon: "error",
            title: "ไม่พบ Token",
            text: "Login สำเร็จแต่ API ไม่ส่ง Token กลับมา",
            confirmButtonText: "ตกลง",
            confirmButtonColor: "#ef4444",
          });
          return;
        }

        await Swal.fire({
          ...swalDark,
          icon: "success",
          title: "เข้าสู่ระบบสำเร็จ",
          timer: 1200,
          showConfirmButton: false,
        });

        router.push("/User");
        return;
      }

      // Handle Errors
      if (response.status === 401) {
        await Swal.fire({
          ...swalDark,
          icon: "error",
          title: "เข้าสู่ระบบไม่สำเร็จ",
          text: result.message || "Username หรือรหัสผ่านไม่ถูกต้อง",
          confirmButtonText: "ตกลง",
          confirmButtonColor: "#ef4444",
        });
        return;
      }

      if (response.status === 400) {
        await Swal.fire({
          ...swalDark,
          icon: "warning",
          title: `ข้อมูลไม่ถูกต้อง (${response.status})`,
          text: result.message || "กรุณาตรวจสอบข้อมูลที่กรอก",
          confirmButtonText: "ตกลง",
          confirmButtonColor: "#f59e0b",
        });
        return;
      }

      await Swal.fire({
        ...swalDark,
        icon: "error",
        title: `เข้าสู่ระบบไม่สำเร็จ (${response.status})`,
        text: result.message || "เกิดข้อผิดพลาดในการเข้าสู่ระบบ",
        confirmButtonText: "ตกลง",
        confirmButtonColor: "#ef4444",
      });
    } catch (error) {
      await Swal.fire({
        ...swalDark,
        icon: "error",
        title: "ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้",
        text: "ไม่สามารถส่ง Request ไปยัง API ได้ กรุณาลองใหม่อีกครั้ง",
        confirmButtonText: "ตกลง",
        confirmButtonColor: "#ef4444",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#090d16] text-gray-100 selection:bg-fuchsia-500 selection:text-black">
      {/* Background Neon Effects */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/3 h-96 w-96 -trangray-x-1/2 -trangray-y-1/2 rounded-full bg-violet-600/15 blur-[120px]" />
        <div className="absolute right-1/4 bottom-1/4 h-80 w-80 rounded-full bg-fuchsia-500/10 blur-[100px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_1px,transparent_1px)] [background-size:32px_32px]" />
      </div>

      <div className="relative z-10 flex min-h-screen items-center justify-center p-4">
        <div className="w-full max-w-md">
          
          {/* Logo & Header */}
          <div className="mb-6 text-center">
            <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-tr from-violet-600 via-purple-600 to-fuchsia-400 text-2xl font-black text-white shadow-lg shadow-violet-500/20">
              🎮
            </div>
            <span className="inline-block rounded-full border border-fuchsia-500/30 bg-fuchsia-500/10 px-3 py-1 text-[11px] font-bold tracking-wider text-fuchsia-400">
              GAMING PLATFORM
            </span>
          </div>

          {/* Form Card */}
          <div className="overflow-hidden rounded-3xl border border-gray-800 bg-gray-950/80 backdrop-blur-xl shadow-2xl shadow-violet-950/20">
            <div className="h-1 bg-gradient-to-r from-violet-500 via-fuchsia-400 to-emerald-400" />

            <div className="border-b border-gray-800/80 px-6 py-6 text-center">
              <h1 className="text-2xl font-extrabold text-white">
                เข้าสู่ระบบ
              </h1>
              <p className="mt-1 text-xs text-gray-400">
                ยินดีต้อนรับกลับ! กรอกข้อมูลเพื่อเข้าใช้งานบัญชีของคุณ
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-5 p-6">
              {/* Username Input */}
              <div>
                <label
                  htmlFor="txt_username"
                  className="mb-2 block text-xs font-semibold text-gray-300 uppercase tracking-wider"
                >
                  Username
                </label>
                <input
                  id="txt_username"
                  type="text"
                  name="txt_username"
                  value={form.txt_username}
                  onChange={handleChange}
                  autoComplete="username"
                  disabled={isLoading}
                  placeholder="กรอกชื่อผู้ใช้งาน"
                  className="w-full rounded-xl border border-gray-800 bg-gray-900/90 px-4 py-3 text-sm text-white placeholder-gray-500 outline-none transition focus:border-fuchsia-500 focus:ring-2 focus:ring-fuchsia-500/20 disabled:opacity-50"
                />
              </div>

              {/* Password Input */}
              <div>
                <label
                  htmlFor="txt_password"
                  className="mb-2 block text-xs font-semibold text-gray-300 uppercase tracking-wider"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    id="txt_password"
                    type={showPassword ? "text" : "password"}
                    name="txt_password"
                    value={form.txt_password}
                    onChange={handleChange}
                    autoComplete="current-password"
                    disabled={isLoading}
                    placeholder="กรอกรหัสผ่าน"
                    className="w-full rounded-xl border border-gray-800 bg-gray-900/90 px-4 py-3 pr-16 text-sm text-white placeholder-gray-500 outline-none transition focus:border-fuchsia-500 focus:ring-2 focus:ring-fuchsia-500/20 disabled:opacity-50"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -trangray-y-1/2 text-xs font-semibold text-fuchsia-400 hover:text-fuchsia-300 transition"
                  >
                    {showPassword ? "ซ่อน" : "แสดง"}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="mt-2 w-full rounded-xl bg-violet-600 py-3.5 text-sm font-bold text-white transition-all hover:bg-violet-500 hover:shadow-lg hover:shadow-violet-600/30 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    กำลังเข้าสู่ระบบ...
                  </span>
                ) : (
                  "เข้าสู่ระบบ"
                )}
              </button>

              {/* Register Redirect */}
              <p className="pt-2 text-center text-xs text-gray-400">
                ยังไม่มีบัญชีสมาชิก?{" "}
                <button
                  type="button"
                  onClick={() => router.push("/register")}
                  className="font-bold text-fuchsia-400 hover:text-fuchsia-300 hover:underline"
                >
                  สมัครสมาชิกที่นี่
                </button>
              </p>
            </form>

            <div className="border-t border-gray-800/80 bg-gray-900/40 px-6 py-4 text-center">
              <p className="text-[11px] text-gray-500">
                BEAUTY STORE • Secured Authentication System
              </p>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}