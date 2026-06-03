import { useState } from 'react';
import { LIST_UMKM_PRODUK } from '../data/mockData';
import { UmkmProduk } from '../types';
import { ShoppingCart, Search, Store, Trash2, CheckCircle, Sparkles, X, Plus, Minus, CreditCard, Check } from 'lucide-react';

export default function UmkmMarketplace() {
  const [products, setProducts] = useState<UmkmProduk[]>(LIST_UMKM_PRODUK);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua');

  // Shopping cart state
  const [cart, setCart] = useState<{ product: UmkmProduk; qty: number }[]>([]);
  const [showQrisModal, setShowQrisModal] = useState(false);
  const [qrisPaid, setQrisPaid] = useState(false);

  const addToCart = (product: UmkmProduk) => {
    setCart(prev => {
      const idx = prev.findIndex(item => item.product.id === product.id);
      if (idx > -1) {
        return prev.map((item, i) => i === idx ? { ...item, qty: item.qty + 1 } : item);
      }
      return [...prev, { product, qty: 1 }];
    });
  };

  const updateQty = (id: string, delta: number) => {
    setCart(prev => {
      return prev.map(item => {
        if (item.product.id === id) {
          const newQty = item.qty + delta;
          if (newQty <= 0) return null;
          return { ...item, qty: newQty };
        }
        return item;
      }).filter(Boolean) as { product: UmkmProduk; qty: number }[];
    });
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.product.id !== id));
  };

  const calculateTotal = () => {
    return cart.reduce((sum, item) => sum + item.product.harga * item.qty, 0);
  };

  const handleCheckout = () => {
    if (cart.length === 0) return;
    setQrisPaid(false);
    setShowQrisModal(true);
  };

  const confirmQrisPayment = () => {
    setQrisPaid(true);
    setTimeout(() => {
      setCart([]);
      setShowQrisModal(false);
    }, 1500);
  };

  // Filters
  const filteredProducts = products.filter(p => {
    const matchesSearch = p.namaProduk.toLowerCase().includes(search.toLowerCase()) || p.namaToko.toLowerCase().includes(search.toLowerCase());
    const matchesCat = selectedCategory === 'Semua' || p.kategori === selectedCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="space-y-6" id="umkm-marketplace">
      
      {/* Category Slider & Search */}
      <div className="flex flex-col sm:flex-row gap-4 items-center bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input 
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Cari kopi robusta, beras organik, tiket wisata..."
            className="w-full text-xs pl-9 pr-4 py-2 border border-slate-200 rounded-lg bg-slate-50 focus:outline-none focus:ring-1"
          />
        </div>
        
        <div className="flex gap-1.5 scrollbar-thin overflow-x-auto w-full sm:w-auto">
          {['Semua', 'Makanan', 'Pertanian', 'Kerajinan', 'Wisata'].map(cat => (
            <button 
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`text-xs px-3 py-1.5 rounded-lg border font-semibold cursor-pointer transition-all ${selectedCategory === cat ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-slate-50 text-slate-500 border-slate-200'}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Product Catalog Grid */}
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filteredProducts.map(p => (
            <div key={p.id} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
              <div>
                <div className="flex justify-between items-start mb-2">
                  <span className="text-[10px] px-2 py-0.5 bg-indigo-50 text-indigo-700 font-semibold rounded font-mono uppercase">{p.kategori}</span>
                  <div className="flex items-center gap-0.5 text-xs text-amber-500 font-bold">
                    ★ {p.rating}
                  </div>
                </div>

                <h4 className="text-sm font-bold text-slate-800 line-clamp-1">{p.namaProduk}</h4>
                
                <div className="flex items-center gap-1.5 mt-1 text-slate-400">
                  <Store className="w-3.5 h-3.5" />
                  <span className="text-[11px] font-semibold">{p.namaToko}</span>
                </div>

                <p className="text-[11.5px] text-slate-400 mt-2 line-clamp-2 leading-relaxed">{p.deskripsi}</p>
              </div>

              <div className="border-t border-slate-100 pt-3 mt-4 flex justify-between items-center bg-slate-50/50 p-2.5 rounded-xl">
                <div>
                  <span className="text-[9px] text-slate-400 block font-semibold">Harga Jual</span>
                  <p className="font-bold font-mono text-slate-800 text-sm">Rp {p.harga.toLocaleString('id-ID')}</p>
                </div>

                <button 
                  onClick={() => addToCart(p)}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs px-3 py-1.5 rounded-lg cursor-pointer transition-colors"
                >
                  + Tambahkan
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Shopping Cart Sidebar & Checkout */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between h-[450px]">
          <div>
            <div className="flex justify-between items-center mb-4 border-b border-slate-100 pb-3">
              <h3 className="text-md font-bold font-display text-slate-800 flex items-center gap-1.5">
                <ShoppingCart className="w-5 h-5 text-indigo-500" /> Keranjang Belanja Desa
              </h3>
              <span className="bg-indigo-100 text-indigo-700 font-bold px-2 py-0.5 rounded text-xs font-mono">{cart.length} Jenis</span>
            </div>

            {cart.length > 0 ? (
              <div className="space-y-3 overflow-y-auto max-h-60 pr-1">
                {cart.map(item => (
                  <div key={item.product.id} className="flex justify-between items-center text-xs p-2.5 rounded-xl border border-slate-50 bg-slate-50">
                    <div className="flex-1 min-w-0 pr-3">
                      <p className="font-bold text-slate-800 truncate">{item.product.namaProduk}</p>
                      <p className="text-[10px] text-slate-400 font-mono">Rp {(item.product.harga).toLocaleString('id-ID')} / item</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="flex items-center border border-slate-200 rounded-md bg-white">
                        <button 
                          onClick={() => updateQty(item.product.id, -1)}
                          className="p-1 text-slate-500 hover:bg-slate-50 cursor-pointer"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-1.5 font-bold font-mono min-w-[16px] text-center">{item.qty}</span>
                        <button 
                          onClick={() => addToCart(item.product)}
                          className="p-1 text-slate-500 hover:bg-slate-50 cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button 
                        onClick={() => removeFromCart(item.product.id)}
                        className="p-1 text-rose-500 hover:bg-rose-50 rounded cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 text-slate-400">
                <ShoppingCart className="w-10 h-10 stroke-1 mx-auto mb-2 text-slate-350" />
                <p className="text-xs">Udah check menu sawi, robusta? Keranjang Anda masih kosong.</p>
              </div>
            )}
          </div>

          <div className="border-t border-slate-100 pt-4 mt-4 space-y-3">
            <div className="flex justify-between items-center text-xs text-slate-500">
              <span className="font-semibold text-slate-700">Subtotal Belanja:</span>
              <span className="font-bold font-mono text-slate-800 text-md">Rp {calculateTotal().toLocaleString('id-ID')}</span>
            </div>

            <button 
              onClick={handleCheckout}
              disabled={cart.length === 0}
              className="w-full bg-indigo-900 hover:bg-indigo-950 disabled:bg-slate-200 disabled:text-slate-400 text-white font-semibold py-2.5 rounded-lg text-xs flex items-center justify-center gap-2 cursor-pointer transition-colors"
            >
              <CreditCard className="w-4 h-4" /> <span>Checkout QRIS Desa</span>
            </button>
          </div>
        </div>

      </div>

      {/* QRIS Simulated Pay overlay modal */}
      {showQrisModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full border border-slate-100 shadow-2xl relative space-y-4">
            <button 
              onClick={() => setShowQrisModal(false)}
              className="absolute right-4 top-4 p-1 rounded-full text-slate-400 hover:bg-slate-100 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="text-center">
              <span className="text-[10px] bg-sky-50 text-sky-700 px-3 py-1 rounded-full font-bold uppercase tracking-wider">Simulasi QRIS Pembayaran BUMDes</span>
              <h4 className="text-md font-bold text-slate-800 mt-2">Mas Hedi DigiPay QRIS</h4>
              <p className="text-xs text-slate-400">Pondokpanjang Economic Smart-Village</p>
            </div>

            {/* QRIS Graphic */}
            <div className="flex flex-col items-center p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <div className="w-40 h-40 bg-white p-2.5 rounded-xl shadow-inner border border-slate-200 flex flex-col justify-between items-center relative overflow-hidden">
                {/* QR code mosaic design */}
                <div className="grid grid-cols-5 gap-[3px] w-36 h-36">
                  {Array.from({ length: 25 }).map((_, i) => (
                    <div 
                      key={i} 
                      className={`w-5.5 h-5.5 rounded-xs ${
                        i % 2 === 0 || i % 6 === 0 || i === 0 || i === 4 || i === 20 || i === 24 ? 'bg-slate-900' : 'bg-transparent'
                      }`}
                    ></div>
                  ))}
                </div>
                {/* Simulated center logo overlay */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-sky-600 px-1 py-0.2 rounded text-[7px] text-white font-extrabold shadow uppercase pointer-events-none">
                  QRIS DESA
                </div>
              </div>
              <span className="text-[10px] text-slate-400 mt-3 font-mono">ID TRANSAKSI: TXN-{Math.floor(10000 + Math.random() * 89999)}</span>
              <p className="text-md font-bold font-mono text-slate-800 mt-1">Rp {calculateTotal().toLocaleString('id-ID')}</p>
            </div>

            <div className="space-y-2">
              {qrisPaid ? (
                <div className="bg-emerald-50 text-emerald-800 p-2.5 rounded-lg border border-emerald-100 text-xs font-semibold flex items-center justify-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 animate-bounce" /> <span>Transaksi Terverifikasi! Saldo Masuk ke BUMDes.</span>
                </div>
              ) : (
                <button 
                  onClick={confirmQrisPayment}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
                >
                  <CheckCircle className="w-4 h-4" /> <span>Simulasikan Scan & Pembayaran</span>
                </button>
              )}
              
              <button 
                onClick={() => setShowQrisModal(false)}
                className="w-full bg-slate-100 text-slate-500 py-2 rounded-xl text-xs font-semibold hover:bg-slate-250 transition-colors"
              >
                Batal
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
