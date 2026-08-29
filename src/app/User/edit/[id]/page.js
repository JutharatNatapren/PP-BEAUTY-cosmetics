"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { authHeaders, clearToken, getToken } from "../../../../lib/auth";

const API_URL = "https://api.itdev.cmtc.ac.th/users";

export default function EditUserPage() {
  const params = useParams();
  const router = useRouter();

  const id = params.id;

  // =========================================================
  // STATE
  // =========================================================

  const [form, setForm] = useState({
    employee_id: "",
    username: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // =========================================================
  // GET USER BY ID
  // =========================================================

  useEffect(() => {
    const fetchUser = async () => {
      if (!id) return;

      try {
        setIsLoading(true);

        const token = getToken();

        if (!token) {
          router.replace("/pagelogin/User");
          return;
        }

        const response = await fetch(`${API_URL}/${id}`, {
          headers: authHeaders(token),
          cache: "no-store",
        });

        if (response.status === 401) {
          clearToken();
          router.replace("/pagelogin/User");
          return;
        }

        if (!response.ok) {
          throw new Error(`Status ${response.status}`);
        }

        const data = await response.json();

        console.log("USER DATA:", data);

        setForm({
          employee_id: data.employee_id ?? "",
          username: data.username ?? "",
          password: "",
        });
      } catch (error) {
        console.error("GET USER ERROR:", error);

        await Swal.fire({
          icon: "error",
          title: "ไม่สามารถโหลดข้อมูลได้",
          text: "ไม่พบข้อมูลผู้ใช้งาน",
          confirmButtonColor: "#2563eb",
        });

        router.push("/User");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [id, router]);

  // =========================================================
  // HANDLE INPUT
  // =========================================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  };

  // =========================================================
  // VALIDATE
  // =========================================================

  const validateForm = () => {
    if (!form.employee_id.trim()) {
      Swal.fire({
        icon: "warning",
        title: "กรุณากรอกรหัสพนักงาน",
        text: "ต้องกรอกรหัสพนักงานก่อนบันทึก",
        confirmButtonText: "ตกลง",
        confirmButtonColor: "#2563eb",
      });

      return false;
    }

    if (!form.username.trim()) {
      Swal.fire({
        icon: "warning",
        title: "กรุณากรอก Username",
        text: "ต้องกรอก Username ก่อนบันทึก",
        confirmButtonText: "ตกลง",
        confirmButtonColor: "#2563eb",
      });

      return false;
    }

    return true;
  };

  // =========================================================
  // UPDATE USER
  // =========================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      setIsSaving(true);

      // ข้อมูลที่ต้องส่ง
      const payload = {
        employee_id: form.employee_id.trim(),
        username: form.username.trim(),
      };

      // ถ้ากรอก Password ใหม่ ค่อยส่งไป
      if (form.password.trim()) {
        payload.password = form.password;
      }

      console.log("UPDATE PAYLOAD:", payload);

      const token = getToken();

      if (!token) {
        router.replace("/pagelogin");
        return;
      }

      const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...authHeaders(token),
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json().catch(() => ({}));

      console.log("UPDATE RESPONSE:", result);

      // =====================================================
      // SUCCESS
      // =====================================================

      if (response.ok) {
        await Swal.fire({
          icon: "success",
          title: "บันทึกสำเร็จ!",
          text: "แก้ไขข้อมูลผู้ดูแลระบบเรียบร้อยแล้ว",
          confirmButtonColor: "#2563eb",
        });

        // กลับหน้า User
        router.replace("/User");

        return;
      }

      // =====================================================
      // 400
      // =====================================================

      if (response.status === 400) {
        await Swal.fire({
          icon: "warning",
          title: "ข้อมูลไม่ถูกต้อง",
          text: result.message || "กรุณาตรวจสอบข้อมูลที่กรอก",
          confirmButtonText: "ตกลง",
          confirmButtonColor: "#f59e0b",
        });

        return;
      }

      // =====================================================
      // 401
      // =====================================================

      if (response.status === 401) {
        clearToken();
        await Swal.fire({
          icon: "warning",
          title: "ไม่ได้รับอนุญาต",
          text: "กรุณาเข้าสู่ระบบใหม่",
          confirmButtonText: "ตกลง",
        });

        return;
      }

      // =====================================================
      // 403
      // =====================================================

      if (response.status === 403) {
        await Swal.fire({
          icon: "error",
          title: "ไม่มีสิทธิ์",
          text: "คุณไม่มีสิทธิ์แก้ไขข้อมูลผู้ใช้งาน",
          confirmButtonText: "ตกลง",
        });

        return;
      }

      // =====================================================
      // 404
      // =====================================================

      if (response.status === 404) {
        await Swal.fire({
          icon: "error",
          title: "ไม่พบข้อมูล",
          text: "ไม่พบผู้ใช้งานที่ต้องการแก้ไข",
          confirmButtonText: "ตกลง",
        });

        router.push("/User");

        return;
      }

      // =====================================================
      // 500
      // =====================================================

      if (response.status >= 500) {
        await Swal.fire({
          icon: "error",
          title: "เกิดข้อผิดพลาดที่เซิร์ฟเวอร์",
          text:
            result.message ||
            "Backend เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง",
          confirmButtonText: "ตกลง",
        });

        return;
      }

      // =====================================================
      // OTHER ERROR
      // =====================================================

      await Swal.fire({
        icon: "error",
        title: "บันทึกไม่สำเร็จ",
        text:
          result.message ||
          `เกิดข้อผิดพลาด HTTP ${response.status}`,
        confirmButtonText: "ตกลง",
      });
    } catch (error) {
      console.error("UPDATE ERROR:", error);

      await Swal.fire({
        icon: "error",
        title: "เชื่อมต่อเซิร์ฟเวอร์ไม่ได้",
        text: "กรุณาตรวจสอบ Internet แล้วลองใหม่อีกครั้ง",
        confirmButtonText: "ตกลง",
      });
    } finally {
      setIsSaving(false);
    }
  };

  // =========================================================
  // LOADING
  // =========================================================

  if (isLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-50 via-pink-50 to-purple-100 dark:from-[#030b18] dark:via-[#071426] dark:to-[#0b1b33]">

        <div className="text-center">

          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-pink-200 border-t-pink-600" />

          <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
            กำลังโหลดข้อมูล...
          </p>

        </div>

      </main>
    );
  }

  // =========================================================
  // PAGE
  // =========================================================

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 via-pink-50 to-purple-100 px-4 py-28 dark:from-[#030b18] dark:via-[#071426] dark:to-[#0b1b33]">

      <div className="mx-auto w-full max-w-xl">

        {/* HEADER */}

        <div className="mb-8 text-center">

          <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-tr from-pink-600 via-purple-600 to-pink-800 text-xl font-black text-white shadow-2xl shadow-pink-600/30">
            PP
          </div>

          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-pink-200 bg-white/70 px-4 py-1.5 text-xs font-semibold text-pink-600 dark:border-pink-500/20 dark:bg-[#102542]/70 dark:text-pink-400">

            <span className="h-1.5 w-1.5 rounded-full bg-pink-500" />

            BB SHOP ADMIN

          </div>

          <h1 className="text-3xl font-black text-gray-900 dark:text-white">
            แก้ไขข้อมูลผู้ดูแลระบบ
          </h1>

          <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
            User ID: {id}
          </p>

        </div>

        {/* CARD */}

        <div className="overflow-hidden rounded-[2rem] border border-white/70 bg-white/90 shadow-2xl dark:border-[#1e3b5c] dark:bg-[#102542]/95">

          <div className="h-1.5 bg-gradient-to-r from-pink-500 via-purple-500 to-fuchsia-400" />

          <form
            onSubmit={handleSubmit}
            className="p-6 sm:p-9"
          >

            {/* TITLE */}

            <div className="mb-7">

              <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-pink-100 dark:bg-pink-500/10">
                  🛡️
                </div>

                <div>

                  <h2 className="font-bold text-gray-900 dark:text-white">
                    ข้อมูลผู้ดูแลระบบ
                  </h2>

                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    แก้ไขข้อมูลบัญชีผู้ดูแลระบบ
                  </p>

                </div>

              </div>

              <div className="mt-4 h-px bg-pink-100 dark:bg-pink-500/20" />

            </div>

            {/* EMPLOYEE ID */}

            <div>

              <label
                htmlFor="employee_id"
                className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-200"
              >
                รหัสพนักงาน
              </label>

              <input
                id="employee_id"
                name="employee_id"
                type="text"
                value={form.employee_id}
                onChange={handleChange}
                placeholder="กรอกรหัสพนักงาน"
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-gray-900 outline-none transition focus:border-pink-500 focus:bg-white focus:ring-4 focus:ring-pink-500/10 dark:border-[#2a4868] dark:bg-[#0b1b33] dark:text-white"
              />

            </div>

            {/* USERNAME */}

            <div className="mt-5">

              <label
                htmlFor="username"
                className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-200"
              >
                Username
              </label>

              <input
                id="username"
                name="username"
                type="text"
                value={form.username}
                onChange={handleChange}
                placeholder="กรอก Username"
                className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 text-gray-900 outline-none transition focus:border-pink-500 focus:bg-white focus:ring-4 focus:ring-pink-500/10 dark:border-[#2a4868] dark:bg-[#0b1b33] dark:text-white"
              />

            </div>

            {/* PASSWORD */}

            <div className="mt-5">

              <label
                htmlFor="password"
                className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-200"
              >
                Password ใหม่
              </label>

              <div className="relative">

                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={form.password}
                  onChange={handleChange}
                  placeholder="เว้นว่างไว้หากไม่เปลี่ยน Password"
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3.5 pr-20 text-gray-900 outline-none transition focus:border-pink-500 focus:bg-white focus:ring-4 focus:ring-pink-500/10 dark:border-[#2a4868] dark:bg-[#0b1b33] dark:text-white"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword((current) => !current)
                  }
                  className="absolute right-3 top-1/2 -trangray-y-1/2 rounded-lg px-2 py-1 text-xs font-semibold text-pink-600 hover:bg-pink-50 dark:text-pink-400 dark:hover:bg-pink-500/10"
                >
                  {showPassword ? "ซ่อน" : "แสดง"}
                </button>

              </div>

              <p className="mt-2 text-xs text-gray-400">
                ไม่จำเป็นต้องกรอก หากไม่ต้องการเปลี่ยนรหัสผ่าน
              </p>

            </div>

            {/* BUTTON */}

            <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">

              <button
                type="button"
                onClick={() => router.push("/User")}
                className="rounded-xl border border-gray-200 bg-white px-5 py-4 font-semibold text-gray-600 transition hover:bg-gray-50 dark:border-[#2a4868] dark:bg-[#0b1b33] dark:text-gray-300 dark:hover:bg-[#102542]"
              >
                ยกเลิก
              </button>

              <button
                type="submit"
                disabled={isSaving}
                className="rounded-xl bg-gradient-to-r from-pink-600 to-purple-600 px-5 py-4 font-bold text-white shadow-lg shadow-pink-500/20 transition hover:-trangray-y-0.5 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSaving
                  ? "กำลังบันทึก..."
                  : "บันทึกการแก้ไข"}
              </button>

            </div>

          </form>

          {/* FOOTER */}

          <div className="border-t border-pink-100 px-6 py-5 text-center dark:border-[#1e3b5c]">

            <p className="text-xs text-gray-400">
              BB SHOP • Admin #{id}
            </p>

          </div>

        </div>

      </div>

    </main>
  );
}