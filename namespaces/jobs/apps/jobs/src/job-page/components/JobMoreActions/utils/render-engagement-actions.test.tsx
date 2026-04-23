import React from 'react'
import { render, screen } from '@testing-library/react'
import {
  EmailMessagingEngagementClient,
  EmailMessagingEngagementTalent,
  EngagementOperations,
  EngagementStatus
} from '@staff-portal/graphql/staff'

import renderEngagementActions from './render-engagement-actions'
import { JobPageFragment } from '../../../pages/JobPage/data/get-job-page-data'

jest.mock('@staff-portal/engagements', () => ({
  SendEngagementClientEmailItem: () => (
    <div data-testid='SendEngagementClientEmailItem' />
  ),
  SendEngagementTalentEmailItem: () => (
    <div data-testid='SendEngagementTalentEmailItem' />
  ),
  ApproveEngagementTrialMenuItem: () => (
    <div data-testid='ApproveEngagementTrial' />
  ),
  CancelEngagementMenuItem: () => <div data-testid='CancelEngagement' />,
  RejectEngagementTrialMenuItem: () => (
    <div data-testid='RejectEngagementTrial' />
  ),
  RejectApprovedEngagementTrialMenuItem: () => (
    <div data-testid='RejectApprovedEngagementTrial' />
  ),
  TerminateEngagementMenuItem: () => <div data-testid='TerminateEngagement' />,
  ChangeEngagementCommitmentMenuItem: () => (
    <div data-testid='ChangeEngagementCommitmentMenuItem' />
  ),
  ChangeEngagementStartDateMenuItem: () => (
    <div data-testid='ChangeEngagementStartDateMenuItem' />
  ),
  ChangeEngagementEndDateMenuItem: () => (
    <div data-testid='ChangeEngagementEndDateMenuItem' />
  ),
  ScheduleBreakMenuItem: () => <div data-testid='ScheduleBreakMenuItem' />,
  REQUIRES_DECISION_STATUSES: jest.requireActual(
    '@staff-portal/engagements/src/config'
  ).REQUIRES_DECISION_STATUSES
}))

jest.mock('../../ReactivateEngagementMenuItem', () => ({
  __esModule: true,
  default: () => <div data-testid='ReactivateEngagement' />
}))

const arrangeTest = ({
  engagement
}: {
  engagement: Partial<JobPageFragment['jobCurrentEngagement']>
}) =>
  render(
    <>
      {renderEngagementActions({
        engagement: engagement as JobPageFragment['jobCurrentEngagement']
      })}
    </>
  )

describe('renderEngagementActions', () => {
  describe('when there is no engagement', () => {
    it('returns null', () => {
      const { container } = arrangeTest({ engagement: null })

      expect(container).toBeEmptyDOMElement()
    })
  })

  describe('when there are multiple talents', () => {
    it('returns null', () => {
      const { container } = arrangeTest({
        engagement: { job: { id: '1', talentCount: 2 } }
      })

      expect(container).toBeEmptyDOMElement()
    })
  })

  describe('when engagement is in `requires decision` status', () => {
    it('renders Approve Engagement Trial action', () => {
      arrangeTest({
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        engagement: { status: EngagementStatus.ON_HOLD, operations: {} as any }
      })

      expect(screen.queryByTestId('ApproveEngagementTrial')).toBeInTheDocument()
      expect(
        screen.queryByTestId('TerminateEngagement')
      ).not.toBeInTheDocument()
    })
  })

  describe('when engagement is not in `requires decision` status', () => {
    it('renders Terminate Engagement action', () => {
      arrangeTest({
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        engagement: { status: EngagementStatus.ACTIVE, operations: {} as any }
      })

      expect(screen.queryByTestId('TerminateEngagement')).toBeInTheDocument()
      expect(
        screen.queryByTestId('ApproveEngagementTrial')
      ).not.toBeInTheDocument()
    })
  })

  it('returns other engagement actions', () => {
    arrangeTest({
      engagement: {
        status: EngagementStatus.ACTIVE,
        operations: {} as EngagementOperations,
        clientEmailMessaging: {
          operations: {}
        } as EmailMessagingEngagementClient,
        talentEmailMessaging: {
          operations: {}
        } as EmailMessagingEngagementTalent
      }
    })

    expect(screen.getByTestId('RejectEngagementTrial')).toBeInTheDocument()
    expect(screen.getByTestId('CancelEngagement')).toBeInTheDocument()
    expect(screen.getByTestId('ReactivateEngagement')).toBeInTheDocument()
    expect(
      screen.getByTestId('ChangeEngagementCommitmentMenuItem')
    ).toBeInTheDocument()
    expect(
      screen.getByTestId('ChangeEngagementStartDateMenuItem')
    ).toBeInTheDocument()
    expect(
      screen.getByTestId('ChangeEngagementEndDateMenuItem')
    ).toBeInTheDocument()
    expect(
      screen.getByTestId('SendEngagementClientEmailItem')
    ).toBeInTheDocument()
    expect(
      screen.getByTestId('SendEngagementTalentEmailItem')
    ).toBeInTheDocument()
    expect(screen.getByTestId('ScheduleBreakMenuItem')).toBeInTheDocument()
  })
})
