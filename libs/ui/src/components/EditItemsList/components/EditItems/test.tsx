import { Button } from '@toptal/picasso/Button'
import { fireEvent, render, screen } from '@toptal/picasso/test-utils'
import React from 'react'
import { TestWrapper } from '@staff-portal/test-utils'

import EditItems, { EditItemOptions } from './EditItems'
import { EditItemAction } from './enums'

type Item = {
  id: string
  name: string
}

const ItemComponent = ({
  item: { id, name },
  options: { open, onActionClick }
}: {
  item: Item
  options: EditItemOptions
}) => (
  <>
    {!open && (
      <>
        View {name}{' '}
        <Button
          data-id={id}
          data-action={EditItemAction.Open}
          onClick={onActionClick}
        >
          Open {name}
        </Button>
        <Button
          data-id=''
          data-action={EditItemAction.Open}
          onClick={onActionClick}
        >
          Wrong Id {name}
        </Button>
        <Button data-id='1' data-action='wrong' onClick={onActionClick}>
          Wrong Action {name}
        </Button>
      </>
    )}
    {open && (
      <>
        Edit {name}{' '}
        <Button
          data-id={id}
          data-action={EditItemAction.Close}
          onClick={onActionClick}
        >
          Close {name}
        </Button>
      </>
    )}
  </>
)

const arrangeTest = (items: Item[], defaultKeys?: string[]) => {
  const renderItem = (item: Item, options: EditItemOptions) => (
    <ItemComponent item={item} options={options} />
  )
  const getItemKey = ({ id }: Item) => id

  return render(
    <TestWrapper>
      <EditItems
        defaultKeys={defaultKeys}
        items={items}
        renderItem={renderItem}
        getItemKey={getItemKey}
      />
    </TestWrapper>
  )
}

describe('EditItems', () => {
  it('shows the list of items in view mode', () => {
    arrangeTest([
      { id: '1', name: 'Item 1' },
      { id: '2', name: 'Item 2' }
    ])

    expect(screen.getByText('View Item 1')).toBeInTheDocument()
    expect(screen.getByText('View Item 2')).toBeInTheDocument()
  })

  it('opens default keys', () => {
    arrangeTest(
      [
        { id: '1', name: 'Item 1' },
        { id: '2', name: 'Item 2' }
      ],
      ['2']
    )

    expect(screen.getByText('View Item 1')).toBeInTheDocument()
    expect(screen.getByText('Edit Item 2')).toBeInTheDocument()
    expect(screen.queryByText('View Item 2')).not.toBeInTheDocument()
  })

  it('switch to edit mode and back to view mode', async () => {
    arrangeTest([
      { id: '1', name: 'Item 1' },
      { id: '2', name: 'Item 2' }
    ])

    fireEvent.click(screen.getByText('Open Item 1'))

    expect(await screen.findByText('Edit Item 1')).toBeInTheDocument()
    expect(screen.queryByText('View Item 1')).not.toBeInTheDocument()

    fireEvent.click(screen.getByText('Close Item 1'))

    expect(await screen.findByText('View Item 1')).toBeInTheDocument()
    expect(screen.queryByText('Edit Item 1')).not.toBeInTheDocument()
  })

  it('ignores when the key is missing', () => {
    arrangeTest([
      { id: '1', name: 'Item 1' },
      { id: '2', name: 'Item 2' }
    ])

    fireEvent.click(screen.getByText('Wrong Id Item 1'))

    expect(screen.getByText('View Item 1')).toBeInTheDocument()
    expect(screen.queryByText('Edit Item 1')).not.toBeInTheDocument()
  })
})
