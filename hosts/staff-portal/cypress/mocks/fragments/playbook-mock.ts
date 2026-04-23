import { Playbook } from '@staff-portal/graphql/staff'

import { WithTypename } from '~integration/types'
import { playbookTemplateMock } from '~integration/mocks/fragments/playbook-template-mock'

export const playbookMock = (
  playbook?: Partial<Playbook>
): WithTypename<Playbook> => ({
  identifier: 'playbook_identifier',
  label: 'Playbook label',
  templates: {
    nodes: [playbookTemplateMock()],
    totalCount: 1
  },
  ...playbook,
  __typename: 'Playbook'
})
