import React from 'react'
import { Button, PromptModal } from '@toptal/picasso'
// TODO: replace import, once it's removed https://toptal-core.atlassian.net/browse/SPB-2949
// eslint-disable-next-line no-restricted-imports
import { useModal, useNotifications } from '@toptal/picasso/utils'
import { TalentQuizQuestion } from '@staff-portal/graphql/staff'
import { toStartCase } from '@staff-portal/string'
import { DetailedList } from '@staff-portal/ui'
import {
  GetLazyOperationVariables,
  // https://toptal-core.atlassian.net/browse/SPC-1804
  // eslint-disable-next-line no-restricted-imports
  LazyOperation
} from '@staff-portal/operations'
import { useHandleMutationResult } from '@staff-portal/mutation-result-handlers'
import { NodeType } from '@staff-portal/graphql'
import { getRoleTypeText } from '@staff-portal/facilities'

import { useDestroyTalentQuizQuestion } from './data'

interface Props {
  question: TalentQuizQuestion
}

const DeleteQuestionButton = ({
  question: { id, operations, body, talentType, kind }
}: Props) => {
  const { showModal, hideModal, isOpen } = useModal()
  const { showError } = useNotifications()
  const { handleMutationResult } = useHandleMutationResult()

  const items = [
    { label: 'Question', value: body },
    { label: 'Vertical', value: getRoleTypeText(talentType) },
    { label: 'Type of Quiz', value: toStartCase(kind) }
  ]

  const getLazyOperationVariables: GetLazyOperationVariables = {
    nodeId: id,
    nodeType: NodeType.TALENT_QUIZ_QUESTION,
    operationName: 'destroyTalentQuizQuestion'
  }

  const [destroyQuestion] = useDestroyTalentQuizQuestion({
    onError: () => {
      showError('An error occurred, the Question was not deleted.')
    }
  })

  const handleSubmit = async () => {
    const { data } = await destroyQuestion({
      variables: { input: { talentQuizQuestionId: id } }
    })

    return handleMutationResult({
      mutationResult: data?.destroyTalentQuizQuestion,
      successNotificationMessage: 'The question was successfully deleted.'
    })
  }

  return (
    <>
      <LazyOperation
        initialOperation={operations.destroyTalentQuizQuestion}
        getLazyOperationVariables={getLazyOperationVariables}
        onSuccess={showModal}
        onFail={() => {
          showError('The requested resource is no longer available.')
        }}
      >
        {({ checkOperation, loading, disabled }) => (
          <Button
            size='small'
            variant='secondary'
            disabled={disabled}
            loading={loading}
            onClick={checkOperation}
            data-testid={`DeleteQuestionButton-delete-button-${id}`}
          >
            Delete
          </Button>
        )}
      </LazyOperation>

      {isOpen && (
        <PromptModal
          open={isOpen}
          onClose={hideModal}
          title='Delete Question'
          message='Do you really want to delete this question?'
          submitText='Delete Question '
          variant='negative'
          onSubmit={handleSubmit}
          data-testid='DeleteQuestionButton-prompt-modal'
        >
          {() => (
            // eslint-disable-next-line @toptal/davinci/no-deprecated-props
            <DetailedList striped multilines items={items} />
          )}
        </PromptModal>
      )}
    </>
  )
}

export default DeleteQuestionButton
