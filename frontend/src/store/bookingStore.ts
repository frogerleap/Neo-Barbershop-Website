import { create } from 'zustand';

export type BookingStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled';

export interface BookingData {
  serviceId: string;
  barberId: string;
  date: string;
  time: string;
}

export interface Booking extends BookingData {
  id: string;
  userId: string;
  status: BookingStatus;
  createdAt: string;
  totalAmount: number;
}

interface BookingState {
  // Active wizard data
  wizardData: Partial<BookingData>;
  currentStep: number;
  // All bookings (will be fetched from API later)
  bookings: Booking[];
  isSubmitting: boolean;
  submitSuccess: boolean;

  setWizardData: (data: Partial<BookingData>) => void;
  setCurrentStep: (step: number) => void;
  resetWizard: () => void;
  addBooking: (booking: Booking) => void;
  updateBookingStatus: (id: string, status: BookingStatus) => void;
  setSubmitting: (val: boolean) => void;
  setSubmitSuccess: (val: boolean) => void;
}

const INITIAL_WIZARD: Partial<BookingData> = {};

export const useBookingStore = create<BookingState>()((set) => ({
  wizardData: INITIAL_WIZARD,
  currentStep: 0,
  bookings: [],
  isSubmitting: false,
  submitSuccess: false,

  setWizardData: (data) =>
    set((state) => ({ wizardData: { ...state.wizardData, ...data } })),

  setCurrentStep: (step) => set({ currentStep: step }),

  resetWizard: () =>
    set({ wizardData: INITIAL_WIZARD, currentStep: 0, submitSuccess: false }),

  addBooking: (booking) =>
    set((state) => ({ bookings: [...state.bookings, booking] })),

  updateBookingStatus: (id, status) =>
    set((state) => ({
      bookings: state.bookings.map((b) =>
        b.id === id ? { ...b, status } : b
      ),
    })),

  setSubmitting: (val) => set({ isSubmitting: val }),
  setSubmitSuccess: (val) => set({ submitSuccess: val }),
}));
