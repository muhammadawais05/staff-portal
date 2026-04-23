import React from 'react'
import { Container, Typography } from '@toptal/picasso'
import { Form } from '@toptal/picasso-forms'
import { JobStatus } from '@staff-portal/graphql/staff'
import { GridItemField } from '@staff-portal/ui'
import {
  JobCountryRequirementsTagSelector,
  JobEditFragment,
  JobEstimatedLengthSelect
} from '@staff-portal/jobs'
import { LanguagesTagSelector } from '@staff-portal/languages'

import {
  ExpectedWeeklyHoursInput,
  JobDesiredCommitmentSelect,
  JobLongshotReasonsCheckbox,
  JobTimeZoneSelect,
  JobWorkTypeSelect,
  MinimumCommitmentFields,
  OnSiteCountryAndCitySelect,
  TimeLengthOnsiteSelect,
  TimezonePreferenceFields,
  TimeZonePreferenceRadio,
  NoRateLimitCheckbox,
  JobUncertainOfBudgetFields,
  JobMaximumHourlyRateInput,
  JobUncertainOfBudgetReasonCommentField
} from './components'

interface Props {
  job: JobEditFragment
}

const JobDetailsFormContent = ({ job }: Props) => (
  <>
    <JobWorkTypeSelect />
    <TimeLengthOnsiteSelect />
    <JobDesiredCommitmentSelect disabled={job.status === JobStatus.ACTIVE} />
    <ExpectedWeeklyHoursInput />

    {job.commitmentSettings && <MinimumCommitmentFields />}

    <JobTimeZoneSelect />
    <TimeZonePreferenceRadio />
    <TimezonePreferenceFields />

    <GridItemField
      label='Country Requirements'
      labelFor='allowedCountryIds'
      size='medium'
    >
      <JobCountryRequirementsTagSelector />
    </GridItemField>

    <OnSiteCountryAndCitySelect />

    <GridItemField
      label='Estimated Length'
      labelFor='estimatedLength'
      required
      size='medium'
    >
      <JobEstimatedLengthSelect required />
    </GridItemField>

    <GridItemField
      label='Spoken Languages'
      labelFor='languageIds'
      required
      size='medium'
    >
      <LanguagesTagSelector required width='full' />
    </GridItemField>

    {job.status !== JobStatus.PENDING_CLAIM && (
      <>
        <Container top='small' bottom='small'>
          <GridItemField label='Skill Long Shot'>
            <Typography size='medium' weight='semibold'>
              {job.skillLongShot ? 'Yes' : 'No'}
            </Typography>
          </GridItemField>
        </Container>

        {job.nicheLongShot && (
          <Container top='small' bottom='small'>
            <GridItemField label='Niche Long Shot'>
              <Typography size='medium' weight='semibold'>
                Yes
              </Typography>
            </GridItemField>
          </Container>
        )}

        <JobLongshotReasonsCheckbox />
      </>
    )}

    <Container bottom='xsmall'>
      <JobMaximumHourlyRateInput
        fieldOptions={
          <>
            <NoRateLimitCheckbox />
            <JobUncertainOfBudgetFields />
          </>
        }
      />
      <JobUncertainOfBudgetReasonCommentField />
    </Container>

    <GridItemField label='Job Description' labelFor='jobDescription' required>
      <Form.Input
        id='jobDescription'
        name='jobDescription'
        placeholder='Describe the job...'
        rows={5}
        rowsMax={25}
        width='full'
        multiline
        multilineResizable
        required
      />
    </GridItemField>

    <GridItemField size='medium'>
      <Form.Checkbox
        name='hiddenForTalents'
        label='Hide job in Talent Portal'
        hint="When checked, this job won't appear in search, eligible jobs, job alerts, or recommended jobs, but it will be available via direct link or job interest request."
        width='full'
      />
    </GridItemField>
  </>
)

export default JobDetailsFormContent
