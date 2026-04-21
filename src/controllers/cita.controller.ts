import { Request, Response } from "express";
import { Cita } from "../models/Cita";
import { Paciente } from "../models/Paciente";
import { Pago } from "../models/Pago";

export class CitaController {

  public async getAll(req: Request, res: Response) {
    try {
      const citas = await Cita.findAll({
        include: [
          { model: Paciente, as: "paciente" },
          { model: Pago, as: "pagos" }
        ]
      });

      res.status(200).json(citas);
    } catch {
      res.status(500).json({ error: "Error al obtener citas" });
    }
  }

  public async create(req: Request, res: Response) {
    try {
      const nueva = await Cita.create(req.body);
      res.status(201).json(nueva);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  public async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const cita = await Cita.findByPk(id);

      if (!cita) return res.status(404).json({ error: "No encontrada" });

      await cita.update(req.body);
      res.status(200).json(cita);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  public async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const cita = await Cita.findByPk(id);

      if (!cita) return res.status(404).json({ error: "No encontrada" });

      await cita.destroy();
      res.status(200).json({ message: "Cita eliminada" });
    } catch {
      res.status(500).json({ error: "Error al eliminar" });
    }
  }
}