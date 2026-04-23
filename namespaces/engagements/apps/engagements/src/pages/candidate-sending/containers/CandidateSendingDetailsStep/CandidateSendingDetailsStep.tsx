import React from 'react'
import { Container } from '@toptal/picasso'
import { NewEngagementWizardStep } from '@staff-portal/graphql/staff'
import { SectionWithDetailedListSkeleton } from '@staff-portal/ui'

import getInitialValues from './utils/get-initial-values/get-initial-values'
import {
  useCandidateSendingContext,
  useGetCandidateSendingDataForDetailsStep
} from '../../hooks'
import CandidateSendingForm from '../CandidateSendingForm'
import PaymentsSection from '../PaymentsSection'
import { JobApplicationSection } from '../../components'

const CandidateSendingDetailsStep = () => {
  const { talentId, stepsAttributes } = useCandidateSendingContext()
  const { data, loading } = useGetCandidateSendingDataForDetailsStep(
    talentId,
    stepsAttributes
  )

  if (loading) {
    return (
      <SectionWithDetailedListSkeleton
        title='Payments'
        columns={1}
        items={5}
        labelColumnWidth={10}
      />
    )
  }

  if (!data) {
    return null
  }

  const initialValues = getInitialValues({ data, stepsAttributes })
  const { commitmentSettingsHoursOptions, newEngagementWizard } = data
  const { job, talent, newEngagement, mostRecentEngageableApplication } =
    newEngagementWizard || {}
  const billingDefaults = job?.client?.billingDefaults

  const relatedJobApplication =
    data.newEngagementWizard?.job?.relatedJobApplications?.nodes?.[0]

  return (
    <CandidateSendingForm<NewEngagementWizardStep.DETAILS>
      initialValues={initialValues}
    >
      <Container bottom='medium'>
        <PaymentsSection
          hasInitialBillCycle={Boolean(billingDefaults?.billCycle)}
          hasInitialBillDay={Boolean(billingDefaults?.billDay)}
          job={job}
          talent={talent}
          newEngagement={newEngagement}
          commitmentSettingsHoursOptions={commitmentSettingsHoursOptions}
          mostRecentEngageableApplication={
            mostRecentEngageableApplication ?? undefined
          }
        />
      </Container>

      {relatedJobApplication && (
        <JobApplicationSection relatedJobApplication={relatedJobApplication} />
      )}
    </CandidateSendingForm>
  )
}

export default CandidateSendingDetailsStep
