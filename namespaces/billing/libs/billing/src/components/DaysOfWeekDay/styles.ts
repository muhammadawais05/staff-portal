import { palette } from '@toptal/picasso/utils'
import { css } from 'styled-components'

const {
  grey,
  common: { white }
} = palette

const gridItem = ({
  isWeekend,
  isLastDayOfWeek
}: {
  isWeekend: boolean
  isLastDayOfWeek: boolean
}) => css`
  /* stylelint-disable-next-line declaration-colon-newline-after */
  background-color: ${isWeekend ? grey.lighter : white};
  border-left: solid 1px ${grey.main};
  /* stylelint-disable-next-line declaration-colon-newline-after */
  border-right: ${isLastDayOfWeek ? `solid 1px ${grey.main}` : 'none'};
  flex-basis: 14%;
  flex-grow: 1;
  font-size: 14px;
  min-width: 14%;
  border-top: solid 1px ${grey.main};
  padding: 0.75rem;
  width: 100%;
`

export { gridItem }
