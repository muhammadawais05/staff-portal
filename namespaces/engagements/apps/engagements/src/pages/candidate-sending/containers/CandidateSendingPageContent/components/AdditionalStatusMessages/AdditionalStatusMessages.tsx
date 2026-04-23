import React from 'react'
import { NewEngagementWizardStep } from '@staff-portal/graphql/staff'
import { Alert, Container } from '@toptal/picasso'

import {
  useCandidateSendingContext,
  useNewEngagementWizardQuery
} from '../../../../hooks'
import { GetAdditionalStatusMessagesDataDocument } from './data'

const AdditionalStatusMessages = () => {
  const { currentStep, stepsAttributes } = useCandidateSendingContext()

  const isPositionStep = currentStep === NewEngagementWizardStep.POSITION
  const isAvailabilityStep =
    currentStep === NewEngagementWizardStep.AVAILABILITY

  const skipQuery = !currentStep || isPositionStep

  const { data, loading } = useNewEngagementWizardQuery(
    GetAdditionalStatusMessagesDataDocument,
    {
      skip: skipQuery,
      variables: {
        attributes: stepsAttributes,
        includeUnrealisticRate: isAvailabilityStep
      }
    }
  )

  if (loading || !data) {
    return null
  }

  const { talent, talentHasAppropriateSpecialization } =
    data.newEngagementWizard || {}

  return (
    <>
      {talent?.unrealisticOnRate && isAvailabilityStep && (
        <Container top='small' bottom='small'>
          <Alert variant='red'>
            This candidate's rate is unrealistic. Please note this before
            confirming that you want to send this candidate to this position.
          </Alert>
        </Container>
      )}

      {!talentHasAppropriateSpecialization && !isPositionStep && (
        <Container top='small' bottom='small'>
          <Alert variant='yellow'>
            This talent does not have the required specialization for this job.
          </Alert>
        </Container>
      )}
    </>
  )
}

export default AdditionalStatusMessages
