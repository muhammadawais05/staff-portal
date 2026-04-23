import React, { ComponentProps } from 'react'
import { render } from '@testing-library/react'
import { useGetCurrentUser } from '@staff-portal/current-user'
import { TypographyOverflow } from '@toptal/picasso'
import { RolePhoneLink } from '@staff-portal/communication'
import { ContactType } from '@staff-portal/graphql/staff'

import TwilioNumber from './TwilioNumber'

jest.mock('@staff-portal/current-user', () => ({
  useGetCurrentUser: jest.fn()
}))
jest.mock('@toptal/picasso', () => ({
  TypographyOverflow: jest.fn()
}))
jest.mock('@staff-portal/communication', () => ({
  RolePhoneLink: jest.fn()
}))

const renderComponent = (props: ComponentProps<typeof TwilioNumber>) =>
  render(<TwilioNumber {...props} />)

const mockUseGetCurrentUser = useGetCurrentUser as jest.Mock
const MockTypographyOverflow = TypographyOverflow as unknown as jest.Mock
const MockRolePhoneLink = RolePhoneLink as jest.Mock

describe('TwilioNumber', () => {
  beforeEach(() => {
    MockTypographyOverflow.mockReturnValueOnce(null)
    MockRolePhoneLink.mockReturnValueOnce(null)
  })

  const user = {
    id: {}
  }

  describe('when either user or twilio is not provided', () => {
    it.each([
      {
        user: undefined,
        twilioNumber: 'twilioNumber'
      },
      {
        user,
        twilioNumber: undefined
      },
      {
        user: undefined,
        twilioNumber: undefined
      }
    ])('does not render a component', ({ user: currentUser, twilioNumber }) => {
      mockUseGetCurrentUser.mockReturnValueOnce(currentUser)

      const { container } = renderComponent({
        staffId: 'staffId',
        twilioNumber
      })

      expect(container).toBeEmptyDOMElement()
      expect(MockTypographyOverflow).toHaveBeenCalledTimes(0)
      expect(MockRolePhoneLink).toHaveBeenCalledTimes(0)
    })
  })

  describe('when twilio is not provided', () => {
    it('does not render a component', () => {
      mockUseGetCurrentUser.mockReturnValueOnce(undefined)

      const { container } = renderComponent({
        staffId: 'staffId'
      })

      expect(container).toBeEmptyDOMElement()
      expect(MockTypographyOverflow).toHaveBeenCalledTimes(0)
      expect(MockRolePhoneLink).toHaveBeenCalledTimes(0)
    })
  })

  describe('when user id is equal to staff id', () => {
    it('renders twilio number', () => {
      const staffId = {} as string
      const twilioNumber = {} as string

      mockUseGetCurrentUser.mockReturnValueOnce({
        id: staffId
      })

      renderComponent({ staffId, twilioNumber })

      expect(MockTypographyOverflow).toHaveBeenCalledTimes(1)
      expect(MockTypographyOverflow).toHaveBeenCalledWith(
        {
          children: twilioNumber
        },
        {}
      )
      expect(MockRolePhoneLink).toHaveBeenCalledTimes(0)
    })
  })

  describe('when user id is not equal to staff id', () => {
    it('renders role phone link', () => {
      const staffId = {} as string
      const twilioNumber = {} as string

      mockUseGetCurrentUser.mockReturnValueOnce(user)

      renderComponent({ staffId, twilioNumber })

      expect(MockRolePhoneLink).toHaveBeenCalledTimes(1)
      expect(MockRolePhoneLink).toHaveBeenCalledWith(
        {
          roleId: staffId,
          destination: twilioNumber,
          contactType: ContactType.PHONE
        },
        {}
      )
      expect(MockTypographyOverflow).toHaveBeenCalledTimes(0)
    })
  })
})
