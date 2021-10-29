import type { ReactElement, ReactNode } from 'react'
import type { AppProps } from 'next/app'
import '../styles/globals.scss'
import Layout from '../components/Layout'
import sanityClient from '@sanity/client'

const client = sanityClient({
  projectId: 'qd1mefgb',
  dataset: 'production',
  apiVersion: '2021-03-25',
  token: '',
  useCdn: true,
})
const query = '*[_type == "post"]'

client.fetch(query).then((posts: Array<object>) => {
  posts.forEach((post: object) => {
    console.log(post)
  })
})
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}
export default MyApp
