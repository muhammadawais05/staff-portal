import { encodeEntityId } from '@staff-portal/data-layer-service'
import {
  Link,
  Staff,
  Talent,
  TalentInfraction,
  TalentInfractionOperations,
  TalentInfractionReasonValue,
  TalentInfractionStatusValue
} from '@staff-portal/graphql/staff'

import { WithTypename } from '~integration/types'
import { hiddenOperationMock } from '../hidden-operation-mock'

export const getTalentInfractionMock = (
  talentInfraction?: Partial<TalentInfraction> | null
): WithTypename<TalentInfraction> => ({
  attachments: {
    nodes: [],
    totalCount: 0
  },
  createdAt: '2022-02-28T10:38:48+03:00',
  creator: {
    id: encodeEntityId('123', 'Staff'),
    webResource: {
      text: 'Alexander Danilenko',
      url: 'https://staging.toptal.net/platform/staff/staff/100010',
      __typename: 'Link'
    } as Link,
    __typename: 'Staff',
    ...talentInfraction?.creator
  } as Staff,
  description: 'a',
  engagement: null,
  id: 'VjEtVGFsZW50SW5mcmFjdGlvbi01NTA',
  occurredAt: '2022-02-27',
  operations: {
    changeInfraction: hiddenOperationMock(),
    removeInfraction: hiddenOperationMock(),
    __typename: 'TalentInfractionOperations',
    ...talentInfraction?.operations
  } as TalentInfractionOperations,
  reasonSlug: TalentInfractionReasonValue.COMMUNICATION_POOR_ENGLISH,
  review: null,
  status: TalentInfractionStatusValue.PENDING_REVIEW,
  summary: 'a',
  talent: {
    id: 'VjEtVGFsZW50LTIzMzY0MDg',
    webResource: {
      text: 'Jonas Hudson',
      url: 'https://staging.toptal.net/platform/staff/talents/2336408',
      __typename: 'Link'
    } as Link,
    __typename: 'Talent',
    ...talentInfraction?.talent
  } as Talent,
  taskAssignee: {
    id: 'VjEtU3RhZmYtMjQ5MDY5OQ',
    webResource: {
      text: 'Soledad Gallastegui',
      url: 'https://staging.toptal.net/platform/staff/staff/2490699',
      __typename: 'Link'
    } as Link,
    __typename: 'Staff',
    ...talentInfraction?.taskAssignee
  } as Staff,
  __typename: 'TalentInfraction'
})
