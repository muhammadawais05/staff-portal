import React from 'react'
import { SkeletonLoader } from '@toptal/picasso'
import { GridItemField } from '@staff-portal/ui'

import { useGetVerticalApplicationQuestions } from './data/get-vertical-application-questions/get-vertical-application-questions.staff.gql'
import ApplicationQuestionItem from '../ApplicationQuestionItem'

export interface Props {
  verticalId: string
}

const ApplicationQuestions = ({ verticalId }: Props) => {
  const { applicationQuestions, loading } =
    useGetVerticalApplicationQuestions(verticalId)

  if (loading) {
    return (
      <>
        {Array.from(Array(12).keys()).map((_, itemIndex) => (
          // eslint-disable-next-line react/no-array-index-key
          <GridItemField key={itemIndex} label={<SkeletonLoader.Typography />}>
            <SkeletonLoader.Typography />
          </GridItemField>
        ))}
      </>
    )
  }

  return (
    <>
      {applicationQuestions?.map(({ question }) => (
        <ApplicationQuestionItem key={question.id} question={question} />
      ))}
    </>
  )
}

export default ApplicationQuestions
