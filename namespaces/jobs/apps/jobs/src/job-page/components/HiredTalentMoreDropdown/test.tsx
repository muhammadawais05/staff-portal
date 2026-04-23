import React, { ComponentProps, ReactNode } from 'react'
import { screen, render } from '@testing-library/react'
import { EngagementStatus } from '@staff-portal/graphql/staff'
import { TestWrapperWithMocks } from '@staff-portal/test-utils'
import {
  StaffBillingCycleSettingsWidget,
  StaffCommitmentChangeWidget
} from '@staff-portal/billing-widgets'

import { HiredTalentEngagementFragment } from '../HiredTalentSection/data/get-hired-talent/get-hired-talent.staff.gql.types'
import { HiredTalentMoreDropdown } from '.'
import { createHiredTalentEngagementFragmentMock } from '../HiredTalentSection/data/get-hired-talent/mocks'

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

jest.mock('@staff-portal/jobs', () => ({
  getTalentProfileLinkTarget: jest.fn()
}))

const arrangeTest = ({
  partialEngagement,
  engagementWebResourceUrl,
  engagementStatus,
  talentWebResourceUrl,
  jobTalentCount
}: {
  partialEngagement?: Partial<HiredTalentEngagementFragment>
  engagementWebResourceUrl?: string
  engagementStatus?: EngagementStatus
  talentWebResourceUrl?: string
  jobTalentCount?: number
} = {}) => {
  const engagement = createHiredTalentEngagementFragmentMock({
    engagement: partialEngagement,
    engagementWebResourceUrl,
    engagementStatus,
    talentWebResourceUrl,
    jobTalentCount
  })

  return render(
    <TestWrapperWithMocks>
      <HiredTalentMoreDropdown engagement={engagement} />
    </TestWrapperWithMocks>
  )
}

