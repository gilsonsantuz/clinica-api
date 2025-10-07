import { Request, Response } from 'express';

type Patient = {
  id: number;
  name: string;
  email: string;
  phone?: string;
}

let patients: Patient[] = [];
let currentId = 1;

export const createPatient = (req: Request, res: Response) => {
  const { name, email, phone } = req.body;
  const newPatient = { id: currentId++, name, email, phone };
  patients.push(newPatient);

  console.log("--- ESTADO ATUAL DOS PACIENTES (APÓS CRIAÇÃO) ---");
  console.log(patients);

  res.status(201).json(newPatient);
};

export const getAllPatients = (req: Request, res: Response) => {
  res.json(patients);
};

export const getPatientById = (req: Request, res: Response) => {
  const { id } = req.params;
  const patient = patients.find(p => p.id === Number(id));
  if (!patient) return res.status(404).json({ error: "Paciente não encontrado." });
  res.json(patient);
};

export const updatePatient = (req: Request, res: Response) => {
  const { id } = req.params;
  const patient = patients.find(p => p.id === Number(id));
  if (!patient) return res.status(404).json({ error: "Paciente não encontrado." });
  
  patient.name = req.body.name || patient.name;
  patient.email = req.body.email || patient.email;
  patient.phone = req.body.phone || patient.phone;

  console.log("--- ESTADO ATUAL DOS PACIENTES (APÓS ATUALIZAÇÃO) ---");
  console.log(patients);
  
  res.json(patient);
};

export const deletePatient = (req: Request, res: Response) => {
  const { id } = req.params;
  patients = patients.filter(p => p.id !== Number(id));

  // Linhas novas para mostrar o array no terminal
  console.log("--- ESTADO ATUAL DOS PACIENTES (APÓS DELEÇÃO) ---");
  console.log(patients);

  res.status(204).send();
};