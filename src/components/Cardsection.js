import Image from "next/image";
import { ShoppingBag, Star } from "lucide-react";

const products = [
  { image:"https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=700&q=85", name:"ลิปสติก Velvet Glow", description:"ลิปเนื้อกำมะหยี่ สีชัด เกลี่ยง่าย ติดทน พร้อมเติมความมั่นใจในทุกลุค", price:590, tag:"BEST SELLER" },
  { image:"https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=700&q=85", name:"Blush Bloom Cheek", description:"บลัชออนเนื้อเนียนละเอียด ให้พวงแก้มดูสดใสอย่างเป็นธรรมชาติ", price:490, tag:"NEW" },
  { image:"https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?w=700&q=85", name:"Hydra Glow Serum", description:"เซรั่มเติมความชุ่มชื้น เนื้อบางเบา เหมาะกับการดูแลผิวในทุกวัน", price:790, tag:"POPULAR" },
  { image:"https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=700&q=85", name:"Everyday Makeup Set", description:"เซ็ตเครื่องสำอางสำหรับลุคประจำวัน รวมไอเทมจำเป็นไว้ครบในชุดเดียว", price:1290, tag:"HOT" },
  { image:"https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=700&q=85", name:"Rose Petal Body Mist", description:"บอดี้มิสต์กลิ่นกุหลาบละมุน หอมสะอาด สดชื่น ใช้ได้ทุกโอกาส", price:650, tag:"FAVORITE" },
  { image:"https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=700&q=85", name:"Soft Clean Facial Foam", description:"โฟมล้างหน้าเนื้อครีม ช่วยทำความสะอาดผิวอย่างอ่อนโยน พร้อมความรู้สึกนุ่มหลังล้าง", price:390, tag:"DAILY CARE" },
  { image:"https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=700&q=85", name:"Nourish Hair Mask", description:"มาสก์บำรุงเส้นผมให้ดูนุ่มลื่นและเงางาม เหมาะกับผมแห้งเสีย", price:520, tag:"CARE" },
  { image:"https://images.unsplash.com/photo-1599733594230-6b823276c3c5?w=700&q=85", name:"SPF 50+ Daily Sunscreen", description:"กันแดดเนื้อบางเบา สำหรับใช้ทุกวัน พร้อมปกป้องผิวจากแสงแดด", price:690, tag:"MUST HAVE" },
  { image:"https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=700&q=85", name:"Perfume Blossom Eau de Parfum", description:"น้ำหอมกลิ่นดอกไม้หวานละมุน ให้ความรู้สึกหรูหราและน่าจดจำ", price:990, tag:"PREMIUM" },
];

export default function Cardsection() {
  return (
    <section id="products" className="bg-white py-16 transition-colors dark:bg-[#211627]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <span className="mb-3 inline-block rounded-full border border-pink-200 bg-pink-50 px-4 py-1 text-xs font-semibold text-fuchsia-600">CURATED BEAUTY PICKS</span>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">ไอเทมความงามที่อยากให้คุณลอง</h2>
          <p className="mt-3 text-gray-500 dark:text-purple-200">เครื่องสำอางและผลิตภัณฑ์ดูแลตัวเอง คัดมาให้ช้อปง่ายในโทนชมพู ม่วง และขาว</p>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <div key={product.name} className="group overflow-hidden rounded-2xl border border-pink-100 bg-white shadow-sm transition hover:-translate-y-1 hover:border-fuchsia-300 hover:shadow-xl hover:shadow-pink-200/40 dark:border-purple-900/50 dark:bg-[#2b1b35]">
              <div className="relative h-56 w-full overflow-hidden bg-pink-50">
                <Image src={product.image} alt={product.name} fill className="object-cover transition duration-500 group-hover:scale-105"/>
                <div className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-fuchsia-600 shadow-sm backdrop-blur">{product.tag}</div>
              </div>
              <div className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{product.name}</h3>
                  <span className="flex shrink-0 items-center gap-1 text-xs font-semibold text-amber-500"><Star className="h-3.5 w-3.5 fill-current"/>4.9</span>
                </div>
                <p className="mt-2 min-h-[42px] line-clamp-2 text-sm leading-relaxed text-gray-500 dark:text-purple-100/70">{product.description}</p>
                <div className="mt-5 flex items-center justify-between gap-3">
                  <div><p className="text-xs text-gray-400">ราคา</p><span className="text-xl font-bold text-fuchsia-600">฿{product.price.toLocaleString()}</span></div>
                  <button type="button" className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 px-4 py-2.5 text-sm font-medium text-white transition hover:shadow-lg hover:shadow-pink-500/25"><ShoppingBag className="h-4 w-4"/> เพิ่มลงตะกร้า</button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-12 rounded-3xl bg-gradient-to-r from-pink-50 via-white to-purple-50 p-8 text-center ring-1 ring-pink-100 dark:from-[#3a213d] dark:via-[#2b1b35] dark:to-[#302044]">
          <p className="text-sm font-semibold text-fuchsia-600">BEAUTY TIP</p>
          <h3 className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">สวยง่าย เริ่มจากการดูแลตัวเองทุกวัน</h3>
          <p className="mx-auto mt-2 max-w-2xl text-sm text-gray-500 dark:text-purple-100/70">เลือกผลิตภัณฑ์ที่เหมาะกับตัวเองและสนุกกับการค้นหาลุคใหม่ ๆ ในแบบของคุณ</p>
        </div>
      </div>
    </section>
  );
}
