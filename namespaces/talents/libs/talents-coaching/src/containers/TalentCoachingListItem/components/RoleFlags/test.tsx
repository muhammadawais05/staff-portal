import React, { ComponentProps } from 'react'
import { render, screen } from '@testing-library/react'
import { TestWrapperWithMocks } from '@staff-portal/test-utils'
import { createRoleFlagMock } from '@staff-portal/role-flags/src/mocks'

import RoleFlags from './RoleFlags'

const defaultProps = {
  flags: [createRoleFlagMock(), createRoleFlagMock()],
  visibleLength: 1
}

const arrangeTest = (props: ComponentProps<typeof RoleFlags>) =>
  render(
    <TestWrapperWithMocks>
      <RoleFlags {...props} />
    </TestWrapperWithMocks>
  )

describe('RoleFlags', () => {
  it('shows tags', () => {
    arrangeTest(defaultProps)

    expect(screen.getByText('Flag title')).toBeInTheDocument()
    expect(screen.getByText('+1')).toBeInTheDocument()
  })

  it('when shows all flags', () => {
    arrangeTest({ ...defaultProps, visibleLength: 2 })

    expect(screen.getAllByText('Flag title')).toHaveLength(2)
  })
})
