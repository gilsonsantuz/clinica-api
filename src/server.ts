import app from './app';

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`🚀 Servidor da clínica rodando na porta ${PORT}`));