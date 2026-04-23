import { getRoleTypeText } from '@staff-portal/facilities'

type Props = {
  talentType?: string
  hasTalentVertical?: boolean
}

const getNoJobsInfo = ({ talentType, hasTalentVertical }: Props = {}) => {
  if (!talentType) {
    return 'This company has no pending jobs. Try to select another one.'
  }
  const roleTypeText = getRoleTypeText(talentType)

  if (hasTalentVertical) {
    return `This company has no pending jobs matching ${roleTypeText}'s specializations. Try to select another one.`
  }

  return `This company has no pending jobs for ${roleTypeText}'s. Try to select another one.`
}

export default getNoJobsInfo
