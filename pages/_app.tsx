import { useState } from 'react'
import type { AppProps } from 'next/app'
import { QueryClientProvider, QueryClient } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'

import '../styles/globals.scss'
import Layout from '../components/Layout'

function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 24 * 1000 * 3600,
            refetchOnWindowFocus: false,
          },
        },
      }),
  )
  return (
    <QueryClientProvider client={queryClient}>
      <Layout>
        <ReactQueryDevtools initialIsOpen={false} />
        <Component {...pageProps} />
      </Layout>
    </QueryClientProvider>
  )
}
export default MyApp
