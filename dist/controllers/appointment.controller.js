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
exports.deleteAppointment = exports.updateAppointment = exports.getAppointmentById = exports.getAllAppointments = exports.createAppointment = void 0;
const prisma_1 = __importDefault(require("../lib/prisma"));
const createAppointment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { appointmentDate, patientId, professionalId } = req.body;
        const newAppointment = yield prisma_1.default.appointment.create({
            data: { appointmentDate: new Date(appointmentDate), patientId, professionalId },
        });
        res.status(201).json(newAppointment);
    }
    catch (error) {
        res.status(500).json({ error: 'Não foi possível criar o agendamento' });
    }
});
exports.createAppointment = createAppointment;
const getAllAppointments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const appointments = yield prisma_1.default.appointment.findMany();
    res.json(appointments);
});
exports.getAllAppointments = getAllAppointments;
const getAppointmentById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const appointment = yield prisma_1.default.appointment.findUnique({
        where: { id: Number(id) },
        include: { patient: true, professional: true }
    });
    if (!appointment)
        return res.status(404).json({ error: "Agendamento não encontrado." });
    res.json(appointment);
});
exports.getAppointmentById = getAppointmentById;
const updateAppointment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { appointmentDate } = req.body;
    const updatedAppointment = yield prisma_1.default.appointment.update({
        where: { id: Number(id) },
        data: { appointmentDate: appointmentDate ? new Date(appointmentDate) : undefined }
    });
    res.json(updatedAppointment);
});
exports.updateAppointment = updateAppointment;
const deleteAppointment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    yield prisma_1.default.appointment.delete({ where: { id: Number(id) } });
    res.status(204).send();
});
exports.deleteAppointment = deleteAppointment;
