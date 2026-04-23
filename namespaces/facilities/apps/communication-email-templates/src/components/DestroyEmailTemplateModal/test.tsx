import { act, fireEvent, render, screen } from '@toptal/picasso/test-utils'
import React from 'react'
import { TestWrapper } from '@staff-portal/test-utils'
import { useMutation, useQuery } from '@staff-portal/data-layer-service'
import { useModalFormChangeHandler } from '@staff-portal/mutation-result-handlers'
import { createOperationMock } from '@staff-portal/operations/src/mocks'

import DestroyEmailTemplateModal from './DestroyEmailTemplateModal'

jest.mock('@staff-portal/data-layer-service')
jest.mock('@staff-portal/engagements')
jest.mock('@staff-portal/mutation-result-handlers', () => ({
  ...jest.requireActual('@staff-portal/mutation-result-handlers'),
  useModalFormChangeHandler: jest.fn()
}))

const useModalFormChangeHandlerMock = useModalFormChangeHandler as jest.Mock
const mockUseMutation = useMutation as jest.Mock
const handleSubmitMock = jest.fn()

const useQueryMock = useQuery as jest.Mock

const EMAIL_TEMPLATE_ID = '123'
const EMAIL_TEMPLATE_TITLE = 'EMAIL TEMPLATE TITLE'

const arrangeTest = (hideModal: () => void) =>
  render(
    <TestWrapper>
      <DestroyEmailTemplateModal
        emailTemplateId={EMAIL_TEMPLATE_ID}
        emailTemplateTitle={EMAIL_TEMPLATE_TITLE}
        hideModal={hideModal}
        isTopModal={true}
      />
    </TestWrapper>
  )

describe('DestroyEmailTemplateModal', () => {
  beforeEach(() => {
    useQueryMock.mockReturnValue({
      data: {
        node: {
          operations: { destroyEmailTemplate: createOperationMock() }
        }
      }
    })
    mockUseMutation.mockReturnValue([
      () => ({
        data: {
          id: EMAIL_TEMPLATE_ID,
          destroyEmailTemplate: {
            success: true,
            errors: []
          }
        }
      }),
      { loading: false }
    ])

    useModalFormChangeHandlerMock.mockImplementation(
      ({ mutationResultOptions: { onSuccessAction } }) => {
        onSuccessAction()

        return {
          handleSubmit: handleSubmitMock,
          loading: false
        }
      }
    )
  })

  it('renders and shows the success message after submit', async () => {
    const hideModal = jest.fn()

    arrangeTest(hideModal)

    expect(screen.getByRole('heading')).toHaveTextContent(
      'Delete Email Template'
    )

    expect(
      screen.getByText(
        `Are you sure that you want to delete the "${EMAIL_TEMPLATE_TITLE}" email template?`
      )
    ).toBeInTheDocument()

    await act(async () => {
      fireEvent.click(
        screen.getByTestId('DestroyEmailTemplate-modal-submit-button')
      )
    })

    expect(handleSubmitMock).toHaveBeenCalledTimes(1)
    expect(handleSubmitMock).toHaveBeenCalledWith({
      emailTemplateId: EMAIL_TEMPLATE_ID
    })
    expect(hideModal).toHaveBeenCalledTimes(1)

    expect(useModalFormChangeHandlerMock).toHaveBeenCalledWith(
      expect.objectContaining({
        mutationResultOptions: expect.objectContaining({
          successNotificationMessage:
            'The Email Template was successfully deleted.'
        })
      })
    )
  })
})
