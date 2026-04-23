import { ProfileSkill } from '../../types'

const getProfileSkillMock = (
  profileSkill: Partial<
    Omit<ProfileSkill, 'skill'> & {
      skill: {
        name: ProfileSkill['skill']['name']
      }
    }
  > = {}
) =>
  ({
    id: profileSkill.id ?? 'skill-1',
    ...profileSkill,
    skill: {
      id: profileSkill.id ?? 'skill-1',
      name: 'Skill',
      ...profileSkill.skill
    }
  } as ProfileSkill)

export default getProfileSkillMock
