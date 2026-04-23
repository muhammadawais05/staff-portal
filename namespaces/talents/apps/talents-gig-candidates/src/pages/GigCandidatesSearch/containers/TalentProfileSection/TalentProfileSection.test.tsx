import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'

import {
  CandidateEmploymentFragment,
  CandidatePortfolioFragment
} from './data/get-candidate-profile/get-candidate-profile.staff.gql.types'
import TalentProfileSection from './TalentProfileSection'
import { useGetCandidateProfile } from './data/get-candidate-profile/get-candidate-profile.staff.gql'

jest.mock('./data/get-candidate-profile/get-candidate-profile.staff.gql')
const mockUseGetCandidateEmployments = useGetCandidateProfile as jest.Mock

jest.mock('./components/EmploymentItem/EmploymentItem', () => ({
  __esModule: true,
  default: ({ employment }: { employment: CandidateEmploymentFragment }) => (
    <div data-testid={`item:${employment.id}`} />
  )
}))

jest.mock('./components/ProjectItem/ProjectItem', () => ({
  __esModule: true,
  default: ({ project }: { project: CandidatePortfolioFragment }) => (
    <div data-testid={`item:${project.id}`} />
  )
}))

const TALENT_ID = 'VjEtVGFsZW50LTE5OTI3MTQ'

const mockEmployment = (
  employmentData: Partial<CandidateEmploymentFragment> = {}
): CandidateEmploymentFragment => ({
  id: 'test',
  company: 'Company',
  startYear: 2000,
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
  },
  experienceItems: [],
  ...employmentData
})

const mockProject = (
  projectData: Partial<CandidatePortfolioFragment> = {}
): CandidatePortfolioFragment => ({
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
  },
  ...projectData
})

jest.mock('../../contexts/gig-candidates-context', () => ({
  useGigsContext: () => ({
    selectedSkills: [
      {
        name: 'Javascript',
        rating: 'EXPERT'
      },
      {
        name: 'Java',
        rating: 'EXPERT'
      }
    ]
  })
}))

const arrangeTest = () =>
  render(
    <TestWrapper>
      <TalentProfileSection talentId={TALENT_ID} />
    </TestWrapper>
  )

describe('Talent Profile Section', () => {
  it('returns null if no data was loaded', () => {
    mockUseGetCandidateEmployments.mockReturnValue({ loading: false })

    expect(screen.queryByTestId('skeleton-loader')).not.toBeInTheDocument()
    expect(
      screen.queryByText('There are no employments to display.')
    ).not.toBeInTheDocument()
    expect(
      screen.queryByText('There are no projects to display.')
    ).not.toBeInTheDocument()
  })

  it('renders empty state when there are no items', () => {
    mockUseGetCandidateEmployments.mockReturnValue({
      loading: false,
      data: {
        profile: { employments: { nodes: [] }, portfolioItems: { nodes: [] } }
      }
    })

    arrangeTest()

    expect(screen.getByText('Talent Profile Information')).toBeInTheDocument()
    expect(screen.queryByTestId('skeleton-loader')).not.toBeInTheDocument()
    expect(
      screen.getByText('There are no employments to display')
    ).toBeInTheDocument()
    expect(
      screen.getByText('There are no projects to display')
    ).toBeInTheDocument()
  })

  it('renders loader if data is loading', async () => {
    mockUseGetCandidateEmployments.mockReturnValue({ loading: false })

    expect(screen.queryByTestId('skeleton-loader')).not.toBeInTheDocument()
    expect(
      screen.queryByText('There are no employments to display.')
    ).not.toBeInTheDocument()
    expect(
      screen.queryByText('There are no projects to display.')
    ).not.toBeInTheDocument()
  })

  it('filters items', () => {
    const response = {
      loading: false,
      data: {
        id: 'talent-id',
        type: 'developer',
        profile: {
          employments: {
            nodes: [
              mockEmployment({
                id: 'emp-1'
              }),
              mockEmployment({
                id: 'emp-2',
                skills: {
                  nodes: [
                    {
                      name: 'Node'
                    }
                  ]
                }
              })
            ]
          },
          portfolioItems: {
            nodes: [
              mockProject({ id: 'p-1' }),
              mockProject({
                id: 'p-2',
                skills: {
                  nodes: [
                    {
                      name: 'Node'
                    }
                  ]
                }
              })
            ]
          }
        }
      }
    }

    mockUseGetCandidateEmployments.mockReturnValue(response)

    arrangeTest()

    const filterLabel = screen.getByText('Only matching searched skills')

    expect(screen.queryByText('Talent Profile Information')).toBeInTheDocument()
    expect(filterLabel).toBeInTheDocument()
    expect(screen.getByTestId('item:emp-1')).toBeInTheDocument()
    expect(screen.getByTestId('item:emp-2')).toBeInTheDocument()
    expect(screen.getByTestId('item:p-1')).toBeInTheDocument()
    expect(screen.getByTestId('item:p-2')).toBeInTheDocument()

    fireEvent.click(filterLabel)

    expect(screen.getByTestId('item:emp-1')).toBeInTheDocument()
    expect(screen.queryByText('item:emp-2')).not.toBeInTheDocument()
    expect(screen.getByTestId('item:p-1')).toBeInTheDocument()
    expect(screen.queryByText('item:p-2')).not.toBeInTheDocument()
  })
})
