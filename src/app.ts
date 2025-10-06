import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../swagger.json';

import patientRoutes from './routes/patient.routes';
import professionalRoutes from './routes/professional.routes';
import appointmentRoutes from './routes/appointment.routes';

const app = express();

app.use(express.json());
app.use(cors());

// Rota da Documentação Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Rotas da API
app.use('/patients', patientRoutes);
app.use('/professionals', professionalRoutes);
app.use('/appointments', appointmentRoutes);

export default app;