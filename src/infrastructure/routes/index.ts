import { Router } from "express";
import { PaymentController } from "../controllers/PaymentController";

const router = Router();

const paymentController = new PaymentController();

router.post("/payments", paymentController.createPayment.bind(paymentController));
router.get("/payments/confirm", paymentController.confirmPayment.bind(paymentController));

export default router;
