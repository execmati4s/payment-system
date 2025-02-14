import { PaymentConfirmationDTO } from "../../application/dto/PaymentConfirmDTO";
import { PaymentResponseDTO } from "../../application/dto/PaymentResponseDTO";

export interface IPaymentProvider {
  createPayment(payment: any): Promise<PaymentResponseDTO>;
  confirmPayment(token: string): Promise<PaymentConfirmationDTO>;
}

