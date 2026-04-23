export const convertTotalGroupsToMapByMonths = <T extends object>(
  totalGroups?: {
    year: number
    month: number
    totals: T
  }[]
) =>
  (totalGroups || []).reduce((acc, { year, month, totals }) => {
    acc[year] = acc[year] || {}
    acc[year][month] = totals

    return acc
  }, {} as { [year: number]: { [month: number]: T } })
