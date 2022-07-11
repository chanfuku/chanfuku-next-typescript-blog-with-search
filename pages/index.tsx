import { useState, useEffect } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Fab from '@mui/material/Fab'
import { Entry, Tag } from 'contentful'
import SearchIcon from '@mui/icons-material/Search'
import Container from '../components/container'
import SearchBox from '../components/search-box'
import SearchDialog from '../components/search-dialog'
import MoreStories from '../components/more-stories'
import Layout from '../components/layout'
import Header from '../components/header'
import { getAllPosts, getAllTags } from '../lib/api'
import isMobileSize from '../lib/mediaQuery'
import { setItemsToStorage, getSearchParamsFromQuery, makeQuerySearchParams } from '../lib/search'
import { SearchType } from '../types/search'
import { IBlogPostFields } from '../@types/generated/contentful'

type Props = {
  allPosts: Entry<IBlogPostFields>[]
  allTags: Tag[]
}

const Index = ({ allPosts, allTags }: Props) => {
  const [posts, setPosts] = useState<Entry<IBlogPostFields>[]>(allPosts);
  const [open, setOpen] = useState<boolean>(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [keyword, setKeyword] = useState<string>('');
  const router = useRouter()
  const query = router.query

  const search = ({ keyword, selectedCategories }: SearchType) => {
    if (!keyword && !selectedCategories.length) {
      setPosts(allPosts)
      return
    }
    const filtered = allPosts.filter((post: Entry<IBlogPostFields>) => {
      const keywordFound = keyword.length && (post.fields.title.includes(keyword) || post.fields.slug.includes(keyword) || post.fields.body.includes(keyword))
      if (keywordFound) return true
      return selectedCategories.some((tag: string) => post.metadata.tags.map(v => v.sys.id).includes(tag))
    })
    setPosts(filtered)
  }

  const addOrRemove = (value: string) => {
    const categorySet: Set<string> = new Set(selectedCategories);
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
                allTags={allTags}
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
              allTags={allTags}
              addOrRemove={addOrRemove}
              onKeywordChange={onKeywordChange}
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
  const [allPosts, allTags] = await Promise.all([
    getAllPosts({ content_type: 'blogPost' }),
    getAllTags(),
  ])

  return {
    props: { allPosts, allTags },
  }
}
