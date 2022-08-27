
import { useState } from 'react'
import { useRouter } from 'next/router'
import { useUser } from '@auth0/nextjs-auth0'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { makeQuerySearchParams } from '../lib/search'
import { useQueryData } from '../components/use-query-data'
import { SearchType, GlobalStateKeys } from '../types/search'

type Props = {
  logoPosFixed?: boolean
}

const Header = ({ logoPosFixed = false }: Props) => {
  const router = useRouter()
  const { user, isLoading } = useUser()
  const [getSearchQuery, _] = useQueryData<SearchType>(GlobalStateKeys.searchQuery)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const toTopPage = () => {
    router.push({
      pathname: '/',
      query: makeQuerySearchParams(getSearchQuery() as SearchType)
    })
  }

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
    router.push('/api/auth/logout')
  }

  let sectionClassName = 'mt-5 mb-16 flex justify-between'
  if (logoPosFixed) {
    sectionClassName += ' h-14'
  }

  return (
    <section className={sectionClassName}>
      <h2>
        <a className={logoPosFixed ? 'fixed top-4' : ''} onClick={toTopPage}><img src="http://placehold.jp/3d4070/ffffff/200x50.png?text=logo" alt="サンプルブログ" /></a>
      </h2>
      {!isLoading && !user && (
        <a href="/api/auth/login">
          <Button variant="outlined">ログイン</Button>
        </a>
      )}
      {user && (
        <>
          <Button
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
          >
          <Avatar
            alt="avatar"
            src={user.picture || ''}
          />
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <MenuItem onClick={handleClose}>ログアウト</MenuItem>
          </Menu>
        </>
      )}
    </section>
  )
}

export default Header
