import { NOT_SELECTED_OPTION } from '@staff-portal/config'
import { decodeEntityId } from '@staff-portal/data-layer-service'

import { CLAIMER_NOT_CLAIMED, CLAIMER_CLAIMED_BY_ME } from '../../constants'
import { ClaimerFragment } from '../../data'
import { ClaimerOption } from '../../types'

const getAdditionalOptions = (options: undefined | ClaimerOption[]) => {
  if (!options) {
    return [NOT_SELECTED_OPTION, CLAIMER_NOT_CLAIMED, CLAIMER_CLAIMED_BY_ME]
  }

  return options
}

export const getClaimerOptions = (
  claimers: ClaimerFragment[],
  currentUserId?: string,
  additionalOptions?: ClaimerOption[]
) =>
  getAdditionalOptions(additionalOptions).concat(
    claimers
      .filter(
        ({ id }) => !(currentUserId && id === decodeEntityId(currentUserId).id)
      )
      .map(({ id, fullName }) => ({
        label: fullName,
        value: id
      }))
  )
