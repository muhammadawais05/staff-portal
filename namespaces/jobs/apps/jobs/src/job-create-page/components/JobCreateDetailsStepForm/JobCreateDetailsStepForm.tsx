import React from 'react'
import { GridItemField } from '@staff-portal/ui'
import { Form } from '@toptal/picasso-forms'
import {
  JobCountryRequirementsTagSelector,
  JobEstimatedLengthSelect
} from '@staff-portal/jobs'
import { LanguagesTagSelector } from '@staff-portal/languages'

import {
  JobWorkTypeSelect,
  JobOriginRadio,
  TimeLengthOnsiteSelect,
  SemiMonthlyBillingCyclesRadio,
  JobDesiredCommitmentSelect,
  JobTimeZoneSelect,
  TimeZonePreferenceRadio,
  TimeZonePreferenceFields,
  JobDesiredStartDateSelect,
  JobEstimatedEndDateSelect,
  JobClientRepresentativesTagSelector
} from './components'
import { JobCreateClientFragment } from '../JobCreatePageContent/data/get-job-create-data'

interface Props {
  client: JobCreateClientFragment
}

const JobCreateDetailsStepForm = ({ client }: Props) => (
  <>
    <JobWorkTypeSelect />
    <JobOriginRadio />
    <TimeLengthOnsiteSelect />

    {client.enterprise && (
      <SemiMonthlyBillingCyclesRadio
        billCycle={client.billingDefaults?.billCycle}
      />
    )}

    <JobDesiredCommitmentSelect />

    <GridItemField
      label='Number of Desired Hires'
      labelFor='talentCount'
      required
      size='small'
    >
      <Form.NumberInput name='talentCount' step='1' required width='full' />
    </GridItemField>

    <JobTimeZoneSelect />
    <TimeZonePreferenceRadio />
    <TimeZonePreferenceFields />
    <JobDesiredStartDateSelect />

    {!client.enterprise && (
      <GridItemField
        label='Estimated Length'
        labelFor='estimatedLength'
        required
        size='medium'
      >
        <JobEstimatedLengthSelect required />
      </GridItemField>
    )}

    <JobEstimatedEndDateSelect />

    <GridItemField
      label='Country Requirements'
      labelFor='allowedCountryIds'
      size='medium'
    >
      <JobCountryRequirementsTagSelector />
    </GridItemField>

    <GridItemField
      label='Spoken Languages'
      labelFor='languageIds'
      required
      size='medium'
    >
      <LanguagesTagSelector required width='full' />
    </GridItemField>

    {client.jobContactsEnabled && (
      <JobClientRepresentativesTagSelector clientId={client.id} />
    )}
  </>
)

export default JobCreateDetailsStepForm
