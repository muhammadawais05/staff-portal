import { useTranslation } from 'react-i18next'
import React, { FC, memo } from 'react'
import { ApolloContextEvents } from '@staff-portal/billing/src/@types/types'
import {
  handleOnSubmissionError,
  handleSubmit
} from '@staff-portal/billing/src/_lib/form/handlers'
import useFormSubmission from '@staff-portal/billing/src/_lib/customHooks/useFormSubmission'
import {
  encodeId,
  NodeIdPrefix
} from '@staff-portal/billing/src/_lib/helpers/apollo'
import { ModalData } from '@staff-portal/billing/src/store/modalActions'

import adjustValues from '../../utils/adjustValues'
import NoteEditModalForm from '../NoteEditModalForm'
import { useCreateNoteMutation } from '../../data/mutationNoteCreate.graphql.types'

const displayName = 'NoteCreateModalWrapper'

interface Props {
  options: Required<Pick<ModalData, 'notableId' | 'notableType'>>
}

const initialValues = {
  comment: '',
  title: '',
  attachment: []
}

const NoteCreateModalWrapper: FC<Props> = memo(({ options }) => {
  const transformedId = encodeId({
    id: options.notableId,
    type: options.notableType as keyof typeof NodeIdPrefix
  })
  const { t: translate } = useTranslation('notes')
  const { handleOnSuccess, handleOnRootLevelError } = useFormSubmission()
  const [createNoteGatewayMutation] = useCreateNoteMutation({
    onRootLevelError: handleOnRootLevelError
  })
  const handleOnSubmit = handleSubmit({
    adjustValues,
    handleError: handleOnSubmissionError('createNote'),
    handleSuccess: handleOnSuccess({
      apolloEvent: ApolloContextEvents.noteCreate,
      successMessage: translate('notification.success.create')
    }),
    responseKey: 'createNote',
    submit: createNoteGatewayMutation,
    variables: { notableId: transformedId }
  })

  return (
    <NoteEditModalForm
      handleOnSubmit={handleOnSubmit}
      initialValues={initialValues}
    />
  )
})

NoteCreateModalWrapper.displayName = displayName

export default NoteCreateModalWrapper
