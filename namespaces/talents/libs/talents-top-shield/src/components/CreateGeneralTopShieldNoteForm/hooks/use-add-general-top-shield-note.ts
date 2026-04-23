import { useNotifications } from '@toptal/picasso/utils'
import { useMutation } from '@staff-portal/data-layer-service'
import { useHandleMutationResult } from '@staff-portal/mutation-result-handlers'
import { NoteFormResult } from '@staff-portal/notes'

import { AddGeneralTopShieldApplicationNoteDocument } from '../data/add-general-top-shield-note'

const ERROR_MESSAGE = 'Unable to add note.'

export const useAddGeneralTopShieldNote = (topShieldApplicationId: string) => {
  const { showError } = useNotifications()
  const { handleMutationResult } = useHandleMutationResult()

  const [addGeneralNote, { loading: updateLoading }] = useMutation(
    AddGeneralTopShieldApplicationNoteDocument,
    {
      onError: () => showError(ERROR_MESSAGE)
    }
  )

  const handleSubmit = async (
    { title, comment, attachment }: NoteFormResult,
    onCompleted: () => void
  ) => {
    const { data } = await addGeneralNote({
      variables: {
        input: {
          topShieldApplicationId,
          title,
          comment,
          attachment
        }
      }
    })

    return handleMutationResult({
      mutationResult: data?.addGeneralTopShieldApplicationNote,
      onSuccessAction: () => onCompleted()
    })
  }

  return { handleSubmit, loading: updateLoading }
}
