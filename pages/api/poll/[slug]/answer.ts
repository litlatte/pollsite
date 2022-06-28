import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../util/db/prisma";
export default async (req: NextApiRequest, res: NextApiResponse) => {
    let slug: string = req.query.slug?.toString() || "";
    if(!slug || slug.length < 3) {
        res.status(400).json({message: "Invalid request"})
        return
    }
    let optionId = req.body.optionId;
    if(!optionId && optionId!==0) {
        res.status(400).json({message: "Invalid request"})
        return
    }
    let poll = await prisma.poll.findFirst({
        where: {
            slug,
        }
    })
    if(!poll){
        res.status(404).json({message: "Poll not found"})
        return
    }
    // Get ip address from request
    let ipAddress: string = (req.headers["x-forwarded-for"] || req.connection.remoteAddress || req.socket.remoteAddress || "Already voted").toString();
    // Check if user has already voted
    console.log(ipAddress)
    let userHasVoted = await prisma.answer.findMany({
        where: {
            ipAddress,
            Option: {
                pollId: poll.id
            }
        }
    });
    if(userHasVoted.length > 0) {
        res.status(403).json({message: "You have already voted"})
        return
    }
    let ans = await prisma.answer.create({
        data: {
            ipAddress,
            optionId,
        }
    })
    res.status(200).json({message: "Vote registered"})
}

    