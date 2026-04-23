import { Item } from '@toptal/picasso/Autocomplete'

import { TalentUpdateFragment } from '../../../pages/TalentUpdatePage/data'
import { TalentUpdateFormValues } from '../../../types'

export const mapToOptions = (
  options?: { id: string; name: string }[]
): Item[] =>
  (options || []).map(({ id, name }) => ({
    text: name,
    value: id
  }))

export const getInitialValues = ({
  fullName,
  email,
  toptalEmail,
  phoneNumber,
  skype,
  legalName,
  billingName,
  useBillingName,
  hourlyRate,
  languages,
  profile,
  linkedinUrl,
  admissionPostUrl,
  twitter,
  locationV2,
  timeZone,
  citizenship,
  hiddenFromRobots,
  hiddenFromPublicAccess,
  featured,
  talentPartner,
  talentPartnership
}: TalentUpdateFragment): TalentUpdateFormValues => ({
  fullName,
  email,
  toptalEmail,
  phoneNumber,
  skype,
  legalName,
  billingName,
  useBillingName,
  hourlyRate,
  languageIds: mapToOptions(languages?.nodes),
  website: profile?.website,
  linkedin: linkedinUrl,
  admissionPostUrl,
  twitter,
  location: locationV2 && {
    countryId: locationV2.country?.id,
    cityName: locationV2.cityName,
    city: locationV2.cityName,
    placeId: locationV2.placeId
  },
  timeZoneName: timeZone?.value,
  citizenshipId: citizenship?.id,
  topSkill: profile?.topSkill,
  employmentStartDateWithTalentPartner: talentPartnership?.employmentStartDate,
  talentPartnerId: talentPartner?.id,
  hiddenFromRobots,
  hiddenFromPublicAccess,
  featured
})
