import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Check, X, Bell } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Format currency to Indonesian Rupiah
const formatRupiah = (amount: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(amount);
};

// Recent purchase notifications data
const recentPurchases = [
  { name: 'M.N***', email: 'ihs***@gmail.com', amount: 68204 },
  { name: 'Nur***', email: 'din***@gmail.com', amount: 68204 },
  { name: 'Riz***', email: 'riz***@gmail.com', amount: 65000 },
  { name: 'And***', email: 'and***@gmail.com', amount: 114000 },
  { name: 'Dni***', email: 'dni***@gmail.com', amount: 65000 },
];

const CheckoutPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    phone: '',
  });
  const [addonSelected, setAddonSelected] = useState(false);
  const [discountCode, setDiscountCode] = useState('');
  const [showDiscountInput, setShowDiscountInput] = useState(false);
  const [notification, setNotification] = useState<{name: string, email: string, amount: number} | null>(null);
  const [showDescription, setShowDescription] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  // Product pricing
  const originalPrice = 5850000;
  const discountedPrice = 65000;
  const addonPrice = 49000;
  const addonOriginalPrice = 149000;

  // Calculate total
  const subtotal = discountedPrice + (addonSelected ? addonPrice : 0);
  const adminFee = 0;
  const total = subtotal + adminFee;

  // Show random purchase notifications
  useEffect(() => {
    const showRandomNotification = () => {
      const random = recentPurchases[Math.floor(Math.random() * recentPurchases.length)];
      setNotification(random);
      setTimeout(() => setNotification(null), 5000);
    };

    const initialTimeout = setTimeout(showRandomNotification, 3000);
    const interval = setInterval(() => {
      showRandomNotification();
    }, 15000 + Math.random() * 10000);

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear error when user types
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!formData.email) {
      newErrors.email = 'Email wajib diisi';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email tidak valid';
    }
    
    if (!formData.name) {
      newErrors.name = 'Nama wajib diisi';
    }
    
    if (!formData.phone) {
      newErrors.phone = 'Nomor HP wajib diisi';
    } else if (!/^[0-9]{10,13}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Nomor HP tidak valid';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    // Navigate to QRIS payment page with order data
    navigate('/payment/qris', {
      state: {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        amount: total,
        orderId: 'ORD-' + Date.now(),
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Purchase Notification */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 300 }}
            className="fixed top-4 right-4 z-50 bg-white rounded-lg shadow-lg p-4 max-w-sm border-l-4 border-blue-500"
          >
            <button 
              onClick={() => setNotification(null)}
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
            >
              <X size={16} />
            </button>
            <div className="flex items-start gap-3">
              <Bell className="text-blue-500 mt-1" size={20} />
              <div>
                <p className="text-sm text-gray-700">
                  <span className="font-semibold">{notification.name}</span> ({notification.email}) baru saja membeli Produk
                </p>
                <p className="text-sm font-bold text-gray-900 mt-1">
                  AUTO CLIP CUAN ENGINE, senilai {formatRupiah(notification.amount)}
                </p>
                <p className="text-xs text-blue-500 mt-1 flex items-center gap-1">
                  <Shield size={12} /> Transaction Verified
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="max-w-lg mx-auto bg-white min-h-screen shadow-sm">
        {/* Product Image */}
        <div className="w-full">
          <img 
            src="/image1.jpg" 
            alt="AUTO CLIP CUAN ENGINE"
            className="w-full h-auto"
          />
        </div>

        {/* Product Info */}
        <div className="p-6">
          <h1 className="text-xl font-bold text-gray-900 text-center mb-2">
            AUTO CLIP CUAN ENGINE
          </h1>
          
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-sm">
                A
              </div>
              <span className="text-sm text-gray-600">Aestetic digital</span>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-400 line-through">{formatRupiah(originalPrice)}</p>
              <p className="text-lg font-bold text-gray-900">{formatRupiah(discountedPrice)}</p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.email ? 'border-red-500' : 'border-gray-200'
                }`}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>

            {/* Name */}
            <div>
              <input
                type="text"
                name="name"
                placeholder="Nama"
                value={formData.name}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.name ? 'border-red-500' : 'border-gray-200'
                }`}
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">{errors.name}</p>
              )}
            </div>

            {/* Phone */}
            <div>
              <input
                type="tel"
                name="phone"
                placeholder="Nomor Handphone / WhatsApp"
                value={formData.phone}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.phone ? 'border-red-500' : 'border-gray-200'
                }`}
              />
              {errors.phone && (
                <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
              )}
            </div>

            {/* Add-ons */}
            <div className="pt-4">
              <p className="text-sm text-gray-600 text-center mb-3">Tambahan (add-on)</p>
              <div 
                className={`border rounded-lg p-3 flex items-center gap-3 cursor-pointer transition-colors ${
                  addonSelected ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:bg-gray-50'
                }`}
                onClick={() => setAddonSelected(!addonSelected)}
              >
                <div className="w-16 h-16 bg-gray-100 rounded flex items-center justify-center text-xs text-gray-500">
                  IMG
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-blue-600">Agents8 1900+ Automation System</p>
                  <p className="text-xs text-gray-400 line-through">{formatRupiah(addonOriginalPrice)}</p>
                  <p className="text-sm font-bold text-gray-900">{formatRupiah(addonPrice)}</p>
                </div>
                <div className={`w-5 h-5 rounded border flex items-center justify-center ${
                  addonSelected ? 'bg-blue-500 border-blue-500' : 'border-gray-300'
                }`}>
                  {addonSelected && <Check size={14} className="text-white" />}
                </div>
              </div>
            </div>

            {/* Discount Code */}
            <div className="pt-2">
              {!showDiscountInput ? (
                <button
                  type="button"
                  onClick={() => setShowDiscountInput(true)}
                  className="text-xs text-blue-500 hover:text-blue-600 font-medium"
                >
                  PUNYA KODE DISKON?
                </button>
              ) : (
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Masukkan kode diskon"
                    value={discountCode}
                    onChange={(e) => setDiscountCode(e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowDiscountInput(false)}
                    className="px-3 py-2 text-gray-500 hover:text-gray-700"
                  >
                    <X size={18} />
                  </button>
                </div>
              )}
            </div>

            {/* Price Breakdown */}
            <div className="border-t border-gray-200 pt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500 line-through">{formatRupiah(originalPrice)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Harga</span>
                <span className="font-medium">{formatRupiah(discountedPrice)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Sub-Total</span>
                <span className="font-medium">{formatRupiah(subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Fee Admin</span>
                <span className="font-medium">{formatRupiah(adminFee)}</span>
              </div>
              <div className="border-t border-gray-200 pt-2 flex justify-between">
                <span className="font-medium text-gray-900">Total</span>
                <span className="font-bold text-gray-900">{formatRupiah(total)}</span>
              </div>
            </div>

            {/* Pay Button - QRIS Only */}
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <span>Bayar dengan QRIS</span>
              <span className="text-2xl">📱</span>
            </motion.button>

            <p className="text-center text-xs text-gray-500">
              Pembayaran akan diproses dengan QRIS
            </p>
          </form>

          {/* Description */}
          <div className="mt-8">
            <h3 className="text-sm font-medium text-gray-900 text-center mb-4">Deskripsi</h3>
            <div className="text-sm text-gray-600 space-y-4">
              <p className="font-medium">Tools AI Clipping Otomatis – Siap Pakai</p>
              <p>Capek ngabisin waktu & tenaga cuma buat ngedit video?</p>
              <p>Sekarang kamu bisa punya sistem AI yang ngerjain semuanya buat kamu.</p>
              
              <p className="font-medium mt-4">Clipper Agent AI adalah tools AI Clipping yang bisa:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Analisa video otomatis</li>
                <li>Ambil bagian paling menarik</li>
                <li>Buat video clipping / short</li>
                <li>Export siap upload</li>
              </ul>
              <p>Tanpa skill editing. Tanpa ribet timeline. Tanpa begadang.</p>

              {showDescription && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="space-y-4"
                >
                  <div>
                    <p className="font-medium text-lg">💰 POTENSI BISNIS</p>
                    <p>Tools ini banyak dipakai untuk:</p>
                    <ul className="list-disc list-inside space-y-1">
                      <li>Jasa AI Clipping</li>
                      <li>Konten short monetisasi</li>
                      <li>Support affiliate & produk digital</li>
                    </ul>
                  </div>

                  <div>
                    <p className="font-medium">🎯 Target realistis hingga Rp500.000 per hari</p>
                    <p className="text-xs">(dengan eksekusi & konsistensi).</p>
                  </div>

                  <div>
                    <p className="font-medium text-lg">⏱️ CEPAT DIJALANKAN</p>
                    <p>Dalam <span className="font-bold">12 jam</span>, kamu sudah bisa:</p>
                    <ul className="list-disc list-inside space-y-1">
                      <li>Punya sistem clipping sendiri</li>
                      <li>Produksi video tanpa edit manual</li>
                      <li>Mulai jalankan bisnis AI Clipping</li>
                    </ul>
                  </div>

                  <div>
                    <p className="font-medium text-lg">✅ KEUNGGULAN UTAMA</p>
                    <ul className="list-disc list-inside space-y-1">
                      <li>✔ Sistem AI, bukan manual</li>
                      <li>✔ Bisa dijalankan pemula</li>
                      <li>✔ Hemat waktu & tenaga</li>
                      <li>✔ Cocok untuk personal & bisnis</li>
                      <li>✔ Bisnis digital yang terus dibutuhkan</li>
                    </ul>
                  </div>

                  <div>
                    <p className="font-medium text-lg">🌐 BISNIS YANG TIDAK PERNAH MATI</p>
                    <p>Selama internet masih ada dan konten video masih dikonsumsi, AI Clipping akan selalu dicari.</p>
                  </div>

                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <p className="font-medium text-yellow-800">⚠️ CATATAN PENTING</p>
                    <ul className="list-disc list-inside text-yellow-700 space-y-1">
                      <li>Hasil bisa berbeda tiap orang</li>
                      <li>Bergantung pada strategi & konsistensi</li>
                      <li>Produk digital, tidak ada pengiriman fisik</li>
                    </ul>
                  </div>
                </motion.div>
              )}

              <button
                type="button"
                onClick={() => setShowDescription(!showDescription)}
                className="text-blue-500 hover:text-blue-600 text-sm font-medium flex items-center gap-1 mx-auto"
              >
                {showDescription ? '- Baca lebih sedikit' : '+ Baca lebih banyak'}
              </button>
            </div>
          </div>

          {/* Security Badge */}
          <div className="mt-8 border border-gray-200 rounded-lg p-4 flex items-start gap-3">
            <Shield className="text-green-500 mt-1" size={24} />
            <div>
              <p className="font-medium text-gray-900">Pembayaran Aman</p>
              <p className="text-sm text-gray-500">Semua pembayaran menggunakan enkripsi keamanan RSA</p>
            </div>
          </div>

          {/* Language Switcher */}
          <div className="mt-6 flex items-center justify-center gap-2 text-xs text-gray-500">
            <button className="hover:text-gray-700 font-medium">BAHASA</button>
            <span>|</span>
            <button className="hover:text-gray-700">ENGLISH</button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-white border-t border-gray-200 py-4">
        <div className="flex items-center justify-center gap-2 text-xs text-gray-400">
          <span className="font-bold text-blue-600">M</span>
          <span>POWERED BY</span>
          <span className="font-medium text-gray-600">QRIS PAYMENT</span>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
