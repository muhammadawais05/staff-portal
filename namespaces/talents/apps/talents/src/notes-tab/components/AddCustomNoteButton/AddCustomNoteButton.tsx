import { Button, ButtonVariantType } from '@toptal/picasso'
import React, {
  ReactNode,
  RefObject,
  useCallback,
  useEffect,
  useState
} from 'react'
import { createPortal } from 'react-dom'
import {
  TalentOperations,
  TalentNoteType,
  Operation as OperationType
} from '@staff-portal/graphql/staff'
// https://toptal-core.atlassian.net/browse/SPC-1804
// eslint-disable-next-line no-restricted-imports
import { useRenderLazyOperation } from '@staff-portal/operations'
import { usePersistentFormContext } from '@staff-portal/forms'
import { NodeType } from '@staff-portal/graphql'
import { useActionLoading } from '@staff-portal/utils'
import {
  CreateNoteForm,
  getPersistStorageKey,
  NoteFormResult
} from '@staff-portal/notes'
import {
  useGetDefaultNoteAnswers,
  useGetSoftSkills
} from '@staff-portal/talents'
import { WatchQueryFetchPolicy } from '@staff-portal/data-layer-service'

import { Talent } from '../../types'

export interface Props {
  children: ReactNode
  noteType: TalentNoteType
  talent: Talent
  title?: string
  includeSoftSkills?: boolean
  disabled?: boolean
  headerContent?: ReactNode
  verticalId?: string
  onSubmit: (note: NoteFormResult, onCompleted: () => void) => void
  commentPlaceholder?: string
  formContainer: RefObject<HTMLDivElement>
  initialOperation: OperationType
  operationName: keyof TalentOperations
  submitText?: string
  displayAttachment?: boolean
  fetchPolicy?: WatchQueryFetchPolicy
  variant?: ButtonVariantType
}

const AddCustomNoteButton = ({
  talent,
  noteType,
  children,
  title,
  includeSoftSkills = false,
  headerContent,
  verticalId,
  onSubmit,
  commentPlaceholder,
  formContainer,
  initialOperation,
  operationName,
  submitText,
  displayAttachment,
  fetchPolicy,
  variant = 'secondary'
}: Props) => {
  const persistentStorageKey = getPersistStorageKey(talent.id)
  const buttonRef = React.useRef<HTMLButtonElement>(null)
  const [isOpen, setIsOpen] = useState(false)
  const showForm = () => setIsOpen(true)
  const hideForm = () => setIsOpen(false)
  const { actionsLoading } = useActionLoading('note-form')
  const { checkForm } = usePersistentFormContext()

  const {
    getDefaultNoteAnswers,
    answers: defaultAnswers,
    loading: getAnswersLoading
  } = useGetDefaultNoteAnswers({
    talentId: talent.id,
    noteType,
    onCompleted: data => {
      if (data?.node?.defaultNoteAnswers?.nodes) {
        handleShowForm()
      }
    },
    fetchPolicy
  })

  const {
    getSoftSkills,
    softSkills,
    loading: getSoftSkillsLoading
  } = useGetSoftSkills({
    onCompleted: data => {
      if (data?.softSkills.nodes) {
        handleShowForm()
      }
    },
    fetchPolicy
  })

  const handleShowForm = useCallback(() => {
    if (getSoftSkillsLoading || getAnswersLoading) {
      return
    }

    showForm()
  }, [getAnswersLoading, getSoftSkillsLoading])

  const fetchFormData = useCallback(() => {
    getDefaultNoteAnswers()

    if (includeSoftSkills) {
      getSoftSkills()
    }
  }, [getDefaultNoteAnswers, getSoftSkills, includeSoftSkills])

  const renderOperation = useRenderLazyOperation({
    initialOperation,
    getLazyOperationVariables: {
      nodeId: talent.id,
      nodeType: NodeType.TALENT,
      operationName
    },
    onSuccess: () => {
      if (fetchPolicy === 'cache-first') {
        if (
          defaultAnswers?.length &&
          (!includeSoftSkills || (includeSoftSkills && softSkills))
        ) {
          return showForm()
        }
      }

      fetchFormData()
    },
    onFail: () => {
      hideForm()
    }
  })

  useEffect(() => {
    if (isOpen) {
      return
    }

    const hasFormInCache = checkForm({
      nodeId: talent.id,
      formName: noteType,
      localStorageKey: persistentStorageKey
    })

    if (!hasFormInCache) {
      return
    }

    if (fetchPolicy === 'cache-first') {
      if (defaultAnswers?.length) {
        return showForm()
      }

      return fetchFormData()
    }

    buttonRef.current?.click()
  }, [
    checkForm,
    defaultAnswers?.length,
    isOpen,
    noteType,
    persistentStorageKey,
    talent.id,
    fetchPolicy,
    fetchFormData
  ])

  const handleSubmit = (note: NoteFormResult, callback: () => void) =>
    onSubmit(note, () => {
      callback()
      hideForm()
    })

  const isLoading = getSoftSkillsLoading || getAnswersLoading

  useActionLoading('note-form', isOpen)

  return (
    <>
      {renderOperation(({ disabled, loading, checkOperation }) => (
        <Button
          disabled={isOpen || disabled || actionsLoading}
          loading={isLoading || loading}
          size='small'
          variant={variant}
          ref={buttonRef}
          onClick={checkOperation}
        >
          {children}
        </Button>
      ))}

      {isOpen &&
        formContainer.current &&
        createPortal(
          <CreateNoteForm
            nodeId={talent.id}
            notableTitle={talent.fullName}
            title={title}
            answers={defaultAnswers}
            softSkills={softSkills}
            onClose={hideForm}
            onSubmit={handleSubmit}
            verticalId={verticalId}
            commentPlaceholder={commentPlaceholder}
            noteType={noteType}
            headerContent={headerContent}
            submitText={submitText}
            displayAttachment={displayAttachment}
          />,
          formContainer.current
        )}
    </>
  )
}

export default AddCustomNoteButton
