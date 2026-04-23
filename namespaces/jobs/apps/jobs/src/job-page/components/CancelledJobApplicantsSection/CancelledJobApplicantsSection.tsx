import React from 'react'
import { Section, Container, Table } from '@toptal/picasso'
import { useMessageListener } from '@toptal/staff-portal-message-bus'
import { ENGAGEMENT_UPDATED } from '@staff-portal/engagements'
import { JOB_UPDATED } from '@staff-portal/jobs'

import {
  CancelledJobApplicantsSectionLoader,
  CancelledJobApplicantsTableItem
} from './components'
import { useGetCancelledJobApplicants } from './data/get-cancelled-job-applicants/get-cancelled-job-applicants.staff.gql'

type Props = {
  jobId: string
}

const CancelledJobApplicantsSection = ({ jobId }: Props) => {
  const { cancelledJobApplicants, loading, refetch } =
    useGetCancelledJobApplicants(jobId)

  useMessageListener(JOB_UPDATED, ({ jobId: id }) => jobId === id && refetch())
  useMessageListener(ENGAGEMENT_UPDATED, () => refetch())

  const sectionTitle = 'Cancelled Job Applicants'

  if (loading && !cancelledJobApplicants) {
    return <CancelledJobApplicantsSectionLoader title={sectionTitle} />
  }

  if (!cancelledJobApplicants?.length) {
    return null
  }

  return (
    <Container top='medium' data-testid='CancelledJobApplicantsSection'>
      <Section title={sectionTitle} variant='withHeaderBar'>
        <Table variant='striped'>
          <Table.Body>
            {cancelledJobApplicants?.map((cancelledJobApplicant, index) => (
              <CancelledJobApplicantsTableItem
                key={cancelledJobApplicant.id}
                cancelledJobApplicant={cancelledJobApplicant}
                stripeEven={Boolean(index % 2)}
              />
            ))}
          </Table.Body>
        </Table>
      </Section>
    </Container>
  )
}

export default CancelledJobApplicantsSection
