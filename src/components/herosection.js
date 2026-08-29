import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles, Heart, ShieldCheck } from "lucide-react";

const STATS = [
  { icon: Heart, value: "5,000+", label: "ลูกค้าที่ไว้วางใจ" },
  { icon: Sparkles, value: "100+", label: "ไอเทมความงาม" },
  { icon: ShieldCheck, value: "100%", label: "สินค้าของแท้" },
];

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#fff7fb] via-[#fdf5ff] to-[#f6f0ff] pt-20">
      <div className="pointer-events-none absolute -left-32 top-10 h-80 w-80 rounded-full bg-pink-300/30 blur-3xl"/>
      <div className="pointer-events-none absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-purple-300/30 blur-3xl"/>
      <div className="relative mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="text-center lg:text-left">
            <span className="inline-flex items-center gap-2 rounded-full border border-pink-200 bg-white/80 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-fuchsia-600 shadow-sm backdrop-blur">
              <Sparkles className="h-4 w-4 text-pink-500"/> BEAUTY FOR EVERY YOU
            </span>
            <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl lg:leading-tight">
              เติมความสวยให้ทุกวัน{" "}
              <span className="block bg-gradient-to-r from-pink-500 via-fuchsia-500 to-purple-600 bg-clip-text text-transparent">
                ในแบบที่เป็นคุณ
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-gray-600 lg:mx-0">
              รวมเครื่องสำอาง สกินแคร์ และไอเทมดูแลตัวเองคัดพิเศษ
              เนื้อสัมผัสดี สีสวย และพร้อมส่งให้คุณสร้างลุคที่ชอบได้ทุกวัน
            </p>
            <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row lg:justify-start">
              <Link href="#products" className="group inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 px-7 py-3.5 font-bold text-white shadow-lg shadow-pink-500/25 transition hover:-translate-y-0.5">
                ช้อปสินค้าใหม่ <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1"/>
              </Link>
              <Link href="/about" className="inline-flex items-center justify-center gap-2 rounded-xl border border-pink-200 bg-white px-7 py-3.5 font-bold text-purple-700 transition hover:-translate-y-0.5 hover:border-fuchsia-300 hover:bg-pink-50">
                ✨ รู้จัก PP BEAUTY
              </Link>
            </div>
            <div className="mt-12 grid grid-cols-1 gap-4 border-t border-pink-200/70 pt-8 sm:grid-cols-3 text-left">
              {STATS.map(({icon: Icon, value, label}) => (
                <div key={label} className="rounded-xl border border-pink-100 bg-white/75 p-4 shadow-sm backdrop-blur transition hover:-translate-y-1 hover:shadow-md">
                  <div className="mb-1 flex items-center gap-2 text-fuchsia-600"><Icon className="h-5 w-5"/><span className="text-xl font-extrabold text-gray-900">{value}</span></div>
                  <p className="text-xs text-gray-500">{label}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-center">
            <div className="relative w-full max-w-lg">
              <div className="pointer-events-none absolute -inset-2 rounded-[2rem] bg-gradient-to-r from-pink-300 to-purple-300 blur-xl opacity-60"/>
              <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] border-4 border-white shadow-2xl">
                <Image src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=900&q=85" alt="เครื่องสำอางและสกินแคร์" fill priority sizes="(max-width: 1024px) 100vw, 500px" className="object-cover transition-transform duration-500 hover:scale-105"/>
              </div>
              <div className="absolute -bottom-5 -left-5 rounded-2xl border border-pink-100 bg-white px-5 py-4 shadow-xl">
                <p className="text-xs font-medium text-gray-500">คัดสรรเพื่อคุณ</p>
                <p className="font-bold text-fuchsia-600">Beauty • Care • Confidence</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
