import { palette, colorUtils } from '@toptal/picasso/utils'

export const container = `
  flex-grow: 1;
  background-color: ${colorUtils.alpha(palette.grey.lighter, 0.3)};
  align-items: center;
  width: 236px;
`
