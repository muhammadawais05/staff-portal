import { useCallback, useState } from 'react'

export const useSelection = <T>(initiallySelected: Set<T>) => {
  const [selected, setSelected] = useState<Set<T>>(initiallySelected)

  const addSelected = useCallback((item: T) => {
    setSelected(selectedItems => new Set(selectedItems.add(item)))
  }, [])

  const removeSelected = useCallback((item: T) => {
    setSelected(selectedItems => {
      selectedItems.delete(item)

      return new Set(selectedItems)
    })
  }, [])

  return {
    selected,
    setSelected,
    addSelected,
    removeSelected
  }
}

export default useSelection
