import { ApproveClientInput } from '@staff-portal/graphql/staff'

import { ClientApproveForm } from './types'

type Props = {
  formData: ClientApproveForm
  clientId: string
}

export const getApproveClientInput = ({
  formData: {
    toptalProjects,
    seamlessMatchingAccepted,
    businessModels,
    currentEmployeeCount,
    ...restFormData
  },
  clientId
}: Props): ApproveClientInput => ({
  ...restFormData,
  clientId,
  businessModels: businessModels.map(({ value }) => value),
  toptalProjects: toptalProjects ? toptalProjects === 'true' : undefined,
  seamlessMatchingAccepted: seamlessMatchingAccepted
    ? seamlessMatchingAccepted === 'true'
    : undefined,
  currentEmployeeCount: currentEmployeeCount
    ? Number(currentEmployeeCount)
    : undefined
})
