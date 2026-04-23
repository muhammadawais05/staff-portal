import { Result, Values } from '../data/usePaymentsChart'

export const getFirstDateValue = (values: Values) =>
  values[Object.keys(values)[0]]

export const generateReferenceLines = (
  data: Result['paymentsChart']['thresholds_dates']
) =>
  data &&
  Object.entries(data).reduce((acc, [color, dates]) => {
    acc.push({ y: getFirstDateValue(dates), color })

    return acc
  }, [] as { y: number; color: string }[])
