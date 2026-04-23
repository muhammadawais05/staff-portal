import React from 'react'
import { Container, Typography, TypographyOverflow } from '@toptal/picasso'
import { SalesOwnerRelationship } from '@staff-portal/graphql/staff'
import { useGetNode } from '@staff-portal/data-layer-service'
import { NO_VALUE } from '@staff-portal/config'

import { SALES_OWNER_RELATIONSHIP_MAPPING } from '../../../../config'
import StaffField from '../StaffField'
import EditSalesOwnerButton from './components/EditSalesOwnerButton'
import { GetJobSalesOwnerDataDocument } from './data/get-job-sales-owner-data/get-job-sales-owner-data.staff.gql.types'
import SalesOwnerFieldSkeleton from './SalesOwnerFieldSkeleton'

type Props = {
  jobId: string
}

const SalesOwnerField = ({ jobId }: Props) => {
  const { loading, data } = useGetNode(GetJobSalesOwnerDataDocument)({
    jobId
  })

  if (loading && !data) {
    return <SalesOwnerFieldSkeleton />
  }
  if (!data) {
    return null
  }
  const { currentSalesOwner, operations } = data

  return (
    <Container flex justifyContent='space-between' gap='small'>
      {currentSalesOwner &&
      currentSalesOwner.relationship !== SalesOwnerRelationship.ROLE_REMOVED ? (
        <TypographyOverflow>
          <StaffField
            url={currentSalesOwner.owner.webResource.url}
            fullName={`${currentSalesOwner.owner.webResource.text} (${
              SALES_OWNER_RELATIONSHIP_MAPPING[currentSalesOwner.relationship]
            })`}
            testId='sales-owner-field'
          />
        </TypographyOverflow>
      ) : (
        <Typography as='div'>{NO_VALUE}</Typography>
      )}
      <EditSalesOwnerButton
        currentSalesOwner={currentSalesOwner}
        operation={operations?.updateJobSalesOwner}
        jobId={jobId}
      />
    </Container>
  )
}

export default SalesOwnerField
