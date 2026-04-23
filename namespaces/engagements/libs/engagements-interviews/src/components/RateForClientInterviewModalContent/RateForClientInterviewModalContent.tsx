import { useGetNode } from '@staff-portal/data-layer-service'
import { Modal } from '@staff-portal/modals-service'
import { isMaxLength } from '@staff-portal/validators'
import { Form } from '@toptal/picasso-forms'
import React from 'react'

import { INTERVIEW_UPDATED } from '../../messages'
import { GetClientInterviewRatingDocument } from './data/get-client-interview-rating/get-client-interview-rating.staff.gql.types'
import { RateForClientInterviewDocument } from './data/rate-for-client-interview/rate-for-client-interview.staff.gql.types'

const OPTIONS = [...new Array(5)].map((_, index) => ({
  text: (index + 1).toString(),
  value: index + 1
}))

interface Props {
  engagementId: string
  interviewId: string
  hideModal: () => void
}

const RateForClientInterviewModalContent = ({
  engagementId,
  interviewId,
  hideModal
}: Props) => {
  const { data, loading } = useGetNode(GetClientInterviewRatingDocument)({
    interviewId
  })

  const initialValues = data?.rating
    ? {
        rating: data.rating,
        ratingComment: data.ratingComment
      }
    : undefined

  return (
    <Modal.ActionForm
      initialValues={initialValues}
      loading={loading}
      title='Rate Interview'
      submitText='Submit'
      mutation={{
        document: RateForClientInterviewDocument,
        successMessage: 'The interview has been rated.',
        successMessageEmitOptions: {
          type: INTERVIEW_UPDATED,
          payload: { engagementId, interviewId }
        }
      }}
      adjustFormValues={({ rating, ratingComment }) => ({
        interviewId,
        rating,
        ratingComment: ratingComment || ''
      })}
      onClose={hideModal}
      testIds={{
        submitButton: 'rate-for-client-interview-modal-content-submit-button'
      }}
    >
      <Form.Select
        data-testid='rate-for-client-interview-modal-content-rating'
        name='rating'
        label='Rating'
        required
        options={OPTIONS}
      />
      <Form.Input
        data-testid='rate-for-client-interview-modal-content-comment'
        name='ratingComment'
        label='Rating Comment'
        width='full'
        multiline
        rows={4}
        validate={isMaxLength}
      />
    </Modal.ActionForm>
  )
}

export default RateForClientInterviewModalContent
