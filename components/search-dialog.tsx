
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Tag } from 'contentful'

type Props = {
  open: boolean
  keyword: string
  selectedTags: string[]
  allTags: Tag[]
  addOrRemove: (value: string)  => void
  onKeywordChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onClose: () => void
}

const SearchDialog = ({ open, keyword, selectedTags, allTags, addOrRemove, onKeywordChange, onClose }: Props) => {
  return (
    <Dialog onClose={onClose} open={open}>
      <DialogTitle>
        検索条件
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <div className='pl-4 pb-4 pr-4'>
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
    </Dialog>
  )
}

export default SearchDialog
