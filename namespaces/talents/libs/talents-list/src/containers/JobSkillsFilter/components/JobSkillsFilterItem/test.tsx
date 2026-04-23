import React from 'react'
import { screen, render, fireEvent } from '@testing-library/react'
import {
  SkillBadgedSearchInput,
  SkillRating
} from '@staff-portal/graphql/staff'
import { TestWrapper } from '@staff-portal/test-utils'

import JobSkillsFilterItem, { Props } from './JobSkillsFilterItem'
import { TalentsListJobSkillFragment } from '../../../../data'

const SELECTED_SKILLS: SkillBadgedSearchInput[] = [
  { name: 'Javascript', rating: SkillRating.COMPETENT },
  { name: 'PHP', rating: SkillRating.STRONG }
]

const arrangeTest = (
  skillSet: TalentsListJobSkillFragment,
  {
    onSkillSelect,
    onSkillDeselect
  }: Partial<Pick<Props, 'onSkillSelect' | 'onSkillDeselect'>>
) =>
  render(
    <TestWrapper>
      <JobSkillsFilterItem
        skillSet={skillSet}
        selectedSkills={SELECTED_SKILLS}
        onSkillSelect={onSkillSelect || (() => {})}
        onSkillDeselect={onSkillDeselect || (() => {})}
      />
    </TestWrapper>
  )

describe('JobSkillsFilterItem', () => {
  it('renders the skill name', () => {
    arrangeTest(
      {
        id: 'SkillSet-1',
        main: false,
        rating: SkillRating.STRONG,
        skill: {
          id: 'Skill-1',
          name: 'Javascript'
        }
      },
      {}
    )

    expect(screen.getByText('Javascript')).toBeInTheDocument()
  })

  it('renders icon if the main skillset is provided', () => {
    arrangeTest(
      {
        id: 'SkillSet-1',
        main: true,
        rating: SkillRating.STRONG,
        skill: {
          id: 'Skill-1',
          name: 'Javascript'
        }
      },
      {}
    )

    expect(screen.getByTestId('main-skill-icon')).toBeInTheDocument()
  })

  it('marks skill as NOT checked if it does not belong to selected skills', () => {
    arrangeTest(
      {
        id: 'SkillSet-1',
        main: true,
        rating: SkillRating.STRONG,
        skill: {
          id: 'Skill-1',
          name: 'CSS'
        }
      },
      {}
    )

    const checkbox = screen
      .getByTestId('skill-checkbox')
      .querySelector('input') as Element

    expect(checkbox).not.toBeChecked()
  })

  it('marks skill as checked if it belongs to selected skills', () => {
    arrangeTest(
      {
        id: 'SkillSet-1',
        main: true,
        rating: SkillRating.STRONG,
        skill: {
          id: 'Skill-1',
          name: 'Javascript'
        }
      },
      {}
    )

    const checkbox = screen
      .getByTestId('skill-checkbox')
      .querySelector('input') as Element

    expect(checkbox).toBeChecked()
  })

  it('triggers onSkillSelect callback when clicking unchecked skill', () => {
    const onSkillSelect = jest.fn()

    arrangeTest(
      {
        id: 'SkillSet-1',
        main: true,
        rating: SkillRating.STRONG,
        skill: {
          id: 'Skill-1',
          name: 'CSS'
        }
      },
      { onSkillSelect }
    )

    fireEvent.click(screen.getByTestId('job-skills-filter-item'))

    expect(onSkillSelect).toHaveBeenCalledWith({
      name: 'CSS',
      rating: SkillRating.STRONG
    })
  })

  it('triggers onSkillDeselect callback when clicking unchecked skill', () => {
    const onSkillDeselect = jest.fn()

    arrangeTest(
      {
        id: 'SkillSet-1',
        main: true,
        rating: SkillRating.COMPETENT,
        skill: {
          id: 'Skill-1',
          name: 'Javascript'
        }
      },
      { onSkillDeselect }
    )

    fireEvent.click(screen.getByTestId('job-skills-filter-item'))

    expect(onSkillDeselect).toHaveBeenCalledWith('Javascript')
  })
})
