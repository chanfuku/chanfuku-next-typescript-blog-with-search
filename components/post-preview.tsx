import Avatar from './avatar'
import DateFormatter from './date-formatter'
import CoverImage from './cover-image'
import Link from 'next/link'
import { IAuthor } from '../@types/generated/contentful'

type Props = {
  title: string
  heroImage: string
  publishDate: string
  slug: string
}

const PostPreview = ({
  title,
  heroImage,
  publishDate,
  slug,
}: Props) => {
  return (
    <div>
      <div className="mb-5">
        <CoverImage slug={slug} title={title} src={heroImage} />
      </div>
      <h3 className="text-3xl mb-3 leading-snug">
        <Link as={`/posts/${slug}`} href="/posts/[slug]">
          <a className="hover:underline">{title}</a>
        </Link>
      </h3>
      <div className="text-lg mb-4">
          <DateFormatter dateString={publishDate} />
      </div>
      {/* <p className="text-lg leading-relaxed mb-4">{excerpt}</p> */}
      {/* <Avatar name={author.fields.name} picture={author.fields.picture} /> */}
    </div>
  )
}

export default PostPreview
