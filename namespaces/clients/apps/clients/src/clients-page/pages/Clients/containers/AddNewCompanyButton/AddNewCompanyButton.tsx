import React from 'react'
import { OperationWrapper } from '@staff-portal/operations'
import { Button, Link as PicassoLink } from '@toptal/picasso'
import { Link } from '@staff-portal/navigation'
import { useQuery } from '@staff-portal/data-layer-service'
import { ActionLoader } from '@staff-portal/ui'
import { getCreateClientPath } from '@staff-portal/routes'

import { CreateClientOperationDocument } from './data/create-client-operation/get-create-client-operation.staff.gql.types'

const AddNewCompanyButton = () => {
  const { data, loading } = useQuery(CreateClientOperationDocument)

  if (loading) {
    return <ActionLoader />
  }

  return (
    <OperationWrapper operation={data?.operations.createClient}>
      <Button
        variant='positive'
        size='small'
        as={Link as typeof PicassoLink}
        href={getCreateClientPath()}
      >
        Add New Company
      </Button>
    </OperationWrapper>
  )
}

export default AddNewCompanyButton
