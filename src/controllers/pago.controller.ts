import { Request, Response } from "express";
import { Pago } from "../models/Pago";

export class PagoController {

  public async getAll(req: Request, res: Response) {
    try {
      const pagos = await Pago.findAll();
      res.status(200).json(pagos);
    } catch {
      res.status(500).json({ error: "Error al obtener pagos" });
    }
  }

  public async create(req: Request, res: Response) {
    try {
      const pago = await Pago.create(req.body);
      res.status(201).json(pago);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  public async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const pago = await Pago.findByPk(id);

      if (!pago) return res.status(404).json({ error: "No encontrado" });

      await pago.update(req.body);
      res.status(200).json(pago);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  public async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const pago = await Pago.findByPk(id);

      if (!pago) return res.status(404).json({ error: "No encontrado" });

      await pago.destroy();
      res.status(200).json({ message: "Pago eliminado" });
    } catch {
      res.status(500).json({ error: "Error al eliminar" });
    }
  }
}