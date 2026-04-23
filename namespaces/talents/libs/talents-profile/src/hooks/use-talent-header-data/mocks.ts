import { GET_TALENT_HEADER_DATA } from './use-talent-header-data.staff.gql'

export const createGetTalentHeaderDataMock = ({
  talentId,
  talentName = 'Talent name',
  talentPhotoSrc = 'https://uploads-staging.toptal.io/user/photo/1992002/small_5eec06099ddcf92699bfb8951bd49677.jpg',
  partnerName = 'Partner name',
  partnerUrl = 'https://partner-url',
  partnerPhotoSrc = 'https://uploads-staging.toptal.io/user/photo/173865/small_317c8a198eebbdbf653d368556f21d41.jpeg'
}: {
  talentId: string
  talentName?: string
  talentPhotoSrc?: string
  partnerName?: string
  partnerUrl?: string
  partnerPhotoSrc?: string
}) => {
  return {
    request: {
      query: GET_TALENT_HEADER_DATA,
      variables: { talentId }
    },
    result: {
      data: {
        node: {
          id: talentId,
          fullName: talentName,
          photo: {
            small: talentPhotoSrc,
            __typename: 'Photo'
          },
          talentPartner: {
            id: 'VjEtVGFsZW50UGFydG5lci0yNzM4MDQ',
            photo: {
              small: partnerPhotoSrc,
              __typename: 'Photo'
            },
            webResource: {
              text: partnerName,
              url: partnerUrl,
              __typename: 'Link'
            },
            __typename: 'TalentPartner'
          },
          operations: {
            addRoleFlag: {
              callable: 'ENABLED',
              messages: [],
              __typename: 'Operation'
            },
            __typename: 'TalentOperations'
          },
          __typename: 'Talent'
        }
      }
    }
  }
}

export const createGetTalentHeaderDataFailedMock = (talentId: string) => ({
  request: { query: GET_TALENT_HEADER_DATA, variables: { talentId } },
  error: new Error('Error goes here')
})
