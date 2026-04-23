import { render, screen } from '@testing-library/react'
import React, { ComponentProps } from 'react'
import { TestWrapper } from '@staff-portal/test-utils'

import SkillList from './SkillList'
import { createSkillSetMock } from '../../data/skill-fragment/mocks'
import { SkillFragment } from '../../data'

jest.mock('../SkillListItem', () => ({
  __esModule: true,
  default: () => <div data-testid='skill-list-item' />
}))

const arrangeTest = (props: ComponentProps<typeof SkillList>) =>
  render(
    <TestWrapper>
      <SkillList {...props} />
    </TestWrapper>
  )

describe('SkillList', () => {
  it('renders skill list', () => {
    arrangeTest({
      skills: [createSkillSetMock()],
      coreSkills: [createSkillSetMock().skill] as SkillFragment[],
      onMainSkillChange: jest.fn(),
      onSkillRatingChange: jest.fn(),
      onDelete: jest.fn(),
      onSkillRequiredChange: jest.fn()
    })

    expect(screen.getByText('Confirmed Skills')).toBeInTheDocument()
    expect(screen.getByTestId('skill-list-item')).toBeInTheDocument()
  })
})
