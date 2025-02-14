import { IPaymentProvider } from "../../domain/contracts/IPaymentProvider";
import { PaymentResponseDTO } from "../dto/PaymentResponseDTO";
import { PaymentConfirmationDTO } from "../dto/PaymentConfirmDTO";

export class PaymentService {
  private provider: IPaymentProvider;

  constructor(paymentProvider: IPaymentProvider) {
    this.provider = paymentProvider;
  }

  async createPayment(payment: any): Promise<PaymentResponseDTO> {
    return this.provider.createPayment(payment);
  }

  async confirmPayment(token: string): Promise<PaymentConfirmationDTO> {
    return this.provider.confirmPayment(token);
  }
}
