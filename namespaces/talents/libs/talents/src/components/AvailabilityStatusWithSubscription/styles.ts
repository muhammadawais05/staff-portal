import { palette } from '@toptal/picasso/utils'

export const subscribeButton = (active?: boolean) => `
  color: ${active ? palette.green.darker : palette.grey.dark};
`
