import React from 'react'
import { DeprecatedActionsDropdown } from '@staff-portal/facilities'

import { isDropdownVisible } from './services/is-dropdown-visible/is-dropdown-visible'
import { useCompanyRepresentativeActions } from './services/use-representative-actions'
import { RepresentativeFragment } from '../../data'

export interface Props {
  fullList?: boolean
  representative: RepresentativeFragment
}

const MoreActionsDropdown = ({ representative, fullList }: Props) => {
  const { setLoading, loading, list } = useCompanyRepresentativeActions(
    representative,
    { fullList }
  )

  return isDropdownVisible(list) ? (
    <DeprecatedActionsDropdown
      loading={loading}
      actions={list}
      onStart={() => setLoading(true)}
      onSettled={() => setLoading(false)}
    />
  ) : null
}

export default MoreActionsDropdown
