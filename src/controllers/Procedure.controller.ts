import { Request, Response } from "express";
import { Procedure } from "../models/procedure";

export class ProcedureController {

  public async getAll(req: Request, res: Response) {
    try {
      const procedures = await Procedure.findAll({
        where: { status: "ACTIVE" }
      });
      res.status(200).json(procedures);
    } catch {
      res.status(500).json({ error: "Error fetching procedures" });
    }
  }

  public async create(req: Request, res: Response) {
    try {
      const procedure = await Procedure.create(req.body);
      res.status(201).json(procedure);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}