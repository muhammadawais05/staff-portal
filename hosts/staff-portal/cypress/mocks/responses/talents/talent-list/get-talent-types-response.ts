export const getTalentTypesResponse = () => ({
  data: {
    verticals: {
      nodes: [
        {
          id: 'VjEtVmVydGljYWwtMg',
          talentType: 'designer',
          specializations: {
            nodes: [
              {
                id: 'VjEtU3BlY2lhbGl6YXRpb24tMzAwMTA',
                title: 'Digital Design',
                __typename: 'Specialization'
              }
            ],
            __typename: 'VerticalSpecializationConnection'
          },
          __typename: 'Vertical'
        }
      ],
      __typename: 'VerticalConnection'
    }
  }
})
