import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const { firstname, lastname } = req.body

  if (req.method === "GET") {
    handleGET(res)
  } else if (req.method === "POST") {
    handlePOST(firstname, lastname, res)
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`
    )
  }
}


// GET /api/person
async function handleGET(res) {
  const result = await prisma.person.findMany({
    orderBy: {
      id: 'asc',
    },
  })
  await res.json(JSON.parse(JSON.stringify(result)))
}

// POST /api/person
// Required fields in body: firstname, lastname
async function handlePOST(firstname, lastname, res) {
  const result = await prisma.person.create({
    data: {
      firstname: firstname,
      lastname: lastname,
    },
  })
  await res.json(JSON.parse(JSON.stringify(result)))
}