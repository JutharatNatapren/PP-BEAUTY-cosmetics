"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

const REGISTER_URL = "https://api.itdev.cmtc.ac.th/users";

export default function FormRegister() {
  const router = useRouter();

  const [form, setForm] = useState({
    txt_firstname: "",
    txt_lastname: "",
    txt_email: "",
    txt_phone: "",
    txt_username: "",
    txt_password: "",
  });

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // SweetAlert2 Dark Theme Defaults
  const swalDark = {
    background: "#0f172a",
    color: "#fff",
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ==========================================
    // ตรวจข้อมูล
    // ==========================================
    if (
      !form.txt_firstname.trim() ||
      !form.txt_lastname.trim() ||
      !form.txt_email.trim() ||
      !form.txt_phone.trim() ||
      !form.txt_username.trim() ||
      !form.txt_password.trim()
    ) {
      await Swal.fire({
        ...swalDark,
        icon: "warning",
        title: "กรุณากรอกข้อมูลให้ครบ",
        text: "กรุณากรอกข้อมูลทุกช่องก่อนสมัครสมาชิก",
        confirmButtonText: "ตกลง",
        confirmButtonColor: "#8b5cf6",
      });
      return;
    }

    // ตรวจ Email เบื้องต้น
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.txt_email.trim())) {
      await Swal.fire({
        ...swalDark,
        icon: "warning",
        title: "Email ไม่ถูกต้อง",
        text: "กรุณากรอก Email ให้ถูกต้อง",
        confirmButtonText: "ตกลง",
        confirmButtonColor: "#8b5cf6",
      });
      return;
    }

    // ตรวจ Password
    if (form.txt_password.length < 6) {
      await Swal.fire({
        ...swalDark,
        icon: "warning",
        title: "Password สั้นเกินไป",
        text: "กรุณาตั้งรหัสผ่านอย่างน้อย 6 ตัวอักษร",
        confirmButtonText: "ตกลง",
        confirmButtonColor: "#8b5cf6",
      });
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(REGISTER_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          firstname: form.txt_firstname.trim(),
          lastname: form.txt_lastname.trim(),
          email: form.txt_email.trim(),
          phone: form.txt_phone.trim(),
          username: form.txt_username.trim(),
          password: form.txt_password,
        }),
      });

      const contentType = response.headers.get("content-type") || "";
      let data = {};

      if (contentType.includes("application/json")) {
        data = await response.json().catch(() => ({}));
      } else {
        const text = await response.text().catch(() => "");
        data = { message: text };
      }

      // สมัครสำเร็จ
      if (response.ok) {
        await Swal.fire({
          ...swalDark,
          icon: "success",
          title: "สมัครสมาชิกสำเร็จ",
          text: "กำลังนำคุณไปหน้าเข้าสู่ระบบ",
          timer: 1500,
          showConfirmButton: false,
        });

        setForm({
          txt_firstname: "",
          txt_lastname: "",
          txt_email: "",
          txt_phone: "",
          txt_username: "",
          txt_password: "",
        });

        router.push("/pagelogin");
        return;
      }

      // 400 ข้อมูลไม่ถูกต้อง
      if (response.status === 400) {
        await Swal.fire({
          ...swalDark,
          icon: "warning",
          title: "ข้อมูลไม่ถูกต้อง",
          text: data.message || data.error || "กรุณาตรวจสอบข้อมูลที่กรอก",
          confirmButtonText: "ตกลง",
          confirmButtonColor: "#f59e0b",
        });
        return;
      }

      // 409 ข้อมูลซ้ำ
      if (response.status === 409) {
        await Swal.fire({
          ...swalDark,
          icon: "warning",
          title: "ข้อมูลซ้ำ",
          text: data.message || data.error || "Username หรือ Email นี้มีผู้ใช้งานแล้ว",
          confirmButtonText: "ตกลง",
          confirmButtonColor: "#f59e0b",
        });
        return;
      }

      // Error อื่นๆ
      await Swal.fire({
        ...swalDark,
        icon: "error",
        title: `สมัครสมาชิกไม่สำเร็จ (${response.status})`,
        text: data.message || data.error || "เกิดข้อผิดพลาดในการลงทะเบียน",
        confirmButtonText: "ตกลง",
        confirmButtonColor: "#ef4444",
      });
    } catch (error) {
      await Swal.fire({
        ...swalDark,
        icon: "error",
        title: "ไม่สามารถเชื่อมต่อ API",
        text: "ไม่สามารถส่งข้อมูลไปยังเซิร์ฟเวอร์ได้",
        confirmButtonText: "ตกลง",
        confirmButtonColor: "#ef4444",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#090d16] text-gray-100 selection:bg-fuchsia-500 selection:text-black py-12 px-4">
      {/* Background Neon Effects */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/4 h-96 w-96 -trangray-x-1/2 -trangray-y-1/2 rounded-full bg-violet-600/15 blur-[120px]" />
        <div className="absolute right-1/4 bottom-1/4 h-80 w-80 rounded-full bg-fuchsia-500/10 blur-[100px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_1px,transparent_1px)] [background-size:32px_32px]" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-xl">
        {/* Header */}
        <div className="mb-6 text-center">
          <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-tr from-violet-600 via-purple-600 to-fuchsia-400 text-2xl font-black text-white shadow-lg shadow-violet-500/20">
            🎮
          </div>
          <span className="inline-block rounded-full border border-fuchsia-500/30 bg-fuchsia-500/10 px-3 py-1 text-[11px] font-bold tracking-wider text-fuchsia-400">
            JOIN BAS COMMUNITY
          </span>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            สร้างบัญชีใหม่
          </h1>
          <p className="mt-2 text-xs text-gray-400">
            ลงทะเบียนเพื่อเข้าถึงตลาดซื้อขายไอดีเกมที่ปลอดภัยที่สุด
          </p>
        </div>

        {/* Card */}
        <div className="overflow-hidden rounded-3xl border border-gray-800 bg-gray-950/80 backdrop-blur-xl shadow-2xl shadow-violet-950/20">
          <div className="h-1 bg-gradient-to-r from-violet-500 via-fuchsia-400 to-emerald-400" />

          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
            {/* Personal Section */}
            <div>
              <div className="mb-4 flex items-center gap-2 border-b border-gray-800 pb-2">
                <span className="text-fuchsia-400">👤</span>
                <h2 className="text-sm font-bold text-gray-200 uppercase tracking-wider">
                  ข้อมูลส่วนตัว
                </h2>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-gray-300">
                    ชื่อ
                  </label>
                  <input
                    type="text"
                    name="txt_firstname"
                    value={form.txt_firstname}
                    onChange={handleChange}
                    placeholder="กรอกชื่อจริง"
                    disabled={loading}
                    className="w-full rounded-xl border border-gray-800 bg-gray-900/90 px-4 py-3 text-sm text-white placeholder-gray-500 outline-none transition focus:border-fuchsia-500 focus:ring-2 focus:ring-fuchsia-500/20 disabled:opacity-50"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-gray-300">
                    นามสกุล
                  </label>
                  <input
                    type="text"
                    name="txt_lastname"
                    value={form.txt_lastname}
                    onChange={handleChange}
                    placeholder="กรอกนามสกุล"
                    disabled={loading}
                    className="w-full rounded-xl border border-gray-800 bg-gray-900/90 px-4 py-3 text-sm text-white placeholder-gray-500 outline-none transition focus:border-fuchsia-500 focus:ring-2 focus:ring-fuchsia-500/20 disabled:opacity-50"
                  />
                </div>
              </div>

              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-gray-300">
                    อีเมล
                  </label>
                  <input
                    type="email"
                    name="txt_email"
                    value={form.txt_email}
                    onChange={handleChange}
                    placeholder="name@example.com"
                    disabled={loading}
                    className="w-full rounded-xl border border-gray-800 bg-gray-900/90 px-4 py-3 text-sm text-white placeholder-gray-500 outline-none transition focus:border-fuchsia-500 focus:ring-2 focus:ring-fuchsia-500/20 disabled:opacity-50"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-gray-300">
                    เบอร์โทรศัพท์
                  </label>
                  <input
                    type="tel"
                    name="txt_phone"
                    value={form.txt_phone}
                    onChange={handleChange}
                    placeholder="08X-XXX-XXXX"
                    disabled={loading}
                    className="w-full rounded-xl border border-gray-800 bg-gray-900/90 px-4 py-3 text-sm text-white placeholder-gray-500 outline-none transition focus:border-fuchsia-500 focus:ring-2 focus:ring-fuchsia-500/20 disabled:opacity-50"
                  />
                </div>
              </div>
            </div>

            {/* Account Section */}
            <div>
              <div className="mb-4 flex items-center gap-2 border-b border-gray-800 pb-2">
                <span className="text-violet-400">🔐</span>
                <h2 className="text-sm font-bold text-gray-200 uppercase tracking-wider">
                  ข้อมูลบัญชี
                </h2>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-gray-300">
                    Username
                  </label>
                  <input
                    type="text"
                    name="txt_username"
                    value={form.txt_username}
                    onChange={handleChange}
                    placeholder="ตั้งชื่อผู้ใช้งาน"
                    disabled={loading}
                    className="w-full rounded-xl border border-gray-800 bg-gray-900/90 px-4 py-3 text-sm text-white placeholder-gray-500 outline-none transition focus:border-fuchsia-500 focus:ring-2 focus:ring-fuchsia-500/20 disabled:opacity-50"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-gray-300">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="txt_password"
                      value={form.txt_password}
                      onChange={handleChange}
                      placeholder="อย่างน้อย 6 ตัวอักษร"
                      disabled={loading}
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
              </div>
            </div>

            {/* Terms Checkbox */}
            <div className="rounded-xl border border-gray-800 bg-gray-900/40 p-3.5">
              <label className="flex cursor-pointer items-start gap-3">
                <input
                  type="checkbox"
                  required
                  className="mt-0.5 h-4 w-4 rounded border-gray-700 bg-gray-900 text-violet-600 focus:ring-violet-500/20"
                />
                <p className="text-xs leading-relaxed text-gray-400">
                  ฉันยอมรับ{" "}
                  <span className="font-semibold text-fuchsia-400 hover:underline">
                    เงื่อนไขการใช้งาน
                  </span>{" "}
                  และ{" "}
                  <span className="font-semibold text-fuchsia-400 hover:underline">
                    นโยบายความเป็นส่วนตัว
                  </span>
                </p>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-violet-600 py-3.5 text-sm font-bold text-white transition-all hover:bg-violet-500 hover:shadow-lg hover:shadow-violet-600/30 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  กำลังสมัครสมาชิก...
                </span>
              ) : (
                "สร้างบัญชี →"
              )}
            </button>
          </form>

          {/* Footer Redirect */}
          <div className="border-t border-gray-800/80 bg-gray-900/40 px-6 py-4 text-center">
            <p className="text-xs text-gray-400">
              มีบัญชีอยู่แล้ว?{" "}
              <button
                type="button"
                onClick={() => router.push("/pagelogin")}
                className="font-bold text-fuchsia-400 hover:text-fuchsia-300 hover:underline"
              >
                เข้าสู่ระบบ →
              </button>
            </p>
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-[11px] text-gray-500">
            © {new Date().getFullYear()} KATE BEAUTY STORE • All rights reserved
          </p>
        </div>
      </div>
    </main>
  );
}