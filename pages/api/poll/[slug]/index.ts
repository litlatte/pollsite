// This is an example of how to read a JSON Web Token from an API route
import { getToken } from "next-auth/jwt"
import type { NextApiRequest, NextApiResponse } from "next"
import { prisma } from "../../../../util/db/prisma"

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    let slug: string = req.query.slug?.toString() || ""
    if (!slug || slug.length < 3) {
      res.status(400).json({ message: "Invalid request" })
      return
    }
    let poll = await prisma.poll.findFirst({
      where: {
        slug,
      },
    })
    if (!poll) {
      res.status(404).json({ message: "Poll not found" })
      return
    }
    let options = await prisma.option.findMany({
      where: {
        pollId: poll.id
      },
    })
    let answers = await prisma.answer.findMany({
      where: {
        Option: {
          pollId: poll.id,
        },
      },
      include: {
        Option: true,
      }
    })
    let data = {
      totalVotes: 0,
      question: poll.question,
      options: options
        ? [...options].map((option: any) => {
            return {
              id: option.id,
              text: option.text,
              votes: answers.filter((answer: any) => {
                return answer.Option.id === option.id
              }).length,
            }
          })
        : [],
    }
    let ipAddress: string = (req.headers['x-internal-pollsite-ip'] || req.headers["x-forwarded-for"] || req.socket.remoteAddress || "Already voted").toString();
    // Check if user has already voted
    let selectedAnswer = answers.find((answer: any) => {
      return answer.ipAddress == ipAddress;
    });
    if (selectedAnswer) { //@ts-ignore
      data.selectedAnswer = selectedAnswer.Option.id;
    }
    data.totalVotes = data.options.reduce((acc: number, curr: any) => {
      return acc + curr.votes
    }, 0)
    res.status(200).json(data)
  } catch (e) {
    res.status(500).json({ message: "Internal server error" })
    console.log(e)
  }
}
