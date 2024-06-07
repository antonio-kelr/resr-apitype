import express from "express";
import 'dotenv/config';
import './shared/services/TransiationsYup'
import apiRouter from './routes/api'
import cidadesRouter from './routes/cidades'
import pessoasRouter from './routes/pessoas'
import agendasRouter from './routes/agendas'
import usuariosRouter from './routes/usuarios'


const server = express();

server.use(express.json())
server.use('/', apiRouter)
server.use('/cidades', cidadesRouter)
server.use('/pessoas', pessoasRouter)
server.use('/agendas', agendasRouter)
server.use('/usuarios', usuariosRouter)


export { server }