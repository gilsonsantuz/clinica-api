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
exports.deleteProfessional = exports.updateProfessional = exports.getProfessionalById = exports.getAllProfessionals = exports.createProfessional = void 0;
const prisma_1 = __importDefault(require("../lib/prisma"));
const createProfessional = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, specialty } = req.body;
        const newProfessional = yield prisma_1.default.professional.create({ data: { name, specialty } });
        res.status(201).json(newProfessional);
    }
    catch (error) {
        res.status(500).json({ error: 'Não foi possível cadastrar o profissional' });
    }
});
exports.createProfessional = createProfessional;
const getAllProfessionals = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const professionals = yield prisma_1.default.professional.findMany();
    res.json(professionals);
});
exports.getAllProfessionals = getAllProfessionals;
const getProfessionalById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const professional = yield prisma_1.default.professional.findUnique({ where: { id: Number(id) } });
    if (!professional)
        return res.status(404).json({ error: "Profissional não encontrado." });
    res.json(professional);
});
exports.getProfessionalById = getProfessionalById;
const updateProfessional = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const updatedProfessional = yield prisma_1.default.professional.update({ where: { id: Number(id) }, data: req.body });
    res.json(updatedProfessional);
});
exports.updateProfessional = updateProfessional;
const deleteProfessional = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    yield prisma_1.default.professional.delete({ where: { id: Number(id) } });
    res.status(204).send();
});
exports.deleteProfessional = deleteProfessional;
