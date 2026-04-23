import { palette } from '@toptal/picasso/utils'
import { css } from 'styled-components'

const competentColor = palette.blue.light
const strongColor = palette.blue.main
const expertColor = palette.blue.darker
const asteriskYellow = palette.yellow.main

export const skillTag = `
  color: ${palette.common.white};
  margin-bottom: 0.3rem;
  cursor: pointer;
`

export const inlineTagLink = css`
  display: inline;
  cursor: pointer;
`

export const yellowAsterisk = `{
  color: ${asteriskYellow};
}`

export const competentSkill = `
  background-color: ${competentColor};

  &:hover,
  &:focus {
    background-color: ${competentColor};
  }
`

export const strongSkill = `
  background-color: ${strongColor};

  &:hover,
  &:focus {
    background-color: ${strongColor};
  }
`

export const expertSkill = `
  background-color: ${expertColor};

  &:hover,
  &:focus {
    background-color: ${expertColor};
  }
`

export const skillName = css`
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 12.5rem;
`
