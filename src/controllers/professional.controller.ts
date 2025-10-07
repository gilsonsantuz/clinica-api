import { Request, Response } from 'express';

type Professional = {
    id: number;
    name: string;
    specialty?: string;
}

let professionals: Professional[] = [];
let currentId = 1;

export const createProfessional = (req: Request, res: Response) => {
    const { name, specialty } = req.body;
    const newProfessional = { id: currentId++, name, specialty };
    professionals.push(newProfessional);

    console.log("--- ESTADO ATUAL DOS PROFISSIONAIS (APÓS CRIAÇÃO) ---");
    console.log(professionals);

    res.status(201).json(newProfessional);
};
export const getAllProfessionals = (req: Request, res: Response) => {
    res.json(professionals);
};
export const getProfessionalById = (req: Request, res: Response) => {
    const { id } = req.params;
    const professional = professionals.find(p => p.id === Number(id));
    if (!professional) return res.status(404).json({ error: "Profissional não encontrado." });
    res.json(professional);
};
export const updateProfessional = (req: Request, res: Response) => {
    const { id } = req.params;
    const professional = professionals.find(p => p.id === Number(id));
    if (!professional) return res.status(404).json({ error: "Profissional não encontrado." });
    
    professional.name = req.body.name || professional.name;
    professional.specialty = req.body.specialty || professional.specialty;

    console.log("--- ESTADO ATUAL DOS PROFISSIONAIS (APÓS ATUALIZAÇÃO) ---");
    console.log(professionals);
    
    res.json(professional);
};
export const deleteProfessional = (req: Request, res: Response) => {
    const { id } = req.params;
    professionals = professionals.filter(p => p.id !== Number(id));

    console.log("--- ESTADO ATUAL DOS PROFISSIONAIS (APÓS DELEÇÃO) ---");
    console.log(professionals);

    res.status(204).send();
};