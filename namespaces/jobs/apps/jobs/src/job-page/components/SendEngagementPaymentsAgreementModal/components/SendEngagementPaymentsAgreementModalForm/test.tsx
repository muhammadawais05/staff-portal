import { fireEvent, render, screen } from '@toptal/picasso/test-utils'
import React from 'react'
import { TestWrapper } from '@staff-portal/test-utils'
import { useMutation } from '@staff-portal/data-layer-service'
import { useModalFormChangeHandler } from '@staff-portal/mutation-result-handlers'

import SendEngagementPaymentsAgreementForm from '.'

jest.mock('@staff-portal/data-layer-service')
jest.mock('@staff-portal/engagements')
jest.mock('@staff-portal/mutation-result-handlers', () => ({
  ...jest.requireActual('@staff-portal/mutation-result-handlers'),
  useModalFormChangeHandler: jest.fn()
}))

const useModalFormChangeHandlerMock = useModalFormChangeHandler as jest.Mock
const mockUseMutation = useMutation as jest.Mock
const handleSubmitMock = jest.fn()

const arrangeTest = (hideModal: () => void) =>
  render(
    <TestWrapper>
      <SendEngagementPaymentsAgreementForm
        engagementId='123'
        hideModal={hideModal}
        jobTitle='Principal Security Developer'
        talentFullName='Athena Schoen'
        clientFullName='Halvorson'
      />
    </TestWrapper>
  )

describe('SendEngagementPaymentsAgreementModalForm', () => {
  beforeEach(() => {
    mockUseMutation.mockReturnValue([
      () => ({
        data: {
          sendSemiMonthlyEngagementPaymentsAgreement: {
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

    expect(
      screen.getByText('Principal Security Developer', { exact: false })
    ).toBeInTheDocument()
    expect(
      screen.getByText('Athena Schoen', { exact: false })
    ).toBeInTheDocument()
    expect(screen.getByText('Halvorson', { exact: false })).toBeInTheDocument()

    fireEvent.click(screen.getByText('Send Payments Agreement'))

    expect(handleSubmitMock).toHaveBeenCalledTimes(1)
    expect(handleSubmitMock).toHaveBeenCalledWith({
      engagementId: '123'
    })
    expect(hideModal).toHaveBeenCalledTimes(1)

    expect(useModalFormChangeHandlerMock).toHaveBeenCalledWith(
      expect.objectContaining({
        mutationResultOptions: expect.objectContaining({
          successNotificationMessage:
            'The Semi-Monthly Payments Agreement was successfully sent to the talent.'
        })
      })
    )
  })
})
