import { formatDate } from '@staff-portal/billing/src/_lib/dateTime'
import { Scalars } from '@staff-portal/graphql/staff'

import { FormattedDate, Key, Result, Value } from '../data/usePaymentsChart'

export type Payload = Record<Key, Value> & { x: string; date: FormattedDate }
export type ConvertedResult = Payload[]

export const convertValuesToData = (
  data: Result['paymentsChart']['data']
): ConvertedResult =>
  // Picasso `LineChart` does not support empty chart data,
  // so need to specify at least `[{ x: 0 }]` for empty data or it will throw an error,
  // but we have `ContentLoader` guard around it, so we can return empty array
  data.length === 0
    ? []
    : (Object.keys(data[0].values) as Scalars['Date'][]).map(date => ({
        date,
        x: formatDate(date),
        ...data.reduce((acc, { id, values }) => {
          acc[id] = values[date]

          return acc
        }, {} as Record<Key, Value>)
      }))
