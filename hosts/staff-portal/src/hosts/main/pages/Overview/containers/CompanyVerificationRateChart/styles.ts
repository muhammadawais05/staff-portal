import { css } from 'styled-components'

export const CHART_HEIGHT = 180

export const chartTitle = css`
  cursor: default;
`

export const chartWrapper = css`
  height: ${CHART_HEIGHT}px;
`

// `width: 0` prevents the chart from random stretching:
// https://github.com/recharts/recharts/issues/172#issuecomment-240036906
export const chartInner = css`
  width: 0;
  flex: 1;
`

export const levelFilterContainer = css`
  width: 4.5rem;
`

export const periodFilterContainer = css`
  width: 7rem;
`
