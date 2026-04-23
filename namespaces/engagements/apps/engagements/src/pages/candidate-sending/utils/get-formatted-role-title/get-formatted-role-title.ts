import { getRoleTypeText } from '@staff-portal/facilities'

import { GetVerticalsDataFragment } from '../../data/get-role-title-data'

type Props = {
  roleTitleLowerCased?: boolean
  jobType?: string
  verticalNodes?: GetVerticalsDataFragment[]
  withSpecializationTitle?: boolean
  specializationTitle?: string
}

const getFormattedRoleTitle = ({
  roleTitleLowerCased,
  jobType,
  verticalNodes,
  withSpecializationTitle,
  specializationTitle
}: Props) => {
  let formattedRoleTitle = getRoleTypeText(jobType)

  if (roleTitleLowerCased) {
    formattedRoleTitle = formattedRoleTitle.toLowerCase()
  }

  if (withSpecializationTitle) {
    const isSpecializationTitleSupported = (verticalNodes || []).filter(
      vertical =>
        vertical.specializations.totalCount > 1 &&
        vertical.talentType === jobType
    ).length

    if (!isSpecializationTitleSupported) {
      return formattedRoleTitle
    }

    formattedRoleTitle = [specializationTitle, formattedRoleTitle]
      .filter(Boolean)
      .join(' ')
  }

  return formattedRoleTitle
}

export default getFormattedRoleTitle
