import { useGetNode } from '@staff-portal/data-layer-service'

import { GetPlaybookTemplateDocument } from './get-playbook-template.staff.gql.types'

export const useGetPlaybookTemplate = (playbookTemplateId: string) =>
  useGetNode(GetPlaybookTemplateDocument)(
    { playbookTemplateId },
    { throwOnError: true }
  )
