import React from 'react'
import { Button } from '@toptal/picasso'
import { Modal } from '@staff-portal/modals-service'
import { Form, FormSpy } from '@toptal/picasso-forms'
import { TalentQuizQuestion } from '@staff-portal/graphql/staff'

import QuizQuestionFormLoader from '../QuizQuestionFormLoader'
import useQuizQuestionForm, { FormData } from './use-quiz-question-form'

interface Props {
  submitButtonText: string
  question?: TalentQuizQuestion
  onCancel: () => void
  onSubmit: (values: FormData) => void
}

const QuizQuestionForm = ({
  submitButtonText,
  question,
  onCancel,
  onSubmit
}: Props) => {
  const { verticalOptions, quizTypeOptions, initialValues, loading } =
    useQuizQuestionForm(question)

  const renderFields = () => {
    if (loading) {
      return <QuizQuestionFormLoader />
    }

    return (
      <>
        <Form.Input
          data-testid='QuizQuestionForm-body'
          name='body'
          label='Question'
          placeholder='Type a new question.'
          width='full'
          multiline
          rows={4}
          required
        />
        <Form.Input
          data-testid='QuizQuestionForm-wrongAnswer'
          name='wrongAnswer'
          label='Wrong Answer'
          placeholder='Type a likely incorrect response to your question.'
          width='full'
          multiline
          rows={4}
          required
        />
        <Form.Input
          data-testid='QuizQuestionForm-correctAnswer'
          name='correctAnswer'
          label='Correct answer'
          placeholder='Type the correct answer to your question.'
          width='full'
          multiline
          rows={4}
          required
        />
        <Form.Input
          data-testid='QuizQuestionForm-feedback'
          name='feedback'
          label='Feedback'
          placeholder='Type additional explanation for the talent to understand this question and the correct response.'
          width='full'
          multiline
          rows={4}
          rowsMax={10}
          required
        />
        <Form.Select
          data-testid='QuizQuestionForm-verticalId'
          name='verticalId'
          label='Vertical'
          options={verticalOptions}
          required
          enableReset
        />
        <Form.Select
          data-testid='QuizQuestionForm-kind'
          name='kind'
          label='Type of Quiz'
          options={quizTypeOptions}
          required
          enableReset
        />
      </>
    )
  }

  return (
    <Form<FormData> initialValues={initialValues} onSubmit={onSubmit}>
      <Modal.Content>{renderFields()}</Modal.Content>
      <Modal.Actions>
        <FormSpy>
          {({ submitting }) => (
            <Button
              variant='secondary'
              disabled={submitting || loading}
              onClick={onCancel}
            >
              Cancel
            </Button>
          )}
        </FormSpy>
        <Form.SubmitButton
          data-testid='QuizQuestionForm-submit-button'
          variant='positive'
          disabled={loading}
        >
          {submitButtonText}
        </Form.SubmitButton>
      </Modal.Actions>
    </Form>
  )
}

export default QuizQuestionForm
