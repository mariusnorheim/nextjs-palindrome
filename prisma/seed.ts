import { PrismaClient, Prisma } from "@prisma/client"

const prisma = new PrismaClient()

const personData: Prisma.PersonCreateInput[] = [
  {
    firstname: "Ada",
    lastname: "Hegerberg",
  },
  {
    firstname: "Brian",
    lastname: "Jacobsen",
  },
  {
    firstname: "Agnes",
    lastname: "Senga",
  },
  {
    firstname: "Ava",
    lastname: "Aoloa",
  },
]

async function main() {
  console.log(`Start seeding ...`)
  for (const p of personData) {
    const person = await prisma.person.create({
      data: p,
    })
    console.log(`Created person with id: ${person.id}`)
  }
  console.log(`Seeding finished.`)
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
