import { Talent } from '@staff-portal/graphql/staff'
import { encodeEntityId } from '@staff-portal/data-layer-service'

export const getTalentResumeFilesResponse = (talent?: Partial<Talent>) => ({
  data: {
    node: {
      id: encodeEntityId('123', 'Talent'),
      profile: {
        id: 'VjEtVGFsZW50UHJvZmlsZS0xNTM4NDI5',
        resumeFiles: {
          nodes: [],
          __typename: 'TalentProfileResumeFileConnection'
        },
        __typename: 'TalentProfile'
      },
      ...talent,
      __typename: 'Talent'
    }
  }
})
