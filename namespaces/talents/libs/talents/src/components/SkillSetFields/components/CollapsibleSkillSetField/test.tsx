import React, { ComponentProps, ReactNode } from 'react'
import { render, screen } from '@testing-library/react'
import { fireEvent } from '@toptal/picasso/test-utils'
import { TestWrapper } from '@staff-portal/test-utils'
import { SkillRating } from '@staff-portal/graphql/staff'

import CollapsibleSkillSetField from './CollapsibleSkillSetField'

jest.mock('../SkillSetSkeletonLoader', () => ({
  SkillSetSkeletonLoader: () => <div data-testid='loading' />
}))

jest.mock('../../data/get-talent-skill-tooltip-content', () => ({
  useGetTalentSkillTooltipContent: () => ({
    loading: true
  })
}))

jest.mock('../../../SkillTag/SkillTag', () => ({
  __esModule: true,
  default: ({ name }: { name: string }) => <div>{name}</div>
}))

jest.mock('@staff-portal/ui/src/components/AsyncTooltipWrapper', () => ({
  __esModule: true,
  default: ({ children }: { children: ReactNode }) => <div>{children}</div>
}))

const arrangeTest = (
  props: Omit<ComponentProps<typeof CollapsibleSkillSetField>, 'talentType'>
) =>
  render(
    <TestWrapper>
      <CollapsibleSkillSetField
        talentType='Developer'
        skills={props.skills}
        initialVisibleItems={props.initialVisibleItems}
      />
    </TestWrapper>
  )

describe('CollapsibleSkillSetField', () => {
  describe('when talent does not have any skills', () => {
    it('does not render skills and show more skills button and accordion', () => {
      arrangeTest({ skills: [] })

      expect(screen.queryByText('GitHub')).not.toBeInTheDocument()
      expect(screen.queryByTestId('collapsible-skills')).not.toBeInTheDocument()
      expect(
        screen.queryByTestId('collapsible-skill-set-field-toggle-button')
      ).not.toBeInTheDocument()
    })
  })

  describe('when talent has less skills than "visible" param', () => {
    it('renders skills without show more skills button and accordion', () => {
      arrangeTest({
        skills: [
          {
            id: '1',
            rating: SkillRating.EXPERT,
            connections: {
              totalCount: 1
            },
            skill: {
              id: 'VjEtU2tpbGwtMzY5NDg',
              name: 'GitHub'
            }
          }
        ],
        initialVisibleItems: 2
      })

      expect(screen.getByText('GitHub')).toBeInTheDocument()
      expect(screen.queryByTestId('collapsible-skills')).not.toBeInTheDocument()
      expect(
        screen.queryByTestId('collapsible-skill-set-field-toggle-button')
      ).not.toBeInTheDocument()
    })
  })

  describe('when talent has more skills than "visible" param', () => {
    it('renders skills with show more skills button and accordion', () => {
      arrangeTest({
        skills: [
          {
            id: '1',
            rating: SkillRating.EXPERT,
            connections: {
              totalCount: 1
            },
            skill: {
              id: 'VjEtU2tpbGwtMzY5NDg',
              name: 'GitHub'
            }
          },
          {
            id: '2',
            rating: SkillRating.EXPERT,
            connections: {
              totalCount: 1
            },
            skill: {
              id: 'VjEtU2tpbGwtMzY5NDg',
              name: 'GitHub 2'
            }
          }
        ],
        initialVisibleItems: 1
      })

      expect(screen.getAllByText(/GitHub/)).toHaveLength(2)
      expect(screen.queryByText('GitHub 2')).not.toBeVisible()
      expect(screen.getByTestId('collapsible-skills')).toBeInTheDocument()
      expect(screen.getByText('View 1 More Skill')).toBeInTheDocument()

      fireEvent.click(
        screen.getByTestId('collapsible-skill-set-field-toggle-button')
      )

      expect(screen.queryByText('GitHub 2')).toBeVisible()
      expect(screen.getByText('View Less')).toBeInTheDocument()
    })
  })
})
