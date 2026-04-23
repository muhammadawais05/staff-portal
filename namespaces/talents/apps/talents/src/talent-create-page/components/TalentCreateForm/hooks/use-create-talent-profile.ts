import { useHandleMutationResult } from '@staff-portal/mutation-result-handlers'
import { useNotifications } from '@toptal/picasso/utils'
import { decodeEntityId } from '@staff-portal/data-layer-service'

import { TalentCreateFormValues } from '../../../types'
import { TalentTypes } from '../../../constants'
import { useCreateCommonTalent } from '../data/create-common-talent/create-common-talent.staff.gql'
import { useCreateTopscreenTalent } from '../data/create-topscreen-talent/create-topscreen-talent.staff.gql'
import {
  transformCommonTalentCreateInput,
  transformTopscreenTalentCreateInput
} from '../services/transform-talent-create-input'

const ERROR_MESSAGE = 'An error occurred, the talent was not created.'
const SUCCESS_MESSAGE = 'The talent was successfully created.'

interface Props {
  talentType: string
  verticalId: string
  onSuccess: (talentId: string) => void
}

export const useCreateTalentProfile = ({
  talentType,
  verticalId,
  onSuccess
}: Props) => {
  const { handleMutationResult } = useHandleMutationResult()
  const { showError } = useNotifications()

  const [createCommonTalent] = useCreateCommonTalent({
    onError: () => showError(ERROR_MESSAGE)
  })

  const [createTopscreenTalent] = useCreateTopscreenTalent({
    onError: () => showError(ERROR_MESSAGE)
  })

  const handleSubmit = async (formValues: TalentCreateFormValues) => {
    if (talentType === TalentTypes.TOP_SCREEN) {
      const { data: result } = await createTopscreenTalent({
        variables: {
          input: transformTopscreenTalentCreateInput(formValues)
        }
      })

      return handleMutationResult({
        isFormSubmit: true,
        mutationResult: result?.createTopscreenTalent,
        successNotificationMessage: SUCCESS_MESSAGE,
        onSuccessAction: () => {
          const talentId = decodeEntityId(
            result?.createTopscreenTalent?.talent?.id ?? ''
          ).id

          onSuccess(talentId)
        }
      })
    }

    const { data: result } = await createCommonTalent({
      variables: {
        input: transformCommonTalentCreateInput(verticalId, formValues)
      }
    })

    return handleMutationResult({
      isFormSubmit: true,
      mutationResult: result?.createCommonTalent,
      successNotificationMessage: SUCCESS_MESSAGE,
      onSuccessAction: () => {
        const talentId = decodeEntityId(
          result?.createCommonTalent?.talent?.id ?? ''
        ).id

        onSuccess(talentId)
      }
    })
  }

  return { handleSubmit }
}
