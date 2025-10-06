"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePatient = exports.updatePatient = exports.getPatientById = exports.getAllPatients = exports.createPatient = void 0;
const prisma_1 = __importDefault(require("../lib/prisma"));
const createPatient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, phone } = req.body;
        const newPatient = yield prisma_1.default.patient.create({ data: { name, email, phone } });
        res.status(201).json(newPatient);
    }
    catch (error) {
        res.status(500).json({ error: 'Não foi possível cadastrar o paciente' });
    }
});
exports.createPatient = createPatient;
const getAllPatients = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const patients = yield prisma_1.default.patient.findMany();
    res.json(patients);
});
exports.getAllPatients = getAllPatients;
const getPatientById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const patient = yield prisma_1.default.patient.findUnique({ where: { id: Number(id) } });
    if (!patient)
        return res.status(404).json({ error: "Paciente não encontrado." });
    res.json(patient);
});
exports.getPatientById = getPatientById;
const updatePatient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const updatedPatient = yield prisma_1.default.patient.update({ where: { id: Number(id) }, data: req.body });
    res.json(updatedPatient);
});
exports.updatePatient = updatePatient;
const deletePatient = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    yield prisma_1.default.patient.delete({ where: { id: Number(id) } });
    res.status(204).send();
});
exports.deletePatient = deletePatient;
