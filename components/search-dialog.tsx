
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { SEARCH_CATEGORIES } from '../lib/constants'

type Props = {
  open: boolean
  keyword: string
  selectedCategories: number[]
  addOrRemove: (value: number)  => void
  onKeywordChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onClose: () => void
}

const SearchDialog = ({ open, keyword, selectedCategories, addOrRemove, onKeywordChange, onClose }: Props) => {
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
            SEARCH_CATEGORIES.map((category) => (
              <li key={ category.value } className='mb-1 mr-2'>
                <input
                  onChange={ () => addOrRemove(category.value) }
                  type="checkbox" id={ category.label }
                  checked={ selectedCategories.includes(category.value) }
                />
                <label htmlFor={ category.label }> { category.label } </label>
              </li>
            ))
          }
        </ul>
      </div>
    </Dialog>
  )
}

export default SearchDialog
