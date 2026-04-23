import React from 'react'
import { Button, Container, Table, Typography } from '@toptal/picasso'

import { JobApplicationFragment } from '../../data/job-application-fragment'
import JobApplicationRow from '../JobApplicationRow'
import { useLazyGetResolvedJobApplications } from './data'
import * as S from './styles'

export type Props = {
  talentId: string
  pendingJobApplications?: JobApplicationFragment[] | null
  talentType: string
  hasMore: boolean
}

const JobApplicationsTable = ({
  talentId,
  pendingJobApplications,
  talentType,
  hasMore
}: Props) => {
  const {
    getResolvedJobApplication,
    data: resolvedJobApplications,
    loading
  } = useLazyGetResolvedJobApplications(talentId)

  return (
    <>
      <Table variant='striped'>
        <Table.Head>
          <Table.Row>
            <Table.Cell>Company</Table.Cell>
            <Table.Cell>Position</Table.Cell>
            <Table.Cell>Status</Table.Cell>
            <Table.Cell>Applied</Table.Cell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {!pendingJobApplications?.length ? (
            <Table.Row css={S.lastRow}>
              <Table.Cell colSpan={4}>
                <Typography color='dark-grey'>
                  This {talentType} has no pending job applications.
                </Typography>
              </Table.Cell>
            </Table.Row>
          ) : (
            pendingJobApplications.map((jobApplication, index) => (
              <JobApplicationRow
                key={jobApplication.id}
                stripeEven={index % 2 !== 0}
                jobApplication={jobApplication}
              />
            ))
          )}

          {resolvedJobApplications?.map((jobApplication, index) => (
            <JobApplicationRow
              lastRow={index === resolvedJobApplications.length - 1}
              key={jobApplication.id}
              stripeEven={index % 2 === 0}
              jobApplication={jobApplication}
            />
          ))}
        </Table.Body>
      </Table>
      {hasMore && !resolvedJobApplications && (
        <Container top='small'>
          <Button
            onClick={() => getResolvedJobApplication()}
            loading={loading}
            variant='secondary'
          >
            Show resolved job applications
          </Button>
        </Container>
      )}
    </>
  )
}

export default JobApplicationsTable
