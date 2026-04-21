import { Request, Response } from "express";
import { Paciente, PacienteI } from "../models/Paciente";

export class PacienteController {

  public async getAll(req: Request, res: Response) {
    try {
      const pacientes = await Paciente.findAll({
        where: { estado: "ACTIVO" },
      });
      res.status(200).json({ pacientes });
    } catch {
      res.status(500).json({ error: "Error al obtener pacientes" });
    }
  }

  public async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const paciente = await Paciente.findOne({
        where: { paciente_id: id, estado: "ACTIVO" },
      });

      paciente
        ? res.status(200).json(paciente)
        : res.status(404).json({ error: "Paciente no encontrado" });
    } catch {
      res.status(500).json({ error: "Error al buscar paciente" });
    }
  }

  public async create(req: Request, res: Response) {
    try {
      const body: PacienteI = req.body;
      const nuevo = await Paciente.create({ ...body });
      res.status(201).json(nuevo);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  public async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const paciente = await Paciente.findByPk(id);

      if (!paciente) return res.status(404).json({ error: "No encontrado" });

      await paciente.update(req.body);
      res.status(200).json(paciente);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  public async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const paciente = await Paciente.findByPk(id);

      if (!paciente) return res.status(404).json({ error: "No encontrado" });

      await paciente.destroy();
      res.status(200).json({ message: "Eliminado" });
    } catch {
      res.status(500).json({ error: "Error al eliminar" });
    }
  }

  public async deleteLogic(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const paciente = await Paciente.findByPk(id);

      if (!paciente) return res.status(404).json({ error: "No encontrado" });

      await paciente.update({ estado: "INACTIVO" });
      res.status(200).json({ message: "Paciente inactivado" });
    } catch {
      res.status(500).json({ error: "Error lógico" });
    }
  }
}