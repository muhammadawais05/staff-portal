export const getMainMenuCounter = (
  counters?: { name: string; total: number; unread: number }[],
  counterName?: string | null
) => counters?.find(({ name }) => name === counterName)
