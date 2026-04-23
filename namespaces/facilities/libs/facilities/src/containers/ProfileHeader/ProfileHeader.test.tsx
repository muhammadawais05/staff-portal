import React, { ComponentProps } from 'react'
import { render } from '@toptal/picasso/test-utils'
import { TestWrapper } from '@staff-portal/test-utils'
import { RoleFlags } from '@staff-portal/role-flags'

import ProfileHeader from './ProfileHeader'

jest.mock('@staff-portal/role-flags', () => ({
  RoleFlags: jest.fn()
}))

const mockedRoleFlags = RoleFlags as jest.Mock
const Test = jest.fn()

const renderComponent = (props: ComponentProps<typeof ProfileHeader>) =>
  render(
    <TestWrapper>
      <ProfileHeader {...props}>
        <Test />
      </ProfileHeader>
    </TestWrapper>
  )

describe('AccountOverview', () => {
  it('renders company overview details', () => {
    mockedRoleFlags.mockReturnValueOnce(null)
    Test.mockReturnValueOnce(null)

    const id = 'id'

    renderComponent({
      id
    })

    expect(mockedRoleFlags).toHaveBeenCalledTimes(1)
    expect(mockedRoleFlags).toHaveBeenCalledWith(
      {
        roleId: id,
        showTooltipActions: true
      },
      {}
    )
    expect(Test).toHaveBeenCalledTimes(1)
  })
})
