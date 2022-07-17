import { Tag } from 'contentful'

type Props = {
  keyword: string
  selectedTags: string[]
  allTags: Tag[],
  addOrRemove: (value: string) => void
  onKeywordChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const SearchBox = ({ keyword, selectedTags, allTags, addOrRemove, onKeywordChange }: Props) => {
  return (
    <div className="basis-1/4 mr-10 mb-3">
      <div className='fixed'>
        <p className="font-bold mb-3">検索条件</p>
        <ul>
          <li className='mb-3'><input onChange={onKeywordChange} type="text" className="border p-2" id="name" placeholder="キーワード検索" value={keyword} /></li>
        </ul>
        <ul>
          {
            allTags.map((tag: Tag) => (
              <li key={ tag.sys.id } className='mb-1 mr-2'>
                <input
                  onChange={ () => addOrRemove(tag.sys.id) }
                  type="checkbox" id={tag.name}
                  checked={ selectedTags.includes(tag.sys.id) }
                />
                <label htmlFor={tag.name}> {tag.name} </label>
              </li>
            ))
          }
        </ul>
      </div>
    </div>
  )
}

export default SearchBox
