import express from "express";
import 'dotenv/config';
import './shared/services/TransiationsYup'
import apiRouter from './routes/api'
import cidadesRouter from './routes/cidades'
import pessoasRouter from './routes/pessoas'
import agendasRouter from './routes/agendas'
import coberturaRouter from './routes/coberturas'
import coberturaImagensRouter from './routes/coberturaImagens'
import recadoRouter from './routes/recados'
import bannerRouter from './routes/Banner'
import AnucioRouter from './routes/Anucio'
import usuariosRouter from './routes/usuarios'
import classificadosRouter from './routes/classificados'
import classificadoImgsRouter from './routes/classificadoImgs'
import noticiasRouter from './routes/noticias'
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
server.use('/usuarios', usuariosRouter)
server.use('/pessoas', pessoasRouter)
server.use('/agendas', agendasRouter)
server.use('/noticias', noticiasRouter)
server.use('/recados', recadoRouter)
server.use('/coberturas', coberturaRouter)
server.use('/coberturasImg', coberturaImagensRouter)
server.use('/classificados', classificadosRouter)
server.use('/classifcadoImgs', classificadoImgsRouter)
server.use('/banner', bannerRouter)
server.use('/anucios', AnucioRouter)


export { server }