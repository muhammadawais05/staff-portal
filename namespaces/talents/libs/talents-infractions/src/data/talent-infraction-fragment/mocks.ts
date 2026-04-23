import {
  OperationCallableTypes,
  TalentInfractionReasonValue,
  TalentInfractionStatusValue
} from '@staff-portal/graphql/staff'

export const createTalentInfractionFragmentMock = () => ({
  attachments: {
    nodes: [
      {
        id: 'attachment-id',
        webResource: {
          text: 'Staff user #1',
          url: 'url',
          __typename: 'Link'
        },
        __typename: 'TalentInfractionAttachment'
      }
    ],
    totalCount: 0,
    __typename: 'TalentInfractionAttachmentConnection'
  },
  createdAt: '2021-03-04T00:04:30-11:00' as const,
  creator: {
    id: 'creator-id',
    webResource: {
      text: 'Staff user #1',
      url: 'url',
      __typename: 'Link'
    },
    __typename: 'Staff'
  },
  description: 'description',
  engagement: {
    id: 'engagement-id',
    webResource: {
      text: 'Senior developer',
      url: 'url',
      __typename: 'Link'
    },
    __typename: 'Engagement'
  },
  id: 'infraction-id',
  occurredAt: '2021-03-02' as const,
  operations: {
    changeInfraction: {
      callable: OperationCallableTypes.ENABLED,
      messages: [],
      __typename: 'Operation'
    },
    removeInfraction: {
      callable: OperationCallableTypes.ENABLED,
      messages: [],
      __typename: 'Operation'
    },
    __typename: 'TalentInfractionOperations'
  },
  reasonSlug: TalentInfractionReasonValue.RELIABILITY_UNRELIABLE_BEHAVIOUR,
  status: TalentInfractionStatusValue.PENDING_REVIEW,
  summary: 'Failed an interview with the same client twice',
  talent: {
    id: 'talent-id',
    webResource: {
      text: 'Talent #1',
      url: 'url1',
      __typename: 'Link'
    },
    __typename: 'Talent'
  },
  taskAssignee: {
    id: 'assignee-id',
    webResource: {
      text: 'Staff user #2',
      url: 'url2',
      __typename: 'Link'
    },
    __typename: 'Staff'
  },
  __typename: 'TalentInfraction'
})
