import React, { PropsWithChildren } from 'react'
import { Button, Modal } from '@toptal/picasso'
import { Form } from '@toptal/picasso-forms'
import { isMaxLength } from '@staff-portal/validators'

import { JobDetails } from '../../types'
import ApproveJobSubtitle from '../ApproveJobSubtitle'
import {
  ApproveJobCategoriesSelect,
  FormSpecializationSelect,
  ApproveJobIntroduction,
  LongShotReasons,
  JobDeposit,
  MatchingCallInfo,
  JobBudgetDetails
} from './components'
import {
  FormClaimerSelect,
  FormMatchingCallSelect
} from '../../../../components'

export interface Props {
  onClose: () => void
  job: JobDetails
  inTalentMatchers: boolean
  canManageJobMaxHourlyRate: boolean
  jobLongshotReasons: string[]
  jobUncertainOfBudgetReasons: string[]
}

const HOURLY_COMMITMENT = 'hourly'

const ApproveJobStep1 = ({
  job: {
    title,
    availableSpecializations,
    client: { depositInvoices, jobDepositCanBeIssued },
    vertical,
    possiblyRelatedMeetings,
    commitment,
    requiresMatchingCallInfo
  },
  jobLongshotReasons,
  jobUncertainOfBudgetReasons,
  inTalentMatchers,
  canManageJobMaxHourlyRate,
  onClose,
  children
}: PropsWithChildren<Props>) => (
  <>
    <Modal.Content>
      {children}
      <ApproveJobSubtitle>{title}</ApproveJobSubtitle>

      <ApproveJobIntroduction
        jobDepositCanBeIssued={jobDepositCanBeIssued}
        inTalentMatchers={inTalentMatchers}
      />

      <FormSpecializationSelect
        availableSpecializations={availableSpecializations?.nodes}
      />

      <ApproveJobCategoriesSelect
        availableCategories={vertical?.jobCategories.nodes}
      />

      {!inTalentMatchers && (
        <FormClaimerSelect
          name='claimerId'
          label='Claimer'
          titleCase={false}
          width='full'
          required
          data-testid='approve-job-step-claimer'
        />
      )}

      {possiblyRelatedMeetings?.nodes &&
        possiblyRelatedMeetings.nodes.length > 1 && (
          <FormMatchingCallSelect
            name='meetingId'
            label='Matching call'
            titleCase={false}
            meetings={possiblyRelatedMeetings?.nodes}
          />
        )}

      {!inTalentMatchers && (
        <Form.Input
          name='comment'
          label='Comment'
          titleCase={false}
          required
          width='full'
          multiline
          rows={4}
          validate={isMaxLength}
          data-testid='approve-job-step-comment'
        />
      )}

      <JobDeposit
        jobDepositCanBeIssued={jobDepositCanBeIssued}
        depositInvoices={depositInvoices?.nodes}
      />

      {canManageJobMaxHourlyRate && (
        <JobBudgetDetails
          jobUncertainOfBudgetReasons={jobUncertainOfBudgetReasons}
        />
      )}

      <LongShotReasons jobLongshotReasons={jobLongshotReasons} />

      {commitment === HOURLY_COMMITMENT && (
        <Form.NumberInput
          name='expectedWeeklyHours'
          label='Expected weekly hours'
          titleCase={false}
          width='full'
          required
        />
      )}

      <MatchingCallInfo requiresMatchingCallInfo={requiresMatchingCallInfo} />

      <Form.Checkbox
        name='hiddenForTalents'
        titleCase={false}
        label='Hide job in Talent Portal'
        hint={`When checked, this job won't appear in search, eligible jobs, job alerts, or recommended jobs, but it will be available via direct link or job interest request.`}
      />
    </Modal.Content>

    <Modal.Actions>
      <Button variant='secondary' onClick={onClose}>
        Cancel
      </Button>
      <Form.SubmitButton variant='positive'>
        Next - Review Job Skills
      </Form.SubmitButton>
    </Modal.Actions>
  </>
)

export default ApproveJobStep1
