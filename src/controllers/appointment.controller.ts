import { Request, Response } from 'express';

type Appointment = {
    id: number;
    appointmentDate: Date;
    patientId: number;
    professionalId: number;
}

let appointments: Appointment[] = [];
let currentId = 1;

export const createAppointment = (req: Request, res: Response) => {
    const { appointmentDate, patientId, professionalId } = req.body;
    const newAppointment = { id: currentId++, appointmentDate: new Date(appointmentDate), patientId, professionalId };
    appointments.push(newAppointment);

    console.log("--- ESTADO ATUAL DOS AGENDAMENTOS (APÓS CRIAÇÃO) ---");
    console.log(appointments);

    res.status(201).json(newAppointment);
};
export const getAllAppointments = (req: Request, res: Response) => {
    res.json(appointments);
};
export const getAppointmentById = (req: Request, res: Response) => {
    const { id } = req.params;
    const appointment = appointments.find(a => a.id === Number(id));
    if (!appointment) return res.status(404).json({ error: "Agendamento não encontrado." });
    res.json(appointment); // No plano de emergência, não temos como fazer o 'include'.
};
export const updateAppointment = (req: Request, res: Response) => {
    const { id } = req.params;
    const appointment = appointments.find(a => a.id === Number(id));
    if (!appointment) return res.status(404).json({ error: "Agendamento não encontrado." });
    
    appointment.appointmentDate = req.body.appointmentDate ? new Date(req.body.appointmentDate) : appointment.appointmentDate;
    
    console.log("--- ESTADO ATUAL DOS AGENDAMENTOS (APÓS ATUALIZAÇÃO) ---");
    console.log(appointments);

    res.json(appointment);
};
export const deleteAppointment = (req: Request, res: Response) => {
    const { id } = req.params;
    appointments = appointments.filter(a => a.id !== Number(id));

    console.log("--- ESTADO ATUAL DOS AGENDAMENTOS (APÓS DELEÇÃO) ---");
    console.log(appointments);

    res.status(204).send();
};