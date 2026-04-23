import React from 'react'
import { render, screen } from '@testing-library/react'
import { Table } from '@toptal/picasso'
import {
  TalentDetailedStatuses,
  TalentCumulativeStatus
} from '@staff-portal/graphql/staff'
import { TestWrapper } from '@staff-portal/test-utils'
import { createTalentMock } from '@staff-portal/talents-screening-specialists/src/mocks'

import TalentTableRowDataCells from './TalentTableRowDataCells'

jest.mock('../NameCellContent', () => ({
  __esModule: true,
  default: () => <></>
}))

jest.mock('../AssigneeCellContent', () => ({
  __esModule: true,
  default: () => <></>
}))

jest.mock('../VerticalCellContent', () => ({
  __esModule: true,
  default: () => <></>
}))
jest.mock('../SpecialistAssignmentStatus', () => ({
  __esModule: true,
  default: () => <></>
}))
jest.mock('../TalentTableRowActions', () => ({
  __esModule: true,
  default: () => <></>
}))

const talent = createTalentMock({
  fullName: 'John Doe',
  webResource: { url: 'http://talent/123' },
  talentType: 'Designer',
  detailedStatus: TalentDetailedStatuses.ENGLISH_APPROVED,
  specializationApplications: {
    nodes: [
      {
        id: 'test-id',
        specialization: { id: 'test-id', title: 'UX' }
      }
    ]
  },
  cumulativeStatus: TalentCumulativeStatus.ACTIVE
})

const arrangeTest = () =>
  render(
    <TestWrapper>
      <Table>
        <Table.Body>
          <Table.Row>
            <TalentTableRowDataCells talent={talent} />
          </Table.Row>
        </Table.Body>
      </Table>
    </TestWrapper>
  )

describe('TalentTableRowDataCells', () => {
  it('shows talent data', () => {
    arrangeTest()

    // The rest cell content tested internally
    expect(screen.getByText('English Approved')).toBeInTheDocument()
    expect(screen.getByText('Active')).toBeInTheDocument()
  })
})
