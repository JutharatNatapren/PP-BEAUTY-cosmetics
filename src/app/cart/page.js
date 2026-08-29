"use client";
import { CartProvider, useCart } from "@/context/cartcontext";

function CartContent() {
  const { cart, totalItems, totalPrice } = useCart();
  return (
    <main className="min-h-screen bg-[#fff8fc] p-8 pt-28 dark:bg-[#211627]">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">🛍️ ตะกร้าสินค้า</h1>
        <p className="mt-2 text-gray-500 dark:text-purple-200/70">จำนวนสินค้า: {totalItems} ชิ้น</p>
        <div className="mt-8">
          {cart.length === 0 ? <div className="rounded-2xl border border-pink-100 bg-white p-10 text-center shadow-sm dark:border-purple-900 dark:bg-[#2b1b35]"><p className="text-gray-500 dark:text-purple-200/70">ยังไม่มีสินค้าในตะกร้า</p></div> :
            <div className="space-y-4">{cart.map(product=><div key={product.id} className="rounded-2xl border border-pink-100 bg-white p-5 shadow-sm dark:border-purple-900 dark:bg-[#2b1b35]"><h2 className="font-semibold text-gray-900 dark:text-white">{product.name}</h2><p className="mt-1 text-fuchsia-600">฿{Number(product.price).toLocaleString()}</p><p className="mt-1 text-sm text-gray-500">จำนวน {product.quantity} ชิ้น</p></div>)}</div>}
        </div>
        <div className="mt-8 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-600 p-5 text-right text-white shadow-lg shadow-pink-500/20"><p className="text-sm text-pink-100">ยอดรวมทั้งหมด</p><p className="text-2xl font-bold">฿{totalPrice.toLocaleString()}</p></div>
      </div>
    </main>
  );
}
export default function CartPage(){ return <CartProvider><CartContent/></CartProvider>; }
