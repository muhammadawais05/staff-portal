type Props = {
  threshold?: string
  amount?: string
}

export const adjustThreshold = ({ threshold }: Props) => {
  return {
    threshold: threshold ?? null
  }
}

export const adjustAmount = ({ amount }: Props) => {
  return {
    amount: amount ? Number(amount).toFixed(2).toString() : null
  }
}
