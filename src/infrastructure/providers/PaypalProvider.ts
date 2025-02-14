import { PaymentConfirmationDTO } from "../../application/dto/PaymentConfirmDTO";
import { PaymentResponseDTO } from "../../application/dto/PaymentResponseDTO";
import { IPaymentProvider } from "../../domain/contracts/IPaymentProvider";
import { Payment } from "../../domain/entities/Payment";

import axios from "axios";

export class PayPalProvider implements IPaymentProvider {
  
  async getAccessToken(): Promise<string> {
    const {
      data: { access_token },
    } = await axios.post(
      `${process.env.PAYPAL_API}/v1/oauth2/token`,
      "grant_type=client_credentials",
      {
        auth: {
          username: process.env.PAYPAL_API_CLIENT || "",
          password: process.env.PAYPAL_API_SECRET || "",
        },
      }
    );

    return access_token;
  }

  async createPayment(payload: any): Promise<PaymentResponseDTO> {
    const access_token = await this.getAccessToken();

    const response = await axios.post(
      `${process.env.PAYPAL_API}/v2/checkout/orders`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    return {
      id: response.data.id,
      url: response.data.links[1].href
    };
  }

  async confirmPayment(token: string): Promise<PaymentConfirmationDTO> {
    const response = await axios.post(
      `${process.env.PAYPAL_API}/v2/checkout/orders/${token}/capture`,
      {},
      {
        auth: {
          username: process.env.PAYPAL_API_CLIENT || "",
          password: process.env.PAYPAL_API_SECRET || "",
        },
      }
    );

    const data = response.data;

    return {
      id: data.id,
      status: data.status,
      amount: {
        value: data.purchase_units[0].payments.captures[0].amount.value,
        currency:
          data.purchase_units[0].payments.captures[0].amount.currency_code,
      },
      method: "paypal",
      description: data.purchase_units[0].description || "Payment captured"
    };
  }
}
