import { Prisma, PrismaClient } from '@prisma/client'
import express from 'express'
import dotenv from 'dotenv'
import { getCityGeolocation } from './services/geolocation';

dotenv.config();

const prisma = new PrismaClient()
const app = express()

app.use(express.json())

app.get('/usuarios', async (req, res) => {
  const users = await prisma.usuario.findMany();
  res.json(users);
})

app.get('/usuarios/:id', async (req, res) => {
  const id = req.params.id;
  const user = await prisma.usuario.findUnique({
    where: {
      id: id
    }
  });
  if (!user) {
    res.status(404).json({ error: 'Usuario no encontrado' });
    return;
  }
  res.json(user);
})

app.post('/geolocalizacion', async (req, res) => {
  const usuario = req.body.usuario;
  // Validar que el usuario exista
  const user = await prisma.usuario.findUnique({
    where: {
      usuario: usuario
    }
  });
  if (!user) {
    res.status(404).json({ error: 'Usuario no encontrado' });
    return;
  }

  const data = await getCityGeolocation(city);

})

app.get('/informacionGeo', async (req, res) => {
  const city = req.query.city as string;
  res.json(data);
})

const server = app.listen(3000, () =>
  console.log("Servidor ejecutándose en: http://localhost:3000")
);