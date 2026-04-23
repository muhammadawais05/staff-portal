import { SyntheticEvent, useCallback, useState } from 'react'

export const useListTableRowExpandState = () => {
  const [expandedData, setExpandedData] = useState<{
    [id: string]: boolean
  }>({})

  const handleOnExpandClick = useCallback(
    ({
      currentTarget: { value: rowId }
    }: SyntheticEvent<HTMLButtonElement, Event>) => {
      const expanded = expandedData[rowId]

      setExpandedData(prevData => ({
        ...prevData,
        [rowId]: !expanded
      }))
    },
    [setExpandedData, expandedData]
  )

  const isExpanded = (rowId: string): boolean => expandedData[rowId] || false

  return {
    isExpanded,
    handleOnExpandClick
  }
}
