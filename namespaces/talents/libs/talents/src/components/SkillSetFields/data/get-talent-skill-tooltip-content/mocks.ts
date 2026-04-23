import { GetTalentSkillTooltipContentDocument } from '.'
import { TalentSkillSetConnectionsFragment } from '../../../../data/talent-skill-set-connections-fragment'

export const createGetTalentSkillTooltipContentMock = ({
  skillSetId = '123',
  skillSetConnections
}: {
  skillSetId: string
  skillSetConnections?: Partial<
    TalentSkillSetConnectionsFragment['connections']
  >
}) => ({
  request: {
    query: GetTalentSkillTooltipContentDocument,
    variables: { skillSetId }
  },
  result: {
    data: {
      node: {
        id: skillSetId,
        connections: {
          totalCount: 1,
          nodes: [
            {
              __typename: 'TalentCertification',
              certificate: 'Bloomberg Market Concepts Course',
              institution: 'Bloomberg Finance L.P.'
            }
          ],
          ...skillSetConnections,
          __typename: 'SkillConnectionSkillableConnection'
        },
        __typename: 'SkillSet'
      }
    }
  }
})

export const createGetTalentSkillSetsFailedMock = ({
  skillSetId
}: {
  skillSetId: string
}) => ({
  request: {
    query: GetTalentSkillTooltipContentDocument,
    variables: { skillSetId }
  },
  error: new Error('Network error occurred')
})
