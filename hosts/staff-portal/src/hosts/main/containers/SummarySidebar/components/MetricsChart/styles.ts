// hack to remove paddings for compact chart. Request for proper solution: https://toptal-core.atlassian.net/browse/FX-907
export const expandChart = `
  & > div {
    margin-left: -20px;
    margin-right: -16px;
  }
`

export const wrapper = `
  margin-top: 0.75rem;
`
