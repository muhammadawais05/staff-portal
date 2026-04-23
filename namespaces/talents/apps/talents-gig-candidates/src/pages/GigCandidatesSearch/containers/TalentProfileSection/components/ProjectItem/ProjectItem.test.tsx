import React from 'react'
import { render, screen, getByText, fireEvent } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'

import ProjectItem from './ProjectItem'
import { CandidatePortfolioFragment } from '../../data/get-candidate-profile/get-candidate-profile.staff.gql.types'

jest.mock('../../../../components/SkillsList')

const TEST_PROJECT: CandidatePortfolioFragment = {
  id: 'test',
  title: 'Company',
  description: 'Worked on this project',
  link: 'https://www.company.com/project',
  skills: {
    nodes: [
      {
        name: 'Javascript'
      },
      {
        name: 'Node'
      }
    ]
  }
} as CandidatePortfolioFragment

const arrangeTest = (
  employmentData: Partial<CandidatePortfolioFragment> = {}
) =>
  render(
    <TestWrapper>
      <ProjectItem
        project={{ ...TEST_PROJECT, ...employmentData }}
        talentSkills={[]}
      />
    </TestWrapper>
  )

describe('Project item', () => {
  it('renders information about the project', () => {
    arrangeTest()
    const skillsList = screen.getByTestId('skills-list')

    expect(screen.getByTestId('project-item')).toBeInTheDocument()
    expect(screen.getByTestId('project-link')).toBeInTheDocument()
    expect(screen.getByTestId('project-full-description')).toBeInTheDocument()
    expect(
      screen.getByTestId('project-trimmed-description')
    ).toBeInTheDocument()
    expect(getByText(skillsList, 'Javascript,Node')).toBeInTheDocument()
  })

  it('hides trimmed description when accordion expands', () => {
    arrangeTest()
    fireEvent.click(screen.getByTestId('accordion-summary'))

    expect(screen.getByTestId('project-full-description')).toBeInTheDocument()
    expect(
      screen.queryByTestId('project-trimmed-description')
    ).not.toBeInTheDocument()
  })
})
