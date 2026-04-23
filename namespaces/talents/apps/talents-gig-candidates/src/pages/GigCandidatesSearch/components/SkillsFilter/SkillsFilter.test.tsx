import React from 'react'
import { screen, render } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'

import SkillsFilter, { Props } from './SkillsFilter'
import { Props as SkillsFilterProps } from '../SkillsFilterItem/SkillsFilterItem'

const SKILLS = ['JavaScript', 'Node.js', 'GraphQL']

jest.mock('../SkillsFilterItem/SkillsFilterItem', () => ({
  __esModule: true,
  default: ({ skill }: SkillsFilterProps) => (
    <div data-testid={`candidates-skills-filter-item: ${skill}`} />
  )
}))

const arrangeTest = ({
  skills,
  description
}: Pick<Props, 'skills' | 'description'>) =>
  render(
    <TestWrapper>
      <SkillsFilter
        skills={skills}
        description={description}
        selectedSkills={[]}
        onSkillSelect={() => {}}
        onSkillDeselect={() => {}}
      />
    </TestWrapper>
  )

describe('CandidatesSkillsFilter', () => {
  it('renders fetched request description and skills', () => {
    arrangeTest({
      skills: SKILLS,
      description: 'Some request description'
    })

    expect(screen.getByTestId('candidates-skills-filter')).toBeInTheDocument()
    expect(screen.getByText('Some request description')).toBeInTheDocument()

    SKILLS.forEach(skill => {
      expect(
        screen.getByTestId(`candidates-skills-filter-item: ${skill}`)
      ).toBeInTheDocument()
    })
  })

  it('renders nothing if there are no skills', () => {
    arrangeTest({
      skills: [],
      description: 'Description that does not render'
    })

    expect(
      screen.queryByTestId('candidates-skills-filter')
    ).not.toBeInTheDocument()
    expect(
      screen.queryByText('Description that does not render')
    ).not.toBeInTheDocument()
  })
})
