import { OfacStatus } from '@staff-portal/graphql/staff'

import { OfacStatusChangeFragment } from './ofac-status-change-fragment.staff.gql.types'

export const createOfacStatusChangeFragment = (
  data: Partial<OfacStatusChangeFragment>
) =>
  ({
    comment: 'TEST_COMMENT',
    createdAt: '2018-03-11T09:49:20+0000',
    status: OfacStatus.NORMAL,
    performer: {
      id: 'test-id',
      fullName: 'TEST_NAME',
      webResource: {
        url: 'TEST_LINK',
        __typename: 'Webresource'
      },
      __typename: 'Staff'
    },
    ...data,
    __typename: 'OfacStatusChange'
  } as OfacStatusChangeFragment)