describe('HiredTalentMoreDropdown', () => {
  describe('when Talent webResoure url is unavailable', () => {
    it('hides View Profile Link', () => {
      arrangeTest()

      expect(
        screen.queryByTestId('talent-web-resoure-link')
      ).not.toBeInTheDocument()
    })
  })

  describe('when Talent webResoure url is available', () => {
    it('shows View Profile Link', () => {
      arrangeTest({
        talentWebResourceUrl: 'https://some.talent.url'
      })

      expect(
        screen.queryByTestId('talent-web-resoure-link')
      ).toBeInTheDocument()
    })
  })

  describe('when Engagement webResoure url is unavailable', () => {
    it('hides View Engagement Link', () => {
      arrangeTest()

      expect(
        screen.queryByTestId('engagement-web-resoure-link')
      ).not.toBeInTheDocument()
    })
  })

  describe('when Engagement webResoure url is available', () => {
    it('shows View Engagement Link', () => {
      arrangeTest({ engagementWebResourceUrl: 'https://some.engagement.url' })

      expect(
        screen.queryByTestId('engagement-web-resoure-link')
      ).toBeInTheDocument()
    })
  })

  describe('when there are no additional conditions & status is "ACTIVE"', () => {
    it('shows proper items', () => {
      arrangeTest({
        engagementStatus: EngagementStatus.ACTIVE
      })

      expect(screen.queryByTestId('send-top')).toBeInTheDocument()
      expect(screen.queryByTestId('import-top')).toBeInTheDocument()
      expect(screen.queryByTestId('import-sta-as-top')).toBeInTheDocument()
      expect(
        screen.queryByTestId('ChangeEngagementCommitmentMenuItem')
      ).toBeInTheDocument()
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
      expect(
        screen.queryByTestId('send-engagement-client-email-item')
      ).toBeInTheDocument()
      expect(
        screen.queryByTestId('send-engagement-talent-email-item')
      ).toBeInTheDocument()
      expect(screen.queryByTestId('approve-trial')).not.toBeInTheDocument()
      expect(screen.queryByTestId('terminate-trial')).toBeInTheDocument()
      expect(screen.queryByTestId('reject-trial')).toBeInTheDocument()
      expect(screen.queryByTestId('reject-approved-trial')).toBeInTheDocument()
      expect(screen.queryByTestId('cancel-engagement')).toBeInTheDocument()
      expect(
        screen.queryByTestId('ReopenEngagementAndApproveTrialMenuItem')
      ).toBeInTheDocument()
      expect(screen.queryByTestId('revert-trial')).toBeInTheDocument()
      expect(screen.queryByTestId('reactivate-engagement')).toBeInTheDocument()
    })
  })

  describe('when has one talent & status is "ACTIVE"', () => {
    it('shows proper items', () => {
      arrangeTest({
        engagementStatus: EngagementStatus.ACTIVE,
        jobTalentCount: 1
      })

      expect(screen.queryByTestId('send-top')).toBeInTheDocument()
      expect(screen.queryByTestId('import-top')).toBeInTheDocument()
      expect(screen.queryByTestId('import-sta-as-top')).toBeInTheDocument()
      expect(
        screen.queryByTestId('ChangeEngagementCommitmentMenuItem')
      ).toBeInTheDocument()
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
      expect(
        screen.queryByTestId('send-engagement-client-email-item')
      ).toBeInTheDocument()
      expect(
        screen.queryByTestId('send-engagement-talent-email-item')
      ).toBeInTheDocument()
      expect(screen.queryByTestId('approve-trial')).not.toBeInTheDocument()
      expect(screen.queryByTestId('terminate-trial')).toBeInTheDocument()
      expect(screen.queryByTestId('reject-trial')).toBeInTheDocument()
      expect(screen.queryByTestId('reject-approved-trial')).toBeInTheDocument()
      expect(screen.queryByTestId('cancel-engagement')).toBeInTheDocument()
      expect(
        screen.queryByTestId('ReopenEngagementAndApproveTrialMenuItem')
      ).toBeInTheDocument()
      expect(screen.queryByTestId('revert-trial')).toBeInTheDocument()
      expect(screen.queryByTestId('reactivate-engagement')).toBeInTheDocument()
    })
  })

  describe('when status is "REQUIRES_DECISION"', () => {
    it('shows proper items', () => {
      arrangeTest({ engagementStatus: EngagementStatus.ON_TRIAL })

      expect(screen.queryByTestId('send-top')).toBeInTheDocument()
      expect(screen.queryByTestId('import-top')).toBeInTheDocument()
      expect(screen.queryByTestId('import-sta-as-top')).toBeInTheDocument()
      expect(
        screen.queryByTestId('ChangeEngagementCommitmentMenuItem')
      ).toBeInTheDocument()
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
      expect(
        screen.queryByTestId('send-engagement-client-email-item')
      ).toBeInTheDocument()
      expect(
        screen.queryByTestId('send-engagement-talent-email-item')
      ).toBeInTheDocument()
      expect(screen.queryByTestId('approve-trial')).toBeInTheDocument()
      expect(screen.queryByTestId('terminate-trial')).not.toBeInTheDocument()
      expect(screen.queryByTestId('reject-trial')).toBeInTheDocument()
      expect(screen.queryByTestId('reject-approved-trial')).toBeInTheDocument()
      expect(screen.queryByTestId('cancel-engagement')).toBeInTheDocument()
      expect(
        screen.queryByTestId('ReopenEngagementAndApproveTrialMenuItem')
      ).toBeInTheDocument()
      expect(screen.queryByTestId('revert-trial')).toBeInTheDocument()
      expect(screen.queryByTestId('reactivate-engagement')).toBeInTheDocument()
    })
  })

  describe('when status is "CLOSED"', () => {
    it('shows proper items', () => {
      arrangeTest({ engagementStatus: EngagementStatus.CLOSED })

      expect(screen.queryByTestId('send-top')).toBeInTheDocument()
      expect(screen.queryByTestId('import-top')).toBeInTheDocument()
      expect(screen.queryByTestId('import-sta-as-top')).toBeInTheDocument()
      expect(
        screen.queryByTestId('ChangeEngagementCommitmentMenuItem')
      ).toBeInTheDocument()
      expect(
        screen.queryByTestId('ChangeEngagementStartDateMenuItem')
      ).toBeInTheDocument()
      expect(
        screen.queryByTestId('ChangeEngagementEndDateMenuItem')
      ).toBeInTheDocument()
      expect(
        screen.queryByTestId('BillingCycleSettingsMenuItem')
      ).toBeInTheDocument()
      expect(screen.queryByTestId('approve-trial')).not.toBeInTheDocument()
      expect(screen.queryByTestId('schedule-break')).toBeInTheDocument()
      expect(
        screen.queryByTestId('send-engagement-client-email-item')
      ).toBeInTheDocument()
      expect(
        screen.queryByTestId('send-engagement-talent-email-item')
      ).toBeInTheDocument()
      expect(screen.queryByTestId('reactivate-engagement')).toBeInTheDocument()
    })
  })
})
