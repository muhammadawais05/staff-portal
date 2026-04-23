import React from 'react'
import { Button } from '@toptal/picasso'
import { PublicationGigStatus } from '@staff-portal/graphql/staff'
import { Link } from '@staff-portal/navigation'
import { RoutePath } from '@staff-portal/routes'
import { useGetCurrentUser } from '@staff-portal/current-user'
import { ButtonProps } from '@toptal/picasso/Button'
import { GigFragment } from '@staff-portal/talents-gigs'

type Props = {
  request: GigFragment
} & Partial<ButtonProps>

const HARDCODED_URL =
  'excluded_flag_ids[]=31&excluded_flag_ids[]=21&excluded_flag_ids[]=121300&excluded_flag_ids[]=30&excluded_flag_ids[]=121242&excluded_flag_ids[]=120047&excluded_flag_ids[]=120099&excluded_flag_ids[]=121231&sort[target]=relevance&sort[order]=desc&limit=20&cumulative_statuses[]=active&ofac_status[]=normal&exclude_health_status[]=watch_list&exclude_health_status[]=probation&exclude_health_status[]=suspension&in_investigation=false&available_hours=available&page=1'

const SearchCandidates = ({ request, ...buttonProps }: Props) => {
  const currentUser = useGetCurrentUser()

  const showSearchCandidates =
    request.claimedBy?.role.id === currentUser?.id &&
    request.status === PublicationGigStatus.APPROVED
  const skills = request.skills
    .map(value => `badges[skills][expert][]=${encodeURIComponent(value)}`)
    .join('&')
  const searchCandidatesUrl = `${RoutePath.GigCandidatesSearch}?request_id=${request.id}&${skills}&${HARDCODED_URL}`

  if (!showSearchCandidates) {
    return null
  }

  return (
    <Button
      as={Link}
      data-testid='search-candidates'
      href={searchCandidatesUrl}
      noUnderline
      size='small'
      {...buttonProps}
    >
      Search Candidates
    </Button>
  )
}

export default SearchCandidates
