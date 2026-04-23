import { render, screen } from '@testing-library/react'
import { fireEvent, waitFor } from '@toptal/picasso/test-utils'
import React from 'react'
import { MockedResponse } from '@staff-portal/data-layer-service'
import { TestWrapperWithMocks, noop } from '@staff-portal/test-utils'
import { useGetOperation } from '@staff-portal/operations'

import {
  createResetRejectTalentApplicationFailedMock,
  createResetRejectTalentApplicationMock
} from './data/mocks'
import ResetApplicationModal, { Props } from './ResetApplicationModal'

const TALENT_ID = 'talent-id'

jest.mock(
  '@staff-portal/operations/src/components/LazyOperation/hooks/use-get-operation',
  () => ({
    __esModule: true,
    useGetOperation: jest.fn()
  })
)

const mockReturnValues = () => {
  const mockUseGetOperation = useGetOperation as jest.Mock

  mockUseGetOperation.mockReturnValue({ enabled: true, loading: false })
}

const arrangeTest = (
  hideModal: Props['hideModal'],
  onSubmitSuccess: Props['onSubmitSuccess'],
  mocks: MockedResponse[]
) => {
  mockReturnValues()

  window.Element.prototype.scrollIntoView = jest.fn()
  render(
    <TestWrapperWithMocks mocks={mocks}>
      <ResetApplicationModal
        talentId={TALENT_ID}
        hideModal={hideModal}
        onSubmitSuccess={onSubmitSuccess}
      />
    </TestWrapperWithMocks>
  )
}

const fillInForm = (commentBody: string) => {
  const { comment, submitBtn } = getControls()

  fireEvent.change(comment, {
    target: { value: commentBody }
  })
  fireEvent.click(submitBtn)
}

const getControls = () => {
  const comment = screen.getByLabelText(/Comment/)
  const submitBtn = screen.getByTestId('ConfirmationModal-submit-button')

  return { comment, submitBtn }
}

describe('ResetApplicationModal', () => {
  it('renders modal', async () => {
    arrangeTest(noop, noop, [])
    const { comment, submitBtn } = getControls()
    const text = screen.getByText(/Do you really want to reset this/)

    expect(comment).toBeInTheDocument()
    expect(text).toBeInTheDocument()
    expect(submitBtn).toBeInTheDocument()
  })

  it('successfully resets rejected application', async () => {
    const onClose = jest.fn()
    const onSubmitSuccess = jest.fn()
    const commentBody = 'Comment body'

    arrangeTest(onClose, onSubmitSuccess, [
      createResetRejectTalentApplicationMock({
        talentId: TALENT_ID,
        comment: commentBody
      })
    ])
    fillInForm(commentBody)
    await waitFor(() => {
      expect(onSubmitSuccess).toHaveBeenCalledTimes(1)
      expect(onSubmitSuccess).toHaveBeenCalledWith('email-template-id')
    })
    expect(
      await screen.findByText('Application has been reset.')
    ).toBeInTheDocument()
  })

  it('handles request with an error', async () => {
    const onClose = jest.fn()
    const onSubmitSuccess = jest.fn()
    const commentBody = 'Comment body'

    arrangeTest(onClose, onSubmitSuccess, [
      createResetRejectTalentApplicationFailedMock({
        talentId: TALENT_ID,
        comment: commentBody
      })
    ])

    fillInForm(commentBody)

    expect(
      await screen.findByText('Unable to reset application.')
    ).toBeInTheDocument()
    expect(onSubmitSuccess).toHaveBeenCalledTimes(0)
  })
})
