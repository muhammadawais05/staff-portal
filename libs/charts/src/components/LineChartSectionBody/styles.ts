export const CHART_HEIGHT = 180

export const chartTitle = `
  cursor: default;
`

export const chartWrapper = `
  height: ${CHART_HEIGHT}px;
`

// `width: 0` prevents the chart from random stretching:
// https://github.com/recharts/recharts/issues/172#issuecomment-240036906
export const chartInner = `
  width: 0;
  flex: 1;
`
