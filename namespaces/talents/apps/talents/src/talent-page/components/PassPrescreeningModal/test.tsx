import { render } from '@testing-library/react'
import React from 'react'
import { TestWrapper } from '@staff-portal/test-utils'
import { ConfirmationModal } from '@staff-portal/modals-service'
import { useModalFormChangeHandler } from '@staff-portal/mutation-result-handlers'

import PassPrescreeningModal from './PassPrescreeningModal'

jest.mock('@staff-portal/modals-service', () => ({
  ...jest.requireActual('@staff-portal/modals-service'),
  ConfirmationModal: jest.fn()
}))
jest.mock('@staff-portal/mutation-result-handlers', () => ({
  ...jest.requireActual('@staff-portal/mutation-result-handlers'),
  useModalFormChangeHandler: jest.fn()
}))

const ConfirmationModalMock = ConfirmationModal as jest.Mock
const useModalFormChangeHandlerMock = useModalFormChangeHandler as jest.Mock
const handleSubmitMock = jest.fn()

const arrangeTest = () => {
  useModalFormChangeHandlerMock.mockImplementation(
    ({ mutationResultOptions: { onSuccessAction } }) => {
      onSuccessAction()

      return { handleSubmit: handleSubmitMock, loading: false }
    }
  )

  return render(
    <TestWrapper>
      <PassPrescreeningModal talentId='1' hideModal={() => {}} />
    </TestWrapper>
  )
}

describe('PassPrescreeningModal', () => {
  beforeEach(() => {
    ConfirmationModalMock.mockImplementation(() => null)
  })

  it('renders with correct props', async () => {
    arrangeTest()
    expect(ConfirmationModalMock).toHaveBeenCalledWith(
      expect.objectContaining({
        loading: false,
        required: true,
        onClose: expect.any(Function),
        onSubmit: expect.any(Function),
        operationVariables: {
          nodeId: '1',
          nodeType: 'Talent',
          operationName: 'passOnboardingTalentPrescreening'
        },
        label: 'Comment',
        variant: 'positive',
        message: "Do you want to pass the applicant's prescreening?",
        textFieldName: 'comment',
        title: 'Pass Prescreening',
        submitText: 'Pass Prescreening',
        placeholder: 'Please specify a reason'
      }),
      {}
    )
  })
})
