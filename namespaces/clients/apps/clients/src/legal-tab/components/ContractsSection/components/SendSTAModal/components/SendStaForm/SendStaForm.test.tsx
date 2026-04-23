import React from 'react'
import { render } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'
import { Button } from '@toptal/picasso'
import { Form } from '@toptal/picasso-forms'
import { ModalForm } from '@staff-portal/modals-service'
import { useModalFormChangeHandler } from '@staff-portal/mutation-result-handlers'

import { SendStaDocument } from '../../data/send-sta/send-sta.staff.gql.types'
import { DefaultContactFragment } from '../../../../data/default-contact-fragment/default-contact-fragment.staff.gql.types'
import SendStaForm from './SendStaForm'
import CustomSignerFields from '../CustomSignerFields/CustomSignerFields'

jest.mock('@staff-portal/modals-service', () => ({
  ...jest.requireActual('@staff-portal/modals-service'),
  ModalForm: jest.fn()
}))

jest.mock('@staff-portal/mutation-result-handlers', () => ({
  ...jest.requireActual('@staff-portal/mutation-result-handlers'),
  useModalFormChangeHandler: jest.fn()
}))

jest.mock('../CustomSignerFields/CustomSignerFields', () => ({
  __esModule: true,
  default: jest.fn()
}))

jest.mock('@toptal/picasso-forms', () => ({
  ...jest.requireActual('@toptal/picasso-forms'),
  Form: {
    ConfigProvider: jest.requireActual('@toptal/picasso-forms').Form
      .ConfigProvider,
    RadioGroup: jest.fn(),
    Radio: jest.fn(),
    SubmitButton: jest.fn()
  }
}))

jest.mock('@toptal/picasso', () => ({
  ...jest.requireActual('@toptal/picasso'),
  Button: jest.fn()
}))

const useModalFormChangeHandlerMock = useModalFormChangeHandler as jest.Mock
const CustomSignerFieldsMock = CustomSignerFields as jest.Mock
const ButtonMock = Button as unknown as jest.Mock
const ModalFormMock = ModalForm as jest.Mock
const RadioGroupMock = Form.RadioGroup as unknown as jest.Mock
const RadioMock = Form.Radio as jest.Mock
const SubmitButtonMock = Form.SubmitButton as unknown as jest.Mock

describe('SendStaForm', () => {
  it.each([
    [
      'when default contact fullName and email equal to signer name and email',
      {
        signerFullName: 'foo-name',
        signerEmail: 'foo-email',
        defaultContact: {
          fullName: 'foo-name',
          email: 'foo-email'
        },

        expectedInitialValues: {
          customSigner: 'false',
          signerEmail: 'foo-email',
          signerFullName: 'foo-name'
        }
      }
    ],
    [
      'when default contact fullName and email are different from signer name and email',
      {
        signerFullName: 'foo-name',
        signerEmail: 'foo-email',
        defaultContact: {
          fullName: 'bar-name',
          email: 'bar-email'
        },

        expectedInitialValues: {
          customSigner: 'true',
          signerEmail: 'foo-email',
          signerFullName: 'foo-name'
        }
      }
    ]
  ])(
    'invokes hooks correctly and renders components with correct props passed %s',
    (
      _description,
      { signerFullName, signerEmail, defaultContact, expectedInitialValues }
    ) => {
      const formProps = {
        clientId: {} as string,
        hideModal: () => {},
        defaultContact: defaultContact as DefaultContactFragment,
        isSubsidiarySelected: {} as boolean,
        signerFullName,
        signerEmail
      }

      const changeHandlerReturnValue = {
        handleSubmit: {},
        loading: {}
      }

      useModalFormChangeHandlerMock.mockReturnValue(changeHandlerReturnValue)
      ModalFormMock.mockImplementation(({ children }) => <>{children}</>)
      RadioGroupMock.mockImplementation(({ children }) => <>{children}</>)
      RadioMock.mockReturnValue(null)
      CustomSignerFieldsMock.mockReturnValue(null)
      ButtonMock.mockReturnValue(null)
      SubmitButtonMock.mockReturnValue(null)

      // Act

      render(
        <TestWrapper>
          <SendStaForm {...formProps} />
        </TestWrapper>
      )

      // Assert

      expect(useModalFormChangeHandlerMock).toHaveBeenCalledTimes(1)
      expect(useModalFormChangeHandlerMock).toHaveBeenCalledWith({
        mutationDocument: SendStaDocument,
        mutationResultOptions: {
          onSuccessAction: formProps.hideModal,
          successNotificationMessage: 'STA has been sent.'
        },
        errorNotificationMessage: 'Unable to send the STA'
      })

      expect(ModalFormMock).toHaveBeenCalledTimes(1)
      expect(ModalFormMock).toHaveBeenCalledWith(
        expect.objectContaining({
          title: 'Send Sourced Talent Agreement',
          onSubmit: expect.any(Function),
          initialValues: expectedInitialValues
        }),
        {}
      )

      expect(RadioGroupMock).toHaveBeenCalledTimes(1)
      expect(RadioGroupMock).toHaveBeenCalledWith(
        expect.objectContaining({
          name: 'customSigner',
          label: 'Legal Contact:'
        }),
        {}
      )

      expect(RadioMock).toHaveBeenCalledTimes(2)
      expect(RadioMock).toHaveBeenNthCalledWith(
        1,
        {
          label: `Account Contact (${formProps.defaultContact.fullName} at ${formProps.defaultContact.email})`,
          value: 'false',
          titleCase: false
        },
        {}
      )
      expect(RadioMock).toHaveBeenNthCalledWith(
        2,
        {
          label: 'Custom legal contact',
          value: 'true'
        },
        {}
      )

      expect(CustomSignerFieldsMock).toHaveBeenCalledTimes(1)

      expect(ButtonMock).toHaveBeenCalledTimes(1)
      expect(ButtonMock).toHaveBeenCalledWith(
        {
          variant: 'secondary',
          disabled: changeHandlerReturnValue.loading,
          onClick: formProps.hideModal,
          children: 'Cancel'
        },
        {}
      )

      expect(SubmitButtonMock).toHaveBeenCalledTimes(1)
      expect(SubmitButtonMock).toHaveBeenCalledWith(
        {
          variant: 'positive',
          children: 'Send STA'
        },
        {}
      )
    }
  )
})
