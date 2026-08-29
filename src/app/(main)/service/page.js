import Link from "next/link";
const SERVICES=[
{icon:"💄",title:"เครื่องสำอางคัดสรร",description:"รวมลิปสติก บลัชออน รองพื้น และเมคอัพไอเทมยอดนิยมสำหรับทุกสไตล์"},
{icon:"🧴",title:"สกินแคร์ดูแลผิว",description:"ไอเทมดูแลผิวสำหรับกิจวัตรประจำวัน ตั้งแต่คลีนซิ่ง เซรั่ม มอยส์เจอร์ไรเซอร์ ไปจนถึงกันแดด"},
{icon:"🌸",title:"น้ำหอม & กลิ่นหอม",description:"คัดเลือกกลิ่นหอมหวาน สดชื่น และหรูหรา ให้คุณค้นหากลิ่นที่เป็นตัวเอง"},
{icon:"🎁",title:"Beauty Gift Set",description:"ชุดของขวัญความงามสำหรับวันเกิด วันพิเศษ หรือมอบความสุขให้คนที่คุณรัก"},
{icon:"💗",title:"แนะนำไอเทม",description:"ช่วยเลือกสินค้าตามสไตล์การแต่งหน้าและความต้องการของคุณ"},
{icon:"🚚",title:"จัดส่งรวดเร็ว",description:"แพ็กสินค้าอย่างใส่ใจและจัดส่งถึงมือคุณอย่างรวดเร็ว พร้อมติดตามสถานะได้"},
];
export default function ServicePage(){
return <main className="min-h-screen bg-[#fff8fc] px-4 pb-20 pt-32 text-gray-800 dark:bg-[#211627] dark:text-white">
<div className="mx-auto max-w-6xl">
<section className="mb-14 text-center"><span className="rounded-full border border-pink-200 bg-pink-50 px-4 py-1.5 text-xs font-bold tracking-wider text-fuchsia-600">OUR BEAUTY SERVICES</span><h1 className="mt-5 text-4xl font-extrabold md:text-5xl">บริการของ PP BEAUTY</h1><p className="mx-auto mt-4 max-w-2xl leading-relaxed text-gray-500 dark:text-purple-100/70">เราอยากให้การเลือกเครื่องสำอางเป็นเรื่องง่าย สนุก และเหมาะกับสไตล์ของคุณ</p></section>
<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">{SERVICES.map(s=><article key={s.title} className="rounded-3xl border border-pink-100 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:border-fuchsia-300 hover:shadow-xl hover:shadow-pink-200/30 dark:border-purple-900 dark:bg-[#2b1b35]"><div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-100 to-purple-100 text-2xl">{s.icon}</div><h2 className="mt-5 text-xl font-bold">{s.title}</h2><p className="mt-3 text-sm leading-relaxed text-gray-500 dark:text-purple-100/70">{s.description}</p></article>)}</div>
<section className="mt-14 overflow-hidden rounded-3xl bg-gradient-to-r from-pink-500 via-fuchsia-500 to-purple-600 p-8 text-center text-white shadow-xl shadow-pink-500/20 md:p-12"><h2 className="text-3xl font-bold">พร้อมเติมความสวยให้วันของคุณหรือยัง?</h2><p className="mx-auto mt-3 max-w-2xl text-sm text-pink-50">เลือกไอเทมที่ชอบ แล้วสร้างลุคในแบบที่เป็นคุณ</p><Link href="/#products" className="mt-7 inline-flex rounded-full bg-white px-7 py-3 font-bold text-fuchsia-700 shadow-lg transition hover:-translate-y-0.5">ช้อปสินค้าเลย ✨</Link></section>
</div></main>}
