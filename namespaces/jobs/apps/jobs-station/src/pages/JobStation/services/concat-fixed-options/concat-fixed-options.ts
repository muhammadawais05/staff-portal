import { decodeEntityId } from '@staff-portal/data-layer-service'

import { FIXED_TAG_SELECTOR_FIELDS } from '../../constants'
import { StaffSelectOptionFragment } from '../../data/staff-select-option-fragment'

export const concatFixedOptions = (
  initialOptions: StaffSelectOptionFragment[],
  currentUserId?: string
) =>
  FIXED_TAG_SELECTOR_FIELDS.concat(
    initialOptions
      .filter(
        ({ id }) => !(currentUserId && id === decodeEntityId(currentUserId).id)
      )
      .map(({ id, fullName }) => ({
        text: fullName,
        value: id
      }))
  )
