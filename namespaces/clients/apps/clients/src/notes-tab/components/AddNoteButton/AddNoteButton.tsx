import { Button, Container } from '@toptal/picasso'
import { useNotifications } from '@toptal/picasso/utils'
import React, { RefObject, useCallback, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import {
  CompanyAction,
  Operation as OperationType
} from '@staff-portal/graphql/staff'
import {
  GetLazyOperationVariables,
  // https://toptal-core.atlassian.net/browse/SPC-1804
  // eslint-disable-next-line no-restricted-imports
  LazyOperation
} from '@staff-portal/operations'
import { usePersistentFormContext } from '@staff-portal/forms'
import { useHandleMutationResult } from '@staff-portal/mutation-result-handlers'
import { NodeType } from '@staff-portal/graphql'
import { useActionLoading } from '@staff-portal/utils'
import {
  CreateNoteForm,
  getPersistStorageKey,
  NoteFormResult
} from '@staff-portal/notes'

import { CompanyNoteType } from '../../enums'
import { useCompanyActions } from '../../hooks'
import AddNoteFormWrapper from '../AddNoteFormWrapper'
import {
  useCreateCommunicationClientNote,
  useCreateGeneralInformationClientNote,
  useGetCommunicationNoteCompanyActions
} from './data'

export interface Props {
  clientId: string
  clientName: string
  operation?: OperationType
  formContainer: RefObject<HTMLDivElement>
  onComplete: () => void
}
const successMessageForCommunicationNoteAction = (
  companyAction: CompanyAction
): string => {
  switch (companyAction) {
    case CompanyAction.RESTORE_FROM_BAD_LEAD:
      return 'Company has been restored from Bad Lead status'
    case CompanyAction.KEEP_AS_BAD_LEAD:
      return 'Company has been kept as Bad Lead'
    default:
      return 'Note has been added'
  }
}

const AddNoteButton = ({
  clientId,
  clientName,
  operation: createNoteOperation,
  formContainer,
  onComplete
}: Props) => {
  const persistentStorageKey = getPersistStorageKey(clientId)
  const { actionsLoading } = useActionLoading('note-form')
  const [isOpen, setIsOpen] = useState(false)
  const { showError } = useNotifications()
  const { handleMutationResult } = useHandleMutationResult()
  const { showModal, showRestoreFromBadLeadPrompt } = useCompanyActions({
    companyId: clientId,
    clientName,
    onClose: onComplete
  })

  const { checkForm } = usePersistentFormContext()

  const {
    getCompanyActions,
    companyActions,
    loading: getCompanyActionsLoading
  } = useGetCommunicationNoteCompanyActions(clientId)

  const showForm = () => setIsOpen(true)
  const hideForm = () => setIsOpen(false)

  const handleClick = useCallback(() => {
    getCompanyActions()
    showForm()
  }, [getCompanyActions])

  useEffect(() => {
    if (isOpen) {
      return
    }

    const shouldOpen = checkForm({
      nodeId: clientId,
      localStorageKey: persistentStorageKey
    })

    if (shouldOpen) {
      handleClick()
    }
  }, [checkForm, clientId, handleClick, isOpen, persistentStorageKey])

  const getLazyOperationVariables: GetLazyOperationVariables = {
    nodeId: clientId,
    nodeType: NodeType.CLIENT,
    operationName: 'createGeneralInformationClientNote'
  }

  const [createGeneralClientNote] = useCreateGeneralInformationClientNote({
    onError: () => showError('Unable to create note.')
  })

  const [createCommunicationClientNote] = useCreateCommunicationClientNote({
    onCompleted: onComplete,
    onError: () => showError('Unable to create note.')
  })

  const createGeneralNote = async (
    { comment, title, attachment }: NoteFormResult,
    callback: () => void
  ) => {
    const { data, errors } = await createGeneralClientNote({
      variables: {
        input: {
          clientId,
          title,
          comment,
          attachment
        }
      }
    })

    return handleMutationResult({
      mutationResult: data?.createGeneralInformationClientNote,
      rootLevelErrors: errors,
      successNotificationMessage: 'Note has been added.',
      onSuccessAction: () => {
        callback()
        onComplete()
        hideForm()
      }
    })
  }

  const createCommunicationNoteAction = async (
    { comment, title, attachment }: NoteFormResult,
    selectedCompanyAction: CompanyAction,
    callback: () => void
  ) => {
    const { data } = await createCommunicationClientNote({
      variables: {
        input: {
          clientId,
          title,
          comment,
          attachment,
          companyAction: selectedCompanyAction
        }
      }
    })

    return handleMutationResult({
      mutationResult: data?.createCommunicationClientNote,
      successNotificationMessage: successMessageForCommunicationNoteAction(
        selectedCompanyAction
      ),
      onSuccessAction: () => {
        callback()
        hideForm()
        showModal(selectedCompanyAction)
      }
    })
  }

  const createCommunicationNote = (
    { comment, title, attachment, companyAction }: NoteFormResult,
    callback: () => void
  ) => {
    const selectedCompanyAction = companyAction as CompanyAction

    const actionToPerform = () => {
      return createCommunicationNoteAction(
        { comment, title, attachment },
        selectedCompanyAction,
        callback
      )
    }

    if (selectedCompanyAction === CompanyAction.RESTORE_FROM_BAD_LEAD) {
      return showRestoreFromBadLeadPrompt(actionToPerform)
    }

    return actionToPerform()
  }

  const handleSubmit = async (result: NoteFormResult, callback: () => void) => {
    if (result.noteType === CompanyNoteType.General || !result.companyAction) {
      return await createGeneralNote(result, callback)
    }

    return await createCommunicationNote(result, callback)
  }

  return (
    <>
      {createNoteOperation && (
        <LazyOperation
          initialOperation={createNoteOperation}
          getLazyOperationVariables={getLazyOperationVariables}
          onSuccess={handleClick}
        >
          {({ checkOperation, loading, disabled }) => (
            <Container left='small'>
              <Button
                disabled={actionsLoading || disabled}
                loading={loading || getCompanyActionsLoading}
                size='small'
                variant='secondary'
                onClick={checkOperation}
              >
                Add Note
              </Button>
            </Container>
          )}
        </LazyOperation>
      )}

      {isOpen &&
        !getCompanyActionsLoading &&
        formContainer.current &&
        createPortal(
          <CreateNoteForm
            defaultValues={{ noteType: 'general' }}
            nodeId={clientId}
            notableTitle={clientName}
            formWrapper={AddNoteFormWrapper}
            formWrapperOptions={{ actions: companyActions }}
            onClose={hideForm}
            onSubmit={handleSubmit}
          />,
          formContainer.current
        )}
    </>
  )
}

export default AddNoteButton
