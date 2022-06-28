import { SessionProvider } from "next-auth/react"
import type { AppProps } from "next/app"
import Head from "next/head"
import "./styles.css"

// Use of the <SessionProvider> is mandatory to allow components that call
// `useSession()` anywhere in your application to access the `session` object.
export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session} refetchInterval={0}>
      <Head>
        <title>Pull Poll</title>
        <link rel="icon" href="/logo.png" />
      </Head>
      <Component {...pageProps} />
    </SessionProvider>
  )
}
