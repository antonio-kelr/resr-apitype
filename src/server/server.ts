import express from "express";
import 'dotenv/config';
import './shared/services/TransiationsYup'
import apiRouter from './routes/api'
import cidadesRouter from './routes/cidades'
import pessoasRouter from './routes/pessoas'
import agendasRouter from './routes/agendas'
import usuariosRouter from './routes/usuarios'
import classificadosRouter from './routes/classificados'
import cors from 'cors'


const server = express();

server.use(express.json())
const corsOptions = {
  origin: 'http://localhost:3000', // Substitua pelo domínio que você deseja permitir
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: ['Content-Type', 'Authorization'],
};

server.use(cors(corsOptions));

server.use('/', apiRouter)
server.use('/cidades', cidadesRouter)
server.use('/pessoas', pessoasRouter)
server.use('/agendas', agendasRouter)
server.use('/usuarios', usuariosRouter)
server.use('/classificados', classificadosRouter)


export { server }