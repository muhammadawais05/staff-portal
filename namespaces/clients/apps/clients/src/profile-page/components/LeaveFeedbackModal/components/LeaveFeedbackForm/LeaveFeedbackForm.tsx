import React from 'react'
import { Modal, Button } from '@toptal/picasso'
import { arrayMutators, Form } from '@toptal/picasso-forms'
import {
  ClientSurveyAnswerInput,
  EngagementSurveyQuestion,
  Link
} from '@staff-portal/graphql/staff'
import { ModalForm } from '@staff-portal/modals-service'
import { useModalFormChangeHandler } from '@staff-portal/mutation-result-handlers'

import { SurveyEngagementFragment } from '../../../../data/survey-engagement-fragment'
import {
  ScoresField,
  LeaveFeedbackIntro,
  CommentsField
} from '../../components'
import { LeaveFeedbackDocument } from '../../data'
import { validate } from './utils'

export const TITLE = 'Client Survey'
export const NEGATIVE_VALUE = 0
interface Props {
  hideModal: () => void
  engagements: NonNullable<SurveyEngagementFragment['engagements']>
  questions: EngagementSurveyQuestion[]
  companyId: string
  webResource: Link
}

const LeaveFeedbackForm = ({
  hideModal,
  engagements,
  questions,
  companyId,
  webResource
}: Props) => {
  const { handleSubmit, loading } = useModalFormChangeHandler({
    mutationDocument: LeaveFeedbackDocument,
    mutationResultOptions: {
      mutationResult: 'leaveFeedbackClient',
      onSuccessAction: hideModal,
      successNotificationMessage: 'The Survey was successfully submitted.'
    }
  })

  const onSubmit = (answers: ClientSurveyAnswerInput) =>
    handleSubmit({
      clientId: companyId,
      answers: { ...answers, scores: answers.scores.map(Number) }
    })

  return (
    <ModalForm<ClientSurveyAnswerInput>
      initialValues={{
        scores: Array(questions.length).fill(null),
        negative: [],
        comments: engagements.nodes.map(({ id }) => ({
          engagementId: id,
          comment: ''
        }))
      }}
      mutators={{ ...arrayMutators }}
      validate={values => validate(values, engagements.totalCount)}
      data-testid='leave-feedback-modal-form'
      onSubmit={onSubmit}
      title={TITLE}
    >
      <Modal.Content>
        <LeaveFeedbackIntro
          engagements={engagements}
          webResource={webResource}
        />
        <ScoresField questions={questions} engagements={engagements} />
        <CommentsField engagements={engagements} />
      </Modal.Content>
      <Modal.Actions>
        <Button variant='secondary' disabled={loading} onClick={hideModal}>
          Cancel
        </Button>
        <Form.SubmitButton
          variant='positive'
          data-testid='leave-feedback-modal-submit'
        >
          Submit Survey
        </Form.SubmitButton>
      </Modal.Actions>
    </ModalForm>
  )
}

export default LeaveFeedbackForm
