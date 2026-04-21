import { Request, Response } from "express";
import { Procedimiento } from "../models/Procedimiento";

export class ProcedimientoController {

  public async getAll(req: Request, res: Response) {
    try {
      const procedimientos = await Procedimiento.findAll({
        where: { estado: "ACTIVO" }
      });
      res.status(200).json(procedimientos);
    } catch {
      res.status(500).json({ error: "Error al obtener procedimientos" });
    }
  }

  public async create(req: Request, res: Response) {
    try {
      const procedimiento = await Procedimiento.create(req.body);
      res.status(201).json(procedimiento);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}