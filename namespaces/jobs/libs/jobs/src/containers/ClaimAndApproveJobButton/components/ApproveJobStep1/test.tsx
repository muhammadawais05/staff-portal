import React, { ReactNode, PropsWithChildren } from 'react'
import { render } from '@testing-library/react'
import { TestWrapper } from '@staff-portal/test-utils'

import ApproveJobStep1 from './ApproveJobStep1'
import { GetApproveJobDetailsQuery } from '../../data'

const COMMENT_FIELD_ID = 'comment'
const HIDDEN_FOR_TALENTS_FIELD_ID = 'hiddenForTalents'
const EXPECTED_WEEKLY_HOURS_FIELD_ID = 'expectedWeeklyHours'
const FORM_CLAIMER_SELECT_FIELD_ID = 'claimerId'
const FORM_MATCHING_FIELD_ID = 'meetingId'
const APPROVE_JOB_MODAL_SUBTITLE = 'APPROVE_JOB_MODAL_SUBTITLE'
const APPROVE_JOB_CATEGORIES_ID = 'APPROVE_JOB_CATEGORIES_ID'
const FORM_SPECIALIZATION_SELECT_ID = 'FORM_SPECIALIZATION_SELECT_ID'
const APPROVE_JOB_INTRODUCTION_ID = 'APPROVE_JOB_INTRODUCTION_ID'
const LONG_SHOT_REASONS_ID = 'LONG_SHOT_REASONS_ID'
const JOB_DEPOSIT_ID = 'JOB_DEPOSIT_ID'
const MATCHING_CALL_INFO_ID = 'MATCHING_CALL_INFO_ID'
const JOB_BUDGET_DETAILS_ID = 'JOB_BUDGET_DETAILS_ID'

jest.mock('@toptal/picasso-forms', () => ({
  Form: {
    ...jest.requireActual('@toptal/picasso-forms').Form,
    Input: ({ name }: { name: string }) => <div data-testid={name} />,
    NumberInput: ({ name }: { name: string }) => <div data-testid={name} />,
    Checkbox: ({ name }: { name: string }) => <div data-testid={name} />,
    SubmitButton: () => <div />
  }
}))

jest.mock('../ApproveJobModalTitle', () => ({
  __esModule: true,
  default: () => <div />
}))

jest.mock('../ApproveJobSubtitle', () => ({
  __esModule: true,
  default: ({ children }: PropsWithChildren<object>) => (
    <div data-testid={APPROVE_JOB_MODAL_SUBTITLE}>{children}</div>
  )
}))

jest.mock('../../../../components/FormClaimerSelect', () => ({
  __esModule: true,
  default: ({ name }: { name: string }) => <div data-testid={name} />
}))

jest.mock('../../../../components/FormMatchingCallSelect', () => ({
  __esModule: true,
  default: ({ name }: { name: string }) => <div data-testid={name} />
}))

jest.mock('./components', () => ({
  ApproveJobCategoriesSelect: () => (
    <div data-testid={APPROVE_JOB_CATEGORIES_ID} />
  ),
  FormSpecializationSelect: () => (
    <div data-testid={FORM_SPECIALIZATION_SELECT_ID} />
  ),
  ApproveJobIntroduction: () => (
    <div data-testid={APPROVE_JOB_INTRODUCTION_ID} />
  ),
  LongShotReasons: () => <div data-testid={LONG_SHOT_REASONS_ID} />,
  JobDeposit: () => <div data-testid={JOB_DEPOSIT_ID} />,
  MatchingCallInfo: () => <div data-testid={MATCHING_CALL_INFO_ID} />,
  JobBudgetDetails: () => <div data-testid={JOB_BUDGET_DETAILS_ID} />
}))

const arrangeTest = ({
  inTalentMatchers = false,
  canManageJobMaxHourlyRate = false,
  commitment,
  title,
  possibleRelatedMeetings = [],
  children
}: {
  possibleRelatedMeetings?: { id: string }[]
  inTalentMatchers?: boolean
  canManageJobMaxHourlyRate?: boolean
  commitment?: string
  title?: string
  children?: ReactNode
} = {}) =>
  render(
    <TestWrapper>
      <ApproveJobStep1
        job={
          {
            title,
            commitment,
            client: {},
            possiblyRelatedMeetings: { nodes: possibleRelatedMeetings }
          } as NonNullable<GetApproveJobDetailsQuery['node']>
        }
        onClose={() => {}}
        inTalentMatchers={inTalentMatchers}
        canManageJobMaxHourlyRate={canManageJobMaxHourlyRate}
        jobUncertainOfBudgetReasons={[]}
        jobLongshotReasons={[]}
      >
        {children}
      </ApproveJobStep1>
    </TestWrapper>
  )

