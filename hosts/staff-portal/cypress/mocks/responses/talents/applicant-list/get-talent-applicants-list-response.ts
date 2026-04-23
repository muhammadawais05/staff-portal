import { encodeEntityId } from '@staff-portal/data-layer-service'

export const getTalentApplicantsListResponse = () => ({
  data: {
    talentApplicants: {
      nodes: [
        {
          id: encodeEntityId('123', 'Talent'),
          __typename: 'Talent'
        }
      ]
    },
    totalCount: 6212,
    __typename: 'TalentApplicantsConnection'
  }
})
