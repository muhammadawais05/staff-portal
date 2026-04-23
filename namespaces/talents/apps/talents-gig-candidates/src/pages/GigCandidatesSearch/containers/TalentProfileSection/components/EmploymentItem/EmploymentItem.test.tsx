import React from 'react'
import { render, screen, getByText } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'

import EmploymentItem from './EmploymentItem'
import { CandidateEmploymentFragment } from '../../data/get-candidate-profile/get-candidate-profile.staff.gql.types'

jest.mock('../../../../components/SkillsList')

const TEST_ENGAGEMENT: CandidateEmploymentFragment = {
  id: 'test',
  company: 'Company',
  startYear: 2000,
  experienceItems: ['Worked on UI', 'Worked on backend'],
  position: 'CTO',
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
} as CandidateEmploymentFragment

const arrangeTest = (
  employmentData: Partial<CandidateEmploymentFragment> = {}
) =>
  render(
    <TestWrapper>
      <EmploymentItem
        employment={{ ...TEST_ENGAGEMENT, ...employmentData }}
        talentSkills={[]}
      />
    </TestWrapper>
  )

describe('Employment item', () => {
  it('renders information about the employment', () => {
    arrangeTest()
    const employmentItem = screen.getByTestId('employment-item')
    const employmentContent = screen.getByTestId('employment-content')
    const employmentSkills = screen.getByTestId('skills-list')

    expect(getByText(employmentItem, 'CTO')).toBeInTheDocument()
    expect(screen.getByText('Company • 2000 – PRESENT')).toBeInTheDocument()
    expect(getByText(employmentSkills, 'Javascript,Node')).toBeInTheDocument()
    expect(getByText(employmentContent, 'Worked on UI')).toBeInTheDocument()
  })

  it('renders correctly with end date', () => {
    arrangeTest({ endYear: 2020 })
    const employmentItem = screen.getByTestId('employment-item')
    const employmentContent = screen.getByTestId('employment-content')
    const employmentSkills = screen.getByTestId('skills-list')

    expect(getByText(employmentItem, 'CTO')).toBeInTheDocument()
    expect(screen.getByText('Company • 2000 – 2020')).toBeInTheDocument()
    expect(getByText(employmentSkills, 'Javascript,Node')).toBeInTheDocument()
    expect(getByText(employmentContent, 'Worked on UI')).toBeInTheDocument()
  })
})
