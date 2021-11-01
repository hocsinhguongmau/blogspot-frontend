import sanityClient from '@sanity/client'

export const client = sanityClient({
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_DATASET,
  apiVersion: process.env.NEXT_PUBLIC_API_VERSION,
  token: '',
  useCdn: true,
})
export const mainPosts =
  '*[_type == "post"] | order(_createdAt desc)[0...8]{"id":_id,title,"createdAt":_createdAt,"author":author->name,"categories": categories[]{ "title": ^->title, "slug": ^->slug.current },"tags":tags[]{ "title": ^->title, "slug": ^->slug.current },"slug": slug.current,"imageUrl": mainImage.asset._ref,body}'
