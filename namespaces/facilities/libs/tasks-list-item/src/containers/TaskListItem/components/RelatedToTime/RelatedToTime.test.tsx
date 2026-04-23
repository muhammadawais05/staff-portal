import { render, screen } from '@toptal/picasso/test-utils'
import React, { ReactNode } from 'react'
import { TestWrapper } from '@staff-portal/test-utils'
import { AsyncTooltipWrapper } from '@staff-portal/ui'

import RelatedToTime, { Props } from './RelatedToTime'

jest.mock('@staff-portal/ui/src/components/AsyncTooltipWrapper', () => ({
  __esModule: true,
  default: jest.fn()
}))

const AsyncTooltipWrapperMock = AsyncTooltipWrapper as jest.Mock

const arrangeTest = ({
  isCompleted = false,
  hasEngagedSubjects = false
}: Partial<Props> = {}) =>
  render(
    <TestWrapper>
      <RelatedToTime
        taskId='1'
        isCompleted={isCompleted}
        dateTime='2020-06-22T20:10:54+08:00'
        hasEngagedSubjects={hasEngagedSubjects}
      />
    </TestWrapper>
  )

describe('RelatedToTime', () => {
  beforeEach(() => {
    AsyncTooltipWrapperMock.mockClear()
    AsyncTooltipWrapperMock.mockImplementation(
      ({ children }: { children: ReactNode }) => (
        <div data-testid='AsyncTooltipWrapper'>{children}</div>
      )
    )
  })

  it('AsyncTooltipWrapper should be rendered with correct props', () => {
    arrangeTest({ isCompleted: true })

    expect(AsyncTooltipWrapperMock).toHaveBeenCalledWith(
      expect.objectContaining({
        enableTooltip: false
      }),
      {}
    )
  })

  describe('when task is completed', () => {
    it('shows a line through', () => {
      arrangeTest({ isCompleted: true })

      expect(screen.getByText('8:10 PM')).toHaveStyle(
        'text-decoration: line-through'
      )
    })
  })

  describe('when task is not completed', () => {
    it('shows a line through', () => {
      arrangeTest()

      expect(screen.getByText('8:10 PM')).not.toHaveStyle(
        'text-decoration: line-through'
      )
    })
  })

  describe("when task doesn't have engaged subjects", () => {
    it('hides the info icon', () => {
      arrangeTest()

      expect(screen.queryByTestId('RelatedToTime-info')).not.toBeInTheDocument()
    })
  })

  describe('when task has engaged subjects', () => {
    it('shows the info icon', async () => {
      arrangeTest({ hasEngagedSubjects: true })

      expect(screen.getByTestId('RelatedToTime-info')).toBeInTheDocument()
    })
  })
})
