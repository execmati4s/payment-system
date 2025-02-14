export interface Payment {
  id?: string;
  amount: number;
  currency: string;
  description: string;
  method: PaymentMethod; // Transbank, PayPal, etc.
  status: PaymentStatus;
}

type PaymentMethod = 'paypal' | 'creditcard' | 'transbank';

type PaymentStatus = 'pending' | 'completed' | 'failed';


