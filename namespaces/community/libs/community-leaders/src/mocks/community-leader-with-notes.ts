import { pactMatchers, Matchers } from '@staff-portal/pact-utils'

const { string, somethingLike } = Matchers

export const communityLeaderWithNotesMock = {
  data: {
    communityLeader: {
      application: null,
      id: pactMatchers.id(),
      status: string('APPROVED'),
      node: {
        about: null,
        createdAt: pactMatchers.time(),
        featuredOrder: 1,
        id: pactMatchers.id(),
        leaderStatus: string('ACTIVE'),
        memos: string('memo'),
        requestedAt: pactMatchers.time(),
        reviewedAt: null,
        type: string('COMMUNITY_LEADER'),
        __typename: 'CommunityLeader',
        leaderNotes: {
          totalCount: 1,
          nodes: [
            {
              answers: {
                nodes: [],
                __typename: 'NoteAnswerConnection'
              },
              attachment: null,
              checklistSalesCall: false,
              comment: somethingLike('Test note'),
              createdAt: pactMatchers.time(),
              creator: {
                id: pactMatchers.id(),
                __typename: 'Staff',
                webResource: {
                  text: somethingLike('Staff Name'),
                  url: null,
                  __typename: 'Link'
                }
              },
              id: pactMatchers.id(),
              newSalesCall: false,
              operations: {
                removeNote: {
                  callable: string('ENABLED'),
                  messages: [],
                  __typename: 'Operation'
                },
                removeNoteAttachment: {
                  callable: string('ENABLED'),
                  messages: [],
                  __typename: 'Operation'
                },
                updateNote: {
                  callable: string('ENABLED'),
                  messages: [],
                  __typename: 'Operation'
                },
                __typename: 'NoteOperations'
              },
              softSkillRatings: {
                nodes: [],
                __typename: 'SoftSkillRatingConnection'
              },
              status: string('ACTIVE'),
              title: somethingLike('Note'),
              updatedAt: pactMatchers.time(),
              __typename: 'Note',
            }
          ],
          __typename: 'NoteConnection'
        }
      },
      appliedStaffRole: {
        email: string('bach-1b9a4f54698b9fa8@toptal.io'),
        fullName: string('Laraine Tillman'),
        id: pactMatchers.id(),
        photo: null,
        location: null,
        roleFlags: null,
        webResource: {
          text: somethingLike('Alexander Danilenko'),
          url: null,
          __typename: 'Link'
        },
        __typename: 'Staff',
      },
      appliedTalentRole: null,
      operations: {
        appointCommunityLeader: {
          callable: string('HIDDEN'),
          messages: [
            'Community leader or community leader application already exists.'
          ]
        },
        approveCommunityLeaderApplication: {
          callable: 'HIDDEN',
          messages: ['Community leader application does not exist for this user']
        },
        featureCommunityLeader: {
          callable: string('ENABLED'),
          messages: ['Leader is already featured.']
        },
        holdCommunityLeaderApplication: {
          callable: 'HIDDEN',
          messages: ['Community leader application does not exist for this user']
        },
        rejectCommunityLeaderApplication: {
          callable: 'HIDDEN',
          messages: ['Community leader application does not exist for this user']
        },
        removeCommunityLeader: {
          callable: 'ENABLED',
          messages: []
        },
        restoreCommunityLeader: {
          callable: 'HIDDEN',
          messages: ['Only removed Community Leaders can be restored.']
        },
        unfeatureCommunityLeader: {
          callable: string('ENABLED'),
          messages: []
        },
        updateCommunityLeader: {
          callable: string('ENABLED'),
          messages: []
        },
        __typename: 'CommunityLeaderOperations'
      },
      __typename: 'CommunityLeaderAccount'
    }
  }
}

export const communityLeaderWithNotesMockCheck = {
  communityLeader: {
    __typename: 'CommunityLeaderAccount'
  }
}
