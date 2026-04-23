import React from 'react'
import { DeprecatedActionsDropdown } from '@staff-portal/facilities'

import { ClientMetadataFragment } from '../../data/get-client'
import { useCompanyActionsList } from './utils'

interface Props {
  company: ClientMetadataFragment
}

const CompanyMoreActionsDropdown = ({ company }: Props) => {
  const { loading, setLoading, list } = useCompanyActionsList(company)

  return (
    <DeprecatedActionsDropdown
      loading={loading}
      actions={list}
      onStart={() => setLoading(true)}
      onSettled={() => setLoading(false)}
    />
  )
}

export default CompanyMoreActionsDropdown
