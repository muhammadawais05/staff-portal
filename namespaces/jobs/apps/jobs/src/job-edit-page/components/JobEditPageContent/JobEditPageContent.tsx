import ContentWrapper from '@staff-portal/page-wrapper'
import { ActionLoader } from '@staff-portal/ui'
import { Section } from '@toptal/picasso'
import React from 'react'

import JobEditActions from '../JobEditActions'
import JobEditForm from '../JobEditForm'
import JobEditFormSkeletonLoader from '../JobEditFormSkeletonLoader'
import JobEditTitle from '../JobEditTitle'
import { useGetJobEdit } from './data'

interface Props {
  jobId: string
}

const JobEditPageContent = ({ jobId }: Props) => {
  const { data: job, loading } = useGetJobEdit(jobId)

  return (
    <ContentWrapper
      titleLoading={loading}
      title={
        job ? (
          <JobEditTitle title={job.title} jobUrl={job.webResource.url} />
        ) : undefined
      }
      browserTitle={job ? `Edit job ${job.title}` : undefined}
      actions={loading ? <ActionLoader /> : job && <JobEditActions job={job} />}
    >
      <Section title='Job Details' variant='withHeaderBar'>
        {loading && <JobEditFormSkeletonLoader />}
        {!loading && job && <JobEditForm job={job} />}
      </Section>
    </ContentWrapper>
  )
}

export default JobEditPageContent
