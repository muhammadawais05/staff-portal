import React, { PropsWithChildren } from 'react'
import { render } from '@testing-library/react'
import { Modal, ModalForm } from '@staff-portal/modals-service'
import { Button } from '@toptal/picasso'
import { Form } from '@toptal/picasso-forms'

import { UnlinkOpportunityForm } from './UnlinkOpportunityForm'

jest.mock('../../data/unlink-opportunity-company-representative', () => ({
  useUnlinkOpportunityCompanyRepresentative: () => ({
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
    SubmitButton: jest.fn()
  }
}))

const ButtonMock = Button as unknown as jest.Mock
const FormMock = Form as unknown as jest.Mock & {
  SubmitButton: jest.Mock
  Input: jest.Mock
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
  opportunityId: 'opId1',
  representativeId: 'repId1',
  hideModal: () => null
}

describe('UnlinkOpportunityForm', () => {
  beforeEach(() => {
    ModalMock.mockImplementation(componentImplementation)
    ModalFormMock.mockImplementation(componentImplementation)
    ModalMock.Content = jest.fn(componentImplementation)
    ModalMock.Actions = jest.fn(componentImplementation)
    FormMock.Input = jest.fn(componentImplementation)
    FormMock.SubmitButton = jest.fn(componentImplementation)

    ButtonMock.mockImplementation(() => null)
  })

  it('renders fields and submit button', () => {
    render(<UnlinkOpportunityForm {...props} />)

    expect(ModalFormMock).toHaveBeenCalledTimes(1)
    expect(ModalFormMock).toHaveBeenCalledWith(
      expect.objectContaining({
        initialValues: {
          opportunityId: props.opportunityId,
          companyRepresentativeId: props.representativeId
        }
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
