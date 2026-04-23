import React from 'react'
import { LazyOperationRenderProps } from '@staff-portal/operations'

import EditButton from '../components/EditButton'

const getRenderEditButton = (loading: boolean) => ({
  loading: operationLoading,
  ...rest
}: LazyOperationRenderProps) => (
  <EditButton {...rest} loading={operationLoading || loading} />
)

export default getRenderEditButton
