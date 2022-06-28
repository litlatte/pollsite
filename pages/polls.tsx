import { getToken } from "next-auth/jwt"
import Link from "next/link"

export default function PollsPage({ token, polls }: any) {
  return (
    <div className="w-full h-full bg-gray-50 justify-center">
      <h1 className="text-5xl text-indigo-700 text-center pb-10 pt-16">
        Your Polls
      </h1>
      <div className="h-80 w-fit px-8 mx-auto grow overflow-x-hidden overflow-y-auto">
        {(!polls || !polls.length) && (
          <div className="text-center"> You have no polls yet. </div>
        )}
        {polls.map((poll: any) => {
          return (
            <div className="w-fit min-w-[300px] mx-auto flex flex-col items-center justify-center bg-white text-black text-xl mt-3 transition duration-300 p-4 rounded-xl shadow">
              {poll.question}
              <Link href={`/poll/${poll.slug}/`}>
                <a className="text-lg text-indigo-800">Poll</a>
              </Link>
              <Link href={`/poll/${poll.slug}/results`}>
                <a className="text-lg text-indigo-800">Results</a>
              </Link>
            </div>
          )
        })}
      </div>
      <div className="w-fit mx-auto mt-8">
        <Link href="/poll">
          <a className="  bg-indigo-500 hover:opacity-80 hover:scale-110 transition duration-300 text-white p-4 rounded-xl shadow">
            Create Poll
          </a>
        </Link>
      </div>
    </div>
  )
}

export async function getServerSideProps(context: any) {
  let token = await getToken({ req: context.req })
  if (!token) {
    context.res.statusCode = 302
    context.res.setHeader("Location", `/`) // Replace <link> with your url link
    return { props: {} }
  }
  let res = await fetch(`${process.env.NEXTAUTH_URL}/api/polls`, {
    method: "GET",
    headers: { cookie: context.req.headers.cookie },
  })
  let polls = await res.json()

  return {
    props: {
      polls,
    },
  }
}
