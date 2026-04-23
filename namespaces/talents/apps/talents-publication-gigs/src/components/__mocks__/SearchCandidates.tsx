import React from 'react'
import { GigFragment } from '@staff-portal/talents-gigs'

type Props = {
  request: GigFragment
}

const SearchCandidates = ({ request }: Props) => (
  <div data-testid={`search-candidates-${request.id}`}>Search Candidates</div>
)

export default SearchCandidates
