import React, { ComponentProps } from 'react'
import { render, screen } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'

import { RequestDetailsModalContent } from './components'
import {
  createRateChangeRequestMock,
  createActiveEngagementMock
} from '../../data/rate-change-request-fragment/mocks'
import RequestDetailsModal from './RequestDetailsModal'

jest.mock('../RequestDetailsModal/components/RequestDetailsModalContent')

const RequestDetailsModalContentMock = RequestDetailsModalContent as jest.Mock

const arrangeTest = (props: ComponentProps<typeof RequestDetailsModal>) => {
  render(
    <TestWrapper>
      <RequestDetailsModal {...props} />
    </TestWrapper>
  )
}

describe('RequestDetailsModal', () => {
  beforeEach(() => {
    RequestDetailsModalContentMock.mockReturnValueOnce(null)
  })

  it('renders request details modal', () => {
    const rateChangeRequest = createRateChangeRequestMock({
      engagement: createActiveEngagementMock()
    })

    arrangeTest({
      ...rateChangeRequest,
      hideModal: jest.fn()
    })

    expect(
      screen.getByText('Active Engagement Request Details')
    ).toBeInTheDocument()
    expect(RequestDetailsModalContentMock).toHaveBeenCalledWith(
      expect.objectContaining({
        ...rateChangeRequest
      }),
      {}
    )
    expect(screen.getByRole('button', { name: 'Close' })).toBeInTheDocument()
  })
})
