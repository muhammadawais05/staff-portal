import React, { RefObject, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { Button, Container } from '@toptal/picasso'
import { NodeType } from '@staff-portal/graphql'
import { CreateNoteForm, getPersistStorageKey } from '@staff-portal/notes'
import { useActionLoading } from '@staff-portal/utils'
import { usePersistentFormContext } from '@staff-portal/forms'
import {
  ClientNoteType,
  HowDidYouHearValues,
  Operation as OperationType
} from '@staff-portal/graphql/staff'
import {
  GetLazyOperationVariables,
  // https://toptal-core.atlassian.net/browse/SPC-1804
  // eslint-disable-next-line no-restricted-imports
  LazyOperation
} from '@staff-portal/operations'

import { useGetLogSalesCallData } from './hooks'

export interface Props {
  clientId: string
  clientName: string
  isApplied?: boolean
  logSalesCallWillChangeClaimer?: boolean
  operation?: OperationType
  formContainer: RefObject<HTMLDivElement>
  onComplete: () => void
  onCheckCompliance?: () => void
}

const LogSalesCallButton = ({
  clientId,
  clientName,
  isApplied,
  logSalesCallWillChangeClaimer,
  operation: logClientSalesCallOperation,
  formContainer,
  onCheckCompliance,
  onComplete
}: Props) => {
  const noteType = ClientNoteType.SALES_CALL
  const localStorageKey = getPersistStorageKey(clientId)

  const { actionsLoading } = useActionLoading('note-form')
  const { checkForm: checkPersistedFormData } = usePersistentFormContext()

  const {
    loading: dataLoading,
    defaultAnswers,
    isNoteFormOpen,
    referrer,
    handleSubmit,
    showChangeClaimerModal,
    fetchDefaultNoteAnswers,
    hideNoteForm
  } = useGetLogSalesCallData({
    clientId,
    clientName,
    onCheckCompliance,
    onComplete
  })

  const handleClick = logSalesCallWillChangeClaimer
    ? showChangeClaimerModal
    : fetchDefaultNoteAnswers

  const getLazyOperationVariables: GetLazyOperationVariables = {
    nodeId: clientId,
    nodeType: NodeType.CLIENT,
    operationName: 'logClientSalesCall'
  }

  const defaultValues = {
    howDidYouHear: referrer ? HowDidYouHearValues.REFERRAL : undefined,
    howDidYouHearDetails: referrer ? `Referred by ${referrer}` : undefined
  }

  useEffect(() => {
    if (!isNoteFormOpen) {
      const shouldOpen = checkPersistedFormData({
        nodeId: clientId,
        formName: noteType,
        localStorageKey
      })

      if (shouldOpen) {
        fetchDefaultNoteAnswers()
      }
    }
  }, [
    clientId,
    noteType,
    isNoteFormOpen,
    localStorageKey,
    checkPersistedFormData,
    fetchDefaultNoteAnswers
  ])

  return (
    <>
      {logClientSalesCallOperation && (
        <LazyOperation
          initialOperation={logClientSalesCallOperation}
          getLazyOperationVariables={getLazyOperationVariables}
          onSuccess={handleClick}
        >
          {({ checkOperation, loading, disabled }) => (
            <Container left='small'>
              <Button
                disabled={actionsLoading || disabled}
                loading={dataLoading || loading}
                size='small'
                variant={isApplied ? 'primary' : 'secondary'}
                onClick={checkOperation}
              >
                Log Sales Call
              </Button>
            </Container>
          )}
        </LazyOperation>
      )}

      {isNoteFormOpen &&
        formContainer.current &&
        createPortal(
          <CreateNoteForm
            hideTitle
            hideIndex
            hideCommentField
            nodeId={clientId}
            notableTitle={clientName}
            title='Log Sales Call'
            answers={defaultAnswers}
            noteType={noteType}
            onClose={hideNoteForm}
            onSubmit={handleSubmit}
            defaultValues={defaultValues}
            displayHowDidYouHearNote
          />,
          formContainer.current
        )}
    </>
  )
}

export default LogSalesCallButton
