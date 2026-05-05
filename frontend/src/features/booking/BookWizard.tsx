import React from 'react';
import { Link } from 'react-router-dom';
import ServiceSelection from './components/ServiceSelection';
import BarberSelection from './components/BarberSelection';
import DateTimeSelection from './components/DateTimeSelection';
import BookingSummary from './components/BookingSummary';
import PaymentPage from './components/PaymentPage';
import NeoCard from '../../components/ui/NeoCard';
import NeoButton from '../../components/ui/NeoButton';
import { dummyServices } from '../../data/dummy';
import { useBookingStore } from '../../store/bookingStore';

// ── Step labels ────────────────────────────────────────────
const STEPS = [
  { icon: '✂️',  label: 'Service'  },
  { icon: '💈',  label: 'Barber'   },
  { icon: '📅',  label: 'Schedule' },
  { icon: '📋',  label: 'Summary'  },
  { icon: '💳',  label: 'Payment'  },
];

// ── Progress Bar ───────────────────────────────────────────
const ProgressBar: React.FC<{ current: number; total: number }> = ({ current, total }) => (
  <div className="mb-8">
    {/* Desktop steps */}
    <div className="hidden sm:flex justify-between items-center relative">
      {/* Connecting line */}
      <div className="absolute top-5 left-0 w-full h-1 bg-neo-black/20 -z-10" />
      <div
        className="absolute top-5 left-0 h-1 bg-neo-orange -z-10 transition-all duration-500"
        style={{ width: `${(current / (total - 1)) * 100}%` }}
      />
      {STEPS.map((step, idx) => {
        const done    = idx < current;
        const active  = idx === current;
        return (
          <div key={step.label} className="flex flex-col items-center gap-1">
            <div
              className={[
                'w-10 h-10 rounded-full border-4 border-neo-black flex items-center justify-center font-black text-base transition-all duration-300',
                done   ? 'bg-neo-green text-neo-white scale-110' :
                active ? 'bg-neo-orange text-neo-white scale-125 shadow-neo-sm animate-pulse2' :
                         'bg-neo-white text-neo-black/40',
              ].join(' ')}
            >
              {done ? '✓' : step.icon}
            </div>
            <span className={`text-xs font-black uppercase ${active ? 'text-neo-orange' : 'text-neo-black/50'}`}>
              {step.label}
            </span>
          </div>
        );
      })}
    </div>
    {/* Mobile: simple text */}
    <div className="sm:hidden flex items-center justify-between mb-2">
      <span className="text-sm font-black uppercase text-neo-black/60">
        Step {current + 1} of {total}
      </span>
      <span className="font-black text-neo-orange">{STEPS[current]?.label}</span>
    </div>
    {/* Mobile progress bar */}
    <div className="sm:hidden h-2 bg-neo-black/10 border-2 border-neo-black rounded-neo overflow-hidden">
      <div
        className="h-full bg-neo-orange transition-all duration-500"
        style={{ width: `${((current + 1) / total) * 100}%` }}
      />
    </div>
  </div>
);

// ── Success Screen ─────────────────────────────────────────
const SuccessScreen: React.FC<{ date: string; time: string; onNewBooking: () => void }> = ({
  date, time, onNewBooking,
}) => (
  <div className="text-center py-10 animate-fade-in">
    <div className="text-8xl mb-6 animate-wiggle">🎉</div>
    <div className="inline-block bg-neo-green border-4 border-neo-black px-4 py-2 rounded-neo font-display text-sm uppercase shadow-neo mb-6">
      Booking Confirmed!
    </div>
    <h2 className="text-4xl md:text-5xl font-display mb-4">You're All Set!</h2>
    <p className="text-lg font-bold text-neo-black/70 mb-2">
      Appointment confirmed for
    </p>
    <p className="text-2xl font-display text-neo-orange mb-8">
      {date && new Date(date).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long' })} · {time}
    </p>
    <p className="text-sm font-bold text-neo-black/50 mb-8">
      Konfirmasi telah dikirimkan ke email kamu. Datang tepat waktu ya! ✂️
    </p>
    <div className="flex flex-wrap gap-4 justify-center">
      <Link to="/profile">
        <NeoButton variant="primary" size="lg">View My Bookings</NeoButton>
      </Link>
      <NeoButton variant="secondary" size="lg" onClick={onNewBooking}>
        Book Again
      </NeoButton>
      <Link to="/">
        <NeoButton variant="outline" size="lg">Back to Home</NeoButton>
      </Link>
    </div>
  </div>
);

// ── BookWizard ─────────────────────────────────────────────
const BookWizard: React.FC = () => {
  const {
    wizardData,
    currentStep,
    isSubmitting,
    submitSuccess,
    setWizardData,
    setCurrentStep,
    setSubmitting,
    setSubmitSuccess,
    resetWizard,
    addBooking,
  } = useBookingStore();

  const { serviceId = '', barberId = '', date = '', time = '' } = wizardData;
  const TOTAL_STEPS = 5;
  const isSuccess = currentStep === TOTAL_STEPS;

  const next = () => setCurrentStep(currentStep + 1);
  const prev = () => setCurrentStep(Math.max(0, currentStep - 1));

  const getTotalAmount = () => {
    const service = dummyServices.find((s) => s.id === serviceId);
    return service?.price ?? 0;
  };

  const handleConfirmPayment = async () => {
    setSubmitting(true);
    // Simulate API — replace with real call later
    await new Promise((r) => setTimeout(r, 1500));
    addBooking({
      id: `bk-${Date.now()}`,
      userId: 'current-user',
      serviceId,
      barberId,
      date,
      time,
      status: 'confirmed',
      totalAmount: getTotalAmount(),
      createdAt: new Date().toISOString(),
    });
    setSubmitting(false);
    setSubmitSuccess(true);
    setCurrentStep(TOTAL_STEPS);
  };

  if (isSuccess) {
    return (
      <div className="w-full max-w-2xl mx-auto">
        <NeoCard variant="white" noPadding className="p-8 shadow-neo-lg">
          <SuccessScreen
            date={date}
            time={time}
            onNewBooking={resetWizard}
          />
        </NeoCard>
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* Progress */}
      <ProgressBar current={currentStep} total={TOTAL_STEPS} />

      {/* Card */}
      <NeoCard variant="white" noPadding className="shadow-neo-lg overflow-hidden">
        <div className="p-6 md:p-8">
          {currentStep === 0 && (
            <ServiceSelection
              selectedId={serviceId}
              onNext={(id) => { setWizardData({ serviceId: id }); next(); }}
            />
          )}
          {currentStep === 1 && (
            <BarberSelection
              selectedId={barberId}
              onBack={prev}
              onNext={(id) => { setWizardData({ barberId: id }); next(); }}
            />
          )}
          {currentStep === 2 && (
            <DateTimeSelection
              selectedDate={date}
              selectedTime={time}
              onBack={prev}
              onNext={(d, t) => { setWizardData({ date: d, time: t }); next(); }}
            />
          )}
          {currentStep === 3 && (
            <BookingSummary
              data={{ serviceId, barberId, date, time }}
              onBack={prev}
              onNext={next}
            />
          )}
          {currentStep === 4 && (
            <PaymentPage
              totalAmount={getTotalAmount()}
              onBack={prev}
              onConfirm={handleConfirmPayment}
              isLoading={isSubmitting}
            />
          )}
        </div>
      </NeoCard>
    </div>
  );
};

export default BookWizard;
