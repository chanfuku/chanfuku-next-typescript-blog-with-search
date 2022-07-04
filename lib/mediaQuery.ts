import useMediaQuery from '@mui/material/useMediaQuery';

export default function isMobileSize() {
  return !useMediaQuery('(min-width:768px)');
}
