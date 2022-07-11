import Author from './author'

type PostType = {
    slug: string
    title: string
    date: string
    heroImage: {
      fields: {
        file: {
          url: string
        }
      }
    }
    author: Author
    excerpt: string
    content: string,
}

export default PostType
