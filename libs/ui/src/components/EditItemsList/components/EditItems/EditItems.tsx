import { Container } from '@toptal/picasso'
import React, { memo, ReactNode, SyntheticEvent, useState } from 'react'

import { EditItemAction } from './enums'

export interface EditItemOptions {
  index: number
  open: boolean
  onActionClick?: (event?: SyntheticEvent<HTMLButtonElement>) => void
}

export interface EditItemsProps<TItem> {
  items?: TItem[]
  renderItem: (item: TItem, options: EditItemOptions) => ReactNode
  getItemKey: (item: TItem) => string
  defaultKeys?: string[]
  onActionClick?: (key: string, action?: EditItemAction) => void
}

const EditItems = <TItem extends Record<string, unknown>>({
  items,
  defaultKeys = [],
  getItemKey,
  renderItem,
  onActionClick
}: EditItemsProps<TItem>) => {
  const [currentKeys, setCurrentKeys] = useState(defaultKeys)

  const handleActionClick = (event?: SyntheticEvent<HTMLButtonElement>) => {
    const key = event?.currentTarget.dataset?.id
    const action = event?.currentTarget.dataset?.action as
      | EditItemAction
      | undefined

    if (!key) {
      return
    }

    switch (action) {
      case EditItemAction.Open:
        setCurrentKeys(keys => [...keys, key])
        break
      case EditItemAction.Close:
        setCurrentKeys(keys => keys.filter(currentKey => currentKey !== key))
        break
      default:
        throw new Error('Unknown edit item action defined.')
    }

    onActionClick?.(key, action)
  }

  return (
    <>
      {items?.map((item, index) => {
        const itemKey = getItemKey(item)
        const isOpen = currentKeys.some(key => key === itemKey)

        return (
          <Container key={itemKey}>
            {renderItem(item, {
              index,
              open: isOpen,
              onActionClick: handleActionClick
            })}
          </Container>
        )
      })}
    </>
  )
}

export default memo(EditItems) as typeof EditItems
