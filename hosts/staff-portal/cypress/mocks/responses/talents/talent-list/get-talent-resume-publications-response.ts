import { Talent } from '@staff-portal/graphql/staff'

export const getTalentResumePublicationsResponse = (
  talent?: Partial<Talent>
) => ({
  data: {
    node: {
      id: 'VjEtVGFsZW50LTIxOTU0ODA',
      resumePublications: {
        nodes: [],
        __typename: 'PublishableConnection'
      },
      ...talent,
      __typename: 'Talent'
    }
  }
})
