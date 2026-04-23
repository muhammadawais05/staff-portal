import React, { PropsWithChildren } from 'react'
import { render } from '@testing-library/react'
import { Modal, ModalForm } from '@staff-portal/modals-service'
import { Button } from '@toptal/picasso'
import { Form } from '@toptal/picasso-forms'

import { LikelihoodToCloseForm, TITLE } from './LikelihoodToCloseForm'
import { SELECTABLE_LIKELIHOODS } from '../../config'

jest.mock('@staff-portal/mutation-result-handlers', () => ({
  useModalFormChangeHandler: () => ({
    handleSubmit: () => null,
    loading: false
  })
}))

jest.mock('@staff-portal/modals-service', () => ({
  ...jest.requireActual('@staff-portal/modals-service'),
  Modal: jest.fn(),
  ModalForm: jest.fn()
}))

jest.mock('@toptal/picasso', () => ({
  ...jest.requireActual('@toptal/picasso'),
  Button: jest.fn()
}))

jest.mock('@toptal/picasso-forms', () => ({
  ...jest.requireActual('@toptal/picasso-forms'),
  Form: {
    Input: jest.fn(),
    Select: jest.fn(),
    SubmitButton: jest.fn()
  }
}))

const ButtonMock = Button as unknown as jest.Mock
const FormMock = Form as unknown as jest.Mock & {
  SubmitButton: jest.Mock
  Input: jest.Mock
  Select: jest.Mock
}

const ModalMock = Modal as unknown as jest.Mock & {
  Content: jest.Mock
  Actions: jest.Mock
}
const ModalFormMock = ModalForm as jest.Mock

const componentImplementation = ({ children }: PropsWithChildren<unknown>) => (
  <>{children}</>
)

const props = {
  clientId: '1',
  likelihoodToClose: 0,
  hideModal: () => null
}

describe('LikelihoodToCloseForm', () => {
  beforeEach(() => {
    ModalMock.mockImplementation(componentImplementation)
    ModalFormMock.mockImplementation(componentImplementation)
    ModalMock.Content = jest.fn(componentImplementation)
    ModalMock.Actions = jest.fn(componentImplementation)
    FormMock.Input = jest.fn(componentImplementation)
    FormMock.Select = jest.fn(componentImplementation)
    FormMock.SubmitButton = jest.fn(componentImplementation)

    ButtonMock.mockImplementation(() => null)
  })

  it('renders fields and submit button', () => {
    render(<LikelihoodToCloseForm {...props} />)

    expect(ModalFormMock).toHaveBeenCalledTimes(1)
    expect(ModalFormMock).toHaveBeenCalledWith(
      expect.objectContaining({
        title: TITLE,
        initialValues: {
          clientId: props.clientId,
          likelihoodToClose: props.likelihoodToClose
        }
      }),
      {}
    )

    expect(FormMock.Select).toHaveBeenCalledTimes(1)
    expect(FormMock.Select).toHaveBeenCalledWith(
      expect.objectContaining({
        enableReset: true,
        label: 'Likelihood to close',
        name: 'likelihoodToClose',
        width: 'full',
        options: SELECTABLE_LIKELIHOODS
      }),
      {}
    )

    expect(FormMock.Input).toHaveBeenCalledTimes(1)
    expect(FormMock.Input).toHaveBeenCalledWith(
      expect.objectContaining({
        label: 'Comment',
        name: 'comment',
        width: 'full',
        multiline: true,
        rows: 4
      }),
      {}
    )

    expect(ButtonMock).toHaveBeenCalledTimes(1)
    expect(ButtonMock).toHaveBeenCalledWith(
      expect.objectContaining({
        disabled: false,
        variant: 'secondary'
      }),
      {}
    )

    expect(FormMock.SubmitButton).toHaveBeenCalledTimes(1)
    expect(FormMock.SubmitButton).toHaveBeenCalledWith(
      expect.objectContaining({
        variant: 'positive'
      }),
      {}
    )
  })
})
