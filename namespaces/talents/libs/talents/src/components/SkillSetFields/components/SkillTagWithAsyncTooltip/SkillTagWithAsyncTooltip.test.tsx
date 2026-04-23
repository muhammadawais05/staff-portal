import { render } from '@testing-library/react'
import React, { ComponentProps } from 'react'
import { SkillRating } from '@staff-portal/graphql/staff'
import { TestWrapper } from '@staff-portal/test-utils'
import { AsyncTooltipWrapper } from '@staff-portal/ui'

import SkillTagWithAsyncTooltip from './SkillTagWithAsyncTooltip'

jest.mock('../../../SkillTag', () => ({
  __esModule: true,
  default: () => null
}))

jest.mock('@staff-portal/ui/src/components/AsyncTooltipWrapper', () => ({
  __esModule: true,
  default: jest.fn()
}))

const MockAsyncTooltipWrapper = AsyncTooltipWrapper as unknown as jest.Mock

type Props = Omit<
  ComponentProps<typeof SkillTagWithAsyncTooltip>,
  'skillSetId' | 'talentType'
>

const arrangeTest = (props: Props) =>
  render(
    <TestWrapper>
      <SkillTagWithAsyncTooltip
        {...props}
        skillSetId='123'
        talentType='Developer'
      />
    </TestWrapper>
  )

describe('SkillTagWithAsyncTooltip', () => {
  beforeEach(() => {
    MockAsyncTooltipWrapper.mockImplementation(
      ({ children }: { children: React.ReactNode }) => <div>{children}</div>
    )
  })

  describe('when skill has connections', () => {
    it('enables tooltip', () => {
      arrangeTest({
        name: 'Skill Name',
        connectionsCount: 1,
        rating: SkillRating.EXPERT
      })

      expect(MockAsyncTooltipWrapper).toHaveBeenCalledWith(
        expect.objectContaining({
          enableTooltip: true
        }),
        {}
      )
    })

    it('enables tooltip for non-vetted expert skills', () => {
      arrangeTest({
        name: 'Skill Name',
        connectionsCount: 1,
        rating: SkillRating.COMPETENT
      })

      expect(MockAsyncTooltipWrapper).toHaveBeenCalledWith(
        expect.objectContaining({
          enableTooltip: true
        }),
        {}
      )
    })

    it('enables tooltip to show connections even though it has hideVettingInformation set to true (industries)', () => {
      arrangeTest({
        name: 'Industry Name',
        connectionsCount: 1,
        rating: SkillRating.EXPERT,
        hideVettingInformation: true
      })

      expect(MockAsyncTooltipWrapper).toHaveBeenCalledWith(
        expect.objectContaining({
          enableTooltip: true
        }),
        {}
      )
    })
  })

  describe('when skill has no connections', () => {
    it('enables tooltip for vetted expert skills', () => {
      arrangeTest({
        name: 'Skill Name',
        connectionsCount: 0,
        rating: SkillRating.EXPERT
      })

      expect(MockAsyncTooltipWrapper).toHaveBeenCalledWith(
        expect.objectContaining({
          enableTooltip: true
        }),
        {}
      )
    })

    it('disables tooltip for vetted expert skills with hideVettingInformation (industries)', () => {
      arrangeTest({
        name: 'Skill Name',
        connectionsCount: 0,
        rating: SkillRating.EXPERT,
        hideVettingInformation: true
      })

      expect(MockAsyncTooltipWrapper).toHaveBeenCalledWith(
        expect.objectContaining({
          enableTooltip: false
        }),
        {}
      )
    })

    it('disables tooltip for non-vetted expert skills', () => {
      arrangeTest({
        name: 'Skill Name',
        connectionsCount: 0,
        rating: SkillRating.COMPETENT
      })

      expect(MockAsyncTooltipWrapper).toHaveBeenCalledWith(
        expect.objectContaining({
          enableTooltip: false
        }),
        {}
      )
    })
  })
})
