import React, { useState } from 'react';
import NeoButton from '../../../components/ui/NeoButton';

const paymentMethods = [
  { id: 'qris',    icon: '📱', label: 'QRIS / E-Wallet',           desc: 'GoPay, OVO, DANA, ShopeePay' },
  { id: 'va',      icon: '🏦', label: 'Virtual Account',            desc: 'BCA, Mandiri, BRI, BNI' },
  { id: 'cash',    icon: '💵', label: 'Pay at Cashier',             desc: 'Bayar saat tiba di tempat' },
];

interface PaymentPageProps {
  onBack: () => void;
  onConfirm: () => void;
  totalAmount: number;
  isLoading?: boolean;
}

const PaymentPage: React.FC<PaymentPageProps> = ({
  onBack,
  onConfirm,
  totalAmount,
  isLoading = false,
}) => {
  const [selected, setSelected] = useState('qris');

  const formatPrice = (n: number) => `Rp ${n.toLocaleString('id-ID')}`;
  const adminFee = 2500;
  const total = totalAmount + adminFee;

  return (
    <div className="animate-fade-in">
      <h2 className="text-4xl font-display mb-2">Payment</h2>
      <p className="text-neo-black/60 font-bold mb-8">Pilih metode pembayaran yang paling mudah untukmu.</p>

      {/* Total Amount Card */}
      <div className="bg-neo-black text-neo-white border-4 border-neo-black rounded-neo shadow-neo-yellow p-6 mb-8">
        <div className="flex justify-between items-start mb-4 pb-4 border-b-2 border-neo-white/20">
          <div>
            <p className="text-neo-white/60 text-sm font-bold uppercase">Subtotal</p>
            <p className="text-xl font-display text-neo-yellow">{formatPrice(totalAmount)}</p>
          </div>
          <div className="text-right">
            <p className="text-neo-white/60 text-sm font-bold uppercase">Admin Fee</p>
            <p className="text-xl font-display text-neo-yellow">{formatPrice(adminFee)}</p>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <p className="font-black uppercase tracking-wide">Total Payment</p>
          <p className="text-4xl font-display text-neo-yellow">{formatPrice(total)}</p>
        </div>
      </div>

      {/* Payment Methods */}
      <h3 className="text-2xl font-display mb-4">Payment Method</h3>
      <div className="flex flex-col gap-3 mb-8">
        {paymentMethods.map((method) => {
          const isActive = selected === method.id;
          return (
            <label
              key={method.id}
              htmlFor={`pay-${method.id}`}
              className={[
                'flex items-center gap-4 p-4 border-4 rounded-neo cursor-pointer transition-all duration-150',
                isActive
                  ? 'border-neo-black bg-neo-yellow shadow-neo scale-[1.01]'
                  : 'border-neo-black bg-neo-white hover:bg-neo-light shadow-neo-sm hover:-translate-y-0.5 hover:shadow-neo',
              ].join(' ')}
            >
              <input
                id={`pay-${method.id}`}
                type="radio"
                name="payment"
                value={method.id}
                checked={isActive}
                onChange={() => setSelected(method.id)}
                className="w-5 h-5 accent-neo-orange"
              />
              <span className="text-3xl">{method.icon}</span>
              <div>
                <p className="font-black text-base uppercase">{method.label}</p>
                <p className="text-xs font-bold text-neo-black/60">{method.desc}</p>
              </div>
            </label>
          );
        })}
      </div>

      {/* Security note */}
      <div className="bg-neo-light border-3 border-neo-black rounded-neo p-4 mb-8 flex items-start gap-3">
        <span className="text-xl shrink-0">🔒</span>
        <p className="text-sm font-bold text-neo-black/70 leading-relaxed">
          Transaksi ini dienkripsi dan aman. Kami tidak menyimpan data kartu pembayaran kamu.
        </p>
      </div>

      {/* Navigation */}
      <div className="flex flex-col sm:flex-row gap-3 justify-between">
        <NeoButton variant="secondary" size="lg" onClick={onBack} disabled={isLoading}>
          ← Back
        </NeoButton>
        <NeoButton
          variant="primary"
          size="lg"
          onClick={onConfirm}
          loading={isLoading}
          id="confirm-payment-btn"
        >
          {isLoading ? 'Processing...' : `Pay ${formatPrice(total)} →`}
        </NeoButton>
      </div>
    </div>
  );
};

export default PaymentPage;
