import isMobileSize from '../lib/mediaQuery'
import { SEARCH_CATEGORIES } from '../lib/constants'

type Props = {
  keyword: string
  selectedCategories: number[]
  addOrRemove: (value: number)  => void
  onKeywordChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onOpen: () => void
}

const SearchBox = ({ keyword, selectedCategories, addOrRemove, onKeywordChange, onOpen }: Props) => {
  return (
    <div className="basis-1/4 mr-10 mb-3">
      {!isMobileSize() &&
        <div className='fixed'>
          <p className="font-bold mb-3">検索条件</p>
          <ul>
            <li className='mb-3'><input onChange={onKeywordChange} type="text" className="border p-2" id="name" placeholder="キーワード検索" value={keyword} /></li>
          </ul>
          <ul>
            {
              SEARCH_CATEGORIES.map((category) => (
                <li key={ category.value } className='mb-1 mr-2'>
                  <input
                    onChange={ () => addOrRemove(category.value) }
                    type="checkbox" id={category.label}
                    checked={ selectedCategories.includes(category.value) }
                  />
                  <label htmlFor={category.label}> {category.label} </label>
                </li>
              ))
            }
          </ul>
        </div>
      }
    </div>
  )
}

export default SearchBox
