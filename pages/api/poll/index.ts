// This is an example of how to read a JSON Web Token from an API route
import { getToken } from "next-auth/jwt"
import type { NextApiRequest, NextApiResponse } from "next"
import { prisma } from "../../../util/db/prisma"
const secret = process.env.NEXTAUTH_SECRET

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method !== "POST") {
      res.status(405).json({message: "Method not allowed"})
      return
    }
    const token = await getToken({ req, secret })
    console.log(token)
    if (!token) {
      res.status(401).json({message: "Unauthorized"})
      return
    }
    let userEmail: string = token.email || ""
    let pollData: {
      question: string
      options: string[]
    } = {
      question: req.body.question,
      options: req.body.options,
    }
    if (!pollData.question || !pollData.options || pollData.options.length < 2) {
      res.status(400).json({message: "Invalid request"})
      return
    }
    let slug = generateSlug()
    while (
      await prisma.poll.findFirst({
        where: {
          slug,
        },
      })
    ) {
      slug = generateSlug()
    }
    let poll = await prisma.poll.create({
      data: {
        question: pollData.question,
        userEmail,
        slug,
      },
    })
    poll = { ...poll }
    for (let option of pollData.options) {
      let text = option || ""
      await prisma.option.create({
        data: {
          text,
          pollId: poll.id,
        },
      })
    }
    res.status(200).json(poll)
  } catch (e) {
    res.status(500).json({ message: "Internal server error" })
    console.log(e)
  }
}
function generateSlug() {
  return (
    Math.random().toString(36).substring(2, 4) +
    Math.random().toString(36).substring(2, 7)
  )
}
