import React from 'react'
import { FormTagSelector } from '@staff-portal/forms'

import { useGetTeamAutocomplete } from '../../data/get-team-autocomplete/use-get-team-autocomplete.staff.gql'

const TeamsAutocompleteField = () => {
  const { data, getTeams, loading } = useGetTeamAutocomplete()

  return (
    <FormTagSelector
      loading={loading}
      options={data}
      name='teamIds'
      label='Teams'
      width='full'
      onSearch={(term, excludedIds) => getTeams({ term, excludedIds })}
    />
  )
}

export default TeamsAutocompleteField
