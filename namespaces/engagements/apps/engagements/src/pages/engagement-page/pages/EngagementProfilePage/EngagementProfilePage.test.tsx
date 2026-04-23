import { useQuery } from '@staff-portal/data-layer-service'
import { TestWrapper } from '@staff-portal/test-utils'
import { render, screen } from '@toptal/picasso/test-utils'
import { when } from 'jest-when'
import React from 'react'

import EngagementPage from '../EngagementPage'
import { GetEngagementProfilePermissionDocument } from './data'
import EngagementProfilePage from './EngagementProfilePage'

jest.mock('@staff-portal/data-layer-service')
const mockUseQuery = useQuery as jest.Mock

jest.mock('../EngagementPage')
const EngagementPageMock = EngagementPage as jest.Mock

const arrangeTest = (canViewEngagements = false) => {
  EngagementPageMock.mockReturnValue(null)

  when(mockUseQuery)
    .calledWith(GetEngagementProfilePermissionDocument, expect.anything())
    .mockImplementation(() => ({
      data: { viewer: { permits: { canViewEngagements } } },
      loading: false
    }))

  render(
    <TestWrapper>
      <EngagementProfilePage />
    </TestWrapper>
  )
}

describe('EngagementProfilePage', () => {
  describe('when the user has permission to view the engagement page', () => {
    it('shows the engagement page', () => {
      arrangeTest(true)

      expect(EngagementPageMock).toHaveBeenCalled()
    })
  })

  describe('when the user does not have permission to view the engagement page', () => {
    it('shows the engagement page', () => {
      arrangeTest()

      expect(
        screen.getByText('This Page Requires Additional Permissions')
      ).toBeInTheDocument()
      expect(EngagementPageMock).not.toHaveBeenCalled()
    })
  })
})
