import { useRouter } from 'next/router'
import { getItemsFromStorage, makeQuerySearchParams } from '../lib/search'

type Props = {
  logoPosFixed?: boolean
}

const Header = ({ logoPosFixed = false }: Props) => {
  const router = useRouter()
  const toTopPage = () => {
    const { keyword, selectedCategories } = getItemsFromStorage()
    router.push({
      pathname: '/',
      query: makeQuerySearchParams({ keyword, selectedCategories })
    })
  }

  let sectionClassName = 'mt-5 mb-16'
  if (logoPosFixed) {
    sectionClassName += ' h-14'
  }

  return (
    <section className={sectionClassName}>
      <h2>
        <a className={logoPosFixed ? 'fixed top-4' : ''} onClick={toTopPage}><img src="http://placehold.jp/3d4070/ffffff/200x50.png?text=logo" alt="サンプルブログ" /></a>
      </h2>
    </section>
  )
}

export default Header
