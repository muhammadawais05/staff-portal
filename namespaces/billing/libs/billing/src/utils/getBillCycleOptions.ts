import { BillCycle } from '@staff-portal/graphql/staff'
import { titleize } from '@staff-portal/string'

const sortOrder: Record<BillCycle, number> = {
  [BillCycle.BI_WEEKLY]: 0,
  [BillCycle.WEEKLY]: 1,
  [BillCycle.SEMI_MONTHLY]: 2,
  [BillCycle.MONTHLY]: 3
}

export const getSortedBillCycles = () => {
  const keys = Object.keys(BillCycle) as BillCycle[]

  return keys.sort(
    (firstItem, secondItem) => sortOrder[firstItem] - sortOrder[secondItem]
  )
}

export const getBillCycleOptions = (billCycleOptions?: BillCycle[]) =>
  (billCycleOptions || getSortedBillCycles()).map(cycle => ({
    text: titleize(cycle, { separator: '-', capitalizeAllWords: false }),
    value: BillCycle[cycle as keyof typeof BillCycle]
  }))
