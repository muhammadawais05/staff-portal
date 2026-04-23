import { Container } from '@toptal/picasso'
import { Form, FormApi } from '@toptal/picasso-forms'
import { useNotifications } from '@toptal/picasso/utils'
import React from 'react'
import { useHandleMutationResult } from '@staff-portal/mutation-result-handlers'
import { isMaxLength } from '@staff-portal/validators'

import {
  readTaskCommentCountFromCache,
  useAddTaskComment,
  writeTaskCommentCountToCache
} from './data'

interface AddCommentForm {
  taskComment: string
}

export interface Props {
  taskId: string
  onCommentAdd?: () => void
}

const AddCommentForm = ({ taskId, onCommentAdd }: Props) => {
  const { handleMutationResult } = useHandleMutationResult()
  const { showError } = useNotifications()
  const [addComment] = useAddTaskComment({
    onError: () => showError('An error occurred, the comment was not added.')
  })
  const handleSubmit = async (
    { taskComment: comment }: AddCommentForm,
    form: FormApi<AddCommentForm>
  ) => {
    const { data } = await addComment({
      variables: { taskId, comment },
      update: (cacheProxy, { data: response }) => {
        if (!response?.addTaskComment?.success) {
          return
        }

        const cacheData = readTaskCommentCountFromCache(cacheProxy, taskId)

        if (cacheData?.node) {
          writeTaskCommentCountToCache(cacheProxy, taskId, {
            ...cacheData,
            node: {
              ...cacheData.node,
              commentCount: (cacheData.node.commentCount || 0) + 1
            }
          })
        }
      }
    })

    return handleMutationResult({
      mutationResult: data?.addTaskComment,
      successNotificationMessage: 'Success! Comment was added.',
      onSuccessAction: () => {
        setTimeout(() => {
          try {
            form.reset()
            form.resetFieldState('taskComment')
            // eslint-disable-next-line no-empty
          } catch {}
        })
        onCommentAdd?.()
      }
    })
  }

  return (
    <Form<AddCommentForm> onSubmit={handleSubmit}>
      <Form.Input
        name='taskComment'
        width='full'
        label='Comment'
        rows={4}
        multiline
        required
        validate={isMaxLength}
        data-testid='task-comment'
      />

      <Container top='small'>
        <Form.SubmitButton
          variant='secondary'
          title='Submit Comment'
          size='small'
          data-testid='submit-comment'
        >
          Submit Comment
        </Form.SubmitButton>
      </Container>
    </Form>
  )
}

export default AddCommentForm
