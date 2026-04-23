import { UserVerticalFragment } from '@staff-portal/verticals'

import { InternalTeamMatcherFragment } from '../../data'

export const mapMatchersToVerticals = (
  verticals: UserVerticalFragment[],
  matchers?: InternalTeamMatcherFragment[]
) =>
  verticals.map(vertical => {
    const matcher = matchers?.find(
      item => item.node.vertical.talentType === vertical.talentType
    )?.node.role

    return {
      fullName: matcher?.fullName,
      url: matcher?.webResource.url,
      verticalName: vertical?.name
    }
  })
