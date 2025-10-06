import express from 'express';
import cors from 'cors';
import patientRoutes from './routes/patient.routes';
import professionalRoutes from './routes/professional.routes';
import appointmentRoutes from './routes/appointment.routes';

const app = express();
app.use(express.json());
app.use(cors());

app.use('/patients', patientRoutes);
app.use('/professionals', professionalRoutes);
app.use('/appointments', appointmentRoutes);

export default app;