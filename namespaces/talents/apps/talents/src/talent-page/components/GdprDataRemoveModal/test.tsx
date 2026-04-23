import React from 'react'
import { render, screen } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'
import { useQuery } from '@staff-portal/data-layer-service'

import GdprDataRemoveModal from './GdprDataRemoveModal'

jest.mock('./data/remove-gdpr-data.staff.gql', () => ({
  __esModule: true,
  useProcessGdprRemovalTalent: () => [() => {}, { loading: false }]
}))
jest.mock('@staff-portal/data-layer-service')
const useQueryMock = useQuery as jest.Mock

const arrangeTest = () => {
  useQueryMock.mockImplementation(() => ({
    data: {
      node: {
        operations: {
          processGdprRemovalTalent: {
            callable: 'ENABLED'
          }
        }
      }
    },
    loading: false
  }))

  return render(
    <TestWrapper>
      <GdprDataRemoveModal talentId='id' hideModal={() => {}} />
    </TestWrapper>
  )
}

describe('GdprDataRemoveModal', () => {
  it('displays required copies', () => {
    arrangeTest()

    expect(screen.getByText('GDPR data removal')).toBeInTheDocument()

    expect(
      screen.getByText("Do you want to remove talent's data from the platform?")
    ).toBeInTheDocument()

    expect(
      screen.getByText(
        'Talent with multiple roles must each be processed separately.'
      )
    ).toBeInTheDocument()

    expect(
      screen.getByText('Attention! This action cannot be undone.')
    ).toBeInTheDocument()

    expect(screen.getByText('Remove Data')).toBeInTheDocument()
  })
})
