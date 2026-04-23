import { OperationCallableTypes } from '@staff-portal/graphql/staff'
import { encodeEntityId } from '@staff-portal/data-layer-service'
import { createRoleFlagMock } from '@staff-portal/role-flags/src/mocks'

import { CallRequestFragment } from './call-request-fragment.staff.gql.types'

export const createCallRequestMock = (fields?: Partial<CallRequestFragment>) =>
  ({
    id: encodeEntityId('1000', 'Test'),
    name: 'Test Name',
    createdAt: '2018-11-03T06:10:28.160+03:00',
    requestedStartTime: '2018-11-04T17:30:00.000+03:00',
    type: 'scheduled',
    status: 'cancelled',
    claimer: {
      id: encodeEntityId('2000', 'Test'),
      webResource: {
        url: 'claimer_url',
        text: 'John Donut'
      },
      __typename: 'Staff'
    },
    inWorkingHours: true,
    job: {
      id: encodeEntityId('3000', 'Test'),
      webResource: {
        url: 'job_url',
        text: 'Test Job Name'
      },
      __typename: 'Job'
    },
    late: false,
    isNew: false,
    obscureLead: false,
    purpose: 'Sales',
    claimedAt: '2018-11-08T06:10:28.160+03:00',
    operations: {
      claimCallbackRequest: {
        callable: OperationCallableTypes.ENABLED,
        messages: [],
        __typename: 'Operation'
      },
      claimCallbackRequestWithClient: {
        callable: OperationCallableTypes.HIDDEN,
        messages: [],
        __typename: 'Operation'
      },
      removeCallbackRequest: {
        callable: OperationCallableTypes.ENABLED,
        messages: [],
        __typename: 'Operation'
      },
      __typename: 'CallbackRequestOperations'
    },
    client: {
      id: '1633137',
      roleFlags: {
        nodes: [createRoleFlagMock()],
        __typename: 'RoleFlagConnection'
      },
      claimer: {
        id: 'abc123',
        __typename: 'Staff'
      },
      contact: {
        id: 'test_id',
        fullName: 'Alice Smith',
        contacts: {
          nodes: [
            {
              id: 'test-id',
              type: 'PHONE',
              value: '+34693812101',
              primary: true,
              __typename: 'Contact'
            }
          ],
          __typename: 'ContactConnection'
        },
        __typename: 'CompanyRepresentative'
      },
      createdAt: '2018-11-08T06:10:28.160+03:00',
      fullName: 'Pfeffer-Murray HP',
      photo: {
        icon: 'https://uploads-staging.toptal.io/icon.png',
        __typename: 'Photo'
      },
      timeZone: {
        name: '(UTC-05:00) America - New York',
        __typename: 'TimeZone'
      },
      netTerms: 0,
      country: {
        id: '1000',
        name: 'United States',
        __typename: 'Country'
      },
      webResource: {
        url: 'client_url'
      },
      __typename: 'Client'
    },
    __typename: 'CallbackRequest',
    ...fields
  } as CallRequestFragment)
