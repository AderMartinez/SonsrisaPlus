import { Request, Response } from "express";
import { Patient, PatientI } from "../models/patient";

export class PatientController {

  public async getAll(req: Request, res: Response) {
    try {
      const patients = await Patient.findAll({
        where: { status: "ACTIVE" },
      });
      res.status(200).json({ patients });
    } catch {
      res.status(500).json({ error: "Error fetching patients" });
    }
  }

  public async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const patient = await Patient.findOne({
        where: { patient_id: Number(id), status: "ACTIVE" },
      });

      patient
        ? res.status(200).json(patient)
        : res.status(404).json({ error: "Patient not found" });
    } catch {
      res.status(500).json({ error: "Error fetching patient" });
    }
  }

  public async create(req: Request, res: Response) {
    try {
      const body: PatientI = req.body;
      const newPatient = await Patient.create({ ...body });
      res.status(201).json(newPatient);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  public async update(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const patient = await Patient.findByPk(Number(id));

      if (!patient) {
        res.status(404).json({ error: "Patient not found" });
        return;
      }

      await patient.update(req.body);
      res.status(200).json(patient);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  public async delete(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const patient = await Patient.findByPk(Number(id));

      if (!patient) {
        res.status(404).json({ error: "Patient not found" });
        return;
      }

      await patient.destroy();
      res.status(200).json({ message: "Patient deleted" });
    } catch {
      res.status(500).json({ error: "Error deleting patient" });
    }
  }

  public async softDelete(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const patient = await Patient.findByPk(Number(id));

      if (!patient) {
        res.status(404).json({ error: "Patient not found" });
        return;
      }

      await patient.update({ status: "INACTIVE" });
      res.status(200).json({ message: "Patient deactivated" });
    } catch {
      res.status(500).json({ error: "Soft delete error" });
    }
  }
}