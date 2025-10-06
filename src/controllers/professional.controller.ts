import { Request, Response } from 'express';
import prisma from '../lib/prisma';

export const createProfessional = async (req: Request, res: Response) => {
    try {
      const { name, specialty } = req.body;
      const newProfessional = await prisma.professional.create({ data: { name, specialty } });
      res.status(201).json(newProfessional);
    } catch (error) { res.status(500).json({ error: 'Não foi possível cadastrar o profissional' }); }
};
export const getAllProfessionals = async (req: Request, res: Response) => {
    const professionals = await prisma.professional.findMany();
    res.json(professionals);
};
export const getProfessionalById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const professional = await prisma.professional.findUnique({ where: { id: Number(id) }});
    if (!professional) return res.status(404).json({ error: "Profissional não encontrado." });
    res.json(professional);
};
export const updateProfessional = async (req: Request, res: Response) => {
    const { id } = req.params;
    const updatedProfessional = await prisma.professional.update({ where: { id: Number(id) }, data: req.body });
    res.json(updatedProfessional);
};
export const deleteProfessional = async (req: Request, res: Response) => {
    const { id } = req.params;
    await prisma.professional.delete({ where: { id: Number(id) }});
    res.status(204).send();
};