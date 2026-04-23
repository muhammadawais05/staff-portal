import { palette } from '@toptal/picasso/utils'

export const skill = `
  border-width: 0;
  color: ${palette.common.white};
`

export const competentSkill = `
  background-color: ${palette.blue.light};

  &:focus {
    background-color: ${palette.blue.light};
  }
`

export const strongSkill = `
  background-color: ${palette.blue.main};

  &:focus {
    background-color: ${palette.blue.main};
  }
`

export const expertSkill = `
  background-color: ${palette.blue.darker};

  &:focus {
    background-color: ${palette.blue.darker};
  }
`

export const ratingSelect = `
  width: 6rem;

  > div > div {
    padding-top: 0;
    padding-bottom: 0;
    height: 1.25rem;
    vertical-align: top;
  }
`
