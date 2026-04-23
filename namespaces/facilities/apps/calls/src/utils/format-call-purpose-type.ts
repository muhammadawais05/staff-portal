import { CallCounterpartyType } from '@staff-portal/graphql/staff'

const formatCallPurposeType = (
  roleType?: string | null
): CallCounterpartyType => {
  if (roleType === 'Company') {
    return CallCounterpartyType.CLIENT
  }

  if (roleType === 'Talent') {
    return CallCounterpartyType.TALENT
  }

  return CallCounterpartyType.UNKNOWN
}

export default formatCallPurposeType
