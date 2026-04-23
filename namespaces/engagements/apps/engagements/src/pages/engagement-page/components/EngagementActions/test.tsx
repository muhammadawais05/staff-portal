import React, { ComponentProps } from 'react'
import { render, screen } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'
import { createEngagementFragmentFragmentMock } from '@staff-portal/engagements-interviews/src/mocks'

import EngagementActions from './EngagementActions'

jest.mock('@staff-portal/ui/src/components/ActionLoader', () => ({
  __esModule: true,
  default: () => <div data-testid='ActionLoader' />
}))
jest.mock('@staff-portal/engagements', () => ({
  ExpireEngagementItem: () => <div data-testid='expire-engagement-item' />,
  RestoreRejectedEngagementButton: () => (
    <div data-testid='RestoreRejectedEngagementButton' />
  ),
  RestoreCancelledEngagementButton: () => (
    <div data-testid='RestoreCancelledEngagementButton' />
  )
}))

jest.mock('../PostponeExpirationButton', () => ({
  __esModule: true,
  default: () => <div data-testid='postpone-expiration-button' />
}))
jest.mock('../EngagementMoreActionsDropdown', () => ({
  __esModule: true,
  default: () => <div data-testid='EngagementMoreActionsDropdown' />
}))
jest.mock('../RestoreExpiredEngagementButton', () => ({
  __esModule: true,
  default: () => <div data-testid='RestoreExpiredEngagementButton' />
}))

const arrangeTest = ({
  engagement
}: Partial<ComponentProps<typeof EngagementActions>> = {}) =>
  render(
    <TestWrapper>
      <EngagementActions engagement={engagement} />
    </TestWrapper>
  )

describe('EngagementActions', () => {
  describe('when there is no Engagement', () => {
    it('shows loaders', () => {
      arrangeTest()

      expect(screen.getAllByTestId('ActionLoader')).toHaveLength(3)
    })
  })

  describe('when there is Engagement', () => {
    it('shows Engagement actions', () => {
      arrangeTest({
        engagement: createEngagementFragmentFragmentMock()
      })

      expect(
        screen.getByTestId('RestoreExpiredEngagementButton')
      ).toBeInTheDocument()
      expect(
        screen.getByTestId('RestoreRejectedEngagementButton')
      ).toBeInTheDocument()
      expect(
        screen.getByTestId('RestoreCancelledEngagementButton')
      ).toBeInTheDocument()
      expect(
        screen.getByTestId('postpone-expiration-button')
      ).toBeInTheDocument()
      expect(screen.getByTestId('expire-engagement-item')).toBeInTheDocument()
      expect(
        screen.getByTestId('EngagementMoreActionsDropdown')
      ).toBeInTheDocument()
    })
  })
})
