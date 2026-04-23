import React, { PropsWithChildren, Suspense } from 'react'
import { render, waitFor } from '@testing-library/react'
import { Modal } from '@staff-portal/modals-service'
import { NodeType } from '@staff-portal/graphql'

import ApproveJobModal from './ApproveJobModal'

const APPROVE_JOB_MODAL_CONTENT_ID = 'APPROVE_JOB_MODAL_CONTENT_ID'

jest.mock('@staff-portal/modals-service', () => ({
  ...jest.requireActual('@staff-portal/modals-service'),
  Modal: jest.fn()
}))

jest.mock('../ApproveJobModalContent', () => ({
  __esModule: true,
  default: () => <div data-testid={APPROVE_JOB_MODAL_CONTENT_ID} />
}))

const ModalMock = Modal as unknown as jest.Mock

const arrangeTest = (jobId: string) =>
  render(
    <Suspense fallback={null}>
      <ApproveJobModal
        jobId={jobId}
        hideModal={() => {}}
        onApproveJob={() => {}}
      />
    </Suspense>
  )

describe('ApproveJobModal', () => {
  beforeEach(() => {
    ModalMock.mockImplementation(({ children }: PropsWithChildren<object>) => (
      <>{children}</>
    ))
  })

  it('should render `CustomModal` with operation variables', () => {
    const jobId = 'testId'

    arrangeTest(jobId)

    expect(ModalMock).toHaveBeenCalledWith(
      expect.objectContaining({
        operationVariables: {
          nodeId: jobId,
          nodeType: NodeType.JOB,
          operationName: 'approveJob'
        }
      }),
      expect.any(Object)
    )
  })
  it('should render `ApproveJobModalContent`', async () => {
    const { getByTestId } = arrangeTest('testId')

    await waitFor(() =>
      expect(getByTestId(APPROVE_JOB_MODAL_CONTENT_ID)).toBeInTheDocument()
    )
  })
})
