import React, { PropsWithChildren } from 'react'
import { render } from '@testing-library/react'
import { CheckClientComplianceInput } from '@staff-portal/graphql/staff'
import { Button, Typography, Container } from '@toptal/picasso'
import { Form } from '@toptal/picasso-forms'
import { Modal, ModalForm } from '@staff-portal/modals-service'

import CheckClientComplianceModalContent from './CheckClientComplianceModalContent'

jest.mock('@staff-portal/modals-service', () => ({
  ...jest.requireActual('@staff-portal/modals-service'),
  Modal: jest.fn(),
  ModalForm: jest.fn()
}))

jest.mock('@toptal/picasso', () => ({
  ...jest.requireActual('@toptal/picasso'),
  Button: jest.fn(),
  Typography: jest.fn(),
  Container: jest.fn()
}))

jest.mock('@toptal/picasso-forms', () => ({
  ...jest.requireActual('@toptal/picasso-forms'),
  Form: {
    Input: jest.fn(),
    Select: jest.fn()
  }
}))

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
const ButtonMock = Button as unknown as jest.Mock
const ContainerMock = Container as unknown as jest.Mock
const TypographyMock = Typography as unknown as jest.Mock

const componentImplementation = ({ children }: PropsWithChildren<unknown>) => (
  <div>{children}</div>
)

const CLIENT_ID = 'client-id'
const COUNTRY_ID = 'country-id-1'
const TIMEZONE_NAME = 'timezone-name-1'
const CONTACT_NAME = 'Contact Name'
const COUNTRY_NAME = 'Greenland'
const COUNTRIES = [
  {
    value: COUNTRY_ID,
    text: COUNTRY_NAME
  },
  {
    value: 'country-id-2',
    text: 'Poland'
  }
]
const TIMEZONES = [
  {
    text: TIMEZONE_NAME,
    value: TIMEZONE_NAME
  },
  {
    text: 'timezone-name-2',
    value: 'timezone-name-2'
  }
]

const INITIAL_VALUES = {
  clientId: CLIENT_ID,
  contactName: CONTACT_NAME,
  countryId: COUNTRY_ID,
  timeZoneName: TIMEZONE_NAME
}

const hintText =
  'Please make sure the contact name is a person’s actual name, for compliance reasons. What’s listed there currently is the company name.'

const hideModal = () => null
const handleSubmit = (input: CheckClientComplianceInput) =>
  Promise.resolve(input)

const renderComponent = (showContactNameHint = false) => {
  return render(
    <CheckClientComplianceModalContent
      title='Check Compliance'
      handleSubmit={handleSubmit}
      initialValues={INITIAL_VALUES}
      showContactNameHint={showContactNameHint}
      countryOptions={COUNTRIES}
      timezoneOptions={TIMEZONES}
      hideModal={hideModal}
      submitting={false}
    />
  )
}

describe('CheckClientComplianceModalContent', () => {
  beforeEach(() => {
    ModalMock.mockImplementation(componentImplementation)
    ModalFormMock.mockImplementation(componentImplementation)
    ModalMock.Content = jest.fn(componentImplementation)
    ModalMock.Actions = jest.fn(componentImplementation)
    FormMock.Input = jest.fn(componentImplementation)
    FormMock.Select = jest.fn(componentImplementation)
    FormMock.SubmitButton = jest.fn(componentImplementation)

    ButtonMock.mockImplementation(componentImplementation)
    ContainerMock.mockImplementation(componentImplementation)
    TypographyMock.mockImplementation(componentImplementation)
  })

  it('renders the component', () => {
    renderComponent()

    expect(ModalFormMock).toHaveBeenCalledTimes(1)
    expect(ModalFormMock).toHaveBeenCalledWith(
      expect.objectContaining({
        title: 'Check Compliance',
        initialValues: INITIAL_VALUES
      }),
      {}
    )

    expect(FormMock.Select).toHaveBeenCalledTimes(2)
    expect(FormMock.Select).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        'data-testid': 'check-client-compliance-modal-country',
        label: 'Country',
        name: 'countryId',
        options: [
          { text: 'Greenland', value: 'country-id-1' },
          { text: 'Poland', value: 'country-id-2' }
        ],
        required: true,
        width: 'full'
      }),
      {}
    )
    expect(FormMock.Select).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({
        'data-testid': 'check-client-compliance-modal-timezone',
        label: 'Time Zone',
        name: 'timeZoneName',
        options: TIMEZONES,
        required: true,
        width: 'full'
      }),
      {}
    )

    expect(FormMock.Input).toHaveBeenCalledTimes(1)
    expect(FormMock.Input).toHaveBeenCalledWith(
      expect.objectContaining({
        hint: undefined,
        label: 'Contact Name',
        name: 'contactName'
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

  it('renders the contact name hint', () => {
    renderComponent(true)

    expect(FormMock.Input).toHaveBeenCalledTimes(1)
    expect(FormMock.Input).toHaveBeenCalledWith(
      expect.objectContaining({
        label: 'Contact Name',
        name: 'contactName',
        hint: hintText
      }),
      {}
    )
  })
})
