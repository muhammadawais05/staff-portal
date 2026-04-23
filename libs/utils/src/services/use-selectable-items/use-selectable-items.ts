import { useState, useCallback, useEffect } from 'react'

export const useSelectableItems = (itemIds: string[]) => {
  const [selectedIds, setSelectedIds] = useState<string[]>([])

  // synchronize selected items with list updates
  useEffect(() => {
    const newSelectedIds = selectedIds.filter(id => itemIds.includes(id))

    if (
      newSelectedIds.length !== selectedIds.length ||
      newSelectedIds.some((id, index) => selectedIds[index] !== id)
    ) {
      setSelectedIds(newSelectedIds)
    }
  }, [itemIds, selectedIds])

  const selectItem = useCallback(
    (itemId: string) => {
      if (selectedIds.includes(itemId)) {
        return
      }

      const newSelectedIds = [...selectedIds, itemId]
      const sortedItemIds = itemIds.filter(id => newSelectedIds.includes(id))

      setSelectedIds(sortedItemIds)
    },
    [itemIds, selectedIds]
  )

  const deselectItem = useCallback(
    (itemId: string) => {
      if (!selectedIds.includes(itemId)) {
        return
      }

      const newSelectedIds = selectedIds.filter(id => id !== itemId)

      setSelectedIds(newSelectedIds)
    },
    [selectedIds]
  )

  const selectAllItems = useCallback(() => {
    if (selectedIds.length === itemIds.length) {
      return
    }

    setSelectedIds(itemIds)
  }, [itemIds, selectedIds])

  const deselectAllItems = useCallback(() => {
    if (selectedIds.length === 0) {
      return
    }

    setSelectedIds([])
  }, [selectedIds])

  return {
    selectedIds,
    selectItem,
    deselectItem,
    selectAllItems,
    deselectAllItems
  }
}
