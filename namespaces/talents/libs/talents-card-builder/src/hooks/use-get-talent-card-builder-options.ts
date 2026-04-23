import { decodeEntityId } from '@staff-portal/data-layer-service'
import { useCallback, useMemo } from 'react'

import { TalentPitchFragment } from '../data/talent-pitch-fragment/talent-pitch-fragment.staff.gql.types'
import { TalentProfileFragment } from '../data/talent-profile-fragment/talent-profile-fragment.staff.gql.types'
import { PitcherState } from '../types'
import { getProfilePitch } from '../utils/getProfilePitch'
import { buildInitialCard } from '../utils/initialCard'
import { validateCard } from '../utils/validateCard'
import { getVerticalSpecificContext } from '../utils/validationVerticalContext'

interface Props {
  talentProfile: TalentProfileFragment
  talentPitch?: TalentPitchFragment | null
}

export const useGetTalentCardBuilderOptions = ({
  talentProfile,
  talentPitch
}: Props) => {
  const roleId = parseInt(decodeEntityId(talentProfile.id).id, 10)

  const cardValidationContext = getVerticalSpecificContext(
    talentProfile.type ?? 'default'
  )

  const previousHighlights = useMemo(
    () => getProfilePitch(talentProfile, talentPitch),
    [talentPitch, talentProfile]
  )

  const initialCard = useMemo(
    () =>
      buildInitialCard({
        previousHighlights
      }),
    [previousHighlights]
  )

  const onValidate = useCallback(
    (values: PitcherState) => {
      const errors: { card?: string[]; pitch?: string[] } = {}

      if (!values) {
        return errors
      }

      const cardValidationError = validateCard(
        values?.highlights,
        cardValidationContext
      )

      if (cardValidationError) {
        errors.card = cardValidationError.inner.map(({ message }) => message)
      }

      return errors
    },
    [cardValidationContext]
  )

  return {
    roleId,
    cardValidationContext,
    previousHighlights,
    initialCard,
    onValidate
  }
}
