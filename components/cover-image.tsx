import cn from 'classnames'
import Link from 'next/link'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

type Props = {
  title: string
  src: string
  slug?: string
}

const CoverImage = ({ title, src, slug }: Props) => {
  const image = (
    <>
      <LazyLoadImage
        alt={`Cover Image for ${title}`}
        src={src} // use normal <img> attributes as props
        effect="blur"
        className={cn('shadow-sm', {
          'hover:shadow-lg transition-shadow duration-200': slug,
        })}
      />
    </>
  )
  return (
    <div className="sm:mx-0">
      {slug ? (
        <Link as={`/posts/${slug}`} href="/posts/[slug]">
          <a aria-label={title}>{image}</a>
        </Link>
      ) : (
        image
      )}
    </div>
  )
}

export default CoverImage
