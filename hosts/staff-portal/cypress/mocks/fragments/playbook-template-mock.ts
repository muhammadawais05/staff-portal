import {
  PlaybookTemplate,
  PlaybookTemplatePriority,
  PlaybookTemplateDateRuleUnit
} from '@staff-portal/graphql/staff'
import { encodeEntityId } from '@staff-portal/data-layer-service'

import { enabledOperationMock } from '~integration/mocks'
import { WithTypename } from '~integration/types'

export const playbookTemplateMock = (
  node?: Partial<PlaybookTemplate>
): WithTypename<PlaybookTemplate> => ({
  id: encodeEntityId('123', 'PlaybookTemplate'),
  identifier: 'playbook_template',
  communication: true,
  description: 'Follow up with an OFAC investigation',
  details:
    'Created when an OFAC investigation is initiated - by the system or manually.\nFinished when the OFAC investigation is over.\n',
  dueDateRuleAmount: 0,
  dueDateRuleUnit: PlaybookTemplateDateRuleUnit.BUSINESS_DAYS,
  finishDisabled: false,
  important: true,
  priority: PlaybookTemplatePriority.LOW,
  recurring: 10,
  rescheduleDisabled: true,
  slackNotificationsEnabled: false,
  stopRecurringAfterDispute: false,
  flowLink: {
    text: 'BPM Link',
    url: 'url.to'
  },
  webResource: {
    text: 'playbook_template',
    url: 'playbook#playbook_template'
  },
  operations: {
    updatePlaybookTemplate: enabledOperationMock()
  },
  ...node,
  __typename: 'PlaybookTemplate'
})
