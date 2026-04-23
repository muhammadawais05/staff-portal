import React from 'react'
import { JobPositionAnswers } from '@staff-portal/jobs'
import { Container, Typography } from '@toptal/picasso'
import { useGetNode } from '@staff-portal/data-layer-service'
import { NoteCardSkeletonLoader } from '@staff-portal/ui'

import { GetPositionAnswersDocument } from './data/get-position-answers/get-position-answers.staff.gql.types'

type Props = {
  id: string
}

const JobPositionAnswersSection = ({ id }: Props) => {
  const { data, loading } = useGetNode(GetPositionAnswersDocument)(
    { id },
    { fetchPolicy: 'cache-first' }
  )

  if (loading) {
    return (
      <Container bottom='medium'>
        <NoteCardSkeletonLoader />
      </Container>
    )
  }
  if (!data) {
    return null
  }

  const jobPositionAnswers =
    'jobApplicationJobPositionAnswers' in data
      ? data.jobApplicationJobPositionAnswers
      : 'availabilityRequestJobPositionAnswers' in data
      ? data.availabilityRequestJobPositionAnswers
      : null
  const comment =
    'applicationComment' in data
      ? data.applicationComment
      : 'comment' in data
      ? data.comment
      : null

  return (
    <Container bottom='medium'>
      <JobPositionAnswers jobPositionAnswers={jobPositionAnswers?.nodes} />

      {comment && (
        <Container top='medium'>
          <Typography size='medium' as='div'>
            <Typography color='black' weight='semibold' size='inherit'>
              Comment:
            </Typography>

            {comment}
          </Typography>
        </Container>
      )}
    </Container>
  )
}

export default JobPositionAnswersSection
