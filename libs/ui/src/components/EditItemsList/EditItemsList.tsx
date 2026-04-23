import React from 'react'
import { Container, EmptyState } from '@toptal/picasso'

import EditItems, { EditItemsProps } from './components/EditItems'

interface Props<TItem> extends EditItemsProps<TItem> {
  notFoundMessage?: string
}

const EditItemsList = <TItem extends Record<string, unknown>>({
  items,
  defaultKeys,
  notFoundMessage = 'Not Found',
  getItemKey,
  renderItem,
  onActionClick
}: Props<TItem>) => {
  if (!items?.length) {
    return <EmptyState.Collection>{notFoundMessage}</EmptyState.Collection>
  }

  return (
    <Container>
      <EditItems<TItem>
        items={items}
        defaultKeys={defaultKeys}
        getItemKey={getItemKey}
        renderItem={renderItem}
        onActionClick={onActionClick}
      />
    </Container>
  )
}

export default EditItemsList
