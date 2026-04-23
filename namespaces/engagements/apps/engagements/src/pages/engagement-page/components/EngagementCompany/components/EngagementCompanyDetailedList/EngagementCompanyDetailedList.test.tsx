import React from 'react'
import { render, screen } from '@toptal/picasso/test-utils'
import { ContactType } from '@staff-portal/graphql/staff'
import { TestWrapperWithMocks } from '@staff-portal/test-utils'

import EngagementCompanyDetailedList from './EngagementCompanyDetailedList'
import { EngagementClientFragment } from '../../data'

jest.mock('@staff-portal/communication', () => ({
  ...jest.requireActual('@staff-portal/communication'),
  SkypeLink: () => <span />,
  PhoneLink: () => <span />
}))

const renderComponent = (contact?: EngagementClientFragment['contact']) =>
  render(
    <TestWrapperWithMocks>
      <EngagementCompanyDetailedList
        id='123'
        email='test@jest.test'
        timeZone={{ name: 'CET', value: '+9' }}
        billingPhone='888888888'
        contact={contact}
      />
    </TestWrapperWithMocks>
  )

const contactMock: EngagementClientFragment['contact'] = {
  id: '1',
  contacts: {
    nodes: [
      {
        id: '1',
        type: ContactType.PHONE,
        value: '17991349112'
      }
    ]
  }
}

describe('Engagement Company Detailed List', () => {
  it('shows the static fields', () => {
    renderComponent()

    expect(screen.getByText('test@jest.test')).toBeInTheDocument()
    expect(screen.getByText('Skype')).toBeInTheDocument()
    expect(screen.getByText('CET')).toBeInTheDocument()
  })

  describe('Phone field', () => {
    it('shows the company contact number if it exists', () => {
      renderComponent(contactMock)

      expect(
        screen.queryByTestId('contact-phone-number-link')
      ).toBeInTheDocument()
      expect(
        screen.queryByTestId('billing-phone-number-link')
      ).not.toBeInTheDocument()
    })

    it('shows the billing phone number if the contact number does not exist', () => {
      renderComponent()

      expect(
        screen.queryByTestId('billing-phone-number-link')
      ).toBeInTheDocument()
      expect(
        screen.queryByTestId('contact-phone-number-link')
      ).not.toBeInTheDocument()
    })
  })
})
