import React from 'react'
import { screen, render } from '@testing-library/react'
import { SkillRating, Link } from '@staff-portal/graphql/staff'
import { TestWrapper } from '@staff-portal/test-utils'

import JobSkillsFilter from './JobSkillsFilter'
import { Props as JobSkillsFilterItemProps } from './components/JobSkillsFilterItem/JobSkillsFilterItem'
import useTalentApplicantsJobSkills from './hooks/use-get-job-skills'
import useJobSkillsFilter from './hooks/use-job-skills-filter'
import { TalentsListJobSkillFragment } from '../../data'

jest.mock('./hooks/use-get-job-skills')

const useTalentApplicantsJobSkillsMock =
  useTalentApplicantsJobSkills as jest.Mock

jest.mock('./hooks/use-job-skills-filter', () => ({
  __esModule: true,
  default: jest.fn()
}))

const useJobSkillsFilterMock = useJobSkillsFilter as jest.Mock

const SKILL_SETS: TalentsListJobSkillFragment[] = [
  {
    id: 'VjEtU2tpbGxTZXQtNjE5MDIw',
    main: true,
    rating: SkillRating.EXPERT,
    skill: {
      id: 'javascript',
      name: 'JavaScript'
    }
  },
  {
    id: 'VjEtU2tpbGxTZXQtNjE5MDIx',
    main: false,
    rating: SkillRating.STRONG,
    skill: {
      id: 'node',
      name: 'Node.js'
    }
  },
  {
    id: 'VjEtU2tpbGxTZXQtNjE5MDIy',
    main: false,
    rating: SkillRating.COMPETENT,
    skill: {
      id: 'graphql',
      name: 'GraphQL'
    }
  }
]

jest.mock('./components/JobSkillsFilterItem', () => ({
  __esModule: true,
  default: ({ skillSet }: JobSkillsFilterItemProps) => (
    <div data-testid={`job-skills-filter-item: ${skillSet.skill.name}`} />
  )
}))

interface ArrangeTestParams {
  skillSets: TalentsListJobSkillFragment[]
  webResource: Link
}

const arrangeTest = ({ skillSets, webResource }: ArrangeTestParams) => {
  useTalentApplicantsJobSkillsMock.mockReturnValue({
    data: {
      skillSets: {
        nodes: skillSets
      },
      webResource
    }
  })

  useJobSkillsFilterMock.mockReturnValue({
    selectedSkills: [],
    handleSkillDeselect: () => {},
    handleSkillSelect: () => {}
  })

  return render(
    <TestWrapper>
      <JobSkillsFilter
        filterValues={{}}
        handleFilterChange={() => {}}
        jobId={'1'}
      />
    </TestWrapper>
  )
}

describe('JobSkillsFilter', () => {
  it('renders fetched job name and skills', () => {
    arrangeTest({
      webResource: {
        text: 'Principal Software Developer'
      },
      skillSets: SKILL_SETS
    })

    expect(screen.getByTestId('job-skills-filter')).toHaveTextContent(
      'Principal Software Developer'
    )
    SKILL_SETS.forEach(skillSet => {
      expect(
        screen.getByTestId(`job-skills-filter-item: ${skillSet.skill.name}`)
      ).toBeInTheDocument()
    })
  })

  it('renders nothing if there are no skill sets', () => {
    arrangeTest({
      webResource: {
        text: 'Principal Software Developer'
      },
      skillSets: []
    })

    expect(screen.queryByTestId('job-skills-filter')).not.toBeInTheDocument()
  })
})
