import { encodeEntityId } from '@staff-portal/data-layer-service'
import {
  CommunityLeaderStatus,
  CommunityLeaderType
} from '@staff-portal/graphql/staff'

import { enabledOperationMock, hiddenOperationMock } from '~integration/mocks'
import { webResourceMock } from '~integration/mocks/fragments'

// eslint-disable-next-line max-lines-per-function
const updateCommunityLeadersListMock = ({
  useDefaultCommunityLeaderStub
}: { useDefaultCommunityLeaderStub?: boolean } = {}) => {
  const communityLeaderStub = {
    id: encodeEntityId('123', 'CommunityLeaderAccountConnection'),
    status: CommunityLeaderStatus.APPROVED,
    type: CommunityLeaderType.COMMUNITY_LEADER,
    application: null,
    node: {
      id: encodeEntityId('123', 'CommunityLeader'),
      featuredOrder: null,
      createdAt: '2021-08-06T16:08:07+03:00',
      requestedAt: '2017-03-22T01:32:53+03:00',
      reviewedAt: '2021-08-06T16:08:06+03:00',
      leaderStatus: 'ACTIVE',
      about: 'This part was obfuscated, some content was here.',
      memos: null,
      type: 'COMMUNITY_LEADER',
      __typename: 'CommunityLeader'
    },
    appliedStaffRole: {
      id: encodeEntityId('123', 'Staff'),
      fullName: 'Carina Rodriguez',
      email: 'igor-e8cbd090d622caf5@toptal.io',
      photo: null,
      location: {
        cityName: 'Rijeka',
        country: {
          id: encodeEntityId('123', 'Country'),
          name: 'Croatia',
          __typename: 'Country'
        },
        stateName: 'Primorje-Gorski Kotar County',
        __typename: 'Location'
      },
      ...webResourceMock(),
      roleFlags: {
        nodes: [],
        __typename: 'RoleFlagConnection'
      },
      __typename: 'Staff'
    },
    operations: {
      appointCommunityLeader: hiddenOperationMock(),
      updateCommunityLeader: enabledOperationMock(),
      removeCommunityLeader: enabledOperationMock(),
      approveCommunityLeaderApplication: enabledOperationMock(),
      rejectCommunityLeaderApplication: hiddenOperationMock(),
      restoreCommunityLeader: hiddenOperationMock(),
      featureCommunityLeader: enabledOperationMock(),
      unfeatureCommunityLeader: hiddenOperationMock(),
      __typename: 'CommunityLeaderOperations'
    },
    __typename: 'CommunityLeaderAccount'
  }

  const communityLeadersStub = [
    communityLeaderStub,
    {
      id: encodeEntityId('124', 'CommunityLeaderAccount'),
      status: CommunityLeaderStatus.APPROVED,
      type: CommunityLeaderType.COMMUNITY_LEADER,
      application: {
        id: encodeEntityId('123', 'CommunityLeaderApplication'),
        createdAt: '2020-05-07T03:10:52+03:00',
        updatedAt: '2022-02-14T16:51:03+03:00',
        commitment: true,
        initialIdeas: 'nothing',
        slackChannel: null,
        type: 'ONLINE_LEADER',
        performerComment: 'This application was generated automatically',
        status: 'REJECTED',
        __typename: 'CommunityLeaderApplication'
      },
      node: {
        id: 'VjEtVGFsZW50Q29tbXVuaXR5Q29tbXVuaXR5TGVhZGVyLTI',
        featuredOrder: null,
        createdAt: '2021-08-06T16:08:07+03:00',
        requestedAt: '2020-05-07T03:10:52+03:00',
        reviewedAt: '2021-08-06T16:08:06+03:00',
        leaderStatus: 'ACTIVE',
        about: '',
        memos: null,
        type: 'COMMUNITY_LEADER',
        __typename: 'CommunityLeader'
      },
      appliedStaffRole: {
        id: 'VjEtU3RhZmYtMTc5MTkyMA',
        fullName: 'Matheus Eduardo Mordorst',
        email: 'math-0bbaa79c0ec628c6@toptal.io',
        photo: null,
        location: {
          cityName: 'Florianópolis',
          country: {
            id: encodeEntityId('123', 'Country'),
            name: 'Brazil',
            __typename: 'Country'
          },
          stateName: 'SC',
          __typename: 'Location'
        },
        ...webResourceMock(),
        roleFlags: {
          nodes: [],
          __typename: 'RoleFlagConnection'
        },
        __typename: 'Staff'
      },
      operations: {
        appointCommunityLeader: hiddenOperationMock(),
        updateCommunityLeader: enabledOperationMock(),
        removeCommunityLeader: enabledOperationMock(),
        approveCommunityLeaderApplication: hiddenOperationMock(),
        rejectCommunityLeaderApplication: hiddenOperationMock(),
        restoreCommunityLeader: hiddenOperationMock(),
        featureCommunityLeader: enabledOperationMock(),
        unfeatureCommunityLeader: hiddenOperationMock(),
        __typename: 'CommunityLeaderOperations'
      },
      __typename: 'CommunityLeaderAccount'
    },
    {
      id: encodeEntityId('125', 'CommunityLeaderAccount'),
      status: CommunityLeaderStatus.APPROVED,
      type: CommunityLeaderType.COMMUNITY_LEADER,
      application: {
        id: 'VjEtVGFsZW50Q29tbXVuaXR5Q29tbXVuaXR5TGVhZGVyQXBwbGljYXRpb24tMg',
        createdAt: '2018-08-02T22:54:29+03:00',
        updatedAt: '2022-02-14T16:51:03+03:00',
        commitment: true,
        initialIdeas:
          'I would like to get some experience in organizing events and meet new people. ',
        slackChannel: null,
        type: 'ONLINE_LEADER',
        performerComment: 'This application was generated automatically',
        status: 'APPROVED',
        __typename: 'CommunityLeaderApplication'
      },
      node: {
        id: 'VjEtVGFsZW50Q29tbXVuaXR5Q29tbXVuaXR5TGVhZGVyLTM',
        featuredOrder: null,
        createdAt: '2021-08-06T16:08:07+03:00',
        requestedAt: '2018-08-02T22:54:29+03:00',
        reviewedAt: '2021-08-06T16:08:06+03:00',
        leaderStatus: 'ACTIVE',
        about: 'This part was obfuscated, some content was here.',
        memos: null,
        type: 'COMMUNITY_LEADER',
        __typename: 'CommunityLeader'
      },
      appliedStaffRole: {
        id: 'VjEtVGFsZW50LTEyMjc3MA',
        fullName: 'Adriana Koch',
        email: 'amer-b63c87262e9744e0@toptal.io',
        photo: null,
        location: {
          cityName: 'Astana',
          country: {
            id: 'VjEtQ291bnRyeS0xMTQ',
            name: 'Kazakhstan',
            __typename: 'Country'
          },
          stateName: null,
          __typename: 'Location'
        },
        ...webResourceMock(),
        roleFlags: {
          nodes: [
            {
              flag: {
                id: 'VjEtRmxhZy0xMjAxMTE',
                title: 'High Quality Headshot',
                __typename: 'Flag'
              },
              __typename: 'RoleFlag'
            }
          ],
          __typename: 'RoleFlagConnection'
        },
        __typename: 'Talent'
      },
      operations: {
        appointCommunityLeader: hiddenOperationMock(),
        updateCommunityLeader: enabledOperationMock(),
        removeCommunityLeader: enabledOperationMock(),
        approveCommunityLeaderApplication: enabledOperationMock(),
        rejectCommunityLeaderApplication: hiddenOperationMock(),
        restoreCommunityLeader: hiddenOperationMock(),
        featureCommunityLeader: enabledOperationMock(),
        unfeatureCommunityLeader: hiddenOperationMock(),
        __typename: 'CommunityLeaderOperations'
      },
      __typename: 'CommunityLeaderAccount'
    }
  ]

  const defaultCommunityLeadersStub = useDefaultCommunityLeaderStub
    ? [communityLeaderStub]
    : communityLeadersStub

  return cy.stubGraphQLRequests({
    CommunityLeadersAccounts: {
      data: {
        communityLeaderAccounts: {
          totalCount: 3,
          nodes: defaultCommunityLeadersStub,
          __typename: 'CommunityLeaderAccountConnection'
        }
      }
    }
  })
}

export default updateCommunityLeadersListMock
