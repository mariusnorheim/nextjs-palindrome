import type { NextApiRequest, NextApiResponse } from "next"
import prisma from "../../../lib/prisma"

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const personId = req.query.id
  const { firstname, lastname } = req.body

  if (req.method === "DELETE") {
    handleDELETE(personId, res)
  } else if (req.method === "GET") {
    handleGET(personId, res)
  } else if (req.method === "PUT") {
    handlePUT(personId, firstname, lastname, res)
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`
    )
  }
}

// DELETE /api/person/:id
async function handleDELETE(personId, res) {
  const person = await prisma.person.delete({
    where: { id: Number(personId) },
  })
  res.json(JSON.parse(JSON.stringify(person)))
}

// GET /api/person/:id
async function handleGET(personId, res) {
  const person = await prisma.person.findUnique({
    where: { id: Number(personId) },
  })
  res.json(JSON.parse(JSON.stringify(person)))
}

// PUT /api/person/:id
// Required fields in body: firstname, lastname
async function handlePUT(personId, firstname, lastname, res) {
  const person = await prisma.person.update({
    data: {
      firstname: firstname,
      lastname: lastname,
    },
    where: { id: Number(personId) },
  })
  res.json(JSON.parse(JSON.stringify(person)))
}
