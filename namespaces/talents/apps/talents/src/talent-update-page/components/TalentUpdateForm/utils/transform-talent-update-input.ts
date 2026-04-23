import { UpdateTalentProfileInput } from '@staff-portal/graphql/staff'

import { TalentUpdateFormValues } from '../../../types'

const parseHourlyRateFields = (
  {
    hourlyRate,
    hourlyRateComment,
    hourlyRateFirstContactDate,
    hourlyRateDiscussed
  }: Partial<TalentUpdateFormValues>,
  initialValues: TalentUpdateFormValues
) => {
  if (Number(initialValues?.hourlyRate) === Number(hourlyRate)) {
    return
  }

  return {
    hourlyRate,
    hourlyRateComment,
    hourlyRateFirstContactDate,
    hourlyRateDiscussed: hourlyRateDiscussed === 'YES'
  }
}

// eslint-disable-next-line complexity
export const transformTalentUpdateInput = (
  talentId: string,
  {
    admissionPostUrl,
    billingName,
    employmentStartDateWithTalentPartner,
    legalName,
    linkedin,
    phoneNumber,
    skype,
    hourlyRate,
    languageIds,
    topSkill,
    toptalEmail,
    twitter,
    website,
    hourlyRateComment,
    hourlyRateFirstContactDate,
    hourlyRateDiscussed,
    talentPartnerId,
    location,
    ...rest
  }: TalentUpdateFormValues,
  initialValues: TalentUpdateFormValues
): UpdateTalentProfileInput => ({
  ...rest,
  talentId,
  toptalEmail: toptalEmail ?? null,
  phoneNumber: phoneNumber ?? null,
  skype: skype ?? null,
  legalName: legalName ?? null,
  billingName: billingName ?? null,
  talentPartnerId: talentPartnerId ?? null,
  employmentStartDateWithTalentPartner:
    employmentStartDateWithTalentPartner ?? null,
  topSkill: topSkill ?? null,
  website: website ?? null,
  linkedin: linkedin ?? null,
  admissionPostUrl: admissionPostUrl ?? null,
  twitter: twitter ?? null,
  languageIds: languageIds.map(language => language.value as string),
  location: location
    ? {
        countryId: location.countryId ?? null,
        city: location.city ?? null,
        cityName: location.cityName ?? null,
        placeId: location.placeId ?? null
      }
    : null,
  ...parseHourlyRateFields(
    {
      hourlyRate,
      hourlyRateComment,
      hourlyRateFirstContactDate,
      hourlyRateDiscussed
    },
    initialValues
  )
})
