import { Table } from '@toptal/picasso'
import React, { ComponentProps } from 'react'
import renderComponent from '@staff-portal/billing/src/utils/tests'
import fixtures from '@staff-portal/billing/src/_fixtures'

import ConsolidationDefaultsTableRow from '.'

jest.mock('@apollo/client')
jest.mock('./utils/useConsolidationDefaultsTableRowActions', () => {
  return jest.fn().mockReturnValue([
    {
      label: 'Delete',
      onClick: jest.fn()
    }
  ])
})

const consolidationDefault =
  fixtures.MockGetConsolidationDefaults.data.node.consolidationDefaults.nodes[0]

const render = (
  props: ComponentProps<typeof ConsolidationDefaultsTableRow> = {
    consolidationDefault
  }
) =>
  renderComponent(
    <Table>
      <Table.Body>
        <ConsolidationDefaultsTableRow
          handleOnActionClick={() => {}}
          {...props}
        />
      </Table.Body>
    </Table>
  )

describe('ConsolidationDefaultsTableRow', () => {
  it('default render', () => {
    const { queryByTestId } = render()

    expect(queryByTestId('ConsolidationDefaultsTableRow')).toBeInTheDocument()

    expect(queryByTestId('ConsolidationDefaultsTableRow-name')).toContainHTML(
      'Awesome CD 1'
    )

    expect(
      queryByTestId('ConsolidationDefaultsTableRow-creation-date')
    ).toContainHTML('Jun 4, 2021')
  })
  it.todo('render proper status (pending, deleted, expired)')
})
