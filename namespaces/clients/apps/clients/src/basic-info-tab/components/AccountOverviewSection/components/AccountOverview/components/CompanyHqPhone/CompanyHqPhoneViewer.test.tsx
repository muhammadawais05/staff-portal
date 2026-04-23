import React, { ComponentProps } from 'react'
import { render, screen } from '@testing-library/react'
import { ClientPhoneLink } from '@staff-portal/communication'
import { ContactType } from '@staff-portal/graphql/staff'
import { NO_VALUE } from '@staff-portal/config'

import CompanyHqPhoneViewer from './CompanyHqPhoneViewer'

jest.mock('@staff-portal/communication', () => ({
  ...jest.requireActual('@staff-portal/communication'),
  ClientPhoneLink: jest.fn()
}))

const ClientPhoneLinkMock = ClientPhoneLink as jest.Mock

const renderComponent = (props: ComponentProps<typeof CompanyHqPhoneViewer>) =>
  render(<CompanyHqPhoneViewer {...props} />)

describe('CompanyHqPhoneViewer', () => {
  beforeEach(() => {
    ClientPhoneLinkMock.mockReturnValue(null)
  })

  it('renders ClientPhoneLink', () => {
    const clientId = 'test-id'
    const value = 'phone'

    renderComponent({ clientId, value })

    expect(ClientPhoneLinkMock).toHaveBeenCalledTimes(1)
    expect(ClientPhoneLinkMock).toHaveBeenCalledWith(
      {
        clientId,
        destination: value,
        contactType: ContactType.PHONE
      },
      {}
    )
  })

  describe('when no data', () => {
    it.each(['', null, undefined])('renders dash for %p', value => {
      const clientId = 'test-id'

      renderComponent({ clientId, value })

      expect(ClientPhoneLinkMock).toHaveBeenCalledTimes(0)
      expect(screen.getByText(NO_VALUE)).toBeInTheDocument()
    })
  })
})
