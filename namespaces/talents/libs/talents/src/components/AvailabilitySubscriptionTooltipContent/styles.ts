import { palette } from '@toptal/picasso/utils'

export const tooltipContentWrapper = `
  width: 352px;
`

export const tooltipActionButton = `
  & > span[class*="PicassoButtonAction-content"] {
    font-size: 11px;
  }
`

export const subscriptionComment = `
  font-style: italic;
`

export const unsubscribeButton = `
  color: ${palette.red.main};
`

export const listItem = `
  & [class*="PicassoListItem-iconContainer"] {
    padding-top: 0.25rem;
    margin-right: 0.5rem;
    margin-bottom: -0.25rem;
  }
`
