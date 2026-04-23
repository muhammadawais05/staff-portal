import { useTranslation } from 'react-i18next'
import React, { memo } from 'react'
import { encodeId } from '@staff-portal/billing/src/_lib/helpers/apollo'
import { ApolloContextEvents } from '@staff-portal/billing/src/@types/types'
import useFormSubmission from '@staff-portal/billing/src/_lib/customHooks/useFormSubmission'
import {
  handleOnSubmissionError,
  handleSubmit
} from '@staff-portal/billing/src/_lib/form/handlers'
import { ModalSkeleton } from '@staff-portal/ui'
import ContentLoader from '@staff-portal/billing/src/components/ContentLoader'
import { ModalData } from '@staff-portal/billing/src/store/modalActions'
import { CommercialDocumentType } from '@staff-portal/billing-widgets/src/modules/commercialDocument/utils'

import { useEditDocumentNoteMutation } from './data/editDocumentNote.graphql.types'
import { useGetDocumentNote } from './data'
import EditDocumentNoteForm from '../../components/EditDocumentNoteForm'

interface Props {
  options: Required<Pick<ModalData, 'nodeId' | 'nodeType'>>
}

const displayName = 'EditDocumentNote'

const EditDocumentNote = ({ options: { nodeId, nodeType } }: Props) => {
  const { t: translate } = useTranslation('commercialDocument')
  const { handleOnSuccess, handleOnRootLevelError } = useFormSubmission()
  const [editDocumentNoteMutation] = useEditDocumentNoteMutation({
    onRootLevelError: handleOnRootLevelError
  })
  const commercialDocumentType = nodeType as CommercialDocumentType
  const commercialDocumentId = encodeId({ id: nodeId, type: nodeType })
  const {
    data: commercialDocument,
    loading,
    initialLoading
  } = useGetDocumentNote(commercialDocumentId)

  const initialValues = {
    commercialDocumentId,
    note: commercialDocument?.documentNote || ''
  }

  const handleSuccess = handleOnSuccess({
    apolloEvent: ApolloContextEvents.commercialDocumentEditNote,
    successMessage: translate(
      `modals.editDocumentNote.notification.success.update.${commercialDocumentType}` as const,
      {
        documentNumber: nodeId
      }
    )
  })
  const handleOnSubmit = handleSubmit({
    handleError: handleOnSubmissionError('editDocumentNote'),
    handleSuccess,
    responseKey: 'editDocumentNote',
    submit: editDocumentNoteMutation
  })

  return (
    <ContentLoader
      loading={loading}
      showSkeleton={initialLoading}
      skeletonComponent={
        <ModalSkeleton
          title={translate(
            `modals.editDocumentNote.title.update.${commercialDocumentType}` as const,
            {
              documentNumber: nodeId
            }
          )}
        />
      }
    >
      <EditDocumentNoteForm
        handleOnSubmit={handleOnSubmit}
        initialValues={initialValues}
        nodeId={nodeId}
        nodeType={commercialDocumentType}
      />
    </ContentLoader>
  )
}

EditDocumentNote.displayName = displayName

export default memo(EditDocumentNote)
