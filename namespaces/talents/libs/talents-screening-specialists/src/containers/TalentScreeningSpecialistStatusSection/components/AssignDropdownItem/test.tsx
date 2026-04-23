import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { waitFor } from '@toptal/picasso/test-utils'
import { Dropdown, Menu } from '@toptal/picasso'
import { TestWrapper } from '@staff-portal/test-utils'

import { ScreeningSpecialistFragment } from '../../../../data/screening-specialist-fragment.staff.gql.types'
import AssignDropdownItem from './AssignDropdownItem'
import { createStaffMock } from '../../data/mocks'

const specialistNameMock = 'TEST_NAME'

const specialistMock = createStaffMock({
  id: '123',
  fullName: specialistNameMock
})

const arrangeTest = ({
  specialist,
  onClick
}: {
  specialist: ScreeningSpecialistFragment
  onClick: () => void
}) =>
  render(
    <TestWrapper>
      <Dropdown
        content={
          <Menu>
            <AssignDropdownItem title={specialist.fullName} onClick={onClick} />
          </Menu>
        }
      >
        <Dropdown.Arrow data-testid='open-assign-dropdown' />
      </Dropdown>
    </TestWrapper>
  )

describe('AssignDropdownItem', () => {
  it('handles onClick event', async () => {
    const handleClick = jest.fn()

    arrangeTest({
      specialist: specialistMock,
      onClick: handleClick
    })

    fireEvent.click(screen.getByTestId('open-assign-dropdown'))
    fireEvent.click(screen.getByText(specialistNameMock))

    expect(handleClick).toHaveBeenCalledTimes(1)
    expect(handleClick).toHaveBeenCalledWith()
    await waitFor(() => {
      expect(screen.queryByText(specialistNameMock)).not.toBeInTheDocument()
    })
  })
})
