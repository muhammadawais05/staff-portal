import React, { ComponentProps } from 'react'
import { render } from '@testing-library/react'
import { ActionLoader } from '@staff-portal/ui'
import { HistoryButton } from '@staff-portal/chronicles'

import StaffProfileActions from './StaffProfileActions'
import { GetStaffProfileQuery } from '../../../data/get-staff-profile.staff.gql.types'
import { StaffProfileMoreActionsDropdown } from '../../../components'

jest.mock('@staff-portal/ui', () => ({
  ActionLoader: jest.fn()
}))
jest.mock('@staff-portal/chronicles', () => ({
  HistoryButton: jest.fn()
}))
jest.mock('../../../components', () => ({
  StaffProfileMoreActionsDropdown: jest.fn()
}))

const renderComponent = (props: ComponentProps<typeof StaffProfileActions>) =>
  render(<StaffProfileActions {...props} />)

const MockActionLoader = ActionLoader as jest.Mock
const MockHistoryButton = HistoryButton as jest.Mock
const MockStaffProfileMoreActionsDropdown =
  StaffProfileMoreActionsDropdown as jest.Mock

describe('StaffProfileActions', () => {
  beforeEach(() => {
    MockActionLoader.mockReturnValueOnce(null).mockReturnValueOnce(null)
    MockHistoryButton.mockReturnValueOnce(null)
    MockStaffProfileMoreActionsDropdown.mockReturnValueOnce(null)
  })

  describe('when loading is true', () => {
    it('renders ActionLoaders', () => {
      const loading = true

      renderComponent({ loading, staffProfile: undefined })

      expect(MockActionLoader).toHaveBeenCalledTimes(2)
      expect(MockActionLoader).toHaveBeenNthCalledWith(1, {}, {})
      expect(MockActionLoader).toHaveBeenNthCalledWith(
        2,
        { circular: true },
        {}
      )
      expect(MockHistoryButton).toHaveBeenCalledTimes(0)
      expect(MockStaffProfileMoreActionsDropdown).toHaveBeenCalledTimes(0)
    })
  })

  describe('when both loading is false and staffProfile is not defined', () => {
    it('returns nothing', () => {
      const loading = false

      renderComponent({ loading, staffProfile: undefined })

      expect(MockActionLoader).toHaveBeenCalledTimes(0)
      expect(MockHistoryButton).toHaveBeenCalledTimes(0)
    })
  })

  describe('when loading is false and staffProfile is defined', () => {
    it('returns History button', () => {
      const loading = false
      const id = {} as unknown as string
      const staffProfile = {
        id
      } as GetStaffProfileQuery['node']

      renderComponent({ loading, staffProfile })

      expect(MockActionLoader).toHaveBeenCalledTimes(0)
      expect(MockHistoryButton).toHaveBeenCalledTimes(1)
      expect(MockHistoryButton).toHaveBeenCalledWith(
        {
          entity: 'Staff',
          id
        },
        {}
      )
    })
  })
})
