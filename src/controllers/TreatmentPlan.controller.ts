import { Request, Response } from "express";
import { TreatmentPlan } from "../models/treatmentPlan";

export class TreatmentPlanController {

  public async getAll(req: Request, res: Response) {
    try {
      const treatmentPlans = await TreatmentPlan.findAll();
      res.status(200).json(treatmentPlans);
    } catch {
      res.status(500).json({ error: "Error fetching treatment plans" });
    }
  }

  public async create(req: Request, res: Response) {
    try {
      const treatmentPlan = await TreatmentPlan.create(req.body);
      res.status(201).json(treatmentPlan);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}