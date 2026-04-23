import { Talent, TalentStatusV2 } from '@staff-portal/graphql/staff'
import { encodeEntityId } from '@staff-portal/data-layer-service'

export const getTalentQAResponse = (talent?: Partial<Talent>) => ({
  data: {
    node: {
      id: encodeEntityId('123', 'Talent'),
      statusV2: TalentStatusV2.ACTIVE,
      quizItems: {
        nodes: [],
        __typename: 'QuizItemConnection'
      },
      ...talent,
      __typename: 'Talent'
    }
  }
})
