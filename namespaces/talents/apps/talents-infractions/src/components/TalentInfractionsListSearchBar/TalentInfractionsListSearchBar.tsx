import React, { ReactNode } from 'react'
import { useNotifications } from '@toptal/picasso/utils'
import { SearchBar, SearchBarCategories } from '@staff-portal/filters'

export const searchBarCategories: SearchBarCategories = [
  {
    type: 'input',
    name: 'keywords',
    label: 'keywords',
    getBadgeLabel: text => text,
    toQueryParam: text => text,
    getKey: text => text,
    fromInputValue: value => value,
    fromQueryParams: params => {
      if (typeof params === 'string') {
        return [params]
      }

      if (Array.isArray(params)) {
        return params
      }

      return []
    }
  }
]

export interface Props {
  nestableControls: ReactNode
}

const TalentInfractionsListSearchBar = ({ nestableControls }: Props) => {
  const { showError } = useNotifications()

  return (
    <SearchBar
      name='badges'
      categories={searchBarCategories}
      nestableControls={nestableControls}
      onError={() => showError('Unable to fetch infractions.')}
    />
  )
}

export default TalentInfractionsListSearchBar
