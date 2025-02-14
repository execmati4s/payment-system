import { IPaymentProvider } from "../../domain/contracts/IPaymentProvider";
import { PayPalProvider } from "./PaypalProvider";
import { TransbankProvider } from "./TransbankProvider";

const providers: Record<string, () => IPaymentProvider> = {
  paypal: () => new PayPalProvider(),
  transbank: () => new TransbankProvider(),
};

export class PaymentProviderFactory {
  static getProvider(method: string): IPaymentProvider {
    const provider = providers[method];
    
    if (!provider) throw new Error("Invalid payment method");
    return provider();
  }
}
