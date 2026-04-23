import React from 'react'
import { isOperationEnabled } from '@staff-portal/operations'
import { useGetUserVerticals } from '@staff-portal/verticals'

import { useGetUserOperations } from '../../data/get-user-operations'
import AddTalentButton from '../AddTalentButton'

const TalentListActions = () => {
  const { data: userOperations } = useGetUserOperations()
  const createTalentOperation = userOperations?.createTalent
  const {
    data: verticals,
    loading: loadingVerticals,
    error: verticalsError
  } = useGetUserVerticals()

  if (!createTalentOperation || !isOperationEnabled(createTalentOperation)) {
    return null
  }

  return (
    <AddTalentButton
      verticals={verticals}
      loading={loadingVerticals}
      error={verticalsError}
    />
  )
}

export default TalentListActions
