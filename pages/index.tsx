import { useSession } from "next-auth/react"
import Image from "next/image";
import Link from "next/link"
import Layout from "../components/layout"

export default function IndexPage() {
  let { data: session, status } = useSession();
  return (
    <Layout>
      <div className="flex flex-col h-full w-full items-center justify-center">
        <Image src={`/logo.png`} width={200} height={200} alt={"PullPol Logo"} />
        <p className="max-w-[400px] m-4">
          Welcome To Pull Poll, a simple tool to create and share polls.<br />
          {!session && "Login to create and share polls."}
          {session && ""}
        </p>
        {session&&<Link href="/poll">
          <a className="bg-indigo-500 hover:opacity-80 hover:scale-110 transition duration-300 text-white p-4 rounded-xl shadow">
            Create Poll
          </a>
        </Link>}
        {session&&<Link href="/polls">
          <a className="mt-8 text-indigo-700 hover:opacity-80">
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
