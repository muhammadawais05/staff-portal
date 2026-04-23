import { useTranslation } from 'react-i18next'
import React, { FC, memo } from 'react'
import { ApolloContextEvents } from '@staff-portal/billing/src/@types/types'
import {
  handleOnSubmissionError,
  handleSubmit
} from '@staff-portal/billing/src/_lib/form/handlers'
import useFormSubmission from '@staff-portal/billing/src/_lib/customHooks/useFormSubmission'
import ContentLoader from '@staff-portal/billing/src/components/ContentLoader'
import { ModalSkeleton } from '@staff-portal/ui'
import { encodeId } from '@staff-portal/billing/src/_lib/helpers/apollo'
import { ModalData } from '@staff-portal/billing/src/store/modalActions'

import { useGetNote } from '../../data'
import adjustValues from '../../utils/adjustValues'
import NoteEditModalForm from '../NoteEditModalForm'
import { useUpdateNoteMutation } from '../../data/mutationNoteUpdate.graphql.types'
import { useGetInitialValues } from './hooks'

const displayName = 'NoteEditModalWrapper'

interface Props {
  options: Required<Pick<ModalData, 'nodeId'>>
}

const NoteEditModalWrapper: FC<Props> = memo(({ options: { nodeId } }) => {
  const noteId = encodeId({
    id: nodeId,
    type: 'note'
  })
  const { t: translate } = useTranslation('notes')
  const { handleOnSuccess, handleOnRootLevelError } = useFormSubmission()
  const [updateNoteGatewayMutation] = useUpdateNoteMutation({
    onRootLevelError: handleOnRootLevelError
  })
  const { data: note, initialLoading, loading } = useGetNote(noteId)
  const handleOnSubmit = handleSubmit({
    adjustValues,
    handleError: handleOnSubmissionError('updateNote'),
    handleSuccess: handleOnSuccess({
      apolloEvent: ApolloContextEvents.noteUpdate,
      successMessage: translate('notification.success.update')
    }),
    responseKey: 'updateNote',
    submit: updateNoteGatewayMutation,
    variables: { noteId }
  })

  const initialValues = useGetInitialValues(note)

  return (
    <ContentLoader
      loading={loading}
      showSkeleton={initialLoading}
      skeletonComponent={<ModalSkeleton title={translate('form.title.edit')} />}
    >
      <NoteEditModalForm
        handleOnSubmit={handleOnSubmit}
        initialValues={initialValues}
        isEdit
      />
    </ContentLoader>
  )
})

NoteEditModalWrapper.displayName = displayName

export default NoteEditModalWrapper
