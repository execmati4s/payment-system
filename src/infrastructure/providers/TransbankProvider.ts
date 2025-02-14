import { PaymentConfirmationDTO } from '../../application/dto/PaymentConfirmDTO';
import { PaymentResponseDTO } from '../../application/dto/PaymentResponseDTO';
import { IPaymentProvider } from '../../domain/contracts/IPaymentProvider';
import { Payment } from '../../domain/entities/Payment';

export class TransbankProvider implements IPaymentProvider {
  async createPayment(payment: Payment): Promise<PaymentResponseDTO> {
    return {
      id: '123',
      url: 'https://transbank.cl/checkout'
    };
  }

  async confirmPayment(token: string): Promise<PaymentConfirmationDTO> {
    // Confirmar pago con Transbank
    return {
      id: '123',
      status: 'approved',
      amount: {
        currency: 'CLP',
        value: "10000",
      },
      method: 'transbank',
      description: 'Compra de productos',
    };
  }
}
