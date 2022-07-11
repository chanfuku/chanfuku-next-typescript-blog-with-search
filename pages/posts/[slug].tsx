import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import { Entry } from 'contentful'
import Head from 'next/head'
import Container from '../../components/container'
import PostBody from '../../components/post-body'
import Header from '../../components/header'
import PostHeader from '../../components/post-header'
import Layout from '../../components/layout'
import { getAllPosts } from '../../lib/api'
import PostTitle from '../../components/post-title'
import markdownToHtml from '../../lib/markdownToHtml'
import { IBlogPostFields } from '../../@types/generated/contentful'

type Props = {
  post: Entry<IBlogPostFields>,
  content: string
}

const Post = ({ post, content }: Props) => {
  const router = useRouter()
  if (!router.isFallback && !post.fields.slug) {
    return <ErrorPage statusCode={404} />
  }
  return (
    <Layout preview={false}>
      <Container>
        <Header />
        {router.isFallback ? (
          <PostTitle>Loading…</PostTitle>
        ) : (
          <>
            <article className="mb-32">
              <Head>
                <title>
                  {post.fields.title} | ブログ
                </title>
                <meta property="og:image" content={post.fields.heroImage.fields.file.url} />
              </Head>
              <PostHeader
                title={post.fields.title}
                coverImage={post.fields.heroImage.fields.file.url}
                date={post.fields.publishDate}
              />
              <PostBody content={content} />
            </article>
          </>
        )}
      </Container>
    </Layout>
  )
}

export default Post

type Params = {
  params: {
    slug: string
  }
}

export async function getStaticProps({ params }: Params) {
  // const post = getPostBySlug()
  const allPosts = await getAllPosts({
    content_type: 'blogPost',
    'fields.slug': params.slug
  })
  const post = allPosts.length ? allPosts[0] : undefined
  
  const content = post
    ? await markdownToHtml(post.fields.body || '')
    : undefined

  return {
    props: {
      post,
      content,
    },
  }
}

export async function getStaticPaths() {
  const allPosts = await getAllPosts({ content_type: 'blogPost' })

  return {
    paths: allPosts.map((post: Entry<IBlogPostFields>) => {
      return {
        params: {
          slug: post.fields.slug,
        },
      }
    }),
    fallback: false,
  }
}
