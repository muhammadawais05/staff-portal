import React from 'react'
import { screen, render, fireEvent } from '@testing-library/react'
import { SkillRating } from '@staff-portal/graphql/staff'
import { TestWrapper } from '@staff-portal/test-utils'

import SkillsFilterItem, { Props } from './SkillsFilterItem'

const SELECTED_SKILLS = [
  { name: 'Javascript', rating: SkillRating.COMPETENT },
  { name: 'PHP', rating: SkillRating.STRONG }
]

const arrangeTest = (
  skill: string,
  rating: SkillRating,
  {
    onSkillSelect,
    onSkillDeselect
  }: Partial<Pick<Props, 'onSkillSelect' | 'onSkillDeselect'>>
) => {
  const checked = Boolean(SELECTED_SKILLS.find(({ name }) => name === skill))

  return render(
    <TestWrapper>
      <SkillsFilterItem
        skill={skill}
        rating={rating}
        checked={checked}
        onSkillSelect={onSkillSelect || (() => {})}
        onSkillDeselect={onSkillDeselect || (() => {})}
      />
    </TestWrapper>
  )
}

describe('SkillsFilterItem', () => {
  it('renders the skill name', () => {
    arrangeTest('Javascript', SkillRating.EXPERT, {})

    expect(screen.getByText('Javascript')).toBeInTheDocument()
  })

  it('marks skill as NOT checked if it does not belong to selected skills', () => {
    arrangeTest('CSS', SkillRating.STRONG, {})

    const checkbox = screen
      .getByTestId('skill-checkbox')
      .querySelector('input') as Element

    expect(checkbox).not.toBeChecked()
  })

  it('marks skill as checked if it belongs to selected skills', () => {
    arrangeTest('Javascript', SkillRating.STRONG, {})

    const checkbox = screen
      .getByTestId('skill-checkbox')
      .querySelector('input') as Element

    expect(checkbox).toBeChecked()
  })

  it('triggers onSkillSelect callback when clicking unchecked skill', () => {
    const onSkillSelect = jest.fn()

    arrangeTest('CSS', SkillRating.STRONG, { onSkillSelect })

    fireEvent.click(screen.getByTestId('skills-filter-item'))

    expect(onSkillSelect).toHaveBeenCalledWith({
      name: 'CSS',
      rating: SkillRating.STRONG
    })
  })

  it('triggers onSkillDeselect callback when clicking unchecked skill', () => {
    const onSkillDeselect = jest.fn()

    arrangeTest('Javascript', SkillRating.STRONG, { onSkillDeselect })

    fireEvent.click(screen.getByTestId('skills-filter-item'))

    expect(onSkillDeselect).toHaveBeenCalledWith('Javascript')
  })
})
