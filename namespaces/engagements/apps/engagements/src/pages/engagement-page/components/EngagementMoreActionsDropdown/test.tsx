import React, { ComponentProps, ReactNode } from 'react'
import { screen, render } from '@testing-library/react'
import { EngagementStatus } from '@staff-portal/graphql/staff'
import { TestWrapperWithMocks } from '@staff-portal/test-utils'
import { EngagementFragment } from '@staff-portal/engagements-interviews'
import { createEngagementFragmentFragmentMock } from '@staff-portal/engagements-interviews/src/mocks'
import {
  StaffBillingCycleSettingsWidget,
  StaffCommitmentChangeWidget
} from '@staff-portal/billing-widgets'

import EngagementMoreActionsDropdown from './EngagementMoreActionsDropdown'

jest.mock('@staff-portal/jobs', () => ({
  JobApplicationQuestionsActions: jest.fn()
}))

jest.mock('@toptal/picasso/Menu', () => ({
  Item: ({ 'data-testid': datatestId }: { 'data-testid': string }) => (
    <div data-testid={datatestId} />
  )
}))
jest.mock('@staff-portal/ui', () => ({
  ...jest.requireActual('@staff-portal/ui'),
  MoreButton: ({ children }: { children: ReactNode[] }) => <div>{children}</div>
}))
jest.mock('@staff-portal/billing-widgets', () => ({
  StaffBillingCycleSettingsWidget: (
    props: ComponentProps<typeof StaffBillingCycleSettingsWidget>
  ) => (
    <div data-testid='BillingCycleSettingsWidget'>
      {props.children(jest.fn)}
    </div>
  ),
  StaffCommitmentChangeWidget: (
    props: ComponentProps<typeof StaffCommitmentChangeWidget>
  ) => <div data-testid='CommitmentChangeWidget'>{props.children(jest.fn)}</div>
}))

const arrangeTest = ({
  partialEngagement,
  engagementStatus,
  talentWebResourceUrl,
  jobTalentCount
}: {
  partialEngagement?: Partial<EngagementFragment>
  engagementStatus?: EngagementStatus
  talentWebResourceUrl?: string
  jobTalentCount?: number
} = {}) => {
  const engagement = createEngagementFragmentFragmentMock({
    engagement: partialEngagement,
    engagementStatus,
    talentWebResourceUrl,
    jobTalentCount
  })

  return render(
    <TestWrapperWithMocks>
      <EngagementMoreActionsDropdown engagement={engagement} />
    </TestWrapperWithMocks>
  )
}

