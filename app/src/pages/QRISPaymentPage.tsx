import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Check, Clock, Shield, ArrowLeft, RefreshCw } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

// Format currency to Indonesian Rupiah
const formatRupiah = (amount: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(amount);
};

const QRISPaymentPage = () => {
  const location = useLocation();
  const [timeLeft, setTimeLeft] = useState(900); // 15 minutes in seconds
  const [paymentStatus, setPaymentStatus] = useState<'pending' | 'checking' | 'success' | 'expired'>('pending');
  const [showSuccess, setShowSuccess] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Get order data from location state or use defaults
  const orderData = location.state || {
    name: 'Customer',
    email: 'customer@email.com',
    phone: '08123456789',
    amount: 65000,
    orderId: 'ORD-' + Date.now(),
  };

  const { name, amount, orderId } = orderData;

  // Countdown timer
  useEffect(() => {
    if (timeLeft > 0 && paymentStatus === 'pending') {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setPaymentStatus('expired');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [timeLeft, paymentStatus]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const checkPaymentStatus = () => {
    setPaymentStatus('checking');
    
    // Simulate API call to check payment status
    setTimeout(() => {
      // For demo purposes, show success
      // In real implementation, check with your payment gateway API
      setPaymentStatus('success');
      setShowSuccess(true);
    }, 2000);
  };

  // Success Modal
  if (showSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center"
        >
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="text-green-500" size={40} />
          </div>
          
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Pembayaran Berhasil!
          </h2>
          <p className="text-gray-600 mb-6">
            Terima kasih {name}, pembayaran Anda telah dikonfirmasi.
          </p>
          
          <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Order ID</span>
              <span className="font-medium">{orderId}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Total Bayar</span>
              <span className="font-bold text-green-600">{formatRupiah(amount)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Metode</span>
              <span className="font-medium">QRIS</span>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-blue-800">
              <strong>Langkah Selanjutnya:</strong>
            </p>
            <p className="text-sm text-blue-700 mt-1">
              Produk akan dikirim ke email Anda dalam waktu 5-10 menit.
            </p>
          </div>
          
          <Link
            to="/"
            className="inline-block w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded-lg transition-colors"
          >
            Kembali ke Beranda
          </Link>
        </motion.div>
      </div>
    );
  }

  // Expired State
  if (paymentStatus === 'expired') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center"
        >
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Clock className="text-red-500" size={40} />
          </div>
          
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Waktu Pembayaran Habis
          </h2>
          <p className="text-gray-600 mb-6">
            Silakan kembali ke halaman checkout untuk melakukan pembayaran ulang.
          </p>
          
          <Link
            to="/checkout"
            className="inline-block w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded-lg transition-colors"
          >
            Kembali ke Checkout
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-lg mx-auto px-4 py-4 flex items-center gap-3">
          <Link to="/checkout" className="text-gray-600 hover:text-gray-900">
            <ArrowLeft size={24} />
          </Link>
          <h1 className="text-lg font-bold text-gray-900">Pembayaran QRIS</h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-lg mx-auto p-4">
        {/* Order Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-sm p-4 mb-4"
        >
          <div className="flex items-center gap-3 mb-3">
            <img 
              src="/image1.jpg" 
              alt="AUTO CLIP CUAN ENGINE"
              className="w-16 h-16 object-cover rounded-lg"
            />
            <div>
              <h2 className="font-bold text-gray-900">AUTO CLIP CUAN ENGINE</h2>
              <p className="text-sm text-gray-500">Aestetic digital</p>
            </div>
          </div>
          <div className="border-t border-gray-100 pt-3 flex justify-between items-center">
            <span className="text-gray-600">Total Pembayaran</span>
            <span className="text-xl font-bold text-blue-600">{formatRupiah(amount)}</span>
          </div>
        </motion.div>

        {/* QRIS Code - GANTI FOTO QRIS KAMU DI SINI */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl shadow-sm p-6 mb-4"
        >
          <div className="text-center mb-4">
            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium mb-3">
              <Clock size={16} />
              Bayar sebelum {formatTime(timeLeft)}
            </div>
            <p className="text-gray-600 text-sm">
              Scan kode QR menggunakan aplikasi e-wallet atau mobile banking
            </p>
          </div>

          {/* QRIS Image - GANTI DENGAN FOTO QRIS KAMU */}
          <div className="flex justify-center mb-4">
            <div className="bg-white p-4 rounded-xl border-2 border-gray-100">
              {/* 
                ============================================
                GANTI FOTO QRIS KAMU DI SINI
                ============================================
                
                Cara 1: Upload foto QRIS ke folder public/ dengan nama 'qris-code.jpg'
                Cara 2: Ganti src dengan URL foto QRIS kamu
                
                Contoh:
                - src="/qris-code.jpg" (jika file di folder public)
                - src="https://website-kamu.com/foto-qris.jpg" (jika dari URL)
              */}
              <img 
                src="/qris-placeholder.jpg" 
                alt="QRIS Payment Code"
                className="w-[280px] h-[280px] object-contain"
              />
            </div>
          </div>

          {/* Petunjuk */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-center">
            <p className="text-sm text-yellow-800">
              <strong>Penting:</strong> Screenshot QRIS ini dan scan menggunakan aplikasi e-wallet atau mobile banking Anda.
            </p>
          </div>
        </motion.div>

        {/* Instructions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl shadow-sm p-4 mb-4"
        >
          <h3 className="font-bold text-gray-900 mb-3">Cara Pembayaran</h3>
          <ol className="space-y-2 text-sm text-gray-600">
            <li className="flex gap-2">
              <span className="w-5 h-5 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">1</span>
              <span>Screenshot foto QRIS di atas</span>
            </li>
            <li className="flex gap-2">
              <span className="w-5 h-5 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">2</span>
              <span>Buka aplikasi e-wallet (OVO, DANA, GoPay, LinkAja) atau mobile banking</span>
            </li>
            <li className="flex gap-2">
              <span className="w-5 h-5 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">3</span>
              <span>Pilih menu "Scan QR" atau "Bayar dengan QRIS"</span>
            </li>
            <li className="flex gap-2">
              <span className="w-5 h-5 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">4</span>
              <span>Pilih foto QRIS dari gallery atau scan langsung</span>
            </li>
            <li className="flex gap-2">
              <span className="w-5 h-5 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">5</span>
              <span>Konfirmasi pembayaran dan masukkan PIN</span>
            </li>
            <li className="flex gap-2">
              <span className="w-5 h-5 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">6</span>
              <span>Klik "Cek Status Pembayaran" di bawah setelah membayar</span>
            </li>
          </ol>
        </motion.div>

        {/* Supported Apps */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl shadow-sm p-4 mb-4"
        >
          <h3 className="font-bold text-gray-900 mb-3">Aplikasi yang Didukung</h3>
          <div className="flex flex-wrap gap-2">
            {['OVO', 'DANA', 'GoPay', 'LinkAja', 'ShopeePay', 'BCA', 'BNI', 'Mandiri', 'BRI'].map((app) => (
              <span
                key={app}
                className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium"
              >
                {app}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Check Status Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-3"
        >
          <button
            onClick={checkPaymentStatus}
            disabled={paymentStatus === 'checking'}
            className={`w-full font-bold py-4 rounded-xl transition-colors ${
              paymentStatus === 'checking'
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-blue-500 hover:bg-blue-600 text-white'
            }`}
          >
            {paymentStatus === 'checking' ? (
              <span className="flex items-center justify-center gap-2">
                <RefreshCw size={18} className="animate-spin" />
                Mengecek status...
              </span>
            ) : (
              'Cek Status Pembayaran'
            )}
          </button>

          <Link
            to="/checkout"
            className="block w-full text-center text-gray-500 hover:text-gray-700 font-medium py-2"
          >
            Batalkan & Kembali
          </Link>
        </motion.div>

        {/* Security Badge */}
        <div className="mt-6 flex items-center justify-center gap-2 text-xs text-gray-400">
          <Shield size={14} />
          <span>Pembayaran aman dengan enkripsi SSL</span>
        </div>
      </div>
    </div>
  );
};

export default QRISPaymentPage;
