import React from 'react'
import { Container, Typography } from '@toptal/picasso'
import { Link } from '@staff-portal/navigation'
import { PageLoader } from '@staff-portal/ui'
import { ContentWrapper } from '@staff-portal/page-wrapper'

import { PageWithOperation } from '../../components'
import {
  useGetSourcingRequestData,
  SourcingRequestForEditFragment
} from './data'
import { useGetSourcingRequestIdParam } from './hooks'

interface PageContentProps {
  sourcingRequest: SourcingRequestForEditFragment
}

const PageContent = ({ sourcingRequest }: PageContentProps) => {
  const job = sourcingRequest?.job
  const jobTitle = job?.webResource?.text
  const jobUrl = job?.webResource?.url as string
  const browserTitle = `Edit Sourcing Request for job ${jobTitle}`

  const JobTitle = () => (
    <Typography>
      Edit Sourcing Request for job <Link href={jobUrl}>{jobTitle}</Link>
    </Typography>
  )

  return (
    <ContentWrapper browserTitle={browserTitle} title={<JobTitle />}>
      To be updated.
    </ContentWrapper>
  )
}

const EditSourcingRequest = () => {
  const id = useGetSourcingRequestIdParam()
  const { data: sourcingRequest, loading } = useGetSourcingRequestData(id)

  if (!sourcingRequest || loading) {
    return (
      <Container data-testid='EditSourcingRequest-PageLoader'>
        <PageLoader />
      </Container>
    )
  }

  const { updateSourcingRequest } = sourcingRequest.operations

  return (
    <PageWithOperation operation={updateSourcingRequest}>
      <PageContent sourcingRequest={sourcingRequest} />
    </PageWithOperation>
  )
}

export default EditSourcingRequest
