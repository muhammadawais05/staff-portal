import { NodeType } from '@staff-portal/graphql'
import { Modal } from '@staff-portal/modals-service'
import { TestWrapper } from '@staff-portal/test-utils'
import { render } from '@toptal/picasso/test-utils'
import React, { ReactNode, Suspense } from 'react'

import RateForClientInterviewModalContent from '../RateForClientInterviewModalContent/RateForClientInterviewModalContent'
import RateForClientInterviewModal from './RateForClientInterviewModal'

jest.mock(
  '../RateForClientInterviewModalContent/RateForClientInterviewModalContent'
)
jest.mock('@staff-portal/modals-service', () => ({
  __esModule: true,
  Modal: jest.fn()
}))

const mockModal = Modal as unknown as jest.Mock
const mockRateForClientInterviewModalContent =
  RateForClientInterviewModalContent as jest.Mock

const renderComponent = () => {
  mockModal.mockImplementation(({ children }: { children: ReactNode }) => (
    <>{children}</>
  ))

  mockRateForClientInterviewModalContent.mockImplementation(() => <div />)

  return render(
    <Suspense fallback='loading'>
      <TestWrapper>
        <RateForClientInterviewModal
          engagementId='1'
          interviewId='2'
          hideModal={() => {}}
        />
      </TestWrapper>
    </Suspense>
  )
}

describe('RateForClientInterviewModal', () => {
  it('shows modal', () => {
    renderComponent()

    expect(mockModal).toHaveBeenCalledWith(
      {
        open: true,
        size: 'small',
        operationVariables: {
          nodeId: '2',
          nodeType: NodeType.INTERVIEW,
          operationName: 'rateForClientInterview'
        },
        onClose: expect.anything(),
        'data-testid': 'accept-candidate-modal',
        children: expect.anything()
      },
      expect.anything()
    )
  })
})
