import { Request, Response } from "express";
import { PlanTratamiento } from "../models/PlanTratamiento";

export class PlanTratamientoController {

  public async getAll(req: Request, res: Response) {
    try {
      const planes = await PlanTratamiento.findAll();
      res.status(200).json(planes);
    } catch {
      res.status(500).json({ error: "Error al obtener planes" });
    }
  }

  public async create(req: Request, res: Response) {
    try {
      const plan = await PlanTratamiento.create(req.body);
      res.status(201).json(plan);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}