import React, { ComponentProps } from 'react'
import { render } from '@testing-library/react'
import { DeprecatedActionsDropdown } from '@staff-portal/facilities'

import StaffProfileMoreActionsDropdown from './StaffProfileMoreActionsDropdown'
import { useStaffProfileActionsList } from './services'

jest.mock('./services', () => ({
  useStaffProfileActionsList: jest.fn()
}))
jest.mock('@staff-portal/facilities', () => ({
  DeprecatedActionsDropdown: jest.fn()
}))

type Props = ComponentProps<typeof StaffProfileMoreActionsDropdown>

const renderComponent = (props: Props) =>
  render(<StaffProfileMoreActionsDropdown {...props} />)

const MockActionsDropdown = DeprecatedActionsDropdown as jest.Mock
const mockUseStaffProfileActionsList = useStaffProfileActionsList as jest.Mock

describe('StaffProfileStatusMessages', () => {
  describe('when statusMessages provided', () => {
    it('renders statuses', () => {
      const loading = {}
      const setLoading = {}
      const actions = {}
      const staffProfile = {} as Props['staffProfile']

      MockActionsDropdown.mockReturnValueOnce(null)
      mockUseStaffProfileActionsList.mockReturnValueOnce({
        loading,
        setLoading,
        actions
      })

      renderComponent({ staffProfile })

      expect(mockUseStaffProfileActionsList).toHaveBeenCalledTimes(1)
      expect(mockUseStaffProfileActionsList).toHaveBeenCalledWith({
        staffProfile
      })
      expect(MockActionsDropdown).toHaveBeenCalledTimes(1)
      expect(MockActionsDropdown).toHaveBeenCalledWith(
        expect.objectContaining({
          loading,
          actions,
          onStart: expect.any(Function),
          onSettled: expect.any(Function)
        }),
        {}
      )
    })
  })
})
