import { Playbook } from '@staff-portal/graphql/staff'

import { playbookMock } from '~integration/mocks/fragments'

export const getPlaybookResponse = (playbook?: Partial<Playbook>) => ({
  data: {
    playbook: {
      ...playbookMock(),
      ...playbook
    }
  }
})
