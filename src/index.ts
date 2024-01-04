import { Prisma, PrismaClient } from '@prisma/client'
import express from 'express'
import dotenv from 'dotenv'

dotenv.config();

const prisma = new PrismaClient()
const app = express()

app.use(express.json())

const server = app.listen(3000, () =>
  console.log("Servidor ejecutándose en: http://localhost:3000")
);