import { useState, useEffect } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Fab from '@mui/material/Fab'
import SearchIcon from '@mui/icons-material/Search'
import Container from '../components/container'
import SearchBox from '../components/search-box'
import SearchDialog from '../components/search-dialog'
import MoreStories from '../components/more-stories'
import Layout from '../components/layout'
import Header from '../components/header'
import { getAllPosts } from '../lib/api'
import isMobileSize from '../lib/mediaQuery'
import { setItemsToStorage, getSearchParamsFromQuery, makeQuerySearchParams } from '../lib/search'
import Post from '../types/post'
import { SearchType } from '../types/search'

type Props = {
  allPosts: Post[]
}

const Index = ({ allPosts }: Props) => {
  const [posts, setPosts] = useState<Post[]>(allPosts);
  const [open, setOpen] = useState<boolean>(false);
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [keyword, setKeyword] = useState<string>('');
  const router = useRouter()
  const query = router.query

  const search = ({ keyword, selectedCategories }: SearchType) => {
    if (!keyword && !selectedCategories.length) {
      setPosts(allPosts)
      return
    }
    const filtered = allPosts.filter((post: Post) => {
      const keywordFound = keyword.length && (post.title.includes(keyword) || post.slug.includes(keyword) || post.excerpt.includes(keyword))
      if (keywordFound) return true
      return selectedCategories.some((category: number) => post.categories.includes(category))
    })
    setPosts(filtered)
  }

  const addOrRemove = (value: number) => {
    const categorySet: Set<number> = new Set(selectedCategories);
    if (categorySet.has(value)) {
      categorySet.delete(value)
    } else {
      categorySet.add(value)
    }
    const array = Array.from(categorySet)
    setSelectedCategories(array)
    routerPush({ keyword, selectedCategories: array })
  }

  const onKeywordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const keyword = e.target.value 
    setKeyword(keyword)
    routerPush({ keyword, selectedCategories })
  }

  const routerPush = ({ keyword, selectedCategories }: SearchType) => {
    router.push({ query: makeQuerySearchParams({keyword, selectedCategories}) }, undefined, { scroll: false })
  }

  const handleClickOpen = () => setOpen(true)

  const handleClose = () => setOpen(false)

  useEffect(() => {
    const { keyword, selectedCategories } = getSearchParamsFromQuery(query)
    setKeyword(keyword)
    setSelectedCategories(selectedCategories)
    search({ keyword, selectedCategories })
    // save in sessionStorage
    setItemsToStorage({ keyword, selectedCategories })
  }, [query])

  return (
    <>
      <Layout>
        <Head>
          <title>ブログ</title>
        </Head>
        <Container>
          <Header logoPosFixed={!isMobileSize()} />
          {isMobileSize() &&
            <>
              <SearchDialog
                open={open}
                keyword={keyword}
                selectedCategories={selectedCategories}
                addOrRemove={addOrRemove}
                onKeywordChange={onKeywordChange}
                onClose={handleClose}
              />
              <Fab
                className="search-floating-button"
                aria-label="search"
                onClick={handleClickOpen}
              >
                <SearchIcon />
              </Fab>
            </>
          }
          <section className="md:flex">
            <SearchBox
              keyword={keyword}
              selectedCategories={selectedCategories}
              addOrRemove={addOrRemove}
              onKeywordChange={onKeywordChange}
              onOpen={handleClickOpen}
            />
            {posts.length > 0 && <MoreStories posts={posts} />}
          </section>
          {/* <Pagination count={10} showFirstButton showLastButton /> */}
        </Container>
      </Layout>
    </>
  )
}

export default Index

export const getStaticProps = async () => {
  const allPosts = getAllPosts([
    'title',
    'date',
    'slug',
    'author',
    'coverImage',
    'excerpt',
    'categories',
  ])

  return {
    props: { allPosts },
  }
}
