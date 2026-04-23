import { palette } from '@toptal/picasso/utils'
import { css } from 'styled-components'

interface Params {
  isWeekend?: boolean
  isBreak?: boolean
}

const {
  grey,
  common: { white }
} = palette

const getBackgroundColor = ({ isWeekend, isBreak }: Params) =>
  isWeekend || isBreak ? grey.lighter2 : white

const gridItem = (params: Params) => css`
  && {
    /* TODO: https://toptal-core.atlassian.net/browse/SPB-2997 */
    /* stylelint-disable-next-line */
    background-color: ${getBackgroundColor(params)};
    border-bottom: solid 1px ${grey.light2};
    padding: 0.5rem 1rem;
  }
`

const colDate = css`
  && {
    margin-top: 0.125rem;
    flex-basis: 16%;
  }
`
const colHours = css`
  && {
    flex-basis: 16%;
  }
`
const colWorkNote = css`
  && {
    margin-top: 0.125rem;
    flex-basis: 68%;
  }
`

export { gridItem, colDate, colHours, colWorkNote }
