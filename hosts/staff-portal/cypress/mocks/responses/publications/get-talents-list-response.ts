export const getTalentsListResponse = (candidateId:string) => ({
  data: {
    talents: {
      nodes: [
        {
          id: candidateId,
          __typename: 'Talent'
        }
      ],
      totalCount: 1,
      __typename: 'TalentOffsetConnection'
    }
  }
})
