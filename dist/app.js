"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const patient_routes_1 = __importDefault(require("./routes/patient.routes"));
const professional_routes_1 = __importDefault(require("./routes/professional.routes"));
const appointment_routes_1 = __importDefault(require("./routes/appointment.routes"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use('/patients', patient_routes_1.default);
app.use('/professionals', professional_routes_1.default);
app.use('/appointments', appointment_routes_1.default);
exports.default = app;