describe('EngagementMoreActionsDropdown', () => {
  describe('when there are no additional conditions & status is "ACTIVE"', () => {
    it('shows proper items', () => {
      arrangeTest({
        engagementStatus: EngagementStatus.ACTIVE
      })

      expect(
        screen.queryByTestId('reschedule-internal-interview')
      ).toBeInTheDocument()
      expect(
        screen.queryByTestId('schedule-internal-interview')
      ).toBeInTheDocument()
      expect(
        screen.queryByTestId('cancel-engagement-draft')
      ).toBeInTheDocument()
      expect(screen.queryByTestId('send-top')).toBeInTheDocument()
      expect(screen.queryByTestId('import-top')).toBeInTheDocument()
      expect(screen.queryByTestId('import-sta-as-top')).toBeInTheDocument()
      expect(screen.queryByTestId('accept-candidate')).not.toBeInTheDocument()
      expect(
        screen.queryByTestId('send-engagement-client-email-item')
      ).toBeInTheDocument()
      expect(
        screen.queryByTestId('send-engagement-talent-email-item')
      ).toBeInTheDocument()
      expect(
        screen.queryByTestId('ChangeEngagementCommitmentMenuItem')
      ).toBeInTheDocument()
      expect(screen.queryByTestId('cancel-interview')).not.toBeInTheDocument()
      expect(screen.queryByTestId('reject-candidate')).not.toBeInTheDocument()
      expect(
        screen.queryByTestId('reschedule-interview-item')
      ).not.toBeInTheDocument()
      expect(
        screen.queryByTestId('ChangeEngagementStartDateMenuItem')
      ).toBeInTheDocument()
      expect(
        screen.queryByTestId('ChangeEngagementEndDateMenuItem')
      ).toBeInTheDocument()
      expect(
        screen.queryByTestId('BillingCycleSettingsMenuItem')
      ).toBeInTheDocument()
      expect(screen.queryByTestId('schedule-break')).toBeInTheDocument()
      expect(screen.queryByTestId('approve-trial')).not.toBeInTheDocument()
      expect(screen.queryByTestId('terminate-trial')).toBeInTheDocument()
      expect(screen.queryByTestId('reject-trial')).toBeInTheDocument()
      expect(screen.queryByTestId('reject-approved-trial')).toBeInTheDocument()
      expect(screen.queryByTestId('cancel-engagement')).toBeInTheDocument()
      expect(
        screen.queryByTestId('ReopenEngagementAndApproveTrialMenuItem')
      ).toBeInTheDocument()
      expect(screen.queryByTestId('revert-trial')).toBeInTheDocument()
      expect(screen.queryByTestId('approve-rejected-trial')).toBeInTheDocument()
    })
  })

  describe('when has one talent & status is "ACTIVE"', () => {
    it('shows proper items', () => {
      arrangeTest({
        engagementStatus: EngagementStatus.ACTIVE,
        jobTalentCount: 1
      })

      expect(
        screen.queryByTestId('cancel-engagement-draft')
      ).toBeInTheDocument()
      expect(screen.queryByTestId('send-top')).not.toBeInTheDocument()
      expect(screen.queryByTestId('import-top')).not.toBeInTheDocument()
      expect(screen.queryByTestId('import-sta-as-top')).not.toBeInTheDocument()
      expect(screen.queryByTestId('accept-candidate')).not.toBeInTheDocument()
      expect(
        screen.queryByTestId('send-engagement-client-email-item')
      ).toBeInTheDocument()
      expect(
        screen.queryByTestId('send-engagement-talent-email-item')
      ).toBeInTheDocument()
      expect(
        screen.queryByTestId('ChangeEngagementCommitmentMenuItem')
      ).toBeInTheDocument()
      expect(screen.queryByTestId('cancel-interview')).not.toBeInTheDocument()
      expect(screen.queryByTestId('reject-candidate')).not.toBeInTheDocument()
      expect(
        screen.queryByTestId('reschedule-interview-item')
      ).not.toBeInTheDocument()
      expect(
        screen.queryByTestId('ChangeEngagementStartDateMenuItem')
      ).toBeInTheDocument()
      expect(
        screen.queryByTestId('ChangeEngagementEndDateMenuItem')
      ).toBeInTheDocument()
      expect(
        screen.queryByTestId('BillingCycleSettingsMenuItem')
      ).not.toBeInTheDocument()
      expect(screen.queryByTestId('schedule-break')).toBeInTheDocument()
      expect(screen.queryByTestId('approve-trial')).not.toBeInTheDocument()
      expect(screen.queryByTestId('terminate-trial')).toBeInTheDocument()
      expect(screen.queryByTestId('reject-trial')).toBeInTheDocument()
      expect(screen.queryByTestId('reject-approved-trial')).toBeInTheDocument()
      expect(screen.queryByTestId('cancel-engagement')).toBeInTheDocument()
      expect(
        screen.queryByTestId('ReopenEngagementAndApproveTrialMenuItem')
      ).toBeInTheDocument()
      expect(screen.queryByTestId('revert-trial')).toBeInTheDocument()
      expect(screen.queryByTestId('approve-rejected-trial')).toBeInTheDocument()
      expect(
        screen.queryByTestId('schedule-interview-item')
      ).not.toBeInTheDocument()
    })
  })

  describe('when status is "IN_INTERVIEW"', () => {
    it('shows proper items', () => {
      arrangeTest({ engagementStatus: EngagementStatus.PENDING })

      expect(
        screen.queryByTestId('cancel-engagement-draft')
      ).toBeInTheDocument()
      expect(screen.queryByTestId('send-top')).toBeInTheDocument()
      expect(screen.queryByTestId('import-top')).toBeInTheDocument()
      expect(screen.queryByTestId('import-sta-as-top')).toBeInTheDocument()
      expect(screen.queryByTestId('accept-candidate')).toBeInTheDocument()
      expect(
        screen.queryByTestId('send-engagement-client-email-item')
      ).toBeInTheDocument()
      expect(
        screen.queryByTestId('send-engagement-talent-email-item')
      ).toBeInTheDocument()
      expect(
        screen.queryByTestId('ChangeEngagementCommitmentMenuItem')
      ).toBeInTheDocument()
      expect(screen.queryByTestId('cancel-interview')).toBeInTheDocument()
      expect(screen.queryByTestId('reject-candidate')).toBeInTheDocument()
      expect(
        screen.queryByTestId('reschedule-interview-item')
      ).toBeInTheDocument()
      expect(
        screen.queryByTestId('ChangeEngagementStartDateMenuItem')
      ).not.toBeInTheDocument()
      expect(
        screen.queryByTestId('ChangeEngagementEndDateMenuItem')
      ).not.toBeInTheDocument()
      expect(
        screen.queryByTestId('BillingCycleSettingsMenuItem')
      ).not.toBeInTheDocument()
      expect(screen.queryByTestId('schedule-break')).not.toBeInTheDocument()
      expect(screen.queryByTestId('approve-trial')).not.toBeInTheDocument()
      expect(screen.queryByTestId('terminate-trial')).not.toBeInTheDocument()
      expect(screen.queryByTestId('reject-trial')).not.toBeInTheDocument()
      expect(
        screen.queryByTestId('reject-approved-trial')
      ).not.toBeInTheDocument()
      expect(screen.queryByTestId('cancel-engagement')).toBeInTheDocument()
      expect(
        screen.queryByTestId('ReopenEngagementAndApproveTrialMenuItem')
      ).not.toBeInTheDocument()
      expect(screen.queryByTestId('revert-trial')).not.toBeInTheDocument()
      expect(screen.queryByTestId('approve-rejected-trial')).toBeInTheDocument()
      expect(
        screen.queryByTestId('schedule-interview-item')
      ).toBeInTheDocument()
    })
  })

  describe('when status is "REQUIRES_DECISION"', () => {
    it('shows proper items', () => {
      arrangeTest({ engagementStatus: EngagementStatus.ON_TRIAL })

      expect(
        screen.queryByTestId('cancel-engagement-draft')
      ).toBeInTheDocument()
      expect(screen.queryByTestId('send-top')).toBeInTheDocument()
      expect(screen.queryByTestId('import-top')).toBeInTheDocument()
      expect(screen.queryByTestId('import-sta-as-top')).toBeInTheDocument()
      expect(screen.queryByTestId('accept-candidate')).not.toBeInTheDocument()
      expect(
        screen.queryByTestId('send-engagement-client-email-item')
      ).toBeInTheDocument()
      expect(
        screen.queryByTestId('send-engagement-talent-email-item')
      ).toBeInTheDocument()
      expect(
        screen.queryByTestId('ChangeEngagementCommitmentMenuItem')
      ).toBeInTheDocument()
      expect(screen.queryByTestId('cancel-interview')).not.toBeInTheDocument()
      expect(screen.queryByTestId('reject-candidate')).not.toBeInTheDocument()
      expect(
        screen.queryByTestId('reschedule-interview-item')
      ).not.toBeInTheDocument()
      expect(
        screen.queryByTestId('ChangeEngagementStartDateMenuItem')
      ).toBeInTheDocument()
      expect(
        screen.queryByTestId('ChangeEngagementEndDateMenuItem')
      ).toBeInTheDocument()
      expect(
        screen.queryByTestId('BillingCycleSettingsMenuItem')
      ).toBeInTheDocument()
      expect(screen.queryByTestId('schedule-break')).toBeInTheDocument()
      expect(screen.queryByTestId('approve-trial')).toBeInTheDocument()
      expect(screen.queryByTestId('terminate-trial')).not.toBeInTheDocument()
      expect(screen.queryByTestId('reject-trial')).toBeInTheDocument()
      expect(screen.queryByTestId('reject-approved-trial')).toBeInTheDocument()
      expect(screen.queryByTestId('cancel-engagement')).toBeInTheDocument()
      expect(
        screen.queryByTestId('ReopenEngagementAndApproveTrialMenuItem')
      ).toBeInTheDocument()
      expect(screen.queryByTestId('revert-trial')).toBeInTheDocument()
      expect(screen.queryByTestId('approve-rejected-trial')).toBeInTheDocument()
      expect(
        screen.queryByTestId('schedule-interview-item')
      ).not.toBeInTheDocument()
    })
  })
})
