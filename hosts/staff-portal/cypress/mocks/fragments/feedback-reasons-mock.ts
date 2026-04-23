import { Maybe, FeedbackReason } from '@staff-portal/graphql/staff'

type FeedbackReasonFragmentWithTypeName = FeedbackReason & {
  __typename: 'FeedbackReason'
} & {
  group: Maybe<FeedbackReason['group'] & { __typename: 'FeedbackReason' }>
}

const createFeedbackReasonMock = ({
  id = '123',
  defaultComment = 'Some details',
  identifier = 'contracts',
  name = 'Contracts',
  nameForRole = 'Contracts for Role',
  group = null
}: Partial<FeedbackReasonFragmentWithTypeName> = {}): FeedbackReasonFragmentWithTypeName => ({
  id,
  defaultComment,
  identifier,
  name,
  nameForRole,
  group,
  __typename: 'FeedbackReason'
})

export const feedbackReasonsMock: FeedbackReasonFragmentWithTypeName[] = [
  createFeedbackReasonMock(),
  createFeedbackReasonMock({
    id: '234',
    identifier: 'hiring_replacement',
    name: 'Hiring a replacement'
  }),
  createFeedbackReasonMock({
    id: '345',
    identifier: 'hired_someone_remotely',
    name: 'Hiring someone else remotely',
    group: createFeedbackReasonMock({
      id: '234',
      identifier: 'hiring_replacement',
      name: 'Hiring a replacement'
    })
  })
]
