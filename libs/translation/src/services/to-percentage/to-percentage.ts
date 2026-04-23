import { Language } from '../../types'

export const toPercentage = (
  value: string | number = 0,
  {
    precisionMin = 2,
    precisionMax = 2,
    locale = 'en'
  }: { precisionMin?: number; precisionMax?: number; locale?: Language } = {}
) =>
  `${Intl.NumberFormat(locale, {
    maximumFractionDigits: precisionMax,
    minimumFractionDigits: precisionMin
  }).format(typeof value === 'string' ? Number(value) : value)}%`
