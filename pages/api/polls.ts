// This is an example of how to read a JSON Web Token from an API route
import { getToken } from "next-auth/jwt"
import type { NextApiRequest, NextApiResponse } from "next"
import { prisma } from "../../util/db/prisma"
const secret = process.env.NEXTAUTH_SECRET

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method !== "GET") {
      res.status(405).json({message: "Method not allowed"})
      return
    }
    const token = await getToken({ req, secret })
    if (!token) {
      res.status(401).json({message: "Unauthorized"})
      return
    }
    let userEmail: string = `${token.provider}:${token.email}` || "";
    console.log({ userEmail })
    let polls = await prisma.poll.findMany({
      where: {
        userEmail,
      },
    })
    res.status(200).json(polls)
    
  } catch (e) {
    res.status(500).json({ message: "Internal server error" })
    console.log(e)
  }
}