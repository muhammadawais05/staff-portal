import { useState } from 'react'
import { useHandleMutationResult } from '@staff-portal/mutation-result-handlers'
import { NoteFormResult } from '@staff-portal/notes'
import {
  ClientNoteType,
  HowDidYouHearValues
} from '@staff-portal/graphql/staff'

import { ClientStatus } from '../../../../enums'
import { useGetClientDefaultNoteAnswers, useLogClientSalesCall } from '../data'
import { useLogSalesAdditionalModals } from '.'

export interface Props {
  clientId: string
  clientName: string
  onComplete: () => void
  onCheckCompliance?: () => void
}

export const useGetLogSalesCallData = ({
  clientId,
  clientName,
  onCheckCompliance,
  onComplete
}: Props) => {
  const noteType = ClientNoteType.SALES_CALL

  const [isNoteFormOpen, setIsNoteFormOpen] = useState(false)
  const { handleMutationResult } = useHandleMutationResult()
  const [createNoteMutation] = useLogClientSalesCall()

  const showNoteForm = () => setIsNoteFormOpen(true)
  const hideNoteForm = () => setIsNoteFormOpen(false)

  const {
    fetchDefaultNoteAnswers,
    answers: defaultAnswers,
    loading: answersLoading,
    operations: clientOperations,
    checkComplianceSalesFlow,
    clientStatus,
    referrer
  } = useGetClientDefaultNoteAnswers({
    clientId,
    noteType,
    onCompleted: showNoteForm
  })

  const {
    loading: additionalModalsLoading,
    showChangeClaimerModal,
    showLogSalesCallActionsModal
  } = useLogSalesAdditionalModals({
    clientId,
    clientName,
    clientOperations,
    onComplete,
    onCheckCompliance,
    onChangeClaimerComplete: fetchDefaultNoteAnswers
  })

  const handleSubmit = async (note: NoteFormResult, callback: () => void) => {
    const clientIsBadLead = clientStatus === ClientStatus.BAD_LEAD
    const { data, errors } = await createNoteMutation({
      variables: {
        input: {
          ...note,
          clientId,
          title: 'Sales Call',
          answers: note.answers || [],
          howDidYouHear: note.howDidYouHear as HowDidYouHearValues,
          howDidYouHearDetails: note.howDidYouHearDetails as string
        }
      }
    })

    return handleMutationResult({
      mutationResult: data?.logClientSalesCall,
      successNotificationMessage: 'Note has been added.',
      rootLevelErrors: errors,
      onSuccessAction: () => {
        callback()
        onComplete()
        hideNoteForm()

        if (checkComplianceSalesFlow && !clientIsBadLead) {
          showLogSalesCallActionsModal()
        }
      }
    })
  }

  return {
    defaultAnswers,
    isNoteFormOpen,
    referrer,
    loading: answersLoading || additionalModalsLoading,
    handleSubmit,
    hideNoteForm,
    showChangeClaimerModal,
    fetchDefaultNoteAnswers
  }
}
