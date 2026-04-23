type Params = {
  consolidationDefault?: {
    id: string
    deleted?: boolean
  }
  isWorking?: boolean
  isSelectable?: boolean
  parentConsolidationDefaultId?: string
}

export const useEngagementTableRowState = ({
  consolidationDefault,
  isWorking,
  isSelectable,
  parentConsolidationDefaultId
}: Params) => {
  const belongsToAnotherCD =
    !!consolidationDefault &&
    consolidationDefault?.id !== parentConsolidationDefaultId &&
    !consolidationDefault.deleted
  const belongsToCurrentCD =
    !!consolidationDefault &&
    consolidationDefault?.id === parentConsolidationDefaultId
  const isDisabled = Boolean(isSelectable && (!isWorking || belongsToAnotherCD))
  const isCheckboxDisabled = (isDisabled && !belongsToCurrentCD) || !isWorking

  return { isDisabled, isCheckboxDisabled }
}
