import React, { useEffect } from 'react'
import { Container } from '@toptal/picasso'
import { useNavigate } from '@staff-portal/navigation'
import { useQueryParamsState } from '@staff-portal/query-params-state'
import { Content } from '@staff-portal/page-wrapper'

import { useGetBetaStaffMembersList } from './data/get-beta-staff-member-list'
import {
  BetaStaffOverview,
  BetaStaffMemberList,
  BetaStaffFilters
} from '../../components'
import { BetaStaffQueryParams, useBetaStaffMembersFilters } from '../../hooks'

const BetaStaffMembers = () => {
  const { data, loading, error } = useGetBetaStaffMembersList()
  const navigate = useNavigate()

  const [urlValues, setUrlValues, resolving] =
    useQueryParamsState<BetaStaffQueryParams>()

  const isLoading = resolving || loading

  const { teamOptions, filteredNodes } = useBetaStaffMembersFilters(
    urlValues,
    data?.nodes
  )

  useEffect(() => {
    if (error) {
      // Redirect not allowed users
      navigate('/dashboard')
    }
  }, [error, navigate])

  if (error) {
    return null
  }

  return (
    <Content title='Beta Staff Members' itemsCount={data?.totalCount}>
      <Container top='large' bottom='large'>
        <BetaStaffFilters
          loading={isLoading}
          values={urlValues}
          onChange={setUrlValues}
          teamOptions={teamOptions}
        />
        <BetaStaffOverview loading={isLoading} data={filteredNodes} />
        <BetaStaffMemberList loading={isLoading} data={filteredNodes} />
      </Container>
    </Content>
  )
}

export default BetaStaffMembers
