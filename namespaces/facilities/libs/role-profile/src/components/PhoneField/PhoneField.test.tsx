import React from 'react'
import { render } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'
import { PhoneLink } from '@staff-portal/communication'

import PhoneField, { Props } from './PhoneField'

jest.mock('@staff-portal/communication', () => ({
  PhoneLink: jest.fn()
}))

const arrangeTest = (props: Props) =>
  render(
    <TestWrapper>
      <PhoneField {...props} />
    </TestWrapper>
  )

describe('PhoneField', () => {
  beforeEach(() => {
    const PhoneLinkMock = PhoneLink as jest.Mock

    PhoneLinkMock.mockReturnValue(null)
  })

  it('does not render PhoneLink when there is no primary contact', () => {
    arrangeTest({
      roleId: '',
      phoneContacts: { nodes: [{ id: '', value: '', primary: false }] }
    })

    expect(PhoneLink).toHaveBeenCalledTimes(0)
  })

  it('renders PhoneLink', () => {
    arrangeTest({
      roleId: 'roleId',
      phoneContacts: { nodes: [{ id: 'phoneId', value: '', primary: true }] }
    })

    expect(PhoneLink).toHaveBeenCalledWith(
      expect.objectContaining({ roleId: 'roleId', phoneContactId: 'phoneId' }),
      {}
    )
  })
})
