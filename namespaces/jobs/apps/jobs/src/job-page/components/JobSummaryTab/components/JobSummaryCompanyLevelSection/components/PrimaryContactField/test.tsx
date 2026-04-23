import React, { ComponentProps } from 'react'
import { screen, render, fireEvent } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'
import { ContactType } from '@staff-portal/graphql/staff'

import PrimaryContactField from './PrimaryContactField'

type Props = ComponentProps<typeof PrimaryContactField>['contact']

jest.mock('@staff-portal/data-layer-service')

const mockContact = {
  phoneNumber: '+790000000',
  email: 'john@gmail.com'
}

jest.mock('@staff-portal/communication', () => ({
  ...jest.requireActual('@staff-portal/communication'),
  PhoneLink: () => <div>{mockContact.phoneNumber}</div>
}))

const getMock = (node?: Partial<Props>) => ({
  id: 'CONTACT-ID',
  fullName: 'Contact Name',
  contacts: {
    nodes: [
      {
        id: '1',
        primary: true,
        type: ContactType.PHONE,
        value: mockContact.phoneNumber
      },
      {
        id: '2',
        primary: true,
        type: ContactType.EMAIL,
        value: mockContact.email
      }
    ]
  },
  ...node
})
const arrangeTest = (node?: Props) =>
  render(
    <TestWrapper>
      <PrimaryContactField contact={node} />
    </TestWrapper>
  )

describe('PrimaryContactField', () => {
  it('shows contact name', () => {
    const contactName = 'Joseph Rudor'
    const mock = getMock({ fullName: contactName })

    arrangeTest(mock)

    expect(screen.getByText(contactName)).toBeInTheDocument()
  })

  it('shows tooltip with phone number and email on contact', () => {
    const mock = getMock()

    arrangeTest(mock)

    const icon = screen.getByTestId('company-level-primary-contact-tooltip')

    fireEvent.mouseOver(icon)
    const tooltip = screen.getByRole('tooltip')

    expect(tooltip).toHaveTextContent(`Phone Number:${mockContact.phoneNumber}`)
    expect(tooltip).toHaveTextContent(`Email:${mockContact.email}`)
  })
})
