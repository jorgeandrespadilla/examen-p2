import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

const userData: Prisma.UsuarioCreateInput[] = [
  {
    nombre: 'Juan',
    apellido: 'Almeida',
    usuario: 'jalmeida',
    ciudad: 'Quito'
  },
  {
    nombre: 'Diego',
    apellido: 'Contreras',
    usuario: 'dcontreras',
    ciudad: 'Guayaquil'
  },
  {
    nombre: 'Carlos',
    apellido: 'González',
    usuario: 'cgonzalez',
    ciudad: 'Quito'
  },
  {
    nombre: 'Maria',
    apellido: 'Salazar',
    usuario: 'msalazar',
    ciudad: 'Ambato'
  },
]

async function main() {
  console.log(`Iniciando proceso de inserción de datos...`)
  for (const u of userData) {
    const user = await prisma.usuario.create({
      data: u,
    })
    console.log(`Usuario creado con ID: ${user.id}`)
  }
  console.log(`Inserción de datos finalizada.`)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })