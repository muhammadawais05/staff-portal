export const getExperimentsResponse = () => ({
  data: {
    experiments: {
      newClientFields: {
        enabled: false,
        __typename: 'NewClientFieldsExperiment'
      },
      __typename: 'Experiments'
    }
  }
})
