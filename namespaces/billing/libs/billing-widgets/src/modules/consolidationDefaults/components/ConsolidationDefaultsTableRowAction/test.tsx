import React, { ComponentProps } from 'react'
import { noop } from '@toptal/picasso/utils'
import { fireEvent } from '@toptal/picasso/test-utils'
import renderComponent from '@staff-portal/billing/src/utils/tests'

import ConsolidationDefaultsTableRowAction from '.'

const { displayName } = ConsolidationDefaultsTableRowAction

const mockActions = [
  {
    label: 'Edit',
    onClick: noop
  },
  {
    label: 'Delete',
    onClick: noop
  }
]

const render = (
  props: ComponentProps<typeof ConsolidationDefaultsTableRowAction>
) => renderComponent(<ConsolidationDefaultsTableRowAction {...props} />)

describe('ConsolidationDefaultsTableRowAction', () => {
  it('renders an action button', () => {
    const { queryByTestId } = render({ actions: mockActions })

    expect(queryByTestId(`${displayName}-button`)).toBeInTheDocument()
  })
  it('renders all actions passed as a prop', () => {
    const { getByTestId } = render({ actions: mockActions })

    fireEvent.click(getByTestId(`${displayName}-button`))
    mockActions.forEach(action => {
      expect(getByTestId(`${displayName}-actions`)).toContainHTML(action.label)
    })
  })
  it('renders no actions when empty array is passed', () => {
    const { container } = render({ actions: [] })

    expect(container.firstChild).toBeEmptyDOMElement()
  })
})
