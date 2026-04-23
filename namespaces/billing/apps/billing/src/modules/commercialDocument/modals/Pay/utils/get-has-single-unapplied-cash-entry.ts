export const getHasSingleUnappliedCashEntry = (
  input: Record<string, { value: string; text: string }[]>
) => Object.values(input).reduce((acc, val) => acc + val?.length, 0) === 1
