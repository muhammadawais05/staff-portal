import { render, screen } from '@testing-library/react'
import React from 'react'
import { TestWrapper, assertOnTooltipText } from '@staff-portal/test-utils'

import RequiredSkillCheckbox, { Props } from './RequiredSkillCheckbox'

const arrangeTest = (props: Props) =>
  render(
    <TestWrapper>
      <RequiredSkillCheckbox {...props} />
    </TestWrapper>
  )

describe('RequiredSkillCheckbox', () => {
  it('renders checkbox', () => {
    const onClick = jest.fn()

    arrangeTest({
      checked: true,
      onClick
    })

    const requiredSkillCheckbox = screen.getByTestId('require-skill')

    assertOnTooltipText(requiredSkillCheckbox, 'Skill marked as required')

    requiredSkillCheckbox.click()
    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('renders different tooltip content if checked prop is false', () => {
    arrangeTest({
      checked: false,
      onClick: jest.fn()
    })

    assertOnTooltipText(
      screen.getByTestId('require-skill'),
      'Mark as a required skill'
    )
  })
})
