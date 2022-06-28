import { useSession } from "next-auth/react"
import Link from "next/link"
import Layout from "../components/layout"

export default function IndexPage() {
  let { data: session, status } = useSession();
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-6xl text-indigo-600 p-6 my-2 b">Pull Poll</h1>
        <p className="max-w-[400px] m-4">
          If you are trying to make a poll to see what to do on the long breaks
          of the weekends, no need to do it, The answer is play games!
          Otherwise, after logging in click Create Poll to get started.
        </p>
        {session&&<Link href="/poll">
          <a className="bg-indigo-500 hover:opacity-80 hover:scale-110 transition duration-300 text-white p-4 rounded-xl shadow">
            Create Poll
          </a>
        </Link>}
        {session&&<Link href="/polls">
          <a className="mt-8 bg-indigo-500 hover:opacity-80 hover:scale-110 transition duration-300 text-white p-4 rounded-xl shadow">
            My Polls
          </a>
        </Link>}
        {!session && <Link href="/api/auth/signin">
          <a className="bg-indigo-500 hover:opacity-80 hover:scale-110 transition duration-300 text-white p-4 rounded-xl shadow">
            Log In
          </a>
        </Link>}
      </div>
    </Layout>
  )
}
