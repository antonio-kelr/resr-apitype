import express from "express";
import dotenv from 'dotenv'
dotenv.config()
import './shared/services/TransiationsYup'
import {router} from './routes'

const server = express();

server.use(express.json())
server.use(router)


export { server }