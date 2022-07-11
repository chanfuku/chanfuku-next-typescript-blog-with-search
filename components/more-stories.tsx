import PostPreview from './post-preview'
import { Entry } from 'contentful'
import { IPostFields, IBlogPostFields } from '../@types/generated/contentful'

type Props = {
  posts: Entry<IBlogPostFields>[]
}

const MoreStories = ({ posts }: Props) => {
  return (
    <section className='basis-3/4'>
      {/*<h2 className="mb-8 text-5xl md:text-7xl font-bold tracking-tighter leading-tight">
        More Stories
      </h2>
      */}
      {/* <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-16 lg:gap-x-32 gap-y-20 md:gap-y-32 mb-32"> */}
      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-16 lg:gap-x-32 gap-y-20 md:gap-y-16 mb-32">
        {posts.map(({ fields }) => (
          <PostPreview
            key={fields.slug}
            title={fields.title}
            heroImage={fields.heroImage.fields.file.url}
            publishDate={fields.publishDate}
            slug={fields.slug}
          />
        ))}
      </div>
    </section>
  )
}

export default MoreStories
