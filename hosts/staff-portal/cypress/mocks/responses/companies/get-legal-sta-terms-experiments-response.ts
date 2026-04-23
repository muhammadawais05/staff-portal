export const getLegalStaTermsExperimentsResponse = () => ({
  data: {
    experiments: {
      showSTATerms: {
        enabled: true,
        __typename: 'ShowSTATermsExperiment'
      },
      __typename: 'Experiments'
    }
  }
})
