import { TalentApplicantSkill } from '@staff-portal/talents'

export type AnswerFormValue = Record<string, string>

export type CityFormValue = {
  name: string
  placeId: string
}

export type FormValues = {
  fullName: string
  email: string
  countryId: string
  citizenshipId: string
  skills: TalentApplicantSkill[]
  city: CityFormValue
  answers?: AnswerFormValue
}
