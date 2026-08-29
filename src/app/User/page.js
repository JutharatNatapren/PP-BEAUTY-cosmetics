"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

const USERS_URL = "https://api.itdev.cmtc.ac.th/users";

export default function UsersPage() {
  const router = useRouter();

  const [isAuth, setIsAuth] = useState(false);
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // ==========================================
  // ดึงข้อมูล Users
  // ==========================================
  const fetchUsers = async () => {
    try {
      console.log("กำลังเชื่อมต่อ API...");
      console.log("USERS URL:", USERS_URL);

      const res = await fetch(USERS_URL);

      console.log("USERS STATUS:", res.status);

      if (!res.ok) {
        if (res.status === 404) {
          throw new Error("ไม่พบข้อมูลผู้ใช้งาน (404 Not Found)");
        }

        if (res.status === 500) {
          throw new Error("เซิร์ฟเวอร์มีปัญหา (500 Internal Server Error)");
        }

        throw new Error(`เกิดข้อผิดพลาดจากการเชื่อมต่อ (Status: ${res.status})`);
      }

      const data = await res.json();

      console.log("USERS RESPONSE:", data);

      if (Array.isArray(data)) {
        setUsers(data);
      } else if (Array.isArray(data.users)) {
        setUsers(data.users);
      } else if (Array.isArray(data.data)) {
        setUsers(data.data);
      } else {
        setUsers([]);
      }
    } catch (error) {
      console.error("เกิดข้อผิดพลาด:", error.message);

      setUsers([]);

      await Swal.fire({
        icon: "error",
        title: "โหลดข้อมูลไม่สำเร็จ",
        text: error.message,
        confirmButtonText: "ตกลง",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // ==========================================
  // ตรวจสอบ Login
  // ==========================================
  useEffect(() => {
    const token = localStorage.getItem("token");

    console.log("ตรวจสอบ Token:", token ? "พบ Token" : "ไม่พบ Token");

    if (!token) {
      setIsAuth(false);
      setIsLoading(false);
      router.push("/pagelogin");
      return;
    }

    setIsAuth(true);
    fetchUsers();
  }, []);

  // ==========================================
  // จัดการการแก้ไขผู้ใช้ (Edit)
  // ==========================================
  const handleEdit = (user) => {
    Swal.fire({
      title: "แก้ไขข้อมูลผู้ใช้งาน",
      text: `ต้องการแก้ไขข้อมูลของ ${user.firstname || user.username}?`,
      icon: "info",
      showCancelButton: true,
      confirmButtonText: "ไปหน้าแก้ไข",
      cancelButtonText: "ยกเลิก",
      confirmButtonColor: "#3b82f6",
    }).then((result) => {
      if (result.isConfirmed) {
        // นำทางไปยังหน้าแก้ไขตาม ID (ปรับ Route ตามโครงสร้างโปรเจกต์)
        router.push(`/users/edit/${user.id}`);
      }
    });
  };

  // ==========================================
  // จัดการการลบผู้ใช้ (Delete)
  // ==========================================
  const handleDelete = async (id, name) => {
    const result = await Swal.fire({
      icon: "warning",
      title: "ยืนยันการลบ?",
      text: `คุณต้องการลบผู้ใช้งาน "${name}" ใช่หรือไม่?`,
      showCancelButton: true,
      confirmButtonText: "ลบข้อมูล",
      cancelButtonText: "ยกเลิก",
      confirmButtonColor: "#ef4444",
    });

    if (!result.isConfirmed) return;

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${USERS_URL}/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error("ไม่สามารถลบข้อมูลผู้ใช้งานได้");
      }

      await Swal.fire({
        icon: "success",
        title: "ลบข้อมูลสำเร็จ",
        timer: 1500,
        showConfirmButton: false,
      });

      // อัปเดต State Client เพื่อลบแถวนั้นออกทันที
      setUsers((prevUsers) => prevUsers.filter((u) => u.id !== id));
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาด",
        text: error.message,
      });
    }
  };

  // ==========================================
  // Logout
  // ==========================================
  const handleLogout = async () => {
    const result = await Swal.fire({
      icon: "question",
      title: "ออกจากระบบ?",
      text: "คุณต้องการออกจากระบบหรือไม่",
      showCancelButton: true,
      confirmButtonText: "ออกจากระบบ",
      cancelButtonText: "ยกเลิก",
      confirmButtonColor: "#ef4444",
    });

    if (!result.isConfirmed) return;

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setIsAuth(false);
    router.replace("/pagelogin");
  };

  if (!isAuth) return null;

  if (isLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-pink-200 border-t-pink-600" />
          <p className="text-gray-600">กำลังโหลดข้อมูลผู้ใช้งาน...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-6 flex flex-col gap-4 rounded-2xl bg-white p-6 shadow md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">User Management</h1>
            <p className="mt-1 text-sm text-gray-500">รายการสมาชิกในระบบ</p>
          </div>

          <button
            onClick={handleLogout}
            className="rounded-xl bg-red-500 px-5 py-2.5 font-semibold text-white transition hover:bg-red-600"
          >
            Logout
          </button>
        </div>

        {/* จำนวน User */}
        <div className="mb-6 rounded-2xl bg-white p-6 shadow">
          <p className="text-sm text-gray-500">จำนวนสมาชิก</p>
          <p className="mt-1 text-3xl font-bold text-pink-600">{users.length}</p>
        </div>

        {/* User List */}
        <div className="overflow-hidden rounded-2xl bg-white shadow">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-pink-600 text-white">
                <tr>
                  <th className="px-5 py-4 text-left">ID</th>
                  <th className="px-5 py-4 text-left">ชื่อ</th>
                  <th className="px-5 py-4 text-left">นามสกุล</th>
                  <th className="px-5 py-4 text-left">Username</th>
                  <th className="px-5 py-4 text-left">สถานะ</th>
                  <th className="px-5 py-4 text-center">จัดการ</th>
                </tr>
              </thead>

              <tbody>
                {users.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="px-5 py-10 text-center text-gray-500">
                      ไม่พบข้อมูลผู้ใช้งาน
                    </td>
                  </tr>
                ) : (
                  users.map((user, index) => (
                    <tr
                      key={user.id ?? index}
                      className="border-b transition hover:bg-pink-50"
                    >
                      <td className="px-5 py-4 text-gray-600">{user.id ?? "-"}</td>
                      <td className="px-5 py-4 font-semibold text-gray-800">
                        {user.firstname ?? "-"}
                      </td>
                      <td className="px-5 py-4 text-gray-700">{user.lastname ?? "-"}</td>
                      <td className="px-5 py-4 text-gray-700">{user.username ?? "-"}</td>
                      <td className="px-5 py-4">
                        <span className="inline-flex items-center gap-2 rounded-full bg-green-100 px-3 py-1.5 text-xs font-semibold text-green-700">
                          <span className="h-2 w-2 rounded-full bg-green-500" />
                          Active
                        </span>
                      </td>
                      {/* ปุ่มแก้ไข และ ปุ่มลบ */}
                      <td className="px-5 py-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => handleEdit(user)}
                            className="rounded-lg bg-amber-500 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-amber-600"
                          >
                            แก้ไข
                          </button>
                          <button
                            onClick={() =>
                              handleDelete(
                                user.id,
                                user.firstname
                                  ? `${user.firstname} ${user.lastname ?? ""}`
                                  : user.username ?? "ผู้ใช้"
                              )
                            }
                            className="rounded-lg bg-red-500 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-red-600"
                          >
                            ลบ
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}