import express from 'express';
import usersRoutes from './routes/users.routes';
import videosRoutes from './routes/videos.routes';
import apiRoutes from './routes/api.routes';
import { config } from 'dotenv';
import cors from 'cors';

const app = express();

config();

// Configuração do CORS
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use('/users', usersRoutes);
app.use('/videos', videosRoutes);
app.use('/youtube', apiRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});