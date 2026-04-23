import { render, screen } from '@testing-library/react'
import { Table } from '@toptal/picasso'
import React from 'react'
import { TestWrapper } from '@staff-portal/test-utils'

import HiredTalentTable from './HiredTalentTable'

const arrangeTest = () =>
  render(
    <TestWrapper>
      <HiredTalentTable>
        <Table.Row data-testid='row'>
          <Table.Cell>Row Name</Table.Cell>
        </Table.Row>
      </HiredTalentTable>
    </TestWrapper>
  )

describe('HiredTalentTable', () => {
  it('renders default', () => {
    arrangeTest()

    expect(screen.getByTestId('row')).toBeInTheDocument()
    expect(screen.getByText('Hired Talent')).toBeInTheDocument()
    expect(screen.getByText('Status')).toBeInTheDocument()
    expect(screen.getByText('Talent')).toBeInTheDocument()
    expect(screen.getByText('Actions')).toBeInTheDocument()
  })
})
