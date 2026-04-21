import { Request, Response } from "express";
import { Payment } from "../models/payment";

export class PaymentController {

  public async getAll(req: Request, res: Response) {
    try {
      const payments = await Payment.findAll();
      res.status(200).json(payments);
    } catch {
      res.status(500).json({ error: "Error fetching payments" });
    }
  }

  public async create(req: Request, res: Response) {
    try {
      const payment = await Payment.create(req.body);
      res.status(201).json(payment);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  public async update(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const payment = await Payment.findByPk(Number(id));

      if (!payment) {
        res.status(404).json({ error: "Payment not found" }); 
        return;
      }

      await payment.update(req.body);
      res.status(200).json(payment);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  public async delete(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const payment = await Payment.findByPk(Number(id));

      if (!payment) {
        res.status(404).json({ error: "Payment not found" }); 
        return;
      }

      await payment.destroy();
      res.status(200).json({ message: "Payment deleted" });
    } catch {
      res.status(500).json({ error: "Error deleting payment" });
    }
  }
}