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

app.get('/georeferencias', async (req, res) => {
  const georeferencias = await prisma.georeferenciaCiudad.findMany();
  res.json(georeferencias);
})

app.get('/georeferenciaPorCiudad/:ciudad', async (req, res) => {
  const ciudad = req.params.ciudad;
  const georeferencia = await prisma.georeferenciaCiudad.findUnique({
    where: {
      ciudad: ciudad
    }
  });
  if (!georeferencia) {
    res.status(404).json({ error: `Información de georeferencia no encontrada para la ciudad ${ciudad}` });
    return;
  }
  res.json(georeferencia);
})

app.post('/cargarGeoreferencia', async (req, res) => {
  const usuario: string = req.body.usuario;

  const user = await prisma.usuario.findUnique({
    where: {
      usuario: usuario
    }
  });
  if (!user) {
    res.status(404).json({ error: 'Usuario no encontrado' });
    return;
  }

  const city = user.ciudad;
  const ciudad = await prisma.georeferenciaCiudad.findUnique({
    where: {
      ciudad: city
    }
  });

  const data = await getCityGeolocation(city);
  const georeferencia: Prisma.GeoreferenciaCiudadCreateInput = {
    ciudad: city,
    pais: data.alt.loc.countryname,
    codigoPostal: data.alt.loc.postal,
    latitud: parseFloat(data.latt),
    longitud: parseFloat(data.longt),
  }

  if (ciudad) {
    res.status(200).json({ message: `La georeferencia para la ciudad ${city} ya existe` });
    return;
  }
  
  await prisma.georeferenciaCiudad.create({
    data: georeferencia
  });
  res.status(200).json({ message: `Georeferencia creada para la ciudad ${city}` });
})

const server = app.listen(3000, () =>
  console.log("Servidor ejecutándose en: http://localhost:3000")
);