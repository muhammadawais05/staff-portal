import { Contact, ContactType } from '@staff-portal/graphql/staff'
import { encodeEntityId } from '@staff-portal/data-layer-service'

import { webResourceMock } from './fragments'
import { WithTypename } from '~integration/types'
import { enabledOperationMock } from './enabled-operation-mock'

export const contactMock = (
  node?: Partial<Contact>
): WithTypename<Contact> => ({
  id: encodeEntityId('123', 'Test'),
  type: ContactType.PHONE,
  value: '+48784945133',
  ...webResourceMock(),
  external: false,
  note: null,
  category: null,
  operations: {
    callContact: enabledOperationMock()
  },
  primary: true,
  __typename: 'Contact',
  ...node
})
