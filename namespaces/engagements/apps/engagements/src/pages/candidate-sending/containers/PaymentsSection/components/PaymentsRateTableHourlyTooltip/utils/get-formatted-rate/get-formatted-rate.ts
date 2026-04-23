import { formatAmount } from '@staff-portal/string'

const getFormattedRate = ({
  rate,
  suffix
}: {
  rate: number
  suffix?: string
}) => `${formatAmount(rate, 2)}${suffix ? `/${suffix}` : ''}`

export default getFormattedRate
