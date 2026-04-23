import { render, screen } from '@toptal/picasso/test-utils'
import React from 'react'
import { useQuery } from '@staff-portal/data-layer-service'
import { TestWrapper } from '@staff-portal/test-utils'
import { SourcerFragment } from '@staff-portal/talents'

import UpdateSourcingRequestSpecialistModalContent from './UpdateSourcingRequestSpecialistModalContent'

jest.mock('../UpdateSourcingRequestSpecialistForm', () => ({
  __esModule: true,
  default: () => <div data-testid='UpdateSourcingRequestSpecialistForm' />
}))

jest.mock('@staff-portal/modals-service', () => ({
  ...jest.requireActual('@staff-portal/modals-service'),
  ModalSuspender: () => <div data-testid='ModalSuspender' />
}))

jest.mock('@staff-portal/data-layer-service')

const mockQuery = (
  loading = false,
  data?: { roles: { nodes: SourcerFragment[] } }
) => {
  const mockUseQuery = useQuery as jest.Mock

  mockUseQuery.mockReturnValue({ data, loading })
}

const arrangeTest = () =>
  render(
    <TestWrapper>
      <UpdateSourcingRequestSpecialistModalContent
        jobId='123'
        sourcingRequestId='123'
        talentSpecialistId='123'
        talentSpecialistFullName='Specialist Name'
        hideModal={() => {}}
      />
    </TestWrapper>
  )

describe('UpdateSourcingRequestSpecialistModalContent', () => {
  describe('when data is loading', () => {
    it('shows the modal suspender', () => {
      mockQuery(true)
      arrangeTest()

      expect(screen.getByTestId('ModalSuspender')).toBeInTheDocument()
      expect(
        screen.queryByTestId('UpdateSourcingRequestSpecialistForm')
      ).not.toBeInTheDocument()
    })
  })

  describe('when the sourcers data is loaded', () => {
    it('shows the form', () => {
      mockQuery(false, {
        roles: {
          nodes: [{ id: '123', fullName: 'Test Name' }]
        }
      })
      arrangeTest()

      expect(
        screen.getByTestId('UpdateSourcingRequestSpecialistForm')
      ).toBeInTheDocument()
      expect(screen.queryByTestId('ModalSuspender')).not.toBeInTheDocument()
    })
  })
})
