import { encodeEntityId } from '@staff-portal/data-layer-service'
import { Talent } from '@staff-portal/graphql/staff'

export const getTalentAboutDataResponse = (talent?: Partial<Talent>) => ({
  data: {
    node: {
      id: encodeEntityId('123', 'Talent'),
      profile: {
        id: 'VjEtVGFsZW50UHJvZmlsZS0xNTM4NDI5',
        about: 'This part was obfuscated, some content was here',
        __typename: 'TalentProfile'
      },
      ...talent,
      __typename: 'Talent'
    }
  }
})
