import { render, screen } from '@testing-library/react'
import { Table } from '@toptal/picasso'
import React, { ComponentProps } from 'react'
import { TestWrapper } from '@staff-portal/test-utils'

import HiredTalentTableCells from './HiredTalentTableCells'

const arrangeTest = (props: ComponentProps<typeof HiredTalentTableCells>) =>
  render(
    <TestWrapper>
      <Table>
        <Table.Body>
          <Table.Row>
            <HiredTalentTableCells {...props} />
          </Table.Row>
        </Table.Body>
      </Table>
    </TestWrapper>
  )

describe('HiredTalentTableCells', () => {
  it('renders default', () => {
    arrangeTest({
      status: 'Status',
      talent: 'Talent',
      actions: 'Actions'
    })

    expect(screen.getByText('Status')).toBeInTheDocument()
    expect(screen.getByText('Talent')).toBeInTheDocument()
    expect(screen.getByText('Actions')).toBeInTheDocument()
  })
})
