import React from 'react'
import { render } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'
import {
  ExpireEngagementItem,
  CancelInterviewMenuItem
} from '@staff-portal/engagements'
import { MoreButton } from '@staff-portal/ui'
import { checkIfAllOperationsAreHidden } from '@staff-portal/operations'

import EngagementActionButton from './EngagementActionButton'
import { ClientJobEngagementFragment } from '../../data/get-client-jobs.staff.gql.types'

jest.mock('@staff-portal/operations', () => ({
  checkIfAllOperationsAreHidden: jest.fn()
}))
jest.mock('@staff-portal/engagements', () => ({
  ExpireEngagementItem: jest.fn(),
  CancelInterviewMenuItem: jest.fn()
}))
jest.mock('@staff-portal/ui', () => ({
  MoreButton: jest.fn()
}))

const expireEngagementItemMock = ExpireEngagementItem as jest.Mock
const cancelInterviewMenuItemMock = CancelInterviewMenuItem as jest.Mock
const moreButtonMock = MoreButton as jest.Mock
const checkIfAllOperationsAreHiddenMock = checkIfAllOperationsAreHidden as jest.Mock

const renderComponent = () =>
  render(
    <TestWrapper>
      <EngagementActionButton engagement={{} as ClientJobEngagementFragment} />
    </TestWrapper>
  )

describe('Engagement Action Button', () => {
  beforeEach(() => {
    expireEngagementItemMock.mockReturnValue(null)
    cancelInterviewMenuItemMock.mockReturnValue(null)
    moreButtonMock.mockReturnValue(null)
  })

  it('all operations are hidden', () => {
    checkIfAllOperationsAreHiddenMock.mockReturnValue(true)

    renderComponent()

    expect(moreButtonMock).toHaveBeenCalledTimes(1)
    expect(moreButtonMock).toHaveBeenCalledWith(
      expect.objectContaining({
        hidden: true
      }),
      {}
    )
  })

  it('more button is visible', () => {
    checkIfAllOperationsAreHiddenMock.mockReturnValue(false)

    renderComponent()

    expect(moreButtonMock).toHaveBeenCalledTimes(1)
    expect(moreButtonMock).toHaveBeenCalledWith(
      expect.objectContaining({
        hidden: false
      }),
      {}
    )
  })
})
