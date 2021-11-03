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

export type authorType = {
  slug: string
  name: string
}

export type tagType = {
  slug: string
  title: string
}

export type categoryType = {
  slug: string
  title: string
}

export interface PostsType {
  mainPosts: PostType[]
  popularPosts: PostType[]
}
