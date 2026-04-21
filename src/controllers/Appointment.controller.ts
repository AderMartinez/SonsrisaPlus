import { Request, Response } from "express";
import { Appointment } from "../models/appointment";
import { Patient } from "../models/patient";
import { Payment } from "../models/payment";

export class AppointmentController {

  public async getAll(req: Request, res: Response) {
    try {
      const appointments = await Appointment.findAll({
        include: [
          { model: Patient, as: "patient" },
          { model: Payment, as: "payments" }
        ]
      });
      res.status(200).json(appointments);
    } catch {
      res.status(500).json({ error: "Error fetching appointments" });
    }
  }

  public async create(req: Request, res: Response) {
    try {
      const newAppointment = await Appointment.create(req.body);
      res.status(201).json(newAppointment);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  public async update(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const appointment = await Appointment.findByPk(Number(id)); 

      if (!appointment) {
        res.status(404).json({ error: "Appointment not found" });
        return;
      }

      await appointment.update(req.body);
      res.status(200).json(appointment);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  public async delete(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const appointment = await Appointment.findByPk(Number(id));

      if (!appointment) {
        res.status(404).json({ error: "Appointment not found" });
        return;
      }

      await appointment.destroy();
      res.status(200).json({ message: "Appointment deleted" });
    } catch {
      res.status(500).json({ error: "Error deleting appointment" });
    }
  }
}