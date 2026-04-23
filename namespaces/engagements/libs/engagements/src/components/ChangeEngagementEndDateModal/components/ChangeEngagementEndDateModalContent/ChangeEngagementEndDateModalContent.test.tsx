import { render, screen } from '@toptal/picasso/test-utils'
import React from 'react'
import { useQuery } from '@staff-portal/data-layer-service'
import { TestWrapper } from '@staff-portal/test-utils'

import ChangeEngagementEndDateModalContent from './ChangeEngagementEndDateModalContent'

jest.mock('../ChangeEngagementEndDateForm', () => ({
  __esModule: true,
  default: () => <div data-testid='ChangeEngagementEndDateForm' />
}))

jest.mock('@staff-portal/modals-service', () => ({
  ModalSuspender: () => <div data-testid='ModalSuspender' />
}))

jest.mock('@staff-portal/data-layer-service')

const mockQuery = (loading = false, data = {}) => {
  const mockUseQuery = useQuery as jest.Mock

  mockUseQuery.mockReturnValue({ data, loading })
}

const arrangeTest = () =>
  render(
    <TestWrapper>
      <ChangeEngagementEndDateModalContent
        engagementId='123'
        hideModal={() => {}}
      />
    </TestWrapper>
  )

describe('ChangeEngagementEndDateModalContent', () => {
  describe('when data is loading', () => {
    it('shows the modal suspender', () => {
      mockQuery(true)
      arrangeTest()

      expect(screen.getByTestId('ModalSuspender')).toBeInTheDocument()
      expect(
        screen.queryByTestId('ChangeEngagementEndDateForm')
      ).not.toBeInTheDocument()
    })
  })

  describe('when the date is loaded', () => {
    it('shows the form', () => {
      mockQuery(false, { node: {} })
      arrangeTest()

      expect(
        screen.getByTestId('ChangeEngagementEndDateForm')
      ).toBeInTheDocument()
      expect(screen.queryByTestId('ModalSuspender')).not.toBeInTheDocument()
    })
  })
})
