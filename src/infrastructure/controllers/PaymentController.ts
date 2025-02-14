import { Request, Response } from "express";
import { PaymentProviderFactory } from "../providers/PaymentProviderFactory";
export class PaymentController {
  async createPayment(req: Request, res: Response): Promise<any> {
    const { amount, method } = req.body;

    try {

      const provider = PaymentProviderFactory.getProvider(method);

      const paymentUrl = await provider.createPayment({
        intent: "CAPTURE" as string,
        purchase_units: [
          {
            amount: {
              currency_code: "USD",
              value: amount,
            },
          },
        ],
        application_context: {
          brand_name: process.env.BRAND_NAME || "Payment Gateway",
          landing_page: "NO_PREFERENCE",
          user_action: "PAY_NOW",
          return_url: `http://localhost:3000/api/payments/confirm?method=${method}`,
          cancel_url: `http://localhost:3000`,
        },
      });

      return res.status(200).json(paymentUrl);

    } catch (error) {

      if (error instanceof Error) {

        return res.status(400).json({ message: error.message });
      }

      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async confirmPayment(req: Request, res: Response): Promise<any> {

    const { token, method } = req.query;

    if (!token) {
      return res.status(400).json({ message: "Token is required" });
    }

    try {

      const provider = PaymentProviderFactory.getProvider(method as string);

      if (!provider) return res.status(400).json({ message: "Invalid payment method" });

      const payment = await provider.confirmPayment(token as string);

      return res.status(200).json(payment);

    } catch (error) {
      
      if (error instanceof Error) {
        return res.status(400).json({ message: error.message });
      }

      return res.status(500).json({ message: "Internal server error" });
    }
  }
}
