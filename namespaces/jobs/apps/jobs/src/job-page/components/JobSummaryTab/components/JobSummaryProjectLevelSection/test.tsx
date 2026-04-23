import React from 'react'
import { screen, render } from '@testing-library/react'
import {
  JobProjectSpecCompleteness,
  JobProjectTeamInvolved,
  JobProjectType
} from '@staff-portal/graphql/staff'
import { useGetNode } from '@staff-portal/data-layer-service'
import { TestWrapper } from '@staff-portal/test-utils'
import {
  JOB_PROJECT_SPEC_COMPLETENESS_MAPPING,
  JOB_PROJECT_TYPE_MAPPING
} from '@staff-portal/jobs'

import JobSummaryProjectLevelSection from './JobSummaryProjectLevelSection'
import { GetJobProjectQuery } from './data/get-job-project/get-job-project.staff.gql.types'
import { JOB_PROJECT_TEAM_ENVOLVED_MAPPING } from './constants'

jest.mock('@staff-portal/data-layer-service')
jest.mock('@staff-portal/engagements')

const JOB_ID = '123'

const mockUseGetNode = useGetNode as jest.Mock

const getMock = (node?: GetJobProjectQuery['node']) => ({
  id: JOB_ID,
  projectType: node?.projectType,
  projectTeamInvolved: node?.projectTeamInvolved,
  projectSpecCompleteness: node?.projectSpecCompleteness
})

const arrangeTest = () =>
  render(
    <TestWrapper>
      <JobSummaryProjectLevelSection jobId={JOB_ID} />
    </TestWrapper>
  )

describe('JobSummaryProjectLevelSection', () => {
  it('shows Type of Project field with filled icon', () => {
    const projectType =
      JobProjectType.EXISTING_PROJECT_THAT_NEEDS_MORE_RESOURCES

    mockUseGetNode.mockReturnValue(() => ({
      data: getMock({
        projectType
      } as GetJobProjectQuery['node']),
      loading: false
    }))

    arrangeTest()

    const projectTypeField = screen.getByText(
      JOB_PROJECT_TYPE_MAPPING[projectType]
    )
    const filledIcon = screen.getByTestId('TypeOfProjectField-filled-icon')

    expect(projectTypeField).toBeInTheDocument()
    expect(filledIcon).toBeInTheDocument()
  })

  it('shows No Value for Type of Project field with not filled icon', () => {
    const projectType = JobProjectType.NEW_IDEA_OR_PROJECT

    mockUseGetNode.mockReturnValue(() => ({
      data: getMock({
        projectType: null
      } as GetJobProjectQuery['node']),
      loading: false
    }))

    arrangeTest()

    const projectTypeField = screen.queryByText(
      JOB_PROJECT_TYPE_MAPPING[projectType]
    )
    const notFilledIcon = screen.getByTestId(
      'TypeOfProjectField-not-filled-icon'
    )

    expect(projectTypeField).not.toBeInTheDocument()
    expect(notFilledIcon).toBeInTheDocument()
  })

  it('shows Project Team Involved field', () => {
    const projectTeamInvolved = JobProjectTeamInvolved.INVOLVED_2_TO_6_MEMBERS

    mockUseGetNode.mockReturnValue(() => ({
      data: getMock({
        projectTeamInvolved
      } as GetJobProjectQuery['node']),
      loading: false
    }))

    arrangeTest()

    const projectTeamInvolvedField = screen.getByText(
      JOB_PROJECT_TEAM_ENVOLVED_MAPPING[projectTeamInvolved]
    )

    expect(projectTeamInvolvedField).toBeInTheDocument()
  })

  it('shows Spec Completeness field with filled icon', () => {
    const projectSpecCompleteness =
      JobProjectSpecCompleteness.HAS_A_CLEAR_IDEA_HAS_SPECS_HAS_DESIGNS

    mockUseGetNode.mockReturnValue(() => ({
      data: getMock({
        projectSpecCompleteness
      } as GetJobProjectQuery['node']),
      loading: false
    }))

    arrangeTest()

    const projectSpecCompletenessField = screen.getByText(
      JOB_PROJECT_SPEC_COMPLETENESS_MAPPING[projectSpecCompleteness]
    )
    const filledIcon = screen.getByTestId('SpecCompletenessField-filled-icon')

    expect(projectSpecCompletenessField).toBeInTheDocument()
    expect(filledIcon).toBeInTheDocument()
  })
})
