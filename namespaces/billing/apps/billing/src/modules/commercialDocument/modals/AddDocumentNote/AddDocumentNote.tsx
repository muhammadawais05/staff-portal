import { useTranslation } from 'react-i18next'
import React, { memo } from 'react'
import { encodeId } from '@staff-portal/billing/src/_lib/helpers/apollo'
import { ApolloContextEvents } from '@staff-portal/billing/src/@types/types'
import useFormSubmission from '@staff-portal/billing/src/_lib/customHooks/useFormSubmission'
import {
  handleOnSubmissionError,
  handleSubmit
} from '@staff-portal/billing/src/_lib/form/handlers'
import { ModalData } from '@staff-portal/billing/src/store/modalActions'
import { CommercialDocumentType } from '@staff-portal/billing-widgets/src/modules/commercialDocument/utils'

import { useAddDocumentNoteMutation } from './data/addDocumentNote.graphql.types'
import EditDocumentNoteForm from '../../components/EditDocumentNoteForm'

interface Props {
  options: Required<Pick<ModalData, 'nodeId' | 'nodeType'>>
}

const displayName = 'AddDocumentNote'

const AddDocumentNote = ({ options: { nodeId, nodeType } }: Props) => {
  const commercialDocumentType = nodeType as CommercialDocumentType
  const { t: translate } = useTranslation('commercialDocument')
  const { handleOnSuccess, handleOnRootLevelError } = useFormSubmission()
  const [addDocumentNoteMutation] = useAddDocumentNoteMutation({
    onRootLevelError: handleOnRootLevelError
  })
  const initialValues = {
    commercialDocumentId: encodeId({ id: nodeId, type: nodeType }),
    note: ''
  }
  const handleSuccess = handleOnSuccess({
    apolloEvent: ApolloContextEvents.commercialDocumentAddNote,
    successMessage: translate(
      `modals.editDocumentNote.notification.success.create.${commercialDocumentType}` as const,
      {
        documentNumber: nodeId
      }
    )
  })
  const handleOnSubmit = handleSubmit({
    handleError: handleOnSubmissionError('addDocumentNote'),
    handleSuccess,
    responseKey: 'addDocumentNote',
    submit: addDocumentNoteMutation
  })

  return (
    <EditDocumentNoteForm
      handleOnSubmit={handleOnSubmit}
      initialValues={initialValues}
      isCreate
      nodeId={nodeId}
      nodeType={commercialDocumentType}
    />
  )
}

AddDocumentNote.displayName = displayName

export default memo(AddDocumentNote)
