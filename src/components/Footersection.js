import Link from "next/link";
import DarkModeToggle from "@/components/DarkModeToggle";
import { Mail, Heart, ShieldCheck, Sparkles } from "lucide-react";

export default function FooterSection() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="border-t border-pink-100 bg-[#fff8fc] py-12 text-gray-600 dark:border-purple-900/50 dark:bg-[#1d1422] dark:text-purple-100/70">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          <div>
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-tr from-pink-500 to-purple-600 text-white shadow-lg shadow-pink-500/20"><Sparkles className="h-6 w-6"/></div>
              <div><h2 className="text-xl font-black tracking-wider text-gray-900 dark:text-white">PP BEAUTY</h2><p className="text-[10px] font-bold uppercase tracking-widest text-fuchsia-500">Cosmetics & Beauty</p></div>
            </div>
            <p className="text-sm leading-relaxed">ร้านเครื่องสำอางและผลิตภัณฑ์ดูแลตัวเองที่คัดสรรไอเทมคุณภาพ เพื่อให้คุณสนุกกับการดูแลตัวเองและแต่งหน้าในทุกวัน</p>
            <div className="mt-6 rounded-xl border border-pink-200 bg-white px-4 py-3 dark:border-purple-800 dark:bg-[#2b1b35]"><p className="text-sm font-medium text-fuchsia-600">💗 สวยในแบบคุณ พร้อมส่งทุกวัน</p></div>
          </div>
          <div>
            <h3 className="mb-5 text-lg font-bold text-gray-900 dark:text-white">เลือกช้อป</h3>
            <ul className="space-y-3 text-sm">
              {[["/#products","เครื่องสำอาง"],["/#products","สกินแคร์"],["/#products","น้ำหอม"],["/#products","ดูแลเส้นผม"],["/service","บริการของเรา"]].map(([href,label])=><li key={label}><Link href={href} className="transition hover:translate-x-1 hover:text-fuchsia-600">{label}</Link></li>)}
            </ul>
          </div>
          <div>
            <h3 className="mb-5 text-lg font-bold text-gray-900 dark:text-white">ช่วยเหลือ & ติดต่อ</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-center gap-3"><span className="flex h-8 w-8 items-center justify-center rounded-lg bg-pink-100 text-fuchsia-600"><Mail className="h-4 w-4"/></span><span>support@ppbeauty.com</span></li>
              <li className="flex items-center gap-3"><span className="flex h-8 w-8 items-center justify-center rounded-lg bg-pink-100 text-fuchsia-600"><ShieldCheck className="h-4 w-4"/></span><span>สินค้าคัดสรรและตรวจสอบคุณภาพ</span></li>
            </ul>
            <div className="mt-6"><p className="mb-3 text-sm font-semibold text-gray-900 dark:text-white">ติดตาม PP BEAUTY</p><div className="flex gap-3">{["IG","FB","LINE"].map(x=><a key={x} href="#" className="flex h-9 min-w-10 items-center justify-center rounded-lg bg-white px-3 text-xs font-bold text-fuchsia-600 shadow-sm ring-1 ring-pink-100 transition hover:-translate-y-1 hover:bg-pink-50">{x}</a>)}</div></div>
          </div>
        </div>
        <div className="mt-10 flex items-center justify-center gap-3 rounded-2xl border border-pink-100 bg-white px-5 py-3 dark:border-purple-900 dark:bg-[#2b1b35]"><Heart className="h-4 w-4 text-pink-500"/><span className="text-sm">โหมดการแสดงผล</span><DarkModeToggle/></div>
        <div className="mt-10 border-t border-pink-100 pt-7 dark:border-purple-900/50"><div className="flex flex-col items-center justify-between gap-4 md:flex-row"><p className="text-sm text-gray-400">© {currentYear} PP BEAUTY. All rights reserved.</p><div className="flex gap-5 text-sm"><Link href="#" className="hover:text-fuchsia-600">นโยบายความเป็นส่วนตัว</Link><Link href="#" className="hover:text-fuchsia-600">เงื่อนไขการใช้งาน</Link></div></div></div>
      </div>
    </footer>
  );
}
