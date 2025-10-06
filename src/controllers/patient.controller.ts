import { Request, Response } from 'express';
import prisma from '../lib/prisma';

export const createPatient = async (req: Request, res: Response) => {
  try {
    const { name, email, phone } = req.body;
    const newPatient = await prisma.patient.create({ data: { name, email, phone } });
    res.status(201).json(newPatient);
  } catch (error) { res.status(500).json({ error: 'Não foi possível cadastrar o paciente' }); }
};
export const getAllPatients = async (req: Request, res: Response) => {
  const patients = await prisma.patient.findMany();
  res.json(patients);
};
export const getPatientById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const patient = await prisma.patient.findUnique({ where: { id: Number(id) }});
    if (!patient) return res.status(404).json({ error: "Paciente não encontrado." });
    res.json(patient);
};
export const updatePatient = async (req: Request, res: Response) => {
    const { id } = req.params;
    const updatedPatient = await prisma.patient.update({ where: { id: Number(id) }, data: req.body });
    res.json(updatedPatient);
};
export const deletePatient = async (req: Request, res: Response) => {
    const { id } = req.params;
    await prisma.patient.delete({ where: { id: Number(id) }});
    res.status(204).send();
};