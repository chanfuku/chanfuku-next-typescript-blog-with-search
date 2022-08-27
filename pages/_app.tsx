import { AppProps } from 'next/app'
import { UserProvider } from '@auth0/nextjs-auth0';
import { QueryClient, QueryClientProvider } from 'react-query'
import '../styles/index.css'

const queryClient = new QueryClient()

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        {/* @ts-ignore */}
        <Component {...pageProps} />
      </UserProvider>
    </QueryClientProvider>
  )
}
