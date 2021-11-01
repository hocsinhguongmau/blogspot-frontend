export interface PostType {
  createdAt: string
  id: string
  title: string
  body: Array<object>
  categories: category[]
  imageUrl: string
  slug: string
  tags: tag[]
}

export type tag = {
  slug: string
  title: string
}

export type category = {
  slug: string
  title: string
}
