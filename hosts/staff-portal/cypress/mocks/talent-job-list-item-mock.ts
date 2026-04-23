import { Talent } from '@staff-portal/graphql/staff'

import talentListItemMock from './talent-list-item-mock'

const talentJobListItemMock = (talent?: Partial<Talent>) =>
  ({
    ...talentListItemMock(),
    ...talent,
    operations: {
      createTalentAvailabilityRequest: {
        callable: 'HIDDEN',
        messages: [],
        __typename: 'Operation'
      },
      __typename: 'TalentOperations',
      addTalentToJobFavorites: {
        callable: 'HIDDEN',
        messages: [],
        __typename: 'Operation'
      },
      removeTalentFromJobFavorites: {
        callable: 'HIDDEN',
        messages: ['Talent is not on the list'],
        __typename: 'Operation'
      },
      ...talent?.operations
    },
    __typename: 'Talent'
  } as unknown as Talent)

export default talentJobListItemMock
