import { palette } from '@toptal/picasso/utils'
import { AggregatedTalentClientHourlyRatesItem } from '@staff-portal/graphql/staff'

import { HourlyRateRange, inRange } from '../../utils/inRange'

export const getChartData = (rates: AggregatedTalentClientHourlyRatesItem[]) =>
  [...rates]
    .sort((firstEl, secondEl) => firstEl.from - secondEl.from)
    .reduce<{
      chartValues: {
        [
          key: AggregatedTalentClientHourlyRatesItem['to']
        ]: AggregatedTalentClientHourlyRatesItem['count']
      }
      keys: AggregatedTalentClientHourlyRatesItem['to'][]
    }>(
      (acc, cur) => ({
        chartValues: {
          ...acc.chartValues,
          [cur.to]: cur.count
        },
        keys: [...acc.keys, cur.to]
      }),
      {
        chartValues: {},
        keys: []
      }
    )

export const getBarColor = (
  columnValue: string,
  coloredBarIndex: HourlyRateRange
): string => {
  const columnValueInt = parseInt(columnValue) || 0

  if (inRange(columnValueInt, coloredBarIndex)) {
    return palette.blue.main
  }

  return palette.grey.main
}
