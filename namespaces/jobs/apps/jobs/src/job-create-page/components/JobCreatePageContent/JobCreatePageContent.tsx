import React from 'react'
import { ContentWrapper } from '@staff-portal/page-wrapper'

import JobCreateForm from '../JobCreateForm'
import JobCreateTitle from '../JobCreateTitle'
import { useGetJobCreateData } from './data/get-job-create-data'
import JobCreatePageContentSkeleton from './JobCreatePageContentSkeleton'

export interface Props {
  cancelPath: string
  roleId?: string
  clientId?: string
  opportunityId?: string
}

const JobCreatePageContent = ({
  roleId,
  clientId,
  opportunityId,
  cancelPath
}: Props) => {
  const { client, opportunity, loading } = useGetJobCreateData(
    roleId,
    clientId,
    opportunityId
  )

  return (
    <ContentWrapper
      titleLoading={loading}
      title={
        client ? (
          <JobCreateTitle
            clientWebResource={client.webResource}
            opportunityWebResource={opportunity?.webResource}
          />
        ) : undefined
      }
      browserTitle={opportunityId ? 'Link New Job' : 'Add New Job'}
    >
      {loading && !client ? (
        <JobCreatePageContentSkeleton />
      ) : (
        client && (
          <JobCreateForm
            client={client}
            opportunity={opportunity}
            cancelPath={cancelPath}
          />
        )
      )}
    </ContentWrapper>
  )
}

export default JobCreatePageContent
