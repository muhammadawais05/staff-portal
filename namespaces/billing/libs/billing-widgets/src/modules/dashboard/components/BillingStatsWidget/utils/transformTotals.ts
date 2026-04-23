import { camelCase } from 'lodash-es'

interface TotalItem {
  amount: string
  category: string
}

const getTransformedTotals = (totals: TotalItem[]) =>
  totals.reduce((acc, { amount, category }) => {
    acc[camelCase(category)] = amount

    return acc
  }, {} as { [key: string]: string })

export { getTransformedTotals }
