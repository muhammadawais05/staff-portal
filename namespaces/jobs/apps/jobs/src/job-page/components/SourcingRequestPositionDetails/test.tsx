import React, { ComponentProps } from 'react'
import { screen, render, within } from '@testing-library/react'
import { BusinessTypes } from '@staff-portal/graphql/staff'
import { TestWrapper } from '@staff-portal/test-utils'
import { useGetNode } from '@staff-portal/data-layer-service'
import { JobSkillTag } from '@staff-portal/jobs'

import SourcingRequestPositionDetails from './SourcingRequestPositionDetails'

jest.mock('@staff-portal/data-layer-service')
jest.mock('@staff-portal/jobs/src/components/JobSkillTag/JobSkillTag', () => ({
  __esModule: true,
  default: (props: ComponentProps<typeof JobSkillTag>) => {
    return (
      <span data-testid='sourcing-request-skill-list'>
        {props.skillSet.skill.name}
      </span>
    )
  }
}))
jest.mock('@staff-portal/engagements')
jest.mock('@staff-portal/current-user', () => ({
  ...jest.requireActual('@staff-portal/current-user'),
  useUserDateFormatter: () => jest.fn(() => '20 Nov 2021')
}))

const useGetNodeMock = useGetNode as jest.Mock

const jobMock = {
  id: 'job-id',
  client: {
    businessType: BusinessTypes.ENTERPRISE_BUSINESS,
    enterprise: false
  }
}

const arrangeTest = (props: {}) => {
  useGetNodeMock.mockReturnValue(() => {
    return {
      data: {
        ...jobMock,
        ...props
      }
    }
  })

  return render(
    <TestWrapper>
      <SourcingRequestPositionDetails jobId={jobMock.id} />
    </TestWrapper>
  )
}

describe('SourcingRequestPositionDetails', () => {
  it('renders positions', () => {
    arrangeTest({
      sourcingRequest: {
        positions: '12345',
        positionsComment: 'some-comment'
      }
    })

    expect(
      within(screen.getByTestId('sourcing-request-positions')).getByText(
        '12345'
      )
    ).toBeInTheDocument()

    expect(
      within(screen.getByTestId('sourcing-request-positions')).getByText(
        /some-comment/
      )
    ).toBeInTheDocument()
  })

  describe('extra info field', () => {
    it('renders extra info comment', () => {
      arrangeTest({
        sourcingRequest: {
          extraInformation: true,
          extraInformationComment: 'Extra comment'
        }
      })

      expect(
        within(screen.getByTestId('sourcing-request-extrainfo')).getByText(
          'Extra comment'
        )
      ).toBeInTheDocument()
    })

    it('renders when no extra info present', () => {
      arrangeTest({
        sourcingRequest: {
          extraInformation: false
        }
      })

      expect(
        within(screen.getByTestId('sourcing-request-extrainfo')).getByText('No')
      ).toBeInTheDocument()
    })
  })

  it('renders selling points', () => {
    arrangeTest({
      sourcingRequest: {
        sellingPoints: 'sellingPoints123'
      }
    })

    expect(screen.getByText('sellingPoints123')).toBeInTheDocument()
  })

  it('renders nice-to-have skills', () => {
    const skill = {
      id: 'VjEtU2tpbGxTZXQtMzE4MTk5NQ',
      niceToHave: true,
      skill: {
        id: 'VjEtU2tpbGwtMzY5MTQ',
        name: 'JavaScript'
      }
    }

    arrangeTest({
      sourcingRequest: {
        skillSets: {
          nodes: [skill]
        }
      }
    })

    expect(
      within(screen.getByTestId('sourcing-request-nice-skills')).getByText(
        'JavaScript'
      )
    ).toBeInTheDocument()
  })

  it('renders must-have skills', () => {
    const skill = {
      id: 'VjEtU2tpbGxTZXQtMzE4MTk5NQ',
      niceToHave: false,
      skill: {
        id: 'VjEtU2tpbGwtMzY5MTQ',
        name: 'GOLANG'
      }
    }

    arrangeTest({
      sourcingRequest: {
        skillSets: {
          nodes: [skill]
        }
      }
    })

    expect(
      within(screen.getByTestId('sourcing-request-must-skills')).getByText(
        'GOLANG'
      )
    ).toBeInTheDocument()
  })

  it('renders deadline field', () => {
    arrangeTest({
      sourcingRequest: {
        jobStartDeadline: '20 Nov 2021',
        jobStartDeadlineComment: 'deadline comment'
      }
    })

    expect(
      within(screen.getByTestId('sourcing-request-deadline')).getByText(
        /deadline comment/
      )
    ).toBeInTheDocument()

    expect(
      within(screen.getByTestId('sourcing-request-deadline')).getByText(
        '20 Nov 2021'
      )
    ).toBeInTheDocument()
  })

  describe('renders qualification field', () => {
    it('render with furtherQualificationInterviews', () => {
      arrangeTest({
        sourcingRequest: {
          furtherQualificationInterviews: true,
          furtherQualificationInterviewsComment: 'qualification-comment'
        }
      })

      expect(
        within(screen.getByTestId('sourcing-request-qualification')).getByText(
          /Yes/
        )
      ).toBeInTheDocument()

      expect(
        within(screen.getByTestId('sourcing-request-qualification')).getByText(
          /qualification-comment/
        )
      ).toBeInTheDocument()
    })

    it('render without furtherQualificationInterviews', () => {
      arrangeTest({
        sourcingRequest: {
          furtherQualificationInterviews: false
        }
      })

      expect(
        within(screen.getByTestId('sourcing-request-qualification')).getByText(
          /No/
        )
      ).toBeInTheDocument()
    })
  })
})
