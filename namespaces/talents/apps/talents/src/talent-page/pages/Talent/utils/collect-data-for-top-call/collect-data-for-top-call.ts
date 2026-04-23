import { Maybe } from '@toptal/picasso/utils'
import { getTalentProfilePath } from '@staff-portal/routes'
import { getPhoneNumbersForTopCall } from '@staff-portal/contacts'
import { TalentFragment } from '@staff-portal/talents'
import { encodeGid } from '@staff-portal/data-layer-service'

export const collectDataForTopCall = (
  talentLegacyId: string,
  talent: Maybe<TalentFragment>
) => ({
  talent: talent && {
    id: talentLegacyId,
    gid: encodeGid('Talent', talentLegacyId),
    name: talent.fullName,
    phone_numbers: getPhoneNumbersForTopCall(talent.contacts.nodes),
    profile_url: getTalentProfilePath(talentLegacyId)
  }
})
