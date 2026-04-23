import React from 'react'
import { getNodeText, render, screen } from '@testing-library/react'
import {
  JobCommitment,
  JobEstimatedLengths,
  JobHoursOverlap,
  JobProjectSpecCompleteness,
  JobProjectTeamInvolved,
  OperationCallableTypes
} from '@staff-portal/graphql/staff'
import { TestWrapper } from '@staff-portal/test-utils'
import { NO_VALUE } from '@staff-portal/config'

import { VerticalFragment } from '../DraftJobSection/data/vertical-fragment'
import { DraftJobSkillSetFragment } from '../DraftJobSection/data/draft-job-skill-set-fragment'
import { DraftJobFragment } from '../DraftJobSection/data/draft-job-fragment'
import { NO_DESCRIPTION, NO_FIELD } from '../../config'
import DraftJobContent, { Props } from './DraftJobContent'
import { Props as DraftJobEditButtonProps } from '../DraftJobEditButton/DraftJobEditButton'
import { useGetPreferredHours } from '../../hooks'

jest.mock('../DraftJobDeleteButton', () => 'mock-draft-job-delete-button')

jest.mock(
  '../DraftJobEditButton',
  () =>
    ({ onClick }: DraftJobEditButtonProps) =>
      <div data-testid='mock-draft-job-edit-button' onClick={onClick} />
)

jest.mock('../../hooks')
const mockUseGetPreferredHours = useGetPreferredHours as jest.Mock

const draftJob: DraftJobFragment = {
  id: 'a dj id',
  title: 'A title',
  description: 'Noot noot, this is a job description',
  commitment: JobCommitment.FULL_TIME,
  estimatedLength: JobEstimatedLengths.LENGTH_2_3_MONTHS,
  maxHourlyRate: 2,
  startDate: '2020-04-20',
  vertical: { id: 'doot', talentType: 'developer' } as VerticalFragment,
  verticals: {
    edges: [
      {
        node: { talentType: 'developer' } as VerticalFragment,
        skillSets: {
          nodes: [
            { skillName: 'react' },
            { skillName: 'css3' }
          ] as DraftJobSkillSetFragment[]
        }
      }
    ]
  },
  operations: {
    updateSalesDraftJob: {
      callable: OperationCallableTypes.ENABLED,
      messages: []
    },
    removeSalesDraftJob: {
      callable: OperationCallableTypes.ENABLED,
      messages: []
    }
  },
  commitmentSurvey: {
    question: 'commitmentSurvey',
    options: []
  },
  estimatedLengthSurvey: {
    question: 'estimatedLengthSurvey',
    options: []
  },
  industries: {
    nodes: [
      {
        id: '1',
        name: 'industry-1'
      }
    ]
  },
  projectSpecCompleteness: JobProjectSpecCompleteness.N_A,
  projectSpecCompletenessSurvey: {
    question: 'projectSpecCompletenessSurvey',
    options: [
      {
        value: JobProjectSpecCompleteness.N_A,
        label: 'name'
      }
    ]
  },
  projectTeamInvolved: JobProjectTeamInvolved.INVOLVED_NO_TEAM,
  projectTeamInvolvedSurvey: {
    question: 'projectTeamInvolvedSurvey',
    options: [
      {
        value: JobProjectTeamInvolved.INVOLVED_NO_TEAM,
        label: 'name'
      }
    ]
  },
  talentCount: 1,
  talentCountSurvey: {
    question: 'projectTeamInvolvedSurvey',
    options: []
  },
  startDateSurvey: {
    question: 'startDateSurvey',
    options: []
  },
  hasPreferredHours: false,
  workingTimeFrom: null,
  workingTimeTo: null
}

const mockReturnValues = () => {
  mockUseGetPreferredHours.mockReturnValue('preferred-hours-mock')
}

const renderComponent = (props: Props) => {
  mockReturnValues()

  render(
    <TestWrapper>
      <DraftJobContent onEditClick={() => {}} {...props} />
    </TestWrapper>
  )
}

describe('DraftJobContent', () => {
  it('renders draft job content', () => {
    renderComponent({ draftJob })
    ;[
      'Developer',
      'A title',
      'Noot noot, this is a job description',
      'Full-time',
      '2-3 months',
      'April 20th, 2020',
      'react',
      'css3'
    ].forEach(text => {
      expect(screen.queryByText(text)).toBeInTheDocument()
    })
  })

  it('renders skills as talent search links', () => {
    renderComponent({ draftJob })

    screen.getAllByTestId('skill-tag-link').forEach(link => {
      expect(link).toHaveAttribute(
        'href',
        expect.stringContaining(encodeURI('sort[order]=desc'))
      )
      expect(link).toHaveAttribute(
        'href',
        expect.stringContaining(encodeURI('sort[target]=relevance'))
      )
      expect(link).toHaveAttribute(
        'href',
        expect.stringContaining(encodeURI('logic=and'))
      )
      expect(link).toHaveAttribute(
        'href',
        expect.stringContaining(
          encodeURI(`badges[skills][competent][]=${getNodeText(link)}`)
        )
      )
    })
  })

  it('renders `Not specified` for empty commitment, length, and start date', () => {
    const partialDraftJob = {
      ...draftJob,
      commitment: undefined,
      estimatedLength: undefined,
      maxHourlyRate: undefined,
      projectSpecCompleteness: undefined,
      projectTeamInvolved: undefined,
      startDate: undefined,
      talentCount: undefined
    }

    renderComponent({ draftJob: partialDraftJob })

    expect(screen.getAllByText(NO_FIELD)).toHaveLength(6)
  })

  it('renders dash for empty industries, skills, vertical', () => {
    const partialDraftJob = {
      ...draftJob,
      industries: {
        nodes: []
      },
      title: undefined,
      verticals: { edges: [] }
    }

    renderComponent({ draftJob: partialDraftJob })

    expect(screen.getAllByText(NO_VALUE)).toHaveLength(3)
  })

  it('renders empty description', () => {
    const partialDraftJob = { ...draftJob, description: undefined }

    renderComponent({ draftJob: partialDraftJob })

    expect(screen.getByText(NO_DESCRIPTION)).toBeInTheDocument()
  })

  it('calls onEditClick callback', () => {
    const mockOnEditClick = jest.fn()

    renderComponent({ onEditClick: mockOnEditClick, draftJob })
    screen.getByTestId('mock-draft-job-edit-button').click()

    expect(mockOnEditClick).toHaveBeenCalledWith(draftJob)
  })

  it('renders PreferredHours component', () => {
    const preferredHoursDraftJobProps = {
      timeZoneName: 'Europe/Berlin',
      hoursOverlap: JobHoursOverlap.HOUR_5
    }

    renderComponent({
      draftJob: { ...draftJob, ...preferredHoursDraftJobProps }
    })

    expect(mockUseGetPreferredHours).toHaveBeenCalledWith(
      preferredHoursDraftJobProps
    )
  })
})
