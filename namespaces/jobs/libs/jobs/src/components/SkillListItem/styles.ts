import { palette } from '@toptal/picasso/utils'

export const skillContent = `
  max-width: 100%;
  height: 2rem;
  padding: 0 0.5em;
  border-radius: 4px;
  background-color: ${palette.blue.main};
`

export const skillLabelWrapper = `
  overflow: hidden;
  color: ${palette.common.white};
`

export const skillLabel = `
`

export const strongSkill = `
  background-color: ${palette.blue.dark};
`

export const expertSkill = `
  background-color: ${palette.blue.darker};
`

export const deleteButton = `
  && {
    width: auto;
  }
`

export const ratingSelect = `
  width: 6rem;
  border-radius: 4px;
  background-color: ${palette.common.white};
`
