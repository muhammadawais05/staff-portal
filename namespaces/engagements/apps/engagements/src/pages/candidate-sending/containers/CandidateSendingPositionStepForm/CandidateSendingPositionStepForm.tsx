import { Container, Section } from '@toptal/picasso'
import { DetailedList } from '@staff-portal/ui'
import React from 'react'

import {
  ClientAvailabilityRequestsSelectField,
  CompanyAutocompleteField,
  JobTalentsAutocompleteField,
  LabelRequiredPrefix,
  TalentAutocompleteField
} from '../../components'
import { LABEL_COLUMN_WIDTH } from '../../config'
import { useCandidateSendingContext } from '../../hooks'

type Props = {
  job?: {
    id: string
    specialization?: {
      id: string
    } | null
  } | null
  talent?: {
    id: string
    type: string
    vertical?: {
      id: string
    } | null
  } | null
}

const CandidateSendingPositionStepForm = ({ job, talent }: Props) => {
  const { queryParametersJobId, queryParametersTalentId, clientId } =
    useCandidateSendingContext()
  const { specialization } = job || {}
  const { type: talentType } = talent || {}

  const sectionTitle = !queryParametersTalentId
    ? `Please select company, it's job, and talent you want to be sent at this job`
    : `Please select the company and it's job to which you want the talent to be sent`

  return (
    <>
      {queryParametersJobId ? (
        !queryParametersTalentId && (
          <JobTalentsAutocompleteField
            jobId={queryParametersJobId}
            specializationId={specialization?.id}
          />
        )
      ) : (
        <Section variant='withHeaderBar' title={sectionTitle}>
          <DetailedList
            striped={false}
            divided={false}
            labelColumnWidth={LABEL_COLUMN_WIDTH}
          >
            <DetailedList.Row>
              <DetailedList.Item
                label={
                  <>
                    <LabelRequiredPrefix />
                    Company
                  </>
                }
              >
                <CompanyAutocompleteField />
              </DetailedList.Item>
            </DetailedList.Row>

            {clientId && (
              <Container top='medium'>
                <DetailedList.Row>
                  <DetailedList.Item
                    label={
                      <>
                        <LabelRequiredPrefix />
                        Job
                      </>
                    }
                  >
                    <ClientAvailabilityRequestsSelectField
                      clientId={clientId}
                      talentType={talentType}
                      talentId={queryParametersTalentId}
                      hasTalentVertical={Boolean(talent?.vertical?.id)}
                    />
                  </DetailedList.Item>
                </DetailedList.Row>
              </Container>
            )}

            {!queryParametersTalentId && (
              <Container top='medium'>
                <DetailedList.Row>
                  <DetailedList.Item
                    label={
                      <>
                        <LabelRequiredPrefix />
                        Talent
                      </>
                    }
                  >
                    <TalentAutocompleteField />
                  </DetailedList.Item>
                </DetailedList.Row>
              </Container>
            )}
          </DetailedList>
        </Section>
      )}
    </>
  )
}

export default CandidateSendingPositionStepForm