describe('ApproveJobStep1', () => {
  it('renders children', () => {
    const CHILDREN_ID = 'CHILDREN_ID'

    const { getByTestId } = arrangeTest({
      children: <div data-testid={CHILDREN_ID} />
    })

    expect(getByTestId(CHILDREN_ID)).toBeInTheDocument()
  })

  it('renders job title', () => {
    const title = 'JOB_TITLE'

    const { getByTestId } = arrangeTest({ title })

    expect(getByTestId(APPROVE_JOB_MODAL_SUBTITLE)).toBeInTheDocument()
    expect(getByTestId(APPROVE_JOB_MODAL_SUBTITLE)).toHaveTextContent(title)
  })

  it('renders `ApproveJobIntroduction`', () => {
    const { getByTestId } = arrangeTest()

    expect(getByTestId(APPROVE_JOB_INTRODUCTION_ID)).toBeInTheDocument()
  })

  it('renders `FormSpecializationSelect`', () => {
    const { getByTestId } = arrangeTest()

    expect(getByTestId(FORM_SPECIALIZATION_SELECT_ID)).toBeInTheDocument()
  })

  it('renders `ApproveJobCategoriesSelect`', () => {
    const { getByTestId } = arrangeTest()

    expect(getByTestId(APPROVE_JOB_CATEGORIES_ID)).toBeInTheDocument()
  })

  describe('when `inTalentMatchers` is not present', () => {
    it('renders `FormClaimerSelect`', () => {
      const { getByTestId } = arrangeTest({ inTalentMatchers: false })

      expect(getByTestId(FORM_CLAIMER_SELECT_FIELD_ID)).toBeInTheDocument()
    })

    it('renders `comment` field', () => {
      const { getByTestId } = arrangeTest({ inTalentMatchers: false })

      expect(getByTestId(COMMENT_FIELD_ID)).toBeInTheDocument()
    })
  })

  describe('when `inTalentMatchers` is present', () => {
    it('does not render `FormClaimerSelect`', () => {
      const { queryByTestId } = arrangeTest({ inTalentMatchers: true })

      expect(
        queryByTestId(FORM_CLAIMER_SELECT_FIELD_ID)
      ).not.toBeInTheDocument()
    })

    it('does not render `comment` field', () => {
      const { queryByTestId } = arrangeTest({ inTalentMatchers: true })

      expect(queryByTestId(COMMENT_FIELD_ID)).not.toBeInTheDocument()
    })
  })

  describe('when `possibleRelatedMeetings` has more than 1 element', () => {
    it('renders `FormMatchingCallSelect`', () => {
      const { getByTestId } = arrangeTest({
        possibleRelatedMeetings: [{ id: '1' }, { id: '1' }]
      })

      expect(getByTestId(FORM_MATCHING_FIELD_ID)).toBeInTheDocument()
    })
  })

  describe('when `possibleRelatedMeetings` has 1 element', () => {
    it('renders `FormMatchingCallSelect`', () => {
      const { queryByTestId } = arrangeTest({
        possibleRelatedMeetings: [{ id: '1' }]
      })

      expect(queryByTestId(FORM_MATCHING_FIELD_ID)).not.toBeInTheDocument()
    })
  })

  describe('when `possibleRelatedMeetings` is empty', () => {
    it('renders `FormMatchingCallSelect`', () => {
      const { queryByTestId } = arrangeTest()

      expect(queryByTestId(FORM_MATCHING_FIELD_ID)).not.toBeInTheDocument()
    })
  })

  it('renders `JobDeposit`', () => {
    const { getByTestId } = arrangeTest()

    expect(getByTestId(JOB_DEPOSIT_ID)).toBeInTheDocument()
  })

  describe('when `canManageJobMaxHourlyRate` is present', () => {
    it('renders `JobBudgetDetails`', () => {
      const { getByTestId } = arrangeTest({ canManageJobMaxHourlyRate: true })

      expect(getByTestId(JOB_BUDGET_DETAILS_ID)).toBeInTheDocument()
    })
  })
  describe('when `canManageJobMaxHourlyRate` is not present', () => {
    it('does not render `JobBudget`', () => {
      const { queryByTestId } = arrangeTest({
        canManageJobMaxHourlyRate: false
      })

      expect(queryByTestId(JOB_BUDGET_DETAILS_ID)).not.toBeInTheDocument()
    })
  })

  it('renders `LongshotReasons`', () => {
    const { getByTestId } = arrangeTest()

    expect(getByTestId(LONG_SHOT_REASONS_ID)).toBeInTheDocument()
  })

  describe('when commitment is hourly', () => {
    it('renders `expectedWeeklyHours` field', () => {
      const { getByTestId } = arrangeTest({ commitment: 'hourly' })

      expect(getByTestId(EXPECTED_WEEKLY_HOURS_FIELD_ID)).toBeInTheDocument()
    })
  })

  describe('when commitment is not hourly', () => {
    it('does not render `expectedWeeklyHours` field', () => {
      const { queryByTestId } = arrangeTest({ commitment: undefined })

      expect(
        queryByTestId(EXPECTED_WEEKLY_HOURS_FIELD_ID)
      ).not.toBeInTheDocument()
    })
  })

  it('renders `MatchingCallInfo`', () => {
    const { getByTestId } = arrangeTest()

    expect(getByTestId(MATCHING_CALL_INFO_ID)).toBeInTheDocument()
  })

  it('renders `hiddenForTalents` field', () => {
    const { getByTestId } = arrangeTest()

    expect(getByTestId(HIDDEN_FOR_TALENTS_FIELD_ID)).toBeInTheDocument()
  })
})
