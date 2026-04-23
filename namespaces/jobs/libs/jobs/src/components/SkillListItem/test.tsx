import { render, screen } from '@testing-library/react'
import React from 'react'
import { TestWrapper, assertOnTooltipText } from '@staff-portal/test-utils'

import { createSkillSetMock } from '../../data/skill-fragment/mocks'
import SkillListItem, { Props } from './SkillListItem'

jest.mock('../RequiredSkillCheckbox', () => ({
  __esModule: true,
  default: () => <div data-testid='required-skill-checkbox' />
}))

const arrangeTest = (props: Props) =>
  render(
    <TestWrapper>
      <SkillListItem {...props} />
    </TestWrapper>
  )

describe('SkillListItem', () => {
  it('renders skill list item', () => {
    const onDelete = jest.fn()
    const onMainSkillChange = jest.fn()

    arrangeTest({
      skillSet: createSkillSetMock(),
      showCheckbox: true,
      onMainSkillChange,
      onDelete,
      onSkillRatingChange: jest.fn(),
      onSkillRequiredChange: jest.fn()
    })

    const mainSkillCheckbox = screen.getByTestId('main-skill-checkbox')

    expect(screen.getByTestId('label')).toHaveTextContent('Skill Name (12)')
    expect(screen.getByTestId('required-skill-checkbox')).toBeInTheDocument()

    screen.getByTestId('delete-button').click()
    expect(onDelete).toHaveBeenCalledTimes(1)

    mainSkillCheckbox.querySelector('input')?.click()
    expect(onMainSkillChange).toHaveBeenCalledTimes(1)
    expect(onMainSkillChange).toHaveBeenCalledWith('Skill Name')

    assertOnTooltipText(mainSkillCheckbox, 'Pick as a main skill')
  })
})
