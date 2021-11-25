import sanityClient from '@sanity/client'
import {
  PostType,
  PostsType,
  categoryType,
  authorType,
  tagType,
} from './lib/interfaces/PostsType'

export const client = sanityClient({
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_DATASET,
  apiVersion: process.env.NEXT_PUBLIC_API_VERSION,
  token: '',
  useCdn: true,
})

export const mainPosts =
  '{"mainPosts":*[_type == "post"] | order(_createdAt desc)[0...8]{"id":_id,title,description,"createdAt":_createdAt,"author":author->{name,slug},"categories": categories[]->{ "title": title, "slug": slug.current },"tags":tags[]->{ "title": title, "slug": slug.current },"slug": slug.current,"imageUrl": mainImage.asset._ref,body},"popularPosts":*[_type == "post"]{"id":_id,title,description,"createdAt":_createdAt,"author":author->{name,slug},"categories": categories[]->{ "title": title, "slug": slug.current },"tags":tags[]->{ "title": title, "slug": slug.current },"slug": slug.current,"imageUrl": mainImage.asset._ref,body}[0...4]}'

export const authors = '*[_type == "author"]{name,"slug":slug.current,bio}'

export const getSinglePost = async (
  pageSlug: string | string[] | undefined,
): Promise<PostType | undefined> => {
  if (typeof pageSlug === 'string') {
    const url = encodeURIComponent(pageSlug)
    const query = `*[ _type == "post" && slug.current == "${url}" ][0]{"id":_id,title,description,"createdAt":_createdAt,"author":author->{name,"slug":slug.current},"categories": categories[]->{ "title": title, "slug": slug.current,"relatedPosts": *[_type == "post" && (^.slug.current) in categories[]->slug.current && !(slug.current=="${url}")][0...4]{"id":_id,title,"imageUrl": mainImage.asset._ref,"slug": slug.current}},"tags":tags[]->{ "title": title, "slug": slug.current },"slug": slug.current,"imageUrl": mainImage.asset._ref,body}`

    return await client.fetch(query)
  } else {
    return
  }
}

export const getPostsByCategory = async (
  category: string | string[] | undefined,
  start: number,
  end: number,
): Promise<PostType[] | undefined> => {
  if (typeof category === 'string') {
    const url = encodeURIComponent(category)
    const query = `{"posts":*[_type == "post" && "${url}" in categories[]->slug.current]{"id":_id,title,description,"createdAt":_createdAt,"author":author->{name,"slug":slug.current},"categories": categories[]->{ "title": title, "slug": slug.current },"tags":tags[]->{ "title": title, "slug": slug.current },"slug": slug.current,"imageUrl": mainImage.asset._ref,body}[${start}...${end}],"statics":{"numberOfPosts":count(*[_type == "post" && "${url}" in categories[]->slug.current])}}`
    return await client.fetch(query)
  } else {
    return
  }
}

export const getAllPosts = async (
  start: number,
  end: number,
): Promise<PostType[] | undefined> => {
  const query = `{"allPosts":*[_type == "post"]{"id":_id,title,description,"createdAt":_createdAt,"author":author->{name,"slug":slug.current},"categories": categories[]->{ "title": title, "slug": slug.current },"tags":tags[]->{ "title": title, "slug": slug.current },"slug": slug.current,"imageUrl": mainImage.asset._ref,body}[${start}...${end}],"statics":{"numberOfPosts":count(*[_type == "post"])}}`
  return await client.fetch(query)
}
export const getPostsByTag = async (
  tag: string | string[] | undefined,
  start: number,
  end: number,
): Promise<PostType[] | undefined> => {
  if (typeof tag === 'string') {
    const url = encodeURIComponent(tag)
    const query = `{"posts":*[_type == "post" && "${url}" in tags[]->slug.current]{"id":_id,title,description,"createdAt":_createdAt,"author":author->{name,"slug":slug.current},"categories": categories[]->{ "title": title, "slug": slug.current },"tags":tags[]->{ "title": title, "slug": slug.current },"slug": slug.current,"imageUrl": mainImage.asset._ref,body}[${start}...${end}],"statics":{"numberOfPosts":count(*[_type == "post" && "${url}" in tags[]->slug.current])}}`
    return await client.fetch(query)
  } else {
    return
  }
}

export const getPostsByAuthor = async (
  name: string | string[] | undefined,
  start: number,
  end: number,
): Promise<PostType[] | undefined> => {
  if (typeof name === 'string') {
    const url = encodeURIComponent(name)
    const query = `{"author":*[_type=="author" && "${url}" match slug.current]{name,"slug":slug.current,bio},"posts":*[_type == "post" && author._ref in *[_type=="author" && slug.current=="${url}"]._id]{"id":_id,title,description,"createdAt":_createdAt,"author":author->{name,"slug":slug.current},"categories": categories[]->{ "title": title, "slug": slug.current },"tags":tags[]->{ "title": title, "slug": slug.current },"slug": slug.current,"imageUrl": mainImage.asset._ref,body}[${start}...${end}],"statics":{"numberOfPosts":count(*[_type == "post" && "${url}" match author->slug.current])}}`
    return await client.fetch(query)
  } else {
    return
  }
}

export const getPosts = async (): Promise<PostsType> =>
  await client.fetch(mainPosts)

export const categories = ''
export const getCategory = async (
  start: number = 0,
  end: number = 100,
): Promise<categoryType[]> =>
  await client.fetch(
    `*[_type == "category"]{title,"slug":slug.current}[${start}...${end}]`,
  )

export const getTag = async (
  start: number = 0,
  end: number = 100,
): Promise<tagType[]> =>
  await client.fetch(
    `*[_type == "tag"]{title,"slug":slug.current}[${start}...${end}]`,
  )

export const getAuthor = async (): Promise<authorType[]> =>
  await client.fetch(authors)

type IdType = {
  slug: string
}
export const getAllSlugs = async (): Promise<IdType[]> =>
  await client.fetch(`*[_type == "post"]{"slug": slug.current}`)

export const searchByQuery = async (
  query: string | string[] | undefined,
  start: number,
  end: number,
): Promise<PostType[]> =>
  await client.fetch(
    `{"posts":*[(_type=="post" && title match "${query}") || body[].children[].text match "${query}" || _type=="post" && categories[]->slug.current match "${query}"|| _type=="post" && tags[]->slug.current match "${query}"]{"id":_id,title,description,"createdAt":_createdAt,"author":author->{name,"slug":slug.current},"categories": categories[]->{ "title": title, "slug": slug.current },"tags":tags[]->{ "title": title, "slug": slug.current },"slug": slug.current,"imageUrl": mainImage.asset._ref,body}[${start}...${end}],"statics":{"numberOfPosts":count(*[title match "${query}" || body[].children[].text match "${query}" || (_type=="post" && categories[]->slug.current match "${query}")|| (_type=="post" && tags[]->slug.current match "${query}")])}}`,
  )
