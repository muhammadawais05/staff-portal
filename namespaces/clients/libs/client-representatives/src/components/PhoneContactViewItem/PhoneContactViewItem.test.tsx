import React, { ComponentProps } from 'react'
import { render, screen } from '@testing-library/react'
import { PhoneCategory } from '@staff-portal/graphql/staff'
import { TestWrapper } from '@staff-portal/test-utils'
import { PhoneLink } from '@staff-portal/communication'

import PhoneContactViewItem from './PhoneContactViewItem'
import { PHONE_CATEGORY_TITLES } from '../../constants'

jest.mock('@staff-portal/communication', () => ({
  ...jest.requireActual('@staff-portal/communication'),
  PhoneLink: jest.fn()
}))

const arrangeTest = (props: ComponentProps<typeof PhoneContactViewItem>) =>
  render(
    <TestWrapper>
      <PhoneContactViewItem {...props} />
    </TestWrapper>
  )

const MockPhoneLink = PhoneLink as jest.Mock

describe('PhoneContactViewItem', () => {
  beforeEach(() => {
    MockPhoneLink.mockReturnValueOnce(null)
  })

  describe('when all the props passed', () => {
    it('renders component with passed props', () => {
      const value = 'value'
      const phoneCategory = PhoneCategory.HOME
      const companyRepresentativeId = 'companyRepresentativeId'
      const id = 'id'

      arrangeTest({
        id,
        value,
        phoneCategory,
        companyRepresentativeId
      })

      expect(
        screen.getByTestId('PhoneContactViewItem-label')
      ).toHaveTextContent(PHONE_CATEGORY_TITLES[phoneCategory])
      expect(MockPhoneLink).toHaveBeenCalledTimes(1)
      expect(MockPhoneLink).toHaveBeenCalledWith(
        {
          phoneContactId: id,
          renderPhoneContact: expect.any(Function),
          roleId: companyRepresentativeId
        },
        {}
      )
      expect(screen.queryByTestId('PhoneContactViewItem-no-value')).toBeNull()
    })
  })

  describe('when props not passed', () => {
    it('renders component with default props', () => {
      const companyRepresentativeId = 'companyRepresentativeId'
      const id = 'id'

      arrangeTest({
        id,
        companyRepresentativeId
      })

      expect(
        screen.getByTestId('PhoneContactViewItem-label')
      ).toHaveTextContent(PHONE_CATEGORY_TITLES[PhoneCategory.OTHER])
      expect(MockPhoneLink).toHaveBeenCalledTimes(0)
      expect(
        screen.getByTestId('PhoneContactViewItem-no-value')
      ).toBeInTheDocument()
    })
  })
})
