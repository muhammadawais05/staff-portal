import { palette } from '@toptal/picasso/utils'

export const block = `
  flex: 1;
  padding: 0 1rem;
  text-align: center;

  :not(:first-child) {
    border-left: 1px solid ${palette.grey.lighter2}
  }
`

export const slugBox = `
  padding: 0.5rem;
  background-color: ${palette.blue.lighter};
  border-radius: 0.5rem;
`
