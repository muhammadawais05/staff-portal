import React, {
  RefObject,
  useCallback,
  useEffect,
  useState,
  useMemo
} from 'react'
import { createPortal } from 'react-dom'
import { Button } from '@toptal/picasso'
import { useNotifications } from '@toptal/picasso/utils'
import { Operation as OperationType } from '@staff-portal/graphql/staff'
import {
  GetLazyOperationVariables,
  // https://toptal-core.atlassian.net/browse/SPC-1804
  // eslint-disable-next-line no-restricted-imports
  LazyOperation
} from '@staff-portal/operations'
import { usePersistentFormContext } from '@staff-portal/forms'
import { useHandleMutationResult } from '@staff-portal/mutation-result-handlers'
import { NodeType } from '@staff-portal/graphql'
import {
  NoteQuestionWithOptionsFragment,
  CreateNoteForm,
  getPersistStorageKey,
  NoteFormResult,
  NoteAnswerWithOptionsFragment
} from '@staff-portal/notes'
import { useActionLoading } from '@staff-portal/utils'

import { useAddJobMatchingNote } from './data'

export interface Props {
  jobId: string
  operation?: OperationType
  questions?: NoteQuestionWithOptionsFragment[]
  formContainer: RefObject<HTMLDivElement>
  onComplete: () => void
  onOpenNoteForm: () => void
  onCloseNoteForm: () => void
}

const DEFAULT_VALUES = {
  title: 'Matching Note'
}
const NOTE_TYPE = 'MATCHING_NOTE'

const AddMatchingNoteButton = ({
  jobId,
  operation,
  questions,
  formContainer,
  onComplete,
  onOpenNoteForm,
  onCloseNoteForm
}: Props) => {
  const persistentStorageKey = getPersistStorageKey(jobId)

  const { actionsLoading } = useActionLoading('note-form')
  const [isOpen, setIsOpen] = useState(false)

  const { checkForm } = usePersistentFormContext()

  const { showError } = useNotifications()
  const { handleMutationResult } = useHandleMutationResult()

  const showForm = useCallback(() => {
    setIsOpen(true)
    onOpenNoteForm()
  }, [onOpenNoteForm])

  const hideForm = () => {
    setIsOpen(false)
    onCloseNoteForm()
  }

  useEffect(() => {
    if (isOpen) {
      return
    }

    const shouldOpen = checkForm({
      nodeId: jobId,
      formName: NOTE_TYPE,
      localStorageKey: persistentStorageKey
    })

    if (shouldOpen) {
      showForm()
      onOpenNoteForm()
    }
  }, [checkForm, showForm, isOpen, persistentStorageKey, jobId, onOpenNoteForm])

  const [addJobMatchingNote] = useAddJobMatchingNote({
    onError: () => showError('Unable to save the matching note')
  })

  const handleSubmit = async (
    { comment, answers = [], title, attachment }: NoteFormResult,
    callback: () => void
  ) => {
    const { data, errors } = await addJobMatchingNote({
      variables: {
        input: {
          jobId,
          comment,
          answers,
          title,
          attachment
        }
      }
    })

    return handleMutationResult({
      mutationResult: data?.addJobMatchingNote,
      rootLevelErrors: errors,
      successNotificationMessage: 'Matching Note has been added.',
      onSuccessAction: () => {
        callback()
        onComplete()
        hideForm()
      }
    })
  }

  const questionsList: NoteAnswerWithOptionsFragment[] | undefined = useMemo(
    () =>
      questions?.map(question => ({
        id: jobId,
        questionEdge: {
          renderedLabel: question.label,
          node: question
        }
      })),
    [questions, jobId]
  )

  const getLazyOperationVariables: GetLazyOperationVariables = {
    nodeId: jobId,
    nodeType: NodeType.JOB,
    operationName: 'addJobMatchingNote'
  }

  return (
    <>
      <LazyOperation
        initialOperation={operation}
        getLazyOperationVariables={getLazyOperationVariables}
        onSuccess={showForm}
      >
        {({ checkOperation, loading, disabled }) => (
          <Button
            disabled={disabled || actionsLoading}
            loading={loading}
            size='small'
            variant='positive'
            onClick={checkOperation}
            data-testid='add-matching-note-button'
          >
            Add Matching Note
          </Button>
        )}
      </LazyOperation>

      {isOpen &&
        formContainer.current &&
        createPortal(
          <CreateNoteForm
            hideIndex
            nodeId={jobId}
            notableTitle='Matching Note'
            answers={questionsList}
            noteType={NOTE_TYPE}
            onClose={hideForm}
            onSubmit={handleSubmit}
            defaultValues={DEFAULT_VALUES}
          />,
          formContainer.current
        )}
    </>
  )
}

export default AddMatchingNoteButton
