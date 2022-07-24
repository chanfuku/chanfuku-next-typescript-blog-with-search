import { AppProps } from 'next/app'
import { UserProvider } from '@auth0/nextjs-auth0';
import '../styles/index.css'

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      {/*
       // @ts-ignore */}
      <Component {...pageProps} />
    </UserProvider>
  )
}
