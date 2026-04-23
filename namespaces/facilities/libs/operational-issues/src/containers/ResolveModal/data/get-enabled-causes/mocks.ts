import { encodeEntityId } from '@staff-portal/data-layer-service'

import { GetOperationalIssueEnabledCausesDocument } from './get-enabled-causes.staff.gql.types'

export const createGetEnabledCausesDataMocks = (
  causes: Partial<{ id: string; name: string }>[] = [],
  templateId: string
) => ({
  node: {
    id: templateId,
    enabledCauses: {
      nodes: causes.map((cause, index) => ({
        id: encodeEntityId(index.toString(), 'OperationalIssueCauseTemplate'),
        name: 'Test enabled cause',
        ...cause,
        __typename: 'OperationalIssueCauseTemplate'
      })),
      __typename: 'OperationalIssueCauseTemplateConnection'
    },
    __typename: 'OperationalIssueTemplate'
  }
})

export const createGetEnabledCausesMock = (
  causes: Partial<{ id: string; name: string }>[] = [],
  templateId: string = encodeEntityId('123', 'Test')
) => ({
  request: {
    query: GetOperationalIssueEnabledCausesDocument,
    variables: { templateId }
  },
  result: {
    data: {
      ...createGetEnabledCausesDataMocks(causes, templateId)
    }
  }
})
