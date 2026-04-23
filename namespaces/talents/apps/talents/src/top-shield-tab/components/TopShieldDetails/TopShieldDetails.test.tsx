import React, { ComponentProps } from 'react'
import { render, screen } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'
import { createTopShieldApplicationMock } from '@staff-portal/talents-top-shield/src/mocks'
import { TopShieldApplicationStatus } from '@staff-portal/graphql/staff'

import TopShieldDetails from '.'

jest.mock('@staff-portal/talents-top-shield', () => ({
  TopShieldSkill: () => <div></div>,
  TopShieldStatus: () => <div></div>,
  TopShieldSegment: () => <div></div>,
  TopShieldStartDate: () => <div></div>,
  TopShieldInterviewCompletedOn: () => <div></div>,
  TopShieldContractSignedDate: () => <div></div>,
  TopShieldInitialPitchDate: () => <div></div>,
  TopShieldScheduledEndDate: () => <div></div>,
  TopShieldOutreachStage: () => <div></div>,
  TopShieldOutreachStatus: () => <div></div>
}))

const arrangeTest = (
  props: Omit<ComponentProps<typeof TopShieldDetails>, 'talentId'>
) => {
  return render(
    <TestWrapper>
      <TopShieldDetails
        talentId='123'
        topShieldApplication={props.topShieldApplication}
        loading={props.loading}
      />
    </TestWrapper>
  )
}

describe('TopShieldDetails', () => {
  describe('when application is "Prospective Candidate", "Not a fit" or "Former"', () => {
    it('renders all top shield fields', () => {
      const talentTopShield = createTopShieldApplicationMock(undefined, {
        status: TopShieldApplicationStatus.FORMER
      })

      arrangeTest({
        topShieldApplication: talentTopShield.topShieldApplication,
        loading: false
      })

      expect(screen.getByText('Status')).toBeInTheDocument()
      expect(screen.getByText('Segment')).toBeInTheDocument()
      expect(screen.getByText('Initial Pitch Date')).toBeInTheDocument()
      expect(screen.getByText('Contract Signed Date')).toBeInTheDocument()
      expect(screen.getByText('TopShield Start Date')).toBeInTheDocument()
      expect(screen.getByText('Scheduled End Date')).toBeInTheDocument()
      expect(screen.getByText('TopShield Skill')).toBeInTheDocument()
      expect(screen.getByText('Interview Completed On')).toBeInTheDocument()
      expect(screen.getByText('Outreach Stage')).toBeInTheDocument()
      expect(screen.getByText('Outreach Status')).toBeInTheDocument()
    })
  })

  describe('when application is active or pending start', () => {
    it('does not render outreach status and stage', () => {
      const talentTopShield = createTopShieldApplicationMock(undefined, {
        status: TopShieldApplicationStatus.PENDING_START
      })

      arrangeTest({
        topShieldApplication: talentTopShield.topShieldApplication,
        loading: false
      })

      expect(screen.queryByText('Outreach Stage')).not.toBeInTheDocument()
      expect(screen.queryByText('Outreach Status')).not.toBeInTheDocument()
    })
  })
})
