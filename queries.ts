import sanityClient from '@sanity/client';

import {
  PostType,
  PostsType,
  categoryType,
  authorType,
  tagType,
  PostPageType,
  AuthorPageType,
} from '@lib/interfaces/PostsType';

export const client = sanityClient({
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_DATASET,
  apiVersion: process.env.NEXT_PUBLIC_API_VERSION,
  token: '',
  useCdn: true,
});

export const mainPosts =
  '{"mainPosts":*[_type == "post"] | order(_createdAt desc)[0...8]{"id":_id,title,description,"createdAt":_createdAt,"author":author->{name,slug},"categories": categories[]->{ "title": title, "slug": slug.current },"tags":tags[]->{ "title": title, "slug": slug.current },"slug": slug.current,"imageUrl": mainImage.asset._ref,body},"popularPosts":*[_type == "post"]{"id":_id,title,description,"createdAt":_createdAt,"author":author->{name,slug},"categories": categories[]->{ "title": title, "slug": slug.current },"tags":tags[]->{ "title": title, "slug": slug.current },"slug": slug.current,"imageUrl": mainImage.asset._ref,body}[0...4]}';

export const authors = '*[_type == "author"]{name,"slug":slug.current,bio}';

export const getSinglePost = async (pageSlug: string | string[] | undefined): Promise<PostType | undefined> => {
  if (typeof pageSlug === 'string') {
    const url = encodeURIComponent(pageSlug);
    const query = `*[ _type == "post" && slug.current == "${url}" ][0]{"id":_id,title,description,"createdAt":_createdAt,"author":author->{name,"slug":slug.current},"categories": categories[]->{ "title": title, "slug": slug.current,"relatedPosts": *[_type == "post" && (^.slug.current) in categories[]->slug.current && !(slug.current=="${url}")][0...4]{"id":_id,title,"imageUrl": mainImage.asset._ref,"slug": slug.current}},"tags":tags[]->{ "title": title, "slug": slug.current },"slug": slug.current,"imageUrl": mainImage.asset._ref,body}`;

    return await client.fetch(query);
  } else {
    return;
  }
};

export const getPostsByCategory = async (
  category: string,
  start: number,
  end: number
): Promise<PostPageType | undefined> => {
  const url = encodeURIComponent(category);
  const query = `{"posts":*[_type == "post" && "${url}" in categories[]->slug.current]${postResults}[${start}...${end}], "numberOfPosts":count(*[_type == "post" && "${url}" in categories[]->slug.current]), "title": *[_type=="category" && slug.current == "${url}"][0]{title}}`;
  return await client.fetch(query);
};

export const getAllPosts = async (start: number, end: number): Promise<PostPageType | undefined> => {
  const query = `{"posts":*[_type == "post"]${postResults}[${start}...${end}],"numberOfPosts":count(*[_type == "post"])}`;
  return await client.fetch(query);
};
export const getPostsByTag = async (tag: string, start: number, end: number): Promise<PostPageType | undefined> => {
  const url = encodeURIComponent(tag);
  const query = `{"posts":*[_type == "post" && "${url}" in tags[]->slug.current]${postResults}[${start}...${end}], "numberOfPosts":count(*[_type == "post" && "${url}" in tags[]->slug.current]), "title": *[_type=="tag" && slug.current == "${url}"][0]{title}}`;
  return await client.fetch(query);
};

export const getPostsByAuthor = async (
  name: string,
  start: number,
  end: number
): Promise<AuthorPageType | undefined> => {
  const url = encodeURIComponent(name);
  const query = `{"author":*[_type=="author" && "${url}" match slug.current][0]{name,"slug":slug.current,bio},"posts":*[_type == "post" && author._ref in *[_type=="author" && slug.current=="${url}"]._id]${postResults}[${start}...${end}],"numberOfPosts":count(*[_type == "post" && "${url}" match author->slug.current])}`;
  return await client.fetch(query);
};

export const getPosts = async (): Promise<PostsType> => await client.fetch(mainPosts);

export const categories = '';
export const getCategory = async (start: number = 0, end: number = 100): Promise<categoryType[]> =>
  await client.fetch(`*[_type == "category"]{title,"slug":slug.current}[${start}...${end}]`);

export const getTag = async (start: number = 0, end: number = 100): Promise<tagType[]> =>
  await client.fetch(`*[_type == "tag"]{title,"slug":slug.current}[${start}...${end}]`);

export const getAuthor = async (): Promise<authorType[]> => await client.fetch(authors);

type IdType = {
  slug: string;
};
export const getAllSlugs = async (): Promise<IdType[]> =>
  await client.fetch(`*[_type == "post"]{"slug": slug.current}`);

export const searchByQuery = async (query: string, start: number, end: number): Promise<PostPageType> =>
  await client.fetch(
    `{"posts":*[(_type=="post" && title match "${query}") || body[].children[].text match "${query}" || _type=="post" && categories[]->slug.current match "${query}"|| _type=="post" && tags[]->slug.current match "${query}"]${postResults}[${start}...${end}],"numberOfPosts":count(*[title match "${query}" || body[].children[].text match "${query}" || (_type=="post" && categories[]->slug.current match "${query}")|| (_type=="post" && tags[]->slug.current match "${query}")])}`
  );

const postResults = `{"id":_id,title,description,"createdAt":_createdAt,"author":author->{name,"slug":slug.current},"categories": categories[]->{ "title": title, "slug": slug.current },"tags":tags[]->{ "title": title, "slug": slug.current },"slug": slug.current,"imageUrl": mainImage.asset._ref,body}`;
