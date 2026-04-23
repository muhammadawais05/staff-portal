import { AggregatedTalentClientHourlyRatesItem } from '@staff-portal/graphql/staff'

export const aggregatedTalentClientHourlyRates1: AggregatedTalentClientHourlyRatesItem[] =
  Array.from({ length: 500 }, (_, index) => ({
    count: index,
    from: index,
    to: index + 1
  }))

export const aggregatedTalentClientHourlyRates5 =
  aggregatedTalentClientHourlyRates1.reduce<
    AggregatedTalentClientHourlyRatesItem[]
  >((acc, cur, index) => {
    // take only every 5th element
    return index % 5 !== 0
      ? acc
      : [
          ...acc,
          {
            count: aggregatedTalentClientHourlyRates1
              .slice(index, index + 5)
              .reduce((count, current) => count + current.count, 0),
            from: index,
            to: index + 5
          }
        ]
  }, [])

export const getAggregatedTalentClientHourlyRates = () => ({
  data: {
    rates1: {
      nodes: aggregatedTalentClientHourlyRates1,
      __typename: 'AggregatedTalentClientHourlyRatesConnection'
    },
    rates5: {
      nodes: aggregatedTalentClientHourlyRates5,
      __typename: 'AggregatedTalentClientHourlyRatesConnection'
    }
  }
})
