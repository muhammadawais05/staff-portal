import React from 'react'
// todo: remove task specific components from `companies` module
//  https://toptal-core.atlassian.net/browse/SPB-2863
import { useGetCurrentUser } from '@staff-portal/current-user'
import { TaskCardLayout } from '@staff-portal/tasks'
import {
  getFormattedFlaggedByCopy,
  RoleFlagTooltipContent
} from '@staff-portal/role-flags'

import { TaskCardCompanyUserRoleFlagsFragment } from '../../data/company-task-card-fragment/company-task-card-fragment.staff.gql.types'

export interface Props extends TaskCardCompanyUserRoleFlagsFragment {}

const CompanyTaskCardFlags = ({ flags }: Props) => {
  const roleFlags = flags?.nodes || []
  const user = useGetCurrentUser()

  if (!roleFlags.length) {
    return null
  }

  return (
    // todo: remove task specific components from `companies` module
    //  https://toptal-core.atlassian.net/browse/SPB-2863
    <TaskCardLayout.Tags>
      {roleFlags.map(
        ({ flag: { title }, comment, id, createdAt, updatedAt, flaggedBy }) => {
          return (
            // todo: remove task specific components from `companies` module
            //  https://toptal-core.atlassian.net/browse/SPB-2863
            <TaskCardLayout.Tag
              key={id}
              tooltip={
                <RoleFlagTooltipContent
                  title={title}
                  comment={comment}
                  formattedFlaggedByCopy={getFormattedFlaggedByCopy(
                    { createdAt, updatedAt, timeZone: user?.timeZone?.value },
                    flaggedBy?.fullName
                  )}
                />
              }
            >
              {title}
            </TaskCardLayout.Tag>
          )
        }
      )}
    </TaskCardLayout.Tags>
  )
}

export default CompanyTaskCardFlags
