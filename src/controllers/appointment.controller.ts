import { Request, Response } from 'express';
import prisma from '../lib/prisma';

export const createAppointment = async (req: Request, res: Response) => {
    try {
      const { appointmentDate, patientId, professionalId } = req.body;
      const newAppointment = await prisma.appointment.create({
        data: { appointmentDate: new Date(appointmentDate), patientId, professionalId },
      });
      res.status(201).json(newAppointment);
    } catch (error) { res.status(500).json({ error: 'Não foi possível criar o agendamento' });}
};
export const getAllAppointments = async (req: Request, res: Response) => {
    const appointments = await prisma.appointment.findMany();
    res.json(appointments);
};
export const getAppointmentById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const appointment = await prisma.appointment.findUnique({
        where: { id: Number(id) },
        include: { patient: true, professional: true }
    });
    if (!appointment) return res.status(404).json({ error: "Agendamento não encontrado." });
    res.json(appointment);
};
export const updateAppointment = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { appointmentDate } = req.body;
    const updatedAppointment = await prisma.appointment.update({
        where: { id: Number(id) },
        data: { appointmentDate: appointmentDate ? new Date(appointmentDate) : undefined }
    });
    res.json(updatedAppointment);
};
export const deleteAppointment = async (req: Request, res: Response) => {
    const { id } = req.params;
    await prisma.appointment.delete({ where: { id: Number(id) }});
    res.status(204).send();
};