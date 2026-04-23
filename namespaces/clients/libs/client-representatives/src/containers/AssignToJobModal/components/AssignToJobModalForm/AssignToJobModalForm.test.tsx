import React from 'react'
import { render } from '@testing-library/react'
import { Form } from '@toptal/picasso-forms'
import { useModalFormChangeHandler } from '@staff-portal/mutation-result-handlers'
import { Button } from '@toptal/picasso'
import { TestWrapper } from '@staff-portal/test-utils'
import { ModalForm } from '@staff-portal/modals-service'
import { Option } from '@toptal/picasso/Select'

import AssignToJobModalForm from './AssignToJobModalForm'

jest.mock('@staff-portal/mutation-result-handlers', () => ({
  ...jest.requireActual('@staff-portal/mutation-result-handlers'),
  useModalFormChangeHandler: jest.fn()
}))
jest.mock('@toptal/picasso', () => ({
  ...jest.requireActual('@toptal/picasso'),
  Button: jest.fn()
}))
jest.mock('@staff-portal/modals-service', () => ({
  ...jest.requireActual('@staff-portal/modals-service'),
  ModalForm: jest.fn()
}))
jest.mock('@toptal/picasso-forms', () => ({
  ...jest.requireActual('@toptal/picasso-forms'),
  Form: {
    ...jest.requireActual('@toptal/picasso-forms').Form,
    Select: jest.fn(),
    SubmitButton: jest.fn()
  }
}))

const ButtonMock = Button as unknown as jest.Mock
const ModalFormMock = ModalForm as unknown as jest.Mock
const FormSubmitButtonMock = Form.SubmitButton as unknown as jest.Mock
const FormSelectMock = Form.Select as unknown as jest.Mock
const useModalFormChangeHandlerMock = useModalFormChangeHandler as jest.Mock

const LOADING = Symbol()
const HANDLE_SUBMIT = Symbol()
const AVAILABLE_JOBS = Symbol() as unknown as Option[]
const COMPANY_REPRESENTATIVE_ID = Symbol() as unknown as string
const HIDE_MODAL = Symbol() as unknown as () => void

describe('AssignToJobModalForm', () => {
  it('renders form with select and action buttons', () => {
    ModalFormMock.mockImplementationOnce(({ children }) => <>{children}</>)
    FormSelectMock.mockReturnValueOnce(null)
    FormSubmitButtonMock.mockReturnValueOnce(null)
    ButtonMock.mockReturnValueOnce(null)
    useModalFormChangeHandlerMock.mockReturnValueOnce({
      handleSubmit: HANDLE_SUBMIT,
      loading: LOADING
    })

    render(
      <TestWrapper>
        <AssignToJobModalForm
          hideModal={HIDE_MODAL}
          companyRepresentativeId={COMPANY_REPRESENTATIVE_ID}
          availableJobs={AVAILABLE_JOBS}
        />
      </TestWrapper>
    )

    expect(useModalFormChangeHandlerMock).toHaveBeenCalledWith(
      expect.objectContaining({
        mutationResultOptions: {
          onSuccessAction: HIDE_MODAL,
          successNotificationMessage:
            'The contact has been assigned to the job.'
        },
        errorNotificationMessage: 'Unable to assign the contact to the job.'
      })
    )
    expect(ModalFormMock).toHaveBeenCalledWith(
      expect.objectContaining({
        initialValues: { companyRepresentativeId: COMPANY_REPRESENTATIVE_ID },
        onSubmit: HANDLE_SUBMIT,
        title: 'Assign this Contact to Job'
      }),
      {}
    )
    expect(FormSelectMock).toHaveBeenCalledWith(
      expect.objectContaining({
        name: 'jobId',
        placeholder: 'Not Selected',
        label: 'Job',
        options: AVAILABLE_JOBS,
        required: true
      }),
      {}
    )
    expect(ButtonMock).toHaveBeenCalledWith(
      expect.objectContaining({
        onClick: HIDE_MODAL,
        children: 'Cancel',
        disabled: LOADING
      }),
      {}
    )
    expect(FormSubmitButtonMock).toHaveBeenCalledWith(
      expect.objectContaining({
        children: 'Assign'
      }),
      {}
    )
  })
})
