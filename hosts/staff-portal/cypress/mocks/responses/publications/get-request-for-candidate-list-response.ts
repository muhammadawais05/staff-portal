export const getRequestForCandidateListResponse = (
  requestId: string,
  description: string,
  requestTitle: string
) => ({
  data: {
    gig: {
      id: requestId,
      description: description,
      skills: ['Ruby'],
      status: 'APPROVED',
      title: requestTitle,
      __typename: 'PublicationGig'
    }
  }
})
