export interface PaymentConfirmationDTO {
  id: string;
  status: string;
  amount: { value: string; currency?: string };
  method: string;
  description?: string;
}
