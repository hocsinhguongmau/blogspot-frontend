import sanityClient from '@sanity/client'
import { PostType, PostsType, categoryType } from './lib/interfaces/PostsType'

export const client = sanityClient({
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_DATASET,
  apiVersion: process.env.NEXT_PUBLIC_API_VERSION,
  token: '',
  useCdn: true,
})
export const configuredSanityClient = sanityClient({
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_DATASET,
  apiVersion: process.env.NEXT_PUBLIC_API_VERSION,
  useCdn: true,
})

export const mainPosts =
  '{"mainPosts":*[_type == "post"] | order(_createdAt desc)[0...8]{"id":_id,title,description,"createdAt":_createdAt,"author":author->{name,slug},"categories": categories[]->{ "title": title, "slug": slug.current },"tags":tags[]->{ "title": title, "slug": slug.current },"slug": slug.current,"imageUrl": mainImage.asset._ref,body},"popularPosts":*[_type == "post"]{"id":_id,title,description,"createdAt":_createdAt,"author":author->{name,slug},"categories": categories[]->{ "title": title, "slug": slug.current },"tags":tags[]->{ "title": title, "slug": slug.current },"slug": slug.current,"imageUrl": mainImage.asset._ref,body}[0...4]}'

export const categories = '*[_type == "category"]{title,"slug":slug.current}'

export const getSinglePost = async (
  pageSlug: string | string[] | undefined,
): Promise<PostType | undefined> => {
  if (typeof pageSlug === 'string') {
    const url = encodeURIComponent(pageSlug)
    const query = `*[ _type == "post" && slug.current == "${url}" ][0]{"id":_id,title,description,"createdAt":_createdAt,"author":author->{name,"slug":slug.current},"categories": categories[]->{ "title": title, "slug": slug.current },"tags":tags[]->{ "title": title, "slug": slug.current },"slug": slug.current,"imageUrl": mainImage.asset._ref,body}`

    return await client.fetch(query)
  } else {
    return
  }
}

export const getPosts = async (): Promise<PostsType> =>
  await client.fetch(mainPosts)

export const getCategory = async (): Promise<categoryType[]> =>
  await client.fetch(categories)