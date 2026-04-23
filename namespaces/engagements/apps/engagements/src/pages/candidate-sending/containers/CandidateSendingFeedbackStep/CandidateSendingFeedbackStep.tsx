import { Table, Section, Container, Alert, Typography } from '@toptal/picasso'
import { FormBaseErrorContainer } from '@staff-portal/forms'
import React from 'react'
import { FieldArray } from '@toptal/picasso-forms'

import { RejectedApplicationItem } from '../../components'
import CandidateSendingFeedbackStepForm from '../CandidateSendingFeedbackStepForm/CandidateSendingFeedbackStepForm'
import {
  RejectedApplicationConnectionFragment
} from '../../data/submit-new-engagement-wizard'
import FormActions from './components/FormActions/FormActions'
import { useCandidateSendingContext } from '../../hooks'
import * as S from './styles'

const CandidateSendingFeedbackStep = () => {
  const { newEngagementWizardMutationPayload } = useCandidateSendingContext()

  const rejectedApplications =
    newEngagementWizardMutationPayload?.rejectionFeedback?.rejectedApplications
      ?.nodes
  const engagementTalentFullName =
    newEngagementWizardMutationPayload?.engagement?.talent?.fullName

  if (!rejectedApplications?.length || !engagementTalentFullName) {
    return null
  }
  const rejectedApplicationIds = rejectedApplications.map(item => item.id)

  return (
    <>
      <Container bottom='medium'>
        <Alert>
          <Container bottom='small'>
            You introduced {engagementTalentFullName} to the client. Please
            provide feedback about why the following candidates weren't
            selected, including any guidance for improvement.
          </Container>

          <Typography weight='semibold' color='black'>
            Your feedback will be shared directly with talent.
          </Typography>
        </Alert>
      </Container>

      <CandidateSendingFeedbackStepForm
        rejectedApplicationIds={rejectedApplicationIds}
      >
        <Section variant='withHeaderBar' title='Feedback'>
          <FormBaseErrorContainer />

          <Table>
            <Table.Head>
              <Table.Row>
                <Table.Cell css={S.talentCell}>Talent</Table.Cell>
                <Table.Cell>Feedback</Table.Cell>
                <Table.Cell css={S.actionsCell}>Actions</Table.Cell>
              </Table.Row>
            </Table.Head>

            <Table.Body>
              <FieldArray name='rejectedApplications'>
                {({ fields }) =>
                  fields.value.map((id: string) => {
                    const rejectedApplicationItemProps =
                      rejectedApplications.find(
                        item => item.id === id
                      ) as RejectedApplicationConnectionFragment

                    return (
                      <RejectedApplicationItem
                        key={id}
                        {...rejectedApplicationItemProps}
                      />
                    )
                  })
                }
              </FieldArray>
            </Table.Body>
          </Table>
        </Section>

        <FormActions data-testid='candidate-sending-feedback-step-submit-button' />
      </CandidateSendingFeedbackStepForm>
    </>
  )
}

export default CandidateSendingFeedbackStep
