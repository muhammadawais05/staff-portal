import React, { useMemo } from 'react'
import { Button, Container, Typography, SkeletonLoader } from '@toptal/picasso'
import { Modal } from '@staff-portal/modals-service'
import { Form, FormSpy } from '@toptal/picasso-forms'
import { CloneTalentQuizQuestionInput } from '@staff-portal/graphql/staff'

import { useGetVerticals } from '../../data/get-verticals'
import useCloneQuestionsForm from './use-clone-questions-form'

interface Props {
  hideModal: () => void
}

const CloneQuestionsFormLoader = () => (
  <Container data-testid='CloneQuestionsFormLoader'>
    <Container bottom='small'>
      <Container>
        <Typography>Source Vertical</Typography>
      </Container>
      <SkeletonLoader.Typography />
    </Container>
    <Container>
      <Container>
        <Typography>Destination Vertical</Typography>
      </Container>
      <SkeletonLoader.Typography />
    </Container>
  </Container>
)

const CloneQuestionsForm = ({ hideModal }: Props) => {
  const { data: verticals, loading } = useGetVerticals()
  const { handleSubmit } = useCloneQuestionsForm({ onSuccess: hideModal })

  const { sourceVerticalOptions, destinationVerticalOptions } = useMemo(
    () => ({
      sourceVerticalOptions: verticals
        .filter(vertical => vertical.hasTalentQuizQuestions)
        .map(({ name, id }) => ({ text: name, value: id })),
      destinationVerticalOptions: verticals
        .filter(vertical => !vertical.hasTalentQuizQuestions)
        .map(({ name, id }) => ({ text: name, value: id }))
    }),
    [verticals]
  )

  const renderFields = () => {
    if (loading) {
      return <CloneQuestionsFormLoader />
    }

    return (
      <>
        <Form.Select
          data-testid='CloneQuestionsForm-sourceVerticalId'
          name='sourceVerticalId'
          label='Original Vertical'
          options={sourceVerticalOptions}
          required
        />
        <Form.Select
          data-testid='CloneQuestionsForm-destinationVerticalId'
          name='destinationVerticalId'
          label='Destination Vertical'
          options={destinationVerticalOptions}
          required
        />
      </>
    )
  }

  return (
    <Form<CloneTalentQuizQuestionInput> onSubmit={handleSubmit}>
      <Modal.Title>Clone Quizzes</Modal.Title>
      <Modal.Content>{renderFields()}</Modal.Content>
      <Modal.Actions>
        <FormSpy>
          {({ submitting }) => (
            <Button
              variant='secondary'
              disabled={submitting}
              onClick={hideModal}
            >
              Cancel
            </Button>
          )}
        </FormSpy>
        <Form.SubmitButton
          data-testid='CloneQuestionsForm-submit-button'
          variant='positive'
        >
          Clone Quizzes
        </Form.SubmitButton>
      </Modal.Actions>
    </Form>
  )
}

export default CloneQuestionsForm
