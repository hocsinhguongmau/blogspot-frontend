export interface PostType {
  createdAt: string
  id: string
  title: string
  description: string
  body: Array<object>
  categories: categoryType[]
  imageUrl: string
  slug: string
  tags: tagType[]
  author: authorType
}

export type RelatedPostType = {
  id: string
  title: string
  slug: string
  imageUrl: string
}

export type authorType = {
  slug: string
  name: string
  bio?: Array<object>
}

export type tagType = {
  slug: string
  title: string
}

export type categoryType = {
  slug: string
  title: string
  relatedPosts: RelatedPostType[]
}

export interface PostsType {
  mainPosts: PostType[]
  popularPosts: PostType[]
}

export interface PostPageType {
  posts: PostType[]
  numberOfPosts: number
  title?: { title: string }
}

export interface AuthorPageType {
  author: authorType
  posts: PostType[]
  numberOfPosts: number
}
