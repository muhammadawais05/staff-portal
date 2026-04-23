import { useGetNode } from '@staff-portal/billing/src/utils/graphql'

import { useGetClientJobTemplateQuery } from './getClientJobTemplate.graphql.types'

export { useCreateJobTemplateMutation } from './createJobTemplate.graphql.types'
export { useUpdateJobTemplateMutation } from './updateJobTemplate.graphql.types'
export const useGetClientJobTemplate = (clientId: string) =>
  useGetNode(useGetClientJobTemplateQuery)({ clientId })
