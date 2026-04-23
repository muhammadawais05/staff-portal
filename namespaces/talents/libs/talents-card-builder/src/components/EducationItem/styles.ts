import { screens } from '@toptal/picasso/utils'

export const Content = `
  flex: 1;
`

export const Aside = `
  margin-left: 16px;

  ${screens('large', 'extra-large')} {
    margin-right: 24px;
  }
`
